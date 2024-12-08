# Backend API Documentation

## User Registration API

### Endpoint

**`POST /users/register`**

### Description

The `/users/register` endpoint allows new users to create an account by providing their personal information. Upon successful registration, the server responds with a confirmation message and a token for authentication.

### Request Format

The request must be sent as a JSON object in the body of the POST request.

#### Required Fields

- **`fullname`** (object): Contains the user's full name.
  - **`firstname`** (string): The first name of the user (mandatory, at least 3 characters).
  - **`lastname`** (string): The last name of the user (optional, at least 3 characters if provided).
- **`email`** (string): The email address of the user (mandatory, valid email format).
- **`password`** (string): The password for the user account (mandatory, at least 6 characters).

#### Example Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

### Response Format

The response will be in JSON format.

#### Success Response

**Status Code: 201 Created**

```json
{
  "token": "string",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

#### Error Responses

- **Status Code: 400 Bad Request**

```json
{
  "errors": [
    { "msg": "Invalid Email", "param": "email" },
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password"
    }
  ]
}
```

- **Status Code: 409 Conflict**

```json
{
  "error": "User already exists"
}
```

---

## User Login API

### Endpoint

**`POST /users/login`**

### Description

The `/users/login` endpoint allows existing users to authenticate by providing their email and password. Upon successful login, the server responds with a confirmation message and a token for authentication.

### Request Format

The request must be sent as a JSON object in the body of the POST request.

#### Required Fields

- **`email`** (string): The email address of the user (mandatory, valid email format).
- **`password`** (string): The password for the user account (mandatory).

#### Example Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

### Response Format

The response will be in JSON format.

#### Success Response

**Status Code: 200 OK**

```json
{
  "token": "string",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

#### Error Responses

- **Status Code: 400 Bad Request**

```json
{
  "errors": [
    { "msg": "Invalid Email", "param": "email" },
    { "msg": "Password is required", "param": "password" }
  ]
}
```

- **Status Code: 401 Unauthorized**

```json
{
  "error": "Invalid credentials"
}
```

---

## User Profile API

### Endpoint

**`GET /users/profile`**

### Description

The `/users/profile` endpoint allows authenticated users to retrieve their profile information. The request must include a valid authentication token.

### Request Format

This endpoint does not require a request body. The authentication token should be included in the request headers or as a cookie.

#### Example Request

```bash
curl -X GET http://yourapi.com/users/profile \
-H "Authorization: Bearer your_token_here"
```

### Response Format

The response will be in JSON format.

#### Success Response

**Status Code: 200 OK**

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

#### Error Responses

- **Status Code: 401 Unauthorized**

```json
{
  "message": "Unauthorized"
}
```

- **Status Code: 404 Not Found**

```json
{
  "message": "User not found"
}
```

---

## User Logout API

### Endpoint

**`GET /users/logout`**

### Description

The `/users/logout` endpoint allows authenticated users to log out of their account. This action clears the authentication token from the user's cookies and blacklists it to prevent further use.

### Request Format

This endpoint does not require a request body. The authentication token should be included in the request headers or as a cookie.

#### Example Request

```bash
curl -X GET http://yourapi.com/users/logout \
-H "Authorization: Bearer your_token_here"
```

### Response Format

The response will be in JSON format.

#### Success Response

**Status Code: 200 OK**

```json
{
  "message": "Logged out successfully"
}
```

#### Error Responses

- **Status Code: 401 Unauthorized**

```json
{
  "message": "Unauthorized"
}
```
