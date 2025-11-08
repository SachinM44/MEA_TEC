# Task Manager App

## Overview

This is a full-stack Task Manager application built with React (frontend) and Node.js/Express (backend). It allows users to register, login, and manage their tasks (create, read, update, delete) with authentication using JWT.

## Project Structure

- **Backend/**: Node.js/Express server with Prisma for database management.
- **frontend/**: React application with Redux for state management, Tailwind CSS for styling.

## Prerequisites

- Node.js (v14+)
- npm
- PostgreSQL database

## Setup Instructions

### Backend

1. Navigate to the Backend directory:
   ```
   cd Backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables: Copy `.env.example` to `.env` and fill in the values:
   - `DATABASE_URL`: Your PostgreSQL connection string (e.g., `postgresql://user:password@localhost:5432/taskdb`)
   - `JWT_SECRET`: A secret key for JWT signing (e.g., a random string)
   - `PORT`: Server port (default 5000)

4. Initialize Prisma:
   ```
   npx prisma generate
   npx prisma db push  # Or npx prisma migrate dev if using migrations
   ```

5. Run the backend server:
   ```
   npx ts-node src/index.ts
   ```
   The server will run on `http://localhost:5000`.

### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the frontend development server:
   ```
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (Vite default).

## Usage

- Open the frontend in your browser.
- Register a new account or login with existing credentials.
- Once logged in, you will be redirected to the tasks page where you can create, edit, delete, and view your tasks.

## API Documentation

### Authentication Routes (/api/auth)

- **POST /register**: Register a new user.
  - Body: `{ "username": "string", "password": "string" }`
  - Response: `{ "message": "User created", "userId": number }`

- **POST /login**: Login and get JWT token.
  - Body: `{ "username": "string", "password": "string" }`
  - Response: `{ "token": "string", "userId": number }`

### Task Routes (/api/tasks) - Protected

- **GET /**: Get all tasks for the authenticated user.
  - Response: Array of tasks `{ id: number, title: string, description: string, status: string, userId: number }`

- **POST /**: Create a new task.
  - Body: `{ "title": "string", "description": "string" (optional), "status": "pending" | "completed" }`
  - Response: Created task object

- **PUT /:id**: Update a task.
  - Body: `{ "title": "string", "description": "string" (optional), "status": "pending" | "completed" }`
  - Response: Updated task object

- **DELETE /:id**: Delete a task.
  - Response: 204 No Content

## Notes

- The backend uses Prisma with PostgreSQL. Ensure your database is set up correctly.
- Frontend uses Redux for state, Formik and Zod for forms/validation, Axios for API calls.
- Protected routes in frontend use a PrivateRoute component.
- For production, configure proper CORS, secure your JWT secret, and deploy accordingly.

## Troubleshooting

- If you encounter permission issues with npm, try using a temporary cache as done during setup.
- Ensure the backend server is running before using the frontend.
- Check console for any errors related to API calls or authentication.