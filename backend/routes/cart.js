const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { addToCart, getCart, removeFromCart } = require("../controllers/cart_controller");

// Define cart routes
router.post("/cart/add", authMiddleware, addToCart);
router.get("/cart", authMiddleware, getCart);
router.delete("/cart/remove", authMiddleware, removeFromCart);

module.exports = router;
