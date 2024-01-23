# Database Subpackage

This subpackage contains the vector database that the AI assistant uses to answer questions. It uses [qdrant](https://qdrant.tech/) as the DB under the hood.

- `core/`: Contains our custom wrapper around qdrant.
- `schemas.py`: Contains the schemas for each collection in the DB.

`create_lawyer_db.ipynb`, `create_legal_db.ipynb` and `create_mocked_case.ipynb` in the parent directory contain the code we used to fill the DB with data.