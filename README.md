# Express Starter Kit

A comprehensive Node.js and Express application that provides user authentication functionalities including registration, login, password reset, and email notifications. This starter kit is integrated with MongoDB for data storage and uses JSON Web Tokens (JWT) for authentication.

## Features

- User Registration and Login
- Password Reset (Forgot Password and Reset Password)
- Email Notifications via Nodemailer
- Protected Routes with JWT Authentication
- MongoDB Integration

## Prerequisites

1. **Node.js**: Ensure you have Node.js (version 14 or higher) installed on your system.
2. **MongoDB**: A running instance of MongoDB. You can use a local installation or a cloud-based service like MongoDB Atlas.

## Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/yourusername/express_starter_kit.git
   cd express_starter_kit
    ```

2. **Install the dependencies**:
  npm install

3. **Set up environment variables**:
  Create a .env file in the root directory and add the following environment variables:

  ```
  NODE_ENV=development
  PORT=5000
  MONGO_URI=mongodb://localhost:27017/yourdbname
  
  JWT_SECRET=your_jwt_secret_key
  JWT_EXPIRE=30d
  JWT_COOKIE_EXPIRE=30
  
  SMTP_HOST=smtp.mailtrap.io
  SMTP_PORT=2525
  SMTP_EMAIL=your_smtp_username
  SMTP_PASSWORD=your_smtp_password
  FROM_EMAIL=noreply@yourdomain.com
  FROM_NAME=YourAppName
  ```
  Replace the placeholders with your actual configuration values.

4. **Run the application**:
  For development (with auto-reloading):
  npm run dev

  For production:
  npm start


# Usage Example
**Endpoints**:
```
  Register User: POST /api/v1/auth/register
  Body: { "name": "User Name", "email": "user@example.com", "password": "password" }
  Login User: POST /api/v1/auth/login
  Body: { "email": "user@example.com", "password": "password" }
  Get User Profile: GET /api/v1/auth/me (Protected route)
  Update User Details: PUT /api/v1/auth/updatedetails (Protected route)
  Body: { "name": "New Name", "email": "newemail@example.com" }
  Update Password: PUT /api/v1/auth/updatepassword (Protected route)
  Body: { "currentPassword": "currentpassword", "newPassword": "newpassword" }
  Forgot Password: POST /api/v1/auth/forgotpassword
  Body: { "email": "user@example.com" }
  Reset Password: PUT /api/v1/auth/resetpassword/:resettoken
  Body: { "password": "newpassword" }
```

# Seeding Database
  To seed the database with initial data, use:
  ```
  node seeder.js -i
  ```

  To delete all data:
  ```
  node seeder.js -d
  ```

# Middleware
  Error Handling: Centralized error handling middleware to manage application errors.
  Advanced Results: Middleware to handle advanced query parameters for pagination, filtering, and sorting.


