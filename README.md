# Task Management System 

This is a full-stack task management application built using modern web technologies. The application allows users to register, log in, and manage their tasks with real-time updates and a clean user interface.

The project is designed to demonstrate full-stack development skills including authentication, database design, API development, and responsive frontend implementation.

---

## Features

### Authentication
- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Access token and refresh token implementation
- Secure logout functionality
- Auto token refresh using refresh tokens

### Task Management
- Create tasks with title, description, priority, and status
- Update task status (todo, progress, done)
- Delete tasks
- Edit task details
- Filter tasks by status
- Search tasks by title
- Filter tasks by date

### Dashboard
- Display total tasks count
- Display count of completed tasks
- Display count of pending tasks
- Clean and responsive UI
- Real-time updates using Socket.io

---

## Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Axios

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Socket.io

---

## Project Structure

### Backend

backend/
├── prisma/
├── src/
│ ├── controllers/
│ ├── routes/
│ ├── middleware/
│ ├── utils/
│ └── app.ts


frontend/
├── app/
│ ├── dashboard/
│ ├── login/
│ ├── register/
├── components/
├── services/



---

## Installation

### 1. Clone the repository

git clone <your-repo-url>
cd project-folder


---

### 2. Backend Setup


cd backend
npm install


Create a `.env` file:


DATABASE_URL="postgresql://postgres:password@localhost:5432/task_manager"
ACCESS_SECRET="your_access_secret"
REFRESH_SECRET="your_refresh_secret"


Run database migration:


npx prisma migrate dev


Start backend server:


npm run dev


---

### 3. Frontend Setup


cd frontend
npm install
npm run dev


---

## API Endpoints

### Authentication
- POST /auth/register
- POST /auth/login
- POST /auth/refresh
- POST /auth/logout

### Tasks
- GET /tasks
- POST /tasks
- PATCH /tasks/:id
- DELETE /tasks/:id

---

## Authentication Flow

1. User logs in and receives:
   - Access Token (short-lived)
   - Refresh Token (long-lived)

2. Access token is used for API requests.

3. When access token expires:
   - Refresh token is used to get a new access token.

4. Logout clears refresh token from database and client storage.

---

## Database Design

### User
- id
- email
- password
- refreshToken

### Task
- id
- title
- description
- priority (low, medium, high)
- status (todo, done)
- userId
- createdAt
- updatedAt

---

## Key Highlights

- Secure authentication using JWT and refresh tokens
- Clean separation of backend and frontend
- Real-time updates using Socket.io
- Scalable architecture using Prisma ORM
- Modern UI with smooth animations
- Production-level coding practices

