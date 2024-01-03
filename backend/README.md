# Backend

## Development Setup

We use conda for python version and virtual environment.
On top of that, for dependency management, we use poetry.

### Initial Setup
Ensure you have conda and poetry installed.
1. Clone the repository and cd into this directory
```bash
cd backend
```
2. Create the conda environment
```bash
conda env create -f environment.yaml
```
3. **Whenever working on the project**, activate the environment
```bash
conda activate tc
```
4. To install all dependencies, use poetry
```bash
poetry install
```
5. **Whenever adding a new dependency**, instead of pip install, use poetry add:
```bash
poetry add <package>
```
6. **Whenever updating to the latest dependencies**, use poetry update:
```bash
poetry update
```