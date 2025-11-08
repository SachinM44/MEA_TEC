# Task Manager App

A simple task management app where you can create, edit, and delete your tasks. Built with React and Node.js.

## What you need

- Node.js installed on your computer
- PostgreSQL database

## Getting Started

### Setting up the Backend

1. Go to the Backend folder:
```
   cd Backend
```

2. Install packages:
```
   npm install
```

3. Create a `.env` file with these details:
```
   DATABASE_URL=postgresql://user:password@localhost:5432/taskdb
   JWT_SECRET=your_secret_key_here
   FRONTEND_URL=http://localhost:5173
   PORT=5000
```

4. Set up the database:
```
   npx prisma generate
   npx prisma db push
```

5. Start the server:
```
   npm run dev
```

### Setting up the Frontend

1. Go to the frontend folder:
```
   cd frontend
```

2. Install packages:
```
   npm install
```

3. Start the app:
```
   npm run dev
```

4. Open your browser and go to `http://localhost:5173`

## How to use

1. Sign up for a new account
2. Log in with your username and password
3. Start adding your tasks!

## Features

- Create new tasks
- Mark tasks as complete or pending
- Edit existing tasks
- Delete tasks you don't need

That's it! If something doesn't work, make sure both the backend and frontend are running.
