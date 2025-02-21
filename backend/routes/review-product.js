const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { addReview, getReviews, getAverageRating } = require('../controllers/reviewproducts_controller');

// Add a new review for a product
router.post('/add-review', authMiddleware, addReview);

// Fetch all reviews for a product
router.get('/reviews/:productId', getReviews);

// Fetch average rating for a product
router.get('/average-rating/:productId', getAverageRating);

module.exports = router;
