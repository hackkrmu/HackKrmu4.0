

// // const { MongoClient, ObjectId } = require("mongodb");
// // const { Server } = require("socket.io");
// // require("dotenv").config();
// // const { connectToDatabase } = require('./db');

// // let db;
// // let chatRoomsCollection;
// // let io;

// // // Initialize database connection before using it
// // const initializeDatabase = async () => {
// //     try {
// //         db = await connectToDatabase();
// //         chatRoomsCollection = db.collection("chatRooms");
// //         console.log("Database connected successfully");
// //     } catch (error) {
// //         console.error("Failed to connect to database:", error.message);
// //         process.exit(1); // Exit if database fails to connect
// //     }
// // };

// // const initializeSocket = (server) => {
// //     io = new Server(server, {
// //         cors: { origin: "*" },
// //     });

// //     io.on("connection", (socket) => {
// //         console.log("User connected to Socket.io");

// //         socket.on("joinRoom", async ({ userId, doctorId }) => {
// //             const room = `${userId}-${doctorId}`;
// //             socket.join(room);

// //             const currentRoom = await chatRoomsCollection.findOne({ userId, doctorId });
// //             const currentTime = new Date();

// //             if (currentRoom && currentTime >= new Date(currentRoom.startTime) && currentTime <= new Date(currentRoom.endTime)) {
// //                 socket.emit("chatHistory", currentRoom.messages);
// //             } else {
// //                 socket.emit("sessionExpired");
// //             }
// //         });

// //         socket.on("sendMessage", async ({ userId, doctorId, message, sentBy }) => {
// //             const room = `${userId}-${doctorId}`;
// //             const currentRoom = await chatRoomsCollection.findOne({ userId, doctorId });

// //             if (currentRoom && new Date() >= new Date(currentRoom.startTime) && new Date() <= new Date(currentRoom.endTime)) {
// //                 const newMessage = { message, timestamp: new Date(), sentBy };

// //                 await chatRoomsCollection.updateOne(
// //                     { userId, doctorId },
// //                     { $push: { messages: newMessage } }
// //                 );

// //                 io.to(room).emit("newMessage", newMessage);
// //             } else {
// //                 socket.emit("sessionExpired");
// //             }
// //         });

// //         socket.on("disconnect", () => {
// //             console.log("User disconnected from Socket.io");
// //         });
// //     });

// //     return io;
// // };

// // // Book a time slot for a chat session
// // const bookTimeSlot = async (req, res) => {
// //     const { startTime, endTime, doctorId } = req.body;
// //     const userId = req.user.id;

// //     try {
// //         const newChatRoom = {
// //             userId,
// //             doctorId,
// //             messages: [],
// //             startTime: new Date(startTime),
// //             endTime: new Date(endTime),
// //             status: "booked",
// //         };

// //         await chatRoomsCollection.insertOne(newChatRoom);
// //         res.status(200).json({ message: "Time slot booked successfully", newChatRoom });
// //     } catch (error) {
// //         res.status(500).json({ error: "Internal server error", details: error.message });
// //     }
// // };

// // // Get chat rooms for a user
// // const getRoom = async (req, res) => {
// //     const id = req.user.id;

// //     try {
// //         const rooms = await chatRoomsCollection.find({
// //             $or: [{ doctorId: id }, { userId: id }],
// //         }).toArray();

// //         if (rooms.length === 0) {
// //             return res.status(404).json({ message: "No Room Found" });
// //         }

// //         res.json(rooms);
// //     } catch (error) {
// //         res.status(500).json({ message: "Internal server error", details: error.message });
// //     }
// // };

// // // Join a chat room
// // const joinRoom = async (req, res) => {
// //     const { roomId } = req.body;
// //     const { id: userId, role } = req.user;

// //     try {
// //         const roomObjectId = new ObjectId(`${roomId}`);
// //         const currentRoom = await chatRoomsCollection.findOne({ _id: roomObjectId });

// //         if (!currentRoom) return res.status(404).json({ error: "Room not found" });

// //         const isAuthorized = (role === "user" && currentRoom.userId === userId) ||
// //             (role === "doctor" && currentRoom.doctorId === userId);

// //         if (!isAuthorized) return res.status(403).json({ error: "Unauthorized to join this room" });

