const express = require('express');
const router = express.Router();
const authController = require('../controllers/forgot-password_controller');

// Forgot Password Route
router.post('/forgot-password', authController.forgotPassword);

// Reset Password Route
router.post('/reset-password', authController.resetPassword);

module.exports = router;
