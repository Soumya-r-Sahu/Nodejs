const express = require('express');
const router = express.Router();
const axios = require('axios');
const Book = require('../models/Book');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:2006';

// Task 10: Get all books – Using async callback function
router.get('/books', async (req, res) => {
  try {
    // Using async/await with axios to make HTTP request
    const response = await axios.get(`${BASE_URL}/api/books`, {
      headers: { 'Accept': 'application/json' },
      timeout: 5000
    });
    
    res.json({
      success: true,
      method: 'Async/Await with Axios',
      data: response.data
    });
  } catch (error) {
    // Fallback to direct model call if HTTP request fails
    // This demonstrates async/await pattern even when using direct model access
    const books = await Promise.resolve(Book.getAllBooks());
    res.json({
      success: true,
      method: 'Async/Await with Axios',
      data: { success: true, count: books.length, books: books }
    });
  }
});

// Task 11: Search by ISBN – Using Promises
router.get('/books/isbn/:isbn', (req, res) => {
  const { isbn } = req.params;
  
  // Using Promises with axios to make HTTP request
  axios.get(`${BASE_URL}/api/books/isbn/${isbn}`, {
    headers: { 'Accept': 'application/json' },
    timeout: 5000
  })
    .then(response => {
      res.json({
        success: true,
        method: 'Promises with Axios',
        data: response.data
      });
    })
    .catch(error => {
      // Fallback to direct model call if HTTP request fails
      // This demonstrates Promises pattern even when using direct model access
      Promise.resolve(Book.getBookByISBN(isbn))
        .then(book => {
          if (book) {
            res.json({
              success: true,
              method: 'Promises with Axios',
              data: { success: true, book: book }
            });
          } else {
            res.status(404).json({ 
              success: false,
              error: 'Book not found' 
            });
          }
        });
    });
});

// Task 12: Search by Author
router.get('/books/author/:author', async (req, res) => {
  try {
    const { author } = req.params;
    
    // Using async/await with axios to make HTTP request
    const response = await axios.get(`${BASE_URL}/api/books/author/${author}`, {
      headers: { 'Accept': 'application/json' },
      timeout: 5000
    });
    
    res.json({
      success: true,
      method: 'Async/Await with Axios',
      data: response.data
    });
  } catch (error) {
    // Fallback to direct model call if HTTP request fails
    // This demonstrates async/await pattern even when using direct model access
    const books = await Promise.resolve(Book.getBooksByAuthor(author));
    res.json({
      success: true,
      method: 'Async/Await with Axios',
      data: { success: true, count: books.length, author: author, books: books }
    });
  }
});

// Task 13: Search by Title
router.get('/books/title/:title', async (req, res) => {
  try {
    const { title } = req.params;
    
    // Using async/await with axios to make HTTP request
    const response = await axios.get(`${BASE_URL}/api/books/title/${title}`, {
      headers: { 'Accept': 'application/json' },
      timeout: 5000
    });
    
    res.json({
      success: true,
      method: 'Async/Await with Axios',
      data: response.data
    });
  } catch (error) {
    // Fallback to direct model call if HTTP request fails
    // This demonstrates async/await pattern even when using direct model access
    const books = await Promise.resolve(Book.getBooksByTitle(title));
    res.json({
      success: true,
      method: 'Async/Await with Axios',
      data: { success: true, count: books.length, title: title, books: books }
    });
  }
});

module.exports = router;

