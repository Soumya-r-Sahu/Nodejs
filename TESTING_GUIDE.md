# Testing Guide for Peer Review

This guide will help you test all 14 tasks and take screenshots for peer review.

## Prerequisites

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The server should be running on `http://localhost:2006`

## Quick Test Script

Run the automated test script:
```bash
node test-api.js
```

This will test all endpoints automatically.

## Manual Testing with cURL

### Task 1: Get the book list (2 Points)
```bash
curl http://localhost:2006/api/books
```
**Screenshot**: Show the response with all books

### Task 2: Get books based on ISBN (2 Points)
```bash
curl http://localhost:2006/api/books/isbn/978-0-123456-78-9
```
**Screenshot**: Show the response with the book details

### Task 3: Get all books by Author (2 Points)
```bash
curl http://localhost:2006/api/books/author/George%20Orwell
```
**Screenshot**: Show the response with books by George Orwell

### Task 4: Get all books based on Title (2 Points)
```bash
curl http://localhost:2006/api/books/title/1984
```
**Screenshot**: Show the response with books matching "1984"

### Task 5: Get book Review (2 Points)
```bash
curl http://localhost:2006/api/reviews/isbn/978-0-123456-78-9
```
**Screenshot**: Show the response (may be empty if no reviews exist yet)

### Task 6: Register New user (3 Points)
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
**Screenshot**: Show the response with user data and token

### Task 7: Login as a Registered user (3 Points)
```bash
curl -X POST http://localhost:2006/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```
**Screenshot**: Show the response with user data and token. **Save the token for Tasks 8-9!**

### Task 8: Add/Modify a book review (2 Points)
**Replace TOKEN with the token from Task 7**
```bash
curl -X POST http://localhost:2006/api/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "isbn": "978-0-123456-78-9",
    "review": "This is an excellent book!",
    "rating": 5
  }'
```
**Screenshot**: Show the request with Authorization header and the response

### Task 9: Delete book review (2 Points)
**Replace TOKEN with the token from Task 7 and REVIEW_ID with the ID from Task 8**
```bash
curl -X DELETE http://localhost:2006/api/reviews/1 \
  -H "Authorization: Bearer TOKEN"
```
**Screenshot**: Show the request with Authorization header and the response

### Task 10: Get all books – Using async callback function (2 Points)
```bash
curl http://localhost:2006/api/nodejs/books
```
**Screenshot**: Show the response. Note that it uses "Async/Await with Axios"

### Task 11: Search by ISBN – Using Promises (2 Points)
```bash
curl http://localhost:2006/api/nodejs/books/isbn/978-0-123456-78-9
```
**Screenshot**: Show the response. Note that it uses "Promises with Axios"

### Task 12: Search by Author (2 Points)
```bash
curl http://localhost:2006/api/nodejs/books/author/George%20Orwell
```
**Screenshot**: Show the response. Note that it uses "Async/Await with Axios"

### Task 13: Search by Title (2 Points)
```bash
curl http://localhost:2006/api/nodejs/books/title/1984
```
**Screenshot**: Show the response. Note that it uses "Async/Await with Axios"

## Testing with Postman

1. Import the following collection or create requests manually:

### General Endpoints (No Auth Required)
- GET `/api/books` - Task 1
- GET `/api/books/isbn/:isbn` - Task 2
- GET `/api/books/author/:author` - Task 3
- GET `/api/books/title/:title` - Task 4
- GET `/api/reviews/isbn/:isbn` - Task 5
- POST `/api/auth/register` - Task 6
- POST `/api/auth/login` - Task 7

### Authenticated Endpoints (Require Bearer Token)
- POST `/api/reviews` - Task 8 (Body: isbn, review, rating)
- DELETE `/api/reviews/:reviewId` - Task 9

### Node.js Methods
- GET `/api/nodejs/books` - Task 10
- GET `/api/nodejs/books/isbn/:isbn` - Task 11
- GET `/api/nodejs/books/author/:author` - Task 12
- GET `/api/nodejs/books/title/:title` - Task 13

## Screenshot Checklist

For each task, capture:
- [ ] The request (URL, method, headers, body if applicable)
- [ ] The response (status code, response body)
- [ ] For Tasks 8-9: Show the Authorization header
- [ ] For Tasks 10-13: Show that the method type is displayed (Async/Await or Promises)

## Important Notes

1. **Tasks 8-9 require authentication**: You must first complete Task 6 or 7 to get a token
2. **Task 9 requires a review ID**: Complete Task 8 first to create a review, then use its ID
3. **Tasks 10-13 demonstrate different async patterns**: 
   - Task 10: Async/Await
   - Task 11: Promises
   - Tasks 12-13: Async/Await
4. **All Node.js methods (10-13) use Axios** to make HTTP requests to the internal API

## Verification

After testing, verify:
- ✅ All 14 tasks return successful responses
- ✅ Authentication works for Tasks 8-9
- ✅ Task 10 shows "Async/Await with Axios"
- ✅ Task 11 shows "Promises with Axios"
- ✅ Tasks 12-13 show "Async/Await with Axios"
- ✅ All endpoints return proper JSON responses
- ✅ Error handling works (try invalid ISBN, wrong credentials, etc.)

