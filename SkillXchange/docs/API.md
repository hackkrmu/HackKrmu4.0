# FILE: /SkillXchange/SkillXchange/docs/API.md

# SkillXchange API Documentation

## Overview
The SkillXchange API allows users to interact with the backend services of the SkillXchange application. This documentation provides details about the available endpoints, request parameters, and response formats.

## Base URL
The base URL for all API endpoints is:
```
http://localhost:5000/api
```

## Endpoints

### User Registration
- **Endpoint:** `/register`
- **Method:** `POST`
- **Description:** Registers a new user in the system.
- **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  - **201 Created**
    ```json
    {
      "message": "User registered successfully."
    }
    ```
  - **400 Bad Request**
    ```json
    {
      "error": "Username or email already exists."
    }
    ```

### User Login
- **Endpoint:** `/login`
- **Method:** `POST`
- **Description:** Authenticates a user and returns a token.
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  - **200 OK**
    ```json
    {
      "token": "string"
    }
    ```
  - **401 Unauthorized**
    ```json
    {
      "error": "Invalid credentials."
    }
    ```

### Get User Profile
- **Endpoint:** `/profile`
- **Method:** `GET`
- **Description:** Retrieves the profile information of the authenticated user.
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:**
  - **200 OK**
    ```json
    {
      "username": "string",
      "email": "string",
      "skills": ["string"]
    }
    ```
  - **401 Unauthorized**
    ```json
    {
      "error": "Token is missing or invalid."
    }
    ```

### Update User Profile
- **Endpoint:** `/profile`
- **Method:** `PUT`
- **Description:** Updates the profile information of the authenticated user.
- **Headers:**
  - `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "username": "string",
    "skills": ["string"]
  }
  ```
- **Response:**
  - **200 OK**
    ```json
    {
      "message": "Profile updated successfully."
    }
    ```
  - **400 Bad Request**
    ```json
    {
      "error": "Invalid data."
    }
    ```

## Error Handling
All error responses will include an `error` field with a description of the issue.

## Conclusion
This API documentation provides a basic overview of the endpoints available in the SkillXchange application. For further details, please refer to the source code or contact the development team.