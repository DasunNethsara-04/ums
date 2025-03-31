# User Management System

This project is a User Management System designed to handle user authentication, authorization, and management. It consists of a frontend built with React, TypeScript, and Vite, and a backend developed using Python and FastAPI.

## Technologies Used

### Frontend

- React
- TypeScript
- Vite
- Bootstrap5
- Axios
- React Router DOM
- React Toastify

### Backend

- FastAPI
- SQLAlchemy
- PyMySQL
- Pydantic
- Uvicorn
- Python-Jose
- Passlib

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DasunNethsara-04/ums.git
   cd ums
   ```

### Backend Setup

2. **Create a virtual environment:**

   ```bash
   cd backend
   python -m venv venv
   ```

3. **Activate the virtual environment:**

   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS and Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install the dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

5. **Run the FastAPI application:**
   ```bash
   fastapi dev app.py
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

## Backend APIs

The backend provides several APIs for user management. Below is a list of available endpoints:

### Authentication

- **POST /auth/login**: Authenticate a user and return a JWT token.
- **POST /auth/register**: Register a new user.
- **GET /auth//verify-token**: Verify the JWT token.
- **POST /auth/role**: Get the role of a logged in user
- **GET /auth/profile**: Get the profile details of a user
- **PATCH /auth/profile/edit/{user_id}/basic**: Update the basic info of the selected user
- **PATCH /auth/profile/edit/{user_id}/username**: Update the username of the selected user
- **PATCH /auth/profile/edit/{user_id}/password**: Update the password of the selected user

### Admin

- **GET /admin/users/**: Retrieve a list of all users (admin access required).
- **POST /admin/users/**: Create a new user (admin access required).
- **PUT /admin/users/{user_id}**: Update user details (admin access required).
- **DELETE /admin/users/{user_id}**: Delete a user (admin access required).
- **GET /admin/users/count**: Get the total number of users (admin access required).
- **GET /admin/users/{user_id}**: Get the user by id (admin access required).
- **GET /admin/moderators/count**: Get the total number of moderators (admin access required).
- **GET /admin/moderators/**: Retrieve a list of all moderators (admin access required).
- **POST /admin/moderators/**: Create a new moderator (admin access required).
- **GET /admin/moderators/{moderator_id}**: Get the moderator by id (admin access required).
- **PUT /admin/moderators/{moderator_id}**: Update moderator details (admin access required).
- **DELETE /admin/moderators/{moderator_id}**: Delete a moderator (admin access required).

## Additional Information

- The frontend uses Vite for fast development and hot module replacement.
- The backend is built with FastAPI, providing a robust and high-performance web framework for building APIs with Python 3.10+.
- Ensure that the database is properly configured and running before starting the backend server.
