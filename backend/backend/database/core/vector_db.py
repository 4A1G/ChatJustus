from __future__ import annotations

from typing import Type, ClassVar
from uuid import uuid4

from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams, PointStruct, ScoredPoint, Filter
from pydantic import BaseModel, Field, ValidationError

from .embedding import EmbeddingModel, OpenAIEmbedding


# TODO: field to indicate indexing
# def IndexField(...)

def EmbedField(embedder: Type[EmbeddingModel] = OpenAIEmbedding, *args, **kwargs):
    '''
    A field that can be embedded into a vector database. Currently only supports str.
    You can specify the embedding model to use, or use the default OpenAIEmbedding.
    '''
    json_schema_extra = kwargs.pop('json_schema_extra', {})
    
    if embedder:
        EmbedData.embedder_registry[embedder.__name__] = embedder
        json_schema_extra['embed'] = True
        json_schema_extra['embedding_model'] = embedder.__name__
        json_schema_extra['embedding_dim'] = embedder.EMBEDDING_DIM
        json_schema_extra['embedding_distance'] = embedder.DISTANCE

    return Field(*args, **kwargs, json_schema_extra=json_schema_extra)


class EmbedData(BaseModel):
    '''
    Abstract class for model that contains at least one embeddable field.
    Mark the embeddable field with ... = EmbedField(EmbeddingModel).
    '''
    embedder_registry: ClassVar[dict[str, Type[EmbeddingModel]]] = {} # (global) embedding cls name -> cls

    def to_payload(self):
        '''
        Return a dict that can be stored in the vector database.
        '''
        return self.model_dump()
    
    @classmethod
    def field_embedder(cls):
        '''
        Return a dict of vector field names and their embedding classes.
        '''
        return {
            name: EmbedData.embedder_registry[field.json_schema_extra['embedding_model']]
            for name, field in cls.model_fields.items()
            if field.json_schema_extra and field.json_schema_extra.get('embed')
        }
    
    @classmethod
    def embed(cls, batch: list[EmbedData], field_embedder = None) -> list[dict[str, list[float]]]:
        '''
        Given a batch of EmbedData, create a batch of embeddings for each vector field.
        All EmbedData in the batch must be of the same type.
        '''
        assert all(isinstance(d, cls) for d in batch), f"Batch must be of type {cls.__name__}, got a mix of { {b.__class__.__name__ for b in batch} }"
        field_embedder = field_embedder or cls.field_embedder()
        
        # gather by field, and batch-embed each field
        field_batches = {
            field_name: embedding_cls.embed([getattr(d, field_name) for d in batch])
            for field_name, embedding_cls in field_embedder.items()
        }
        # transpose batch
        return [
            {
                field_name: field_batch[i]
                for field_name, field_batch in field_batches.items()
            }
            for i in range(len(batch))
        ]
    

class VectorDB:
    '''
    A vector database that stores 
    '''
    global_client = QdrantClient(path="storage/qdrant")


    def __init__(self, name: str, data_model: Type[EmbedData], client=None, validate=True):
        self.name = name
        self.data_model = data_model
        self.field_embedder = data_model.field_embedder()
        self.client = client or VectorDB.global_client

        if validate:
            self._validate_vector_fields()

        # ensure collection exists
        if self.name not in [c.name for c in self.client.get_collections().collections]:
            print(f'Creating collection {self.name}')
            self.reset()
    

    def reset(self):
        self.client.recreate_collection(
            self.name,
            {
                field: VectorParams(size=embed.EMBEDDING_DIM, distance=embed.DISTANCE)
                for field, embed in self.field_embedder.items()
            }
        )


    def destroy(self):
        self.client.delete_collection(self.name)


    def add(self, data: list[EmbedData], ids: list[str | int] = None):
        if not ids:
            ids = [str(uuid4()) for _ in range(len(data))]

        assert len(data) == len(ids)

        embeddings = self.data_model.embed(data, self.field_embedder)

        points = [
            PointStruct(
                id=i,
                vector=e,
                payload=d.to_payload()
            ) for i, d, e in zip(ids, data, embeddings)
        ]
        
        operation_info = self.client.upsert(
            collection_name=self.name,
            points=points,
            wait=True
        )
        assert operation_info.status == 'completed'


    def query(self, top: int = 10, filter: Filter = None, **query_args) -> list[tuple[float, Type[EmbedData]]]:
        '''
        Query using a keyword argument of desired field name of EmbedData and its value.
        Returns a list of (score, EmbedData) tuples.
        '''
        assert len(query_args) == 1
        field_name, query = list(query_args.items())[0]
        embedder = self.field_embedder[field_name]

        query_vector = embedder.embed([query])[0]
        search_result = self.client.search(
            collection_name=self.name,
            query_vector=(field_name, query_vector),
            limit=top,
            query_filter=filter
        )
        return [
            (r.score, self.data_model(**r.payload))
            for r in search_result
        ]
    

    def retrieve(self, ids: list[str | int]) -> list[Type[EmbedData]]:
        '''
        Retrieve EmbedData by id.
        '''
        points = self.client.retrieve(self.name, ids=ids, with_payload=True, with_vectors=False)
        return [
            self.data_model(**p.payload)
            for p in points
        ]


    def iterate(self, filter: Filter = None, batch: int = 100, with_id: bool = False):
        '''
        Iterate over all documents in the collection.
        '''
        offset = None
        while True:
            points, offset = self.client.scroll(
                self.name,
                scroll_filter=filter,
                limit=batch,
                offset=offset,
                with_payload=True,
                with_vectors=False
            )

            for point in points:
                model = self.data_model(**point.payload)
                yield (point.id, model) if with_id else model
            
            if offset is None:
                break
    
    def __iter__(self):
        return self.iterate()

    def __getitem__(self, key: str | int):
        return self.data_model(**self.client.retrieve(self.name, ids=[key])[0].payload)
    
    def __len__(self):
        return self.client.get_collection(self.name).points_count
    
    def _validate_vector_fields(self):
        if not self.field_embedder:
            raise ValueError("The model must have at least one field marked as vectorized.")
        for field_name in self.field_embedder:
            field = self.data_model.model_fields[field_name]
            if field.annotation != str:
                raise TypeError(f"Vectorized field {field_name} must be of type str.")