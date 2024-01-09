from abc import ABC
from typing import Any

from openai import OpenAI
from qdrant_client.http.models import Distance

class EmbeddingModel(ABC):
    EMBEDDING_DIM: int = -1
    DISTANCE: Distance = Distance.COSINE
    
    @classmethod
    def embed(cls, texts: list[str]) -> list[list[float]]:
        raise NotImplementedError

    def __call__(self, texts: list[str]) -> list[list[float]]:
        return self.embed(texts)

class MockEmbedding(EmbeddingModel):
    EMBEDDING_DIM = 2
    DISTANCE = Distance.COSINE

    @classmethod
    def embed(cls, texts: list[str]) -> list[list[float]]:
        return [[1.0] * cls.EMBEDDING_DIM] * len(texts)

class OpenAIEmbedding(EmbeddingModel):
    EMBEDDING_DIM = 1536
    DISTANCE = Distance.COSINE

    @classmethod
    def embed(cls, texts: list[str]) -> list[list[float]]:
        client = OpenAI()
        response = client.embeddings.create(
            model='text-embedding-ada-002',
            input = texts
        )
        return [r.embedding for r in response.data]