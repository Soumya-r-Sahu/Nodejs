/**
 * Test script for Bookshop API
 * Run this after starting the server to test all endpoints
 * Usage: node test-api.js
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:2006';
let authToken = '';

// Helper function to make requests
async function testEndpoint(name, method, url, data = null, headers = {}) {
  try {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Testing: ${name}`);
    console.log(`${method.toUpperCase()} ${url}`);
    
    const config = {
      method,
      url: `${BASE_URL}${url}`,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };
    
    if (data) {
      config.data = data;
    }
    
    const response = await axios(config);
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.log('Status:', error.response?.status || 'Error');
    console.log('Error:', error.response?.data || error.message);
    return null;
  }
}

async function runTests() {
  console.log('Starting API Tests...\n');
  
  // Task 1: Get all books
  await testEndpoint('Task 1: Get all books', 'get', '/api/books');
  
  // Task 2: Get book by ISBN
  await testEndpoint('Task 2: Get book by ISBN', 'get', '/api/books/isbn/978-0-123456-78-9');
  
  // Task 3: Get books by Author
  await testEndpoint('Task 3: Get books by Author', 'get', '/api/books/author/George%20Orwell');
  
  // Task 4: Get books by Title
  await testEndpoint('Task 4: Get books by Title', 'get', '/api/books/title/1984');
  
  // Task 5: Get book reviews
  await testEndpoint('Task 5: Get book reviews', 'get', '/api/reviews/isbn/978-0-123456-78-9');
  
  // Task 6: Register user
  const registerResponse = await testEndpoint(
    'Task 6: Register user',
    'post',
    '/api/auth/register',
    {
      username: 'testuser',
      password: 'password123',
      fullName: 'Test User',
      email: 'test@example.com'
    }
  );
  
  if (registerResponse && registerResponse.token) {
    authToken = registerResponse.token;
    console.log('\n✓ Token received:', authToken.substring(0, 20) + '...');
  }
  
  // Task 7: Login
  const loginResponse = await testEndpoint(
    'Task 7: Login',
    'post',
    '/api/auth/login',
    {
      username: 'testuser',
      password: 'password123'
    }
  );
  
  if (loginResponse && loginResponse.token) {
    authToken = loginResponse.token;
    console.log('\n✓ Token received:', authToken.substring(0, 20) + '...');
  }
  
  // Task 8: Add/Modify review (requires authentication)
  if (authToken) {
    await testEndpoint(
      'Task 8: Add/Modify review',
      'post',
      '/api/reviews',
      {
        isbn: '978-0-123456-78-9',
        review: 'This is a great book! Highly recommended.',
        rating: 5
      },
      { Authorization: `Bearer ${authToken}` }
    );
    
    // Get reviews to find the review ID
    const reviewsResponse = await testEndpoint(
      'Get reviews to find ID',
      'get',
      '/api/reviews/isbn/978-0-123456-78-9'
    );
    
    // Task 9: Delete review (requires authentication)
    if (reviewsResponse && reviewsResponse.reviews && reviewsResponse.reviews.length > 0) {
      const reviewId = reviewsResponse.reviews[0].id;
      await testEndpoint(
        'Task 9: Delete review',
        'delete',
        `/api/reviews/${reviewId}`,
        null,
        { Authorization: `Bearer ${authToken}` }
      );
    }
  }
  
  // Task 10: Get all books (Node.js method)
  await testEndpoint('Task 10: Get all books (Node.js method)', 'get', '/api/nodejs/books');
  
  // Task 11: Search by ISBN (Node.js method)
  await testEndpoint('Task 11: Search by ISBN (Node.js method)', 'get', '/api/nodejs/books/isbn/978-0-123456-78-9');
  
  // Task 12: Search by Author (Node.js method)
  await testEndpoint('Task 12: Search by Author (Node.js method)', 'get', '/api/nodejs/books/author/George%20Orwell');
  
  // Task 13: Search by Title (Node.js method)
  await testEndpoint('Task 13: Search by Title (Node.js method)', 'get', '/api/nodejs/books/title/1984');
  
  console.log('\n' + '='.repeat(60));
  console.log('All tests completed!');
  console.log('='.repeat(60) + '\n');
}

// Run tests
runTests().catch(console.error);