// //         const currentTime = new Date();
// //         if (currentTime >= new Date(currentRoom.startTime) && currentTime <= new Date(currentRoom.endTime)) {
// //             res.json({ messages: currentRoom.messages });
// //         } else if (currentTime > new Date(currentRoom.endTime)) {
// //             res.json({ error: "Session expired" });
// //         } else {
// //             res.json({ error: "Session not started yet" });
// //         }
// //     } catch (error) {
// //         res.status(500).json({ error: "Internal server error", details: error.message });
// //     }
// // };

// // // Send a message
// // const sendMessage = async (req, res) => {
// //     const { message, roomId } = req.body;
// //     const { id: userId, role } = req.user;

// //     try {
// //         const roomObjectId = new ObjectId(`${roomId}`);
// //         const currentRoom = await chatRoomsCollection.findOne({ _id: roomObjectId });

// //         if (!currentRoom) return res.status(404).json({ error: "Room not found" });

// //         const isAuthorized = (role === "user" && currentRoom.userId === userId) ||
// //             (role === "doctor" && currentRoom.doctorId === userId);

// //         if (!isAuthorized) return res.status(403).json({ error: "Unauthorized to join this room" });

// //         const currentTime = new Date();
// //         if (currentTime >= new Date(currentRoom.startTime) && currentTime <= new Date(currentRoom.endTime)) {
// //             const newMessage = { message, timestamp: new Date(), sentBy: role };

// //             await chatRoomsCollection.updateOne(
// //                 { _id: roomObjectId },
// //                 { $push: { messages: newMessage } }
// //             );

// //             io.to(`${currentRoom.userId}-${currentRoom.doctorId}`).emit("newMessage", newMessage);
// //             res.json({ message: "Message sent successfully" });
// //         } else {
// //             res.status(403).json({ error: "Session is not active" });
// //         }
// //     } catch (error) {
// //         res.status(500).json({ error: "Internal server error", details: error.message });
// //     }
// // };

// // // Call initializeDatabase before exporting
// // initializeDatabase();

// // module.exports = { bookTimeSlot, getRoom, joinRoom, sendMessage, initializeSocket };


// // const express = require("express");
// // const router = express.Router();
// // const mongoose = require("mongoose");
// // const { Server } = require("socket.io");
// // const http = require("http");

// // // MongoDB Models
// // const User = require("../models/User");
// // const Doctor = require("../models/Doctor");
// // const Chat = require("../models/Chat");

// // // Create an Express App & HTTP Server
// // const app = express();
// // const server = http.createServer(app);
// // const io = new Server(server, { cors: { origin: "*" } });

// // mongoose.connect("mongodb://localhost:27017/chatdb", { useNewUrlParser: true, useUnifiedTopology: true });

// // io.on("connection", (socket) => {
// //     console.log("User connected:", socket.id);

// //     // User joins a chat room (One-on-One)
// //     socket.on("joinRoom", async ({ userId, doctorId }) => {
// //         const chatRoomId = [userId, doctorId].sort().join("_");
// //         socket.join(chatRoomId);
// //         console.log(User ${userId} joined room ${chatRoomId});
// //     });

// //     // Handle message sending
// //     socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
// //         const chatRoomId = [senderId, receiverId].sort().join("_");

// //         const chat = new Chat({ senderId, receiverId, message });
// //         await chat.save();

// //         io.to(chatRoomId).emit("receiveMessage", { senderId, message });
// //     });

// //     // Load messages (Pagination: 20 messages per batch)
// //     socket.on("loadMessages", async ({ userId, doctorId, page }) => {
// //         const messages = await Chat.find({
// //             $or: [
// //                 { senderId: userId, receiverId: doctorId },
// //                 { senderId: doctorId, receiverId: userId }
// //             ]
// //         })
// //         .sort({ createdAt: -1 })
// //         .skip(page * 20)
// //         .limit(20);

// //         const chatRoomId = [userId, doctorId].sort().join("_");
// //         socket.emit("messagesLoaded", { chatRoomId, messages: messages.reverse() });
// //     });

// //     // Handle user disconnection
// //     socket.on("disconnect", async () => {
// //         console.log("User disconnected:", socket.id);
// //         socket.leaveAll();
// //     });
// // });

// // server.listen(5000, () => console.log("Server running on port 5000"));

// // module.exports = router;

