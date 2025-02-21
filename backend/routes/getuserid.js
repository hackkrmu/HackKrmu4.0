const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/getUserId", authMiddleware, (req, res) => {
  res.json({ userId: req.userId, role: req.role, name: req.name });
});

module.exports = router;
