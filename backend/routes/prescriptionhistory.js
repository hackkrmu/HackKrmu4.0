const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionhistory_controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/add-prescription', authMiddleware, prescriptionController.addPrescription);
router.get('/prescription', authMiddleware, prescriptionController.getPrescriptions);

module.exports = router;