// // Import Dependencies
// // const { MongoClient, ObjectId } = require("mongodb");
// // const { Server } = require("socket.io");
// // require("dotenv").config();
// // const { connectToDatabase } = require('./db');
// // const logincont = require ('./login_controller');

// // // Initialize Database and Collections
// // let db, chatRoomsCollection;
// // (async () => {
// //     db = await connectToDatabase();
// //     chatRoomsCollection = db.collection("chatRooms");
// //     console.log("Database connected successfully");
// // })();

// // // Initialize Socket.io
// // const initializeSocket = (server) => {
// //     const io = new Server(server, { cors: { origin: "*" } });

// //     io.on("connection", (socket) => {
// //         console.log("User connected to Socket.io");

// //         socket.on("joinRoom", async ({ userId, doctorId }) => {
// //             const room = `${userId}-${doctorId}`;
// //             socket.join(room);

// //             const currentRoom = await chatRoomsCollection.findOne({ userId, doctorId });
// //             const currentTime = new Date();

// //             if (currentRoom && currentTime >= new Date(currentRoom.startTime) && currentTime <= new Date(currentRoom.endTime)) {
// //                 socket.emit("chatHistory", currentRoom.messages);
// //             } else {
// //                 socket.emit("sessionExpired");
// //             }
// //         });

// //         socket.on("sendMessage", async ({ userId, doctorId, message, sentBy }) => {
// //             const room = `${userId}-${doctorId}`;
// //             const currentRoom = await chatRoomsCollection.findOne({ userId, doctorId });

// //             if (currentRoom && new Date() >= new Date(currentRoom.startTime) && new Date() <= new Date(currentRoom.endTime)) {
// //                 const newMessage = { message, timestamp: new Date(), sentBy };
// //                 await chatRoomsCollection.updateOne({ userId, doctorId }, { $push: { messages: newMessage } });
// //                 io.to(room).emit("newMessage", newMessage);
// //             } else {
// //                 socket.emit("sessionExpired");
// //             }
// //         });

// //         socket.on("disconnect", () => {
// //             console.log("User disconnected from Socket.io");
// //         });
// //     });

// //     return io;
// // };

// // module.exports = { initializeSocket };

// const { MongoClient, ObjectId } = require("mongodb");
// const { Server } = require("socket.io");
// require("dotenv").config();
// const { connectToDatabase } = require('./db');

// let db;
// let chatRoomsCollection;
// let io;

// // Initialize database connection before using it
// const initializeDatabase = async () => {
//     try {
//         db = await connectToDatabase();
//         chatRoomsCollection = db.collection("chatRooms");
//         console.log("Database connected successfully");
//     } catch (error) {
//         console.error("Failed to connect to database:", error.message);
//         process.exit(1); // Exit if database fails to connect
//     }
// };

// const initializeSocket = (server) => {
//     io = new Server(server, {
//         cors: { origin: "http://localhost:3000", 
//         credentials: true },
//     });

//     io.on("connection", (socket) => {
//         console.log("User connected to Socket.io");

//         // When a client wants to join a room, it sends both userId and doctorId.
//         socket.on("joinRoom", async ({ userId, doctorId }) => {
//             const room = `${userId}-${doctorId}`;
//             socket.join(room);

//             const currentRoom = await chatRoomsCollection.findOne({ userId, doctorId });
//             if (currentRoom) {
//                 socket.emit("chatHistory", currentRoom.messages);
//             } else {
//                 socket.emit("roomNotFound");
//             }
//         });

//         // When a message is sent, update the database and broadcast to the room.
//         socket.on("sendMessage", async ({ userId, doctorId, message, sentBy }) => {
//             const room = `${userId}-${doctorId}`;
//             const currentRoom = await chatRoomsCollection.findOne({ userId, doctorId });
//             if (currentRoom) {
//                 const newMessage = { message, timestamp: new Date(), sentBy };
//                 await chatRoomsCollection.updateOne(
//                     { userId, doctorId },
//                     { $push: { messages: newMessage } }
//                 );
//                 io.to(room).emit("newMessage", newMessage);
//             } else {
//                 socket.emit("roomNotFound");
//             }
//         });

//         socket.on("disconnect", () => {
//             console.log("User disconnected from Socket.io");
//         });
//     });

//     return io;
// };

