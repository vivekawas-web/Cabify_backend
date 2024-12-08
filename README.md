Backend API Doc

# User Registration API

## Endpoint

`POST /users/register`

## Description

The `user/register` endpoint allows new users to create an account by providing their personal information. Upon successful registration, the server will respond with a confirmation message and a token for authentication.

## Request Format

The request must be sent as a JSON object in the body of the POST request. The following fields are required:

### Required Fields

- `fullname` (object): An object containing the user's full name.
  - `firstname` (string): The first name of the user. This field is mandatory and must be at least 3 characters long.
  - `lastname` (string): The last name of the user. This field is optional but should be at least 3 characters long if provided.
- `email` (string): The email address of the user. This field is mandatory and must be a valid email format.
- `password` (string): The password for the user account. This field is mandatory and must be at least 6 characters long.

### Example Request Body

````json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "securepassword"
}
Response Format
The response will be in JSON format and will include the status of the registration process.

Success Response
Status Code: 201 Created
Response Body:
json
{
    "token": "string", // The authentication token for the user
    "user": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com"
    }
}
Error Responses
Status Code: 400 Bad Request

Response Body:
json
{
    "errors": [
        {
            "msg": "Invalid Email",
            "param": "email"
        },
        {
            "msg": "First name must be at least 3 characters long",
            "param": "fullname.firstname"
        },
        {
            "msg": "Password must be 6 characters long",
            "param": "password"
        }
    ]
}
This response indicates that the request body is missing required fields or contains invalid data.

Status Code: 409 Conflict

Response Body:
json
{
    "error": "User  already exists"
}
This response indicates that a user with the provided email already exists in the system.

Example Request
bash
Insert Code
Edit
Copy code
curl -X POST http://yourapi.com/users/register \
-H "Content-Type: application/json" \
-d '{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "securepassword"
}'
Example Success Response
json
Insert Code
Edit
Copy code
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com"
    }
}
Example Error Response
json
Insert Code
Edit
Copy code
{
    "errors": [
        {
            "msg": "Invalid Email",
            "param": "email"
        }
    ]
}
Notes
Ensure that the request body is properly formatted as JSON.
All fields are case-sensitive and must be provided as specified.
The email must be unique; if a user with the same email already exists, a conflict error will be returned.


 User Login API:

 # User Login API

## Endpoint

`POST /users/login`

## Description

The `user/login` endpoint allows existing users to authenticate by providing their email and password. Upon successful login, the server will respond with a confirmation message and a token for authentication.

## Request Format

The request must be sent as a JSON object in the body of the POST request. The following fields are required:

### Required Fields

- `email` (string): The email address of the user. This field is mandatory and must be a valid email format.
- `password` (string): The password for the user account. This field is mandatory.

### Example Request Body

```json
{
    "email": "john.doe@example.com",
    "password": "securepassword"
}

Response Format
The response will be in JSON format and will include the status of the login process.

Success Response
Status Code: 200 OK
Response Body:


{
    "token": "string", // The authentication token for the user
    "user": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com"
    }
}

Error Responses
Status Code: 400 Bad Request
Response Body:

{
    "errors": [
        {
            "msg": "Invalid Email",
            "param": "email"
        },
        {
            "msg": "Password is required",
            "param": "password"
        }
    ]
}

This response indicates that the request body is missing required fields or contains invalid data.

Status Code: 401 Unauthorized
Response Body:

{
    "error": "Invalid credentials"
}

his response indicates that the provided email or password is incorrect.

Notes
Ensure that the request body is properly formatted as JSON.
All fields are case-sensitive and must be provided as specified.
The email must correspond to an existing user account in the system.


User Profile API
Endpoint
GET /users/profile

Description
The user/profile endpoint allows authenticated users to retrieve their profile information. The request must include a valid authentication token.

Request Format
This endpoint does not require a request body. The authentication token should be included in the request headers or as a cookie.

Example Request
 curl -X GET http://yourapi.com/users/profile \
-H "Authorization: Bearer your_token_here"

Response Format
The response will be in JSON format and will include the user's profile information.

Success Response
Status Code: 200 OK
Response Body:

{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com"
}

Error Responses
Status Code: 401 Unauthorized
Response Body:


{
    "message": "Unauthorized"
}

This response indicates that the user is not authenticated or the token is invalid.

Status Code: 404 Not Found
Response Body:

{
    "message": "User  not found"
}

This response indicates that the user is not authenticated or the token is invalid.

Status Code: 404 Not Found
Response Body:

{
    "message": "User  not found"
}

This response indicates that the user associated with the token does not exist.


User Logout API
Endpoint
GET /users/logout

Description
The user/logout endpoint allows authenticated users to log out of their account. This action will clear the authentication token from the user's cookies and blacklist it to prevent further use.

Request Format
This endpoint does not require a request body. The authentication token should be included in the request headers or as a cookie.

Example Request

curl -X GET http://yourapi.com/users/logout \
-H "Authorization: Bearer your_token_here"

Response Format
The response will be in JSON format and will confirm the logout action.

Success Response
Status Code: 200 OK
Response Body:

{
    "message": "Logged out successfully"
}

Error Responses
Status Code: 401 Unauthorized
Response Body:

{
    "message": "Unauthorized"
}

This response indicates that the user is not authenticated or the token is invalid.


These documentation entries provide a clear understanding of how to use the /users/profile and /users/logout endpoints, including the request format, expected responses, and error handling.
````
