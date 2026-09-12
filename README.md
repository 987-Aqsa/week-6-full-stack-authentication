# Week 6 - Full Stack Authentication System

A full-stack Task Manager application with secure user authentication using JWT and bcrypt.

## Features

- User Registration / Signup
- User Login
- Password hashing using bcrypt
- JWT-based authentication
- Protected Task API routes
- Create tasks
- View tasks
- Delete tasks
- Logout functionality
- Loading and error states
- React frontend connected with Express backend
- MongoDB database using Mongoose

## Technologies Used

### Frontend
- React.js
- Vite
- JavaScript
- HTML
- CSS
- React Hooks (`useState`, `useEffect`)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- CORS
- dotenv

## Project Structure

week-6-full-stack-authentication/
│
├── backend/
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
│
└── README.md

Authentication Flow:
User creates an account using Signup.
The password is securely hashed using bcrypt.
User logs in using email and password.
Backend verifies the credentials.
A JWT token is generated after successful login.
The token is stored in the frontend's localStorage.
The token is sent with protected API requests.
Backend middleware verifies the JWT token.
Authorized users can access task functionality.
Logout removes the stored authentication information.
API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login user
Tasks
Method	Endpoint	Description
GET	/api/tasks	Get all tasks
GET	/api/tasks/:id	Get a single task
POST	/api/tasks	Create a task
PUT	/api/tasks/:id	Update a task
DELETE	/api/tasks/:id	Delete a task

Task routes require a valid JWT token.

Backend Setup

Open the backend folder in the terminal:

cd backend

Install dependencies:

npm install

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start the backend:

npm run dev

The backend runs on:

http://localhost:5000
Frontend Setup

Open another terminal and go to the frontend folder:

cd frontend

Install dependencies:

npm install

Start the frontend:

npm run dev

The frontend runs on:

http://localhost:5173
Security
Passwords are never stored as plain text.
Passwords are hashed using bcrypt.
Protected routes require a valid JWT token.
JWT secrets and MongoDB credentials are stored in .env.
.env should not be uploaded to GitHub.
Testing

The application was tested for:

User signup
User login
JWT token generation
Protected task access
Add task
Delete task
Logout
Unauthorized access without a token

Author
Aqsa Aleem