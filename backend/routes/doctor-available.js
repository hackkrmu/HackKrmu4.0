const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const appointmentController = require('../controllers/doctor-availabilty_controller');

// Appointment Routes
router.get('/availability', authMiddleware, appointmentController.viewAvailability);
router.post('/availability/add', authMiddleware, appointmentController.addAvailability);
router.post('/book-appointment', authMiddleware, appointmentController.bookAppointment);
router.post('/confirm-appointment', authMiddleware, appointmentController.confirmAppointment);
router.post('/withdraw-appointment', authMiddleware, appointmentController.withdrawAppointment);
router.post('/appointments/close', authMiddleware, appointmentController.closeAppointment);
router.post('/availability/update', authMiddleware, appointmentController.updateAvailability);

module.exports = router;