// /**
//  * @route   POST /chat/initiate
//  * @desc    Create a new chat room between a user and a doctor if it doesn't exist.
//  * @access  Protected (user's ID is fetched from req.user)
//  *
//  * Expected body:
//  * {
//  *   "doctorId": "doctor123"
//  * }
//  */
// const initiateChat = async (req, res) => {
//     // The doctorId is sent from the front end.
//     const { doctorId } = req.body;
//     // Assume the user's ID is available on req.user (e.g., via a cookie or token)
//     const userId = req.user.id;

//     try {
//         // Check if a room between this user and doctor already exists
//         let chatRoom = await chatRoomsCollection.findOne({ userId, doctorId });
//         if (chatRoom) {
//             return res.status(200).json({ message: "Chat room already exists", room: chatRoom });
//         }
//         // Create a new chat room document
//         const newChatRoom = {
//             userId,
//             doctorId,
//             messages: [],
//             createdAt: new Date()
//         };
//         const result = await chatRoomsCollection.insertOne(newChatRoom);
//         newChatRoom._id = result.insertedId;
//         res.status(201).json({ message: "Chat room created", room: newChatRoom });
//     } catch (error) {
//         res.status(500).json({ error: "Internal server error", details: error.message });
//     }
// };

// /**
//  * @route   GET /chat/rooms
//  * @desc    Get all chat rooms associated with the logged-in user (as user or doctor)
//  * @access  Protected (user's ID is fetched from req.user)
//  */
// const getRooms = async (req, res) => {
//     const id = req.user.id;

//     try {
//         const rooms = await chatRoomsCollection.find({
//             $or: [{ doctorId: id }, { userId: id }],
//         }).toArray();

//         if (rooms.length === 0) {
//             return res.status(404).json({ message: "No rooms found" });
//         }

//         res.json(rooms);
//     } catch (error) {
//         res.status(500).json({ message: "Internal server error", details: error.message });
//     }
// };

// /**
//  * @route   POST /chat/join
//  * @desc    Join a chat room via HTTP (for fetching chat history)
//  * @access  Protected (user's ID is fetched from req.user)
//  *
//  * Expected body:
//  * {
//  *   "roomId": "theRoomObjectId"
//  * }
//  */
// const joinRoom = async (req, res) => {
//     const { roomId } = req.body;
//     const { id: userId, role } = req.user;

//     try {
//         const roomObjectId = new ObjectId(roomId);
//         const currentRoom = await chatRoomsCollection.findOne({ _id: roomObjectId });
//         if (!currentRoom) return res.status(404).json({ error: "Room not found" });

//         // Authorization: if the user is the user or doctor in this room.
//         const isAuthorized =
//             (role === "user" && currentRoom.userId === userId) ||
//             (role === "doctor" && currentRoom.doctorId === userId);

//         if (!isAuthorized) return res.status(403).json({ error: "Unauthorized to join this room" });

//         res.json({ messages: currentRoom.messages });
//     } catch (error) {
//         res.status(500).json({ error: "Internal server error", details: error.message });
//     }
// };

// /**
//  * @route   POST /chat/message
//  * @desc    Send a message via HTTP
//  * @access  Protected (user's ID is fetched from req.user)
//  *
//  * Expected body:
//  * {
//  *   "message": "Hello doctor!",
//  *   "roomId": "theRoomObjectId"
//  * }
//  */
// const sendMessage = async (req, res) => {
//     const { message, roomId } = req.body;
//     const { id: userId, role } = req.user;

//     try {
//         const roomObjectId = new ObjectId(roomId);
//         const currentRoom = await chatRoomsCollection.findOne({ _id: roomObjectId });
//         if (!currentRoom) return res.status(404).json({ error: "Room not found" });

//         const isAuthorized =
//             (role === "user" && currentRoom.userId === userId) ||
//             (role === "doctor" && currentRoom.doctorId === userId);
//         if (!isAuthorized) return res.status(403).json({ error: "Unauthorized to join this room" });

//         const newMessage = { message, timestamp: new Date(), sentBy: role };

//         await chatRoomsCollection.updateOne(
//             { _id: roomObjectId },
//             { $push: { messages: newMessage } }
//         );

//         // Emit to the dynamic room (format: "userId-doctorId")
//         io.to(`${currentRoom.userId}-${currentRoom.doctorId}`).emit("newMessage", newMessage);
//         res.json({ message: "Message sent successfully" });
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ error: "Internal server error", details: error.message });
//     }
// };

// // Initialize database connection before exporting endpoints
// initializeDatabase();

