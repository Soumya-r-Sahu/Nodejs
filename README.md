# Bookshop API - Node.js Project

This is a RESTful API for a bookshop application built with Node.js and Express. The project implements all required tasks for the Coursera Node.js course.

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The server will run on `http://localhost:2006`

## API Endpoints

### General Users (Tasks 1-7)

#### Task 1: Get the book list available in the shop
- **GET** `/api/books`
- **Response**: Returns all books in the shop

#### Task 2: Get the books based on ISBN
- **GET** `/api/books/isbn/:isbn`
- **Example**: `/api/books/isbn/978-0-123456-78-9`
- **Response**: Returns book with matching ISBN

#### Task 3: Get all books by Author
- **GET** `/api/books/author/:author`
- **Example**: `/api/books/author/George%20Orwell`
- **Response**: Returns all books by the specified author

#### Task 4: Get all books based on Title
- **GET** `/api/books/title/:title`
- **Example**: `/api/books/title/1984`
- **Response**: Returns all books matching the title

#### Task 5: Get book Review
- **GET** `/api/reviews/isbn/:isbn`
- **Example**: `/api/reviews/isbn/978-0-123456-78-9`
- **Response**: Returns all reviews for the book with the specified ISBN

#### Task 6: Register New user
- **POST** `/api/auth/register`
- **Body**:
```json
{
  "username": "john_doe",
  "password": "password123",
  "fullName": "John Doe",
  "email": "john@example.com"
}
```
- **Response**: Returns user data and JWT token

#### Task 7: Login as a Registered user
- **POST** `/api/auth/login`
- **Body**:
```json
{
  "username": "john_doe",
  "password": "password123"
}
```
- **Response**: Returns user data and JWT token

### Registered Users (Tasks 8-9)

**Note**: These endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-token>
```

#### Task 8: Add/Modify a book review
- **POST** `/api/reviews`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
```json
{
  "isbn": "978-0-123456-78-9",
  "review": "Great book! Highly recommended.",
  "rating": 5
}
```
- **Response**: Returns the created/updated review

#### Task 9: Delete book review added by that particular user
- **DELETE** `/api/reviews/:reviewId`
- **Headers**: `Authorization: Bearer <token>`
- **Example**: `/api/reviews/1`
- **Response**: Returns the deleted review

### Node.js Methods (Tasks 10-13)

These endpoints demonstrate the use of Async/Await and Promises with Axios.

#### Task 10: Get all books – Using async callback function
- **GET** `/api/nodejs/books`
- **Method**: Async/Await with Axios
- **Response**: Returns all books

#### Task 11: Search by ISBN – Using Promises
- **GET** `/api/nodejs/books/isbn/:isbn`
- **Method**: Promises with Axios
- **Example**: `/api/nodejs/books/isbn/978-0-123456-78-9`
- **Response**: Returns book with matching ISBN

#### Task 12: Search by Author
- **GET** `/api/nodejs/books/author/:author`
- **Method**: Async/Await with Axios
- **Example**: `/api/nodejs/books/author/George%20Orwell`
- **Response**: Returns books by the specified author

#### Task 13: Search by Title
- **GET** `/api/nodejs/books/title/:title`
- **Method**: Async/Await with Axios
- **Example**: `/api/nodejs/books/title/1984`
- **Response**: Returns books matching the title

## Testing the API

### Using cURL

#### Task 1: Get all books
```bash
curl http://localhost:2006/api/books
```

#### Task 2: Get book by ISBN
```bash
curl http://localhost:2006/api/books/isbn/978-0-123456-78-9
```

#### Task 3: Get books by Author
```bash
curl http://localhost:2006/api/books/author/George%20Orwell
```

#### Task 4: Get books by Title
```bash
curl http://localhost:2006/api/books/title/1984
```

#### Task 5: Get book reviews
```bash
curl http://localhost:2006/api/reviews/isbn/978-0-123456-78-9
```

#### Task 6: Register user
```bash
curl -X POST http://localhost:2006/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123",
    "fullName": "Test User",
    "email": "test@example.com"
  }'
```

#### Task 7: Login
```bash
curl -X POST http://localhost:2006/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

#### Task 8: Add/Modify review (replace TOKEN with actual token)
```bash
curl -X POST http://localhost:2006/api/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "isbn": "978-0-123456-78-9",
    "review": "Excellent book!",
    "rating": 5
  }'
```

#### Task 9: Delete review (replace TOKEN and REVIEW_ID)
```bash
curl -X DELETE http://localhost:2006/api/reviews/1 \
  -H "Authorization: Bearer TOKEN"
```

#### Task 10: Get all books (Node.js method)
```bash
curl http://localhost:2006/api/nodejs/books
```

#### Task 11: Search by ISBN (Node.js method)
```bash
curl http://localhost:2006/api/nodejs/books/isbn/978-0-123456-78-9
```

#### Task 12: Search by Author (Node.js method)
```bash
curl http://localhost:2006/api/nodejs/books/author/George%20Orwell
```

#### Task 13: Search by Title (Node.js method)
```bash
curl http://localhost:2006/api/nodejs/books/title/1984
```

## Project Structure

```
Nodejs/
├── data/
│   ├── books.json          # Book data
│   ├── users.json          # User data
│   └── reviews.json        # Review data
├── middleware/
│   └── auth.js             # Authentication middleware
├── models/
│   ├── Book.js             # Book model
│   ├── User.js             # User model
│   └── Review.js           # Review model
├── routes/
│   ├── auth.js             # Authentication routes
│   ├── books.js            # Book routes (Tasks 1-4)
│   ├── reviews.js          # Review routes (Tasks 5, 8-9)
│   └── nodejsMethods.js    # Node.js methods (Tasks 10-13)
├── server.js               # Main server file
├── package.json            # Dependencies
└── README.md               # This file
```

## Technologies Used

- **Node.js**: Runtime environment
- **Express**: Web framework
- **Axios**: HTTP client for async operations
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **body-parser**: Request body parsing

## Notes

- All data is stored in JSON files (books.json, users.json, reviews.json)
- Passwords are hashed using bcryptjs
- JWT tokens are used for authentication
- The Node.js methods (Tasks 10-13) use Axios to call the internal API endpoints
- Task 10 uses async/await
- Task 11 uses Promises
- Tasks 12-13 use async/await

## Screenshots for Peer Review

For each task, please take screenshots showing:
1. The API request (using Postman, cURL, or browser)
2. The response received
3. The status code

Make sure to include screenshots for all 14 tasks when submitting for peer review.

