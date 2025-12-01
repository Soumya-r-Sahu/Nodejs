const express = require('express');
const router = express.Router();
const axios = require('axios');

const BASE_URL = process.env.BASE_URL || 'http://localhost:2006';

// Task 10: Get all books – Using async callback function
router.get('/books', async (req, res) => {
  try {
    // Using async/await with axios
    const response = await axios.get(`${BASE_URL}/api/books`);
    
    res.json({
      success: true,
      method: 'Async/Await with Axios',
      data: response.data
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Task 11: Search by ISBN – Using Promises
router.get('/books/isbn/:isbn', (req, res) => {
  const { isbn } = req.params;
  
  // Using Promises with axios
  axios.get(`${BASE_URL}/api/books/isbn/${isbn}`)
    .then(response => {
      res.json({
        success: true,
        method: 'Promises with Axios',
        data: response.data
      });
    })
    .catch(error => {
      res.status(error.response?.status || 500).json({ 
        success: false,
        error: error.response?.data?.error || error.message 
      });
    });
});

// Task 12: Search by Author
router.get('/books/author/:author', async (req, res) => {
  try {
    const { author } = req.params;
    
    // Using async/await with axios
    const response = await axios.get(`${BASE_URL}/api/books/author/${author}`);
    
    res.json({
      success: true,
      method: 'Async/Await with Axios',
      data: response.data
    });
  } catch (error) {
    res.status(error.response?.status || 500).json({ 
      success: false,
      error: error.response?.data?.error || error.message 
    });
  }
});

// Task 13: Search by Title
router.get('/books/title/:title', async (req, res) => {
  try {
    const { title } = req.params;
    
    // Using async/await with axios
    const response = await axios.get(`${BASE_URL}/api/books/title/${title}`);
    
    res.json({
      success: true,
      method: 'Async/Await with Axios',
      data: response.data
    });
  } catch (error) {
    res.status(error.response?.status || 500).json({ 
      success: false,
      error: error.response?.data?.error || error.message 
    });
  }
});

module.exports = router;

