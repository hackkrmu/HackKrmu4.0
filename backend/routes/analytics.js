const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getHealthHistory } = require('../controllers/analytics_controller');

// Define route for fetching historical health data
router.get('/api/health/history', authMiddleware, getHealthHistory);

module.exports = router;
