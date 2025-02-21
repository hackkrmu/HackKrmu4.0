const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const healthController = require('../controllers/healthtracker_controller');

// Health Form Submission Route
router.post('/api/health', authMiddleware, healthController.submitHealthForm);

module.exports = router;
