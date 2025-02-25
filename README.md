# Patronus-Assessment

Pdf-Management is a web-based pdf management system to extract text from pdf files built with React and Django. 

## Features

• Authentication: Complete user authentication system. \
• File Upload: Allows users to upload files securely. \
• File Deletion: Provides functionality to delete files \
• OCR: Extracts text from uploaded PDF files.

## Technologies Used

• Frontend: React, Material-UI \
• Backend: Django, Django REST Framework \
• Database: SQLite (for development)


## Installation (With Docker)

1. Clone the repository
```bash
git clone https://github.com/Rhythm1821/Patronus-Assessment.git
```

2. Navigate to the project directory
```bash
cd Patronus-Assessment
```

3. Create a .env file in the frontend directory
```bash
cd frontend/
touch .env && echo "VITE_API_URL=http://localhost:8000" > .env
cd ..
```

4. Run Docker Compose
```bash
docker-compose up --build
```

5. Open your web browser and go to http://172.18.0.2:5173

## Installation (Without Docker)

Clone the repository:

```bash
git clone https://github.com/Rhythm1821/Patronus-Assessment.git
```

## Navigate to the Project Directory
```bash
cd Patronus-Assessment
```

## Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
touch .env && echo "VITE_API_URL=http://localhost:8000" > .env
npm install
```

Start the frontend development server:
```bash
npm run dev
```

## Open a new terminal

## Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment and activate it:

```bash
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Apply migrations to set up the database:

```bash
python3 manage.py makemigrations
python3 manage.py migrate
```

Start the Django development server:

```bash
python3 manage.py runserver
```

Open your web browser and go to http://localhost:5173 to access the application.
