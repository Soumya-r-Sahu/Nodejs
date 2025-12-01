const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Task 1: Get the book list available in the shop
router.get('/', (req, res) => {
  try {
    const books = Book.getAllBooks();
    res.json({
      success: true,
      count: books.length,
      books: books
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Task 2: Get the books based on ISBN
router.get('/isbn/:isbn', (req, res) => {
  try {
    const { isbn } = req.params;
    const book = Book.getBookByISBN(isbn);
    
    if (!book) {
      return res.status(404).json({ 
        success: false,
        error: 'Book not found' 
      });
    }
    
    res.json({
      success: true,
      book: book
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Task 3: Get all books by Author
router.get('/author/:author', (req, res) => {
  try {
    const { author } = req.params;
    const books = Book.getBooksByAuthor(author);
    
    res.json({
      success: true,
      count: books.length,
      author: author,
      books: books
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Task 4: Get all books based on Title
router.get('/title/:title', (req, res) => {
  try {
    const { title } = req.params;
    const books = Book.getBooksByTitle(title);
    
    res.json({
      success: true,
      count: books.length,
      title: title,
      books: books
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

