const express = require('express');
const bodyParser = require('body-parser');
const booksRouter = require('./routes/books');
const authRouter = require('./routes/auth');
const reviewsRouter = require('./routes/reviews');
const nodejsMethods = require('./routes/nodejsMethods');

const app = express();
const PORT = process.env.PORT || 2006;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/books', booksRouter);
app.use('/api/auth', authRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/nodejs', nodejsMethods);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Bookshop API',
    endpoints: {
      books: '/api/books',
      auth: '/api/auth',
      reviews: '/api/reviews',
      nodejsMethods: '/api/nodejs'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access the API at http://localhost:${PORT}`);
});

module.exports = app;

