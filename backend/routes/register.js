const express = require("express");
const router = express.Router();
const authController = require("../controllers/register_controller");

router.post("/register", authController.register);
router.get("/register/confirm/:token", authController.confirmRegistration);

module.exports = router;
