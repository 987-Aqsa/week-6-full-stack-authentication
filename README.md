# Secure Full-Stack Task Manager

A secure full-stack task management application built using the MERN stack. The application allows users to create an account, log in securely, and manage their personal tasks.

## Problem / Project Idea

Managing daily tasks can become difficult when tasks are scattered across different places. This project provides a centralized task management system where users can securely create, view, update, complete, and delete their personal tasks.

## Features

- User registration and signup
- Secure user login
- Logout functionality
- Password hashing using bcrypt
- JWT-based authentication
- Protected task routes
- User-specific task management
- Create new tasks
- View tasks
- Edit tasks
- Partially update tasks
- Mark tasks as completed
- Delete tasks
- MongoDB persistent data storage
- REST API
- Loading and error handling
- Responsive user interface
- Frontend and backend deployment

## Technologies Used

### Frontend

- React
- Vite
- JavaScript
- HTML
- CSS
- React Hooks
- Fetch API

### Backend

- Node.js
- Express.js
- REST API
- JWT
- bcrypt
- CORS
- dotenv

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

### Deployment and Tools

- Vercel
- GitHub
- Postman

## Live Application

### Frontend

https://week-6-full-stack-authentication-ak.vercel.app/

### Backend API

https://week-6-full-stack-authentication-12zid5sa5-987-aqsas-projects.vercel.app/

### GitHub Repository

https://github.com/987-Aqsa/week-6-full-stack-authentication

## Project Structure
week-6-full-stack-authentication/
│
├── backend/
│   ├── api/
│   │   └── index.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   └── auth.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── server.js
│   └── vercel.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── ...
│   ├── .env.local
│   ├── .gitignore
│   └── package.json
│
└── README.md

## Local Setup

### Step 1: Clone the Repository

git clone https://github.com/987-Aqsa/week-6-full-stack-authentication.git

### Step 2: Open the Project


cd week-6-full-stack-authentication

### Step 3: Setup the Backend

Open the backend folder:

cd backend

Install the required packages:

npm install

Create a `.env` file inside the `backend` folder.

Add the following environment variables:


PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start the backend:

npm run dev

The backend will run on:

http://localhost:5000

### Step 4: Setup the Frontend

Open another terminal and go to the frontend folder:

cd frontend

Install the required packages:

npm install

Create a `.env.local` file inside the `frontend` folder.

Add:

VITE_API_URL=http://localhost:5000

Start the frontend:
npm run dev

The frontend will run on:
http://localhost:5173

## Environment Variables

### Backend Environment Variables

The backend requires the following environment variables:

* `PORT` - The local server port
* `MONGO_URI` - MongoDB Atlas connection string
* `JWT_SECRET` - Secret key used to generate and verify JWT tokens

### Frontend Environment Variables

The frontend requires:

* `VITE_API_URL` - URL of the backend API

Sensitive information is stored in environment files and is not committed to GitHub.

## Authentication

The application uses JWT authentication to protect user data and task routes.

### User Registration

Users can create an account by providing:

* Name
* Email
* Password

Passwords are hashed using bcrypt before being stored in the database.

### User Login

Users can log in using their email and password.

After successful login, the backend generates a JWT token. The frontend uses this token to access protected task routes.

### Protected Routes

Task routes require a valid JWT token.

The authentication middleware verifies the token before allowing users to access their tasks.

### Logout

When the user logs out, the authentication information is removed from the frontend and the user is returned to the login screen.

## REST API

### Authentication Endpoints

`POST /api/auth/register`

Registers a new user.

`POST /api/auth/login`

Logs in an existing user and returns a JWT token.

### Task Endpoints

`GET /api/tasks`

Returns all tasks belonging to the logged-in user.

`GET /api/tasks/:id`

Returns a specific task belonging to the logged-in user.

`POST /api/tasks`

Creates a new task for the logged-in user.

`PUT /api/tasks/:id`

Updates the complete information of an existing task.

`PATCH /api/tasks/:id`

Partially updates an existing task.

`DELETE /api/tasks/:id`

Deletes an existing task.

All task endpoints are protected and require authentication.

## Database

MongoDB Atlas is used for persistent data storage.

Mongoose is used to create and manage MongoDB schemas and models.

### User Model

The User model contains:

* Name
* Email
* Hashed password
* Created and updated timestamps

### Task Model

The Task model contains:

* Title
* Description
* Completed status
* User reference
* Created and updated timestamps

Each task is linked to the user who created it.

## Validation and Error Handling

The backend validates user input and handles common errors.

The application handles:

* Missing required fields
* Invalid login credentials
* Duplicate users
* Unauthorized requests
* Invalid JWT tokens
* Expired JWT tokens
* Invalid task IDs
* Tasks that do not exist
* Database errors
* API request errors

The frontend displays loading states and error messages when requests fail.

## Responsive Design

The frontend is designed to work on different screen sizes, including desktop and mobile devices.

Responsive CSS is used to improve the layout and usability on smaller screens.

## Deployment

The application is deployed using Vercel.

### Frontend Deployment

The React frontend is deployed on Vercel and is available at:

[https://week-6-full-stack-authentication-ak.vercel.app/](https://week-6-full-stack-authentication-ak.vercel.app/)

### Backend Deployment

The Node.js and Express backend is deployed on Vercel and is available at:

[https://week-6-full-stack-authentication-12zid5sa5-987-aqsas-projects.vercel.app/](https://week-6-full-stack-authentication-12zid5sa5-987-aqsas-projects.vercel.app/)

### Database Deployment

MongoDB Atlas is used as the production database.

The deployed frontend communicates with the deployed backend using the `VITE_API_URL` environment variable.

## Security

The application follows basic security practices:

* Passwords are never stored as plain text.
* Passwords are hashed using bcrypt.
* JWT is used for authentication.
* Protected routes verify JWT tokens.
* Database credentials are stored in environment variables.
* JWT secrets are stored in environment variables.
* `.env` files are excluded from GitHub using `.gitignore`.
* Sensitive credentials and secrets are not committed to the repository.

## Testing

The application was tested both locally and after deployment.

The following functionality was tested successfully:

* User registration
* User login
* Invalid login handling
* JWT authentication
* Protected API routes
* Create task
* View tasks
* Edit task
* Partial task update
* Mark task as completed
* Delete task
* User-specific task access
* Logout
* Login again
* Task persistence after login
* MongoDB Atlas connection
* Production frontend and backend communication
* Responsive frontend layout
* Production deployment

## Conclusion

The Secure Full-Stack Task Manager is a complete MERN full-stack application that demonstrates user authentication, protected REST APIs, MongoDB database integration, CRUD operations, responsive React design, error handling, and production deployment.

The project provides a secure and centralized way for users to manage their daily tasks.
