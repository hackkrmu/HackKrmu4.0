const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { getMessages, sendMessage, upvoteMessage, downvoteMessage } = require("../controllers/discussion_controller");

router.get("/get-message", getMessages);
router.post("/send-message", authMiddleware, sendMessage);
router.post("/upvote", authMiddleware, upvoteMessage);
router.post("/downvote", authMiddleware, downvoteMessage);

module.exports = router;
