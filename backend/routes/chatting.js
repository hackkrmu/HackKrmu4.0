// // const express = require("express");
// // const router = express.Router();

// // const { bookTimeSlot, getRoom, joinRoom, sendMessage, getRooms } = require("../controllers/chatting_controller");

// // router.post("/bookTimeSlot", authMiddleware, bookTimeSlot);
// // router.get("/getRoom", authMiddleware, getRooms);
// // router.post("/joinRoom", authMiddleware, joinRoom);
// // router.post("/sendMessage", authMiddleware, sendMessage);

// // module.exports = router;


// const express = require("express");
// const {
//     initiateChat,
//     getRooms,
//     joinRoom,
//     sendMessage,
// } = require("../controllers/chatting_controller");
// const authMiddleware = require("../middlewares/authMiddleware");


// const router = express.Router();

// // Initiate a chat room
// router.post("/initiate", authMiddleware, initiateChat);

// // Get all chat rooms for a user or doctor
// router.get("/rooms", authMiddleware, getRooms);

// // Join a specific chat room and get its history
// router.post("/join", authMiddleware, joinRoom);

// // Send a message via HTTP
// router.post("/message", authMiddleware, sendMessage);

// module.exports = router;


const express = require("express");
const {
    initiateChat,
    getRooms,
    joinRoom,
    sendMessage,
} = require("../controllers/chatting_controller");
const authMiddleware = require("../middlewares/authMiddleware");


const   router = express.Router();

// Initiate a chat room
router.post("/initiate", authMiddleware, initiateChat);

// Get all chat rooms for a user or doctor
router.get("/rooms", authMiddleware, getRooms);

// Join a specific chat room and get its history
router.post("/join", authMiddleware, joinRoom);

// Send a message via HTTP
router.post("/message", authMiddleware, sendMessage);

module.exports = router;