// module.exports = { 
//     initiateChat, 
//     getRooms, 
//     joinRoom, 
//     sendMessage, 
//     initializeSocket 
// };


const { MongoClient, ObjectId } = require("mongodb");
const { Server } = require("socket.io");
require("dotenv").config();
const { connectToDatabase } = require("./db");

let db;
let chatRoomsCollection;
let io;

// Initialize database connection before using it
const initializeDatabase = async () => {
    try {
        db = await connectToDatabase();
        chatRoomsCollection = db.collection("chatRooms");
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Failed to connect to database:", error.message);
        process.exit(1);
    }
};

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: { origin: ["http://localhost:3000", "http://localhost:3001"], methods: ["GET", "POST"] },
    });

    io.on("connection", (socket) => {
        console.log("User connected to Socket.io");

        socket.on("joinRoom", async ({ userId, doctorId }) => {
            if (!userId || !doctorId) return;
            const room = `${userId}-${doctorId}`;
            socket.join(room);

            try {
                const currentRoom = await chatRoomsCollection.findOne({ userId, doctorId });
                if (currentRoom) {
                    socket.emit("chatHistory", currentRoom.messages);
                } else {
                    socket.emit("roomNotFound");
                }
            } catch (error) {
                console.error("Error fetching chat room:", error.message);
            }
        });

        socket.on("sendMessage", async ({ userId, doctorId, message, sentBy }) => {
            if (!userId || !doctorId || !message || !sentBy) return;
            console.log("Received message:", { userId, doctorId, message, sentBy });

            const room = `${userId}-${doctorId}`;
            try {
                const newMessage = { message, timestamp: new Date(), sentBy };
                await chatRoomsCollection.updateOne(
                    { userId, doctorId },
                    { $push: { messages: newMessage } },
                    { upsert: true }
                );
                io.to(room).emit("newMessage", newMessage);
            } catch (error) {
                console.error("Error saving message:", error.message);
            }
        });

        socket.on("disconnect", () => {
            console.log("User disconnected from Socket.io");
        });
    });
    return io;
};

const initiateChat = async (req, res) => {
    const { userId, doctorId, user_name } = req.body;
    
    try {
        let chatRoom = await chatRoomsCollection.findOne({ userId, doctorId });
        if (!chatRoom) {
            const newChatRoom = {
                userId,
                user_name,
                doctorId,
                messages: [],
                createdAt: new Date()
            };
            const result = await chatRoomsCollection.insertOne(newChatRoom);
            newChatRoom._id = result.insertedId;
            return res.status(201).json({ message: "Chat room created", room: newChatRoom });
        }
        res.status(200).json({ message: "Chat room already exists", room: chatRoom });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

const getRooms = async (req, res) => {
    const id = req.user.id;
    try {
        const rooms = await chatRoomsCollection.find({
            $or: [{ doctorId: id }, { userId: id }],
        }).toArray();

        if (!rooms.length) {
            return res.status(404).json({ message: "No rooms found" });
        }
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", details: error.message });
    }
};

const joinRoom = async (req, res) => {
    const userId = req.user.id;
    const { doctorId } = req.body;
    try {
        let currentRoom = await chatRoomsCollection.findOne({ userId, doctorId });
        if (!currentRoom) {
            const newRoom = { userId, doctorId, messages: [], createdAt: new Date() };
            const result = await chatRoomsCollection.insertOne(newRoom);
            currentRoom = { ...newRoom, _id: result.insertedId };
        }
        res.json(currentRoom);
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

const sendMessage = async (req, res) => {
    const { message, roomId } = req.body;
    const { id: userId, role } = req.user;
    try {
        const roomObjectId = new ObjectId(roomId);
        const currentRoom = await chatRoomsCollection.findOne({ _id: roomObjectId });
        if (!currentRoom) return res.status(404).json({ error: "Room not found" });

        const newMessage = { message, timestamp: new Date(), sentBy: role };
        await chatRoomsCollection.updateOne(
            { _id: roomObjectId },
            { $push: { messages: newMessage } }
        );

        io.to(`${currentRoom.userId}-${currentRoom.doctorId}`).emit("newMessage", newMessage);
        res.json({ message: "Message sent successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

initializeDatabase();

module.exports = {
    initiateChat,
    getRooms,
    joinRoom,
    sendMessage,
    initializeSocket
};