const fs = require('fs');
const path = require('path');

const reviewsFilePath = path.join(__dirname, '../data/reviews.json');

class Review {
  static getAllReviews() {
    try {
      const data = fs.readFileSync(reviewsFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  static saveReviews(reviews) {
    fs.writeFileSync(reviewsFilePath, JSON.stringify(reviews, null, 2));
  }

  static getReviewsByISBN(isbn) {
    const reviews = this.getAllReviews();
    return reviews.filter(review => review.isbn === isbn);
  }

  static addOrModifyReview(userId, isbn, review, rating) {
    const reviews = this.getAllReviews();
    
    // Check if review already exists for this user and ISBN
    const existingReviewIndex = reviews.findIndex(
      r => r.userId === userId && r.isbn === isbn
    );

    const reviewData = {
      id: existingReviewIndex >= 0 ? reviews[existingReviewIndex].id : reviews.length + 1,
      userId,
      isbn,
      review,
      rating: parseInt(rating),
      createdAt: existingReviewIndex >= 0 
        ? reviews[existingReviewIndex].createdAt 
        : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (existingReviewIndex >= 0) {
      reviews[existingReviewIndex] = reviewData;
    } else {
      reviews.push(reviewData);
    }

    this.saveReviews(reviews);
    return reviewData;
  }

  static deleteReview(userId, reviewId) {
    const reviews = this.getAllReviews();
    const reviewIndex = reviews.findIndex(
      r => r.id === parseInt(reviewId) && r.userId === userId
    );

    if (reviewIndex === -1) {
      throw new Error('Review not found or you do not have permission to delete it');
    }

    const deletedReview = reviews.splice(reviewIndex, 1)[0];
    this.saveReviews(reviews);
    return deletedReview;
  }

  static getReviewById(reviewId) {
    const reviews = this.getAllReviews();
    return reviews.find(r => r.id === parseInt(reviewId));
  }
}

module.exports = Review;

