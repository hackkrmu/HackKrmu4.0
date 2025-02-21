const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orders_controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/place-order', authMiddleware, orderController.placeOrder);
router.get('/orders', authMiddleware, orderController.getOrders);
router.delete('/cancel-order/:orderId', authMiddleware, orderController.cancelOrder);

module.exports = router;
