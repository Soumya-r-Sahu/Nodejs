const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { authenticateToken } = require('../middleware/auth');

// Task 5: Get book Review
router.get('/isbn/:isbn', (req, res) => {
  try {
    const { isbn } = req.params;
    const reviews = Review.getReviewsByISBN(isbn);
    
    res.json({
      success: true,
      isbn: isbn,
      count: reviews.length,
      reviews: reviews
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Task 8: Add/Modify a book review (Registered Users only)
router.post('/', authenticateToken, (req, res) => {
  try {
    const { isbn, review, rating } = req.body;
    const userId = req.user.id;

    if (!isbn || !review || !rating) {
      return res.status(400).json({ 
        success: false,
        error: 'ISBN, review, and rating are required' 
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ 
        success: false,
        error: 'Rating must be between 1 and 5' 
      });
    }

    const reviewData = Review.addOrModifyReview(userId, isbn, review, rating);

    res.json({
      success: true,
      message: 'Review added/modified successfully',
      review: reviewData
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Task 9: Delete book review added by that particular user (Registered Users only)
router.delete('/:reviewId', authenticateToken, (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const deletedReview = Review.deleteReview(userId, reviewId);

    res.json({
      success: true,
      message: 'Review deleted successfully',
      review: deletedReview
    });
  } catch (error) {
    res.status(404).json({ 
      success: false,
      error: error.message 
    });
  }
});

module.exports = router;

