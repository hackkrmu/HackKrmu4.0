const express = require('express');
const router = express.Router();
const authController = require('../controllers/doctorreg_controller');

// User Registration
router.post('/register', authController.registerUser);

// Account Confirmation
router.get('/register/confirm/:token', authController.confirmAccount);
router.get('/get-doctors', authController.getDoctor)
module.exports = router;
