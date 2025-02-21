const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const healthController = require('../controllers/health_controller');

// Health Form Submission Route
router.post('/api/health', authMiddleware, healthController.submitHealthForm);

// Fetch AI Depth Analysis
router.get('/api/health/depthanalysis', authMiddleware, healthController.getDepthAnalysis);

module.exports = router;
