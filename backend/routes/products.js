const express = require("express");
const router = express.Router();
const productController = require("../controllers/products_controller");

router.get('/products', productController.getAllProducts);
router.get('/view-product/:productId', productController.getProductById);

module.exports = router;
