# SkillXchange Setup Instructions

## Prerequisites
Before you begin, ensure you have the following installed on your machine:

- Python 3.7 or higher
- PostgreSQL
- pip (Python package installer)
- Docker (optional, if using Docker)

## Project Setup

### 1. Clone the Repository
Clone the SkillXchange repository from GitHub (or your source control) to your local machine:
```
git clone <repository-url>
cd SkillXchange
```

### 2. Set Up the Backend

#### a. Create a Virtual Environment
It is recommended to create a virtual environment for the backend:
```
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

#### b. Install Dependencies
Install the required Python packages using pip:
```
pip install -r requirements.txt
```

#### c. Configure Database
Update the `config.py` file with your PostgreSQL database connection details:
```python
DATABASE_URI = 'postgresql://username:password@localhost:5432/yourdatabase'
```

#### d. Initialize the Database
Make sure your PostgreSQL server is running and create the database specified in the `config.py`. You may need to run migrations or create tables as necessary.

### 3. Set Up the Frontend
The frontend files are located in the `frontend` directory. You can open `index.html` in your web browser to view the application.

### 4. Running the Application
To run the Flask application, execute the following command in the `backend` directory:
```
python app.py
```
The application will be accessible at `http://127.0.0.1:5000`.

### 5. Using Docker (Optional)
If you prefer to use Docker, you can build and run the application using the provided `docker-compose.yml` file:
```
docker-compose up --build
```

### 6. Additional Notes
- Ensure that you have the necessary permissions to access the PostgreSQL database.
- For any additional configurations or environment variables, refer to the `config.py` file.

## Conclusion
You are now set up to start developing and using the SkillXchange application. For further information, refer to the `README.md` and `API.md` files in the `docs` directory.