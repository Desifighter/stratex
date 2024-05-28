# Stratex Backend Assignment

## Overview

This project is a REST backend using Node.js, Express.js, MySQL (or PostgreSQL), and Sequelize ORM. It supports user (buyer) and seller functionalities. Sellers can manage books via CSV upload, while users can view books. Authentication and authorization are implemented to ensure proper access control.

## Prerequisites

- Node.js
- MySQL
- Postman (for testing API endpoints)

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/Desifighter/stratex.git
   cd stratex
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   PORT=8080
   END_POINT=your-database-endpoint
   USER_NAME=your-database-username
   PASSWORD=your-database-password
   DB=your-database-name
   JWT_SECRET=your-jwt-secret
   ```

4. Run the application:

   ```bash
   npm start
   ```

## API Documentation

### Authentication

#### Register a User

- **Endpoint:** `POST /api/v1/auth/register`
- **Body:**

  ```json
  {
      "name": "keshav keshari",
      "email": "keshavhero@gmail.com",
      "password": "123456",
      "role": "1" //or "2" (1 for buyer and 2 for seller)
  }
  ```

#### Login a User

- **Endpoint:** `POST /api/v1/auth/login`
- **Body:**

  ```json
  {
    "email": "thekeshav@gmail.com",
    "password": "123456"
  }
  ```

### Seller Operations

#### Upload Books via CSV

- **Endpoint:** `POST /api/v1/seller/upload-csv`
- **Headers:**

  - `Authorization: Bearer <JWT_TOKEN>`

- **Body (form-data):**

  - `csvfile: <path-to-your-csv-file>`

#### View All Seller's Books

- **Endpoint:** `GET /api/v1/seller/allbooks`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`

#### Update a Book

- **Endpoint:** `PUT /api/v1/seller/updatebook/:id`
- **Headers:**

  - `Authorization: Bearer <JWT_TOKEN>`

- **Body:**

  ```json
  {
    "price": "23.11"
  }
  ```

#### Delete a Book

- **Endpoint:** `DELETE /api/v1/seller/deletebook/:id`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`

### User Operations

#### View All Books

- **Endpoint:** `GET /api/v1/user/allbooks`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`

#### View a Specific Book

- **Endpoint:** `GET /api/v1/user/book/:id`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`

## Additional Notes

- Ensure you replace `<JWT_TOKEN>` with the actual token received upon successful login.
- The `:id` in the endpoint URLs should be replaced with the actual ID of the book you want to view, update, or delete.

## Submission

- Provide the source code in a GitHub repository.
- Attach a demo video link showing and explaining the code, functionality, and executing API requests in Postman.
- Include this README file with setup instructions.

## Package.json

Here are the dependencies used in this project:

```json
{
  "name": "stratex",
  "version": "1.0.0",
  "description": "Stratex Backend Assignment",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js",
    "server": "nodemon server.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "csv-parser": "^3.0.0",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1",
    "mysql2": "^3.9.8",
    "sequelize": "^6.37.3",
    "slugify": "^1.6.6"
  }
}
```
