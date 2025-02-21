// const { MongoClient, ObjectId } = require("mongodb");
// const { Server } = require("socket.io");
// require("dotenv").config();

// const url = process.env.MONGO_URL;
// const client = new MongoClient(url);
// const dbName = "HTM";
// client.connect();
// const db = client.db(dbName);
// const messagesCollection = db.collection("discussion-messages");

// let io; // Define io globally

// const initializeSocket = (server) => {
//     io = new Server(server, {
//         cors: { origin: "*" },
//     });

//     io.on("connection", (socket) => {
//         console.log("User connected to discussion socket");

//         socket.on("sendMessage", async ({ userId, message }) => {
//             const newMessage = {
//                 content: message,
//                 userId,
//                 upVotes: 0,
//                 downVotes: 0,
//                 votes: [],
//                 createdAt: new Date(),
//             };

//             const result = await messagesCollection.insertOne(newMessage);
//             io.emit("newMessage", { ...newMessage, _id: result.insertedId });
//         });

//         socket.on("voteMessage", async ({ messageId, userId, type }) => {
//             const message = await messagesCollection.findOne({ _id: new ObjectId(messageId) });

//             if (!message) {
//                 socket.emit("error", { message: "Message not found" });
//                 return;
//             }

//             const hasVoted = message.votes.some((vote) => vote.userId === userId);
//             if (hasVoted) {
//                 socket.emit("error", { message: "User has already voted" });
//                 return;
//             }

//             const voteField = type === "upVote" ? "upVotes" : "downVotes";
//             await messagesCollection.updateOne(
//                 { _id: new ObjectId(messageId) },
//                 { $inc: { [voteField]: 1 }, $push: { votes: { userId, type } } }
//             );

//             io.emit("messageUpdated", { messageId, type });
//         });

//         socket.on("disconnect", () => {
//             console.log("User disconnected from discussion socket");
//         });
//     });

//     return io;
// };

// // Get messages
// const getMessages = async (req, res) => {
//     try {
//         const messages = await messagesCollection
//             .find({}, { projection: { content: 1, createdAt: 1, upVotes: 1, downVotes: 1 } })
//             .sort({ createdAt: -1 })
//             .toArray();

//         res.status(200).json({ messages });
//     } catch (e) {
//         console.log(`Error: ${e}`);
//         res.status(400).json({ message: "Error Fetching Messages" });
//     }
// };

// // Send a message
// const sendMessage = async (req, res) => {
//     try {
//         const { message } = req.body;
//         const userId = req.user.id;

//         const newMessage = {
//             content: message,
//             userId,
//             upVotes: 0,
//             downVotes: 0,
//             votes: [],
//             createdAt: new Date(),
//         };

//         const result = await messagesCollection.insertOne(newMessage);

//         io.emit("newMessage", { ...newMessage, _id: result.insertedId });
//         res.status(200).json({ message: "Message Sent", result });
//     } catch (e) {
//         console.log(`Error: ${e}`);
//         res.status(400).json({ message: "Error Sending Message" });
//     }
// };

// // Upvote a message
// const upvoteMessage = async (req, res) => {
//     try {
//         const { messageId } = req.body;
//         const userId = req.user.id;

//         const message = await messagesCollection.findOne({ _id: new ObjectId(messageId) });

//         if (!message) return res.status(404).json({ message: "Message not found" });

//         const hasVoted = message.votes.some((vote) => vote.userId === userId);
//         if (hasVoted) return res.status(403).json({ message: "User has already voted" });

//         await messagesCollection.updateOne(
//             { _id: new ObjectId(messageId) },
//             { $inc: { upVotes: 1 }, $push: { votes: { userId, type: "upVote" } } }
//         );

//         io.emit("messageUpdated", { messageId, type: "upVote" });
//         res.status(200).json({ message: "Message upvoted successfully" });
//     } catch (e) {
//         console.log(`Error: ${e}`);
//         res.status(400).json({ message: "Error upvoting message" });
//     }
// };

// // Downvote a message
// const downvoteMessage = async (req, res) => {
//     try {
//         const { messageId } = req.body;
//         const userId = req.user.id;

//         const message = await messagesCollection.findOne({ _id: new ObjectId(messageId) });

//         if (!message) return res.status(404).json({ message: "Message not found" });

//         const hasVoted = message.votes.some((vote) => vote.userId === userId);
//         if (hasVoted) return res.status(403).json({ message: "User has already voted" });

//         await messagesCollection.updateOne(
//             { _id: new ObjectId(messageId) },
//             { $inc: { downVotes: 1 }, $push: { votes: { userId, type: "downVote" } } }
//         );

//         io.emit("messageUpdated", { messageId, type: "downVote" });
//         res.status(200).json({ message: "Message downvoted successfully" });
//     } catch (e) {
//         console.log(`Error: ${e}`);
//         res.status(400).json({ message: "Error downvoting message" });
//     }
// };

// module.exports = { getMessages, sendMessage, upvoteMessage, downvoteMessage, initializeSocket };


const { MongoClient, ObjectId } = require("mongodb");
const { Server } = require("socket.io");
require("dotenv").config();

const { connectToDatabase } = require('./db');

let messagesCollection;
let io; // Define io globally

// Initialize DB connection
const initializeDatabase = async () => {
    const db = await connectToDatabase();
    messagesCollection = db.collection("discussion-messages");
};

// Initialize Socket
const initializeSocket = (server) => {
    io = new Server(server, {
        cors: { origin: "*" },
    });

    io.on("connection", (socket) => {
        console.log("User connected to discussion socket");

        socket.on("sendMessage", async ({ userId, message }) => {
            try {
                const newMessage = {
                    content: message,
                    userId,
                    upVotes: 0,
                    downVotes: 0,
                    votes: [],
                    createdAt: new Date(),
                };

                const result = await messagesCollection.insertOne(newMessage);
                io.emit("newMessage", { ...newMessage, _id: result.insertedId });
            } catch (error) {
                console.error(`Error sending message: ${error}`);
                socket.emit("error", { message: "Failed to send message" });
            }
        });

        socket.on("voteMessage", async ({ messageId, userId, type }) => {
            try {
                const message = await messagesCollection.findOne({ _id: new ObjectId(messageId) });

                if (!message) {
                    socket.emit("error", { message: "Message not found" });
                    return;
                }

                const hasVoted = message.votes.some((vote) => vote.userId === userId);
                if (hasVoted) {
                    socket.emit("error", { message: "User has already voted" });
                    return;
                }

                const voteField = type === "upVote" ? "upVotes" : "downVotes";
                await messagesCollection.updateOne(
                    { _id: new ObjectId(messageId) },
                    { $inc: { [voteField]: 1 }, $push: { votes: { userId, type } } }
                );

                io.emit("messageUpdated", { messageId, type });
            } catch (error) {
                console.error(`Error voting on message: ${error}`);
                socket.emit("error", { message: "Failed to vote on message" });
            }
        });

        socket.on("disconnect", () => {
            console.log("User disconnected from discussion socket");
        });
    });

    return io;
};

// Get messages
const getMessages = async (req, res) => {
    try {
        const messages = await messagesCollection
            .find({}, { projection: { content: 1, createdAt: 1, upVotes: 1, downVotes: 1 } })
            .sort({ createdAt: -1 })
            .toArray();

        res.status(200).json({ messages });
    } catch (e) {
        console.error(`Error fetching messages: ${e}`);
        res.status(500).json({ message: "Error Fetching Messages" });
    }
};

// Send a message
const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const userId = req.user.id;

        const newMessage = {
            content: message,
            userId,
            upVotes: 0,
            downVotes: 0,
            votes: [],
            createdAt: new Date(),
        };

        const result = await messagesCollection.insertOne(newMessage);

        io.emit("newMessage", { ...newMessage, _id: result.insertedId });
        res.status(201).json({ message: "Message Sent", result });
    } catch (e) {
        console.error(`Error sending message: ${e}`);
        res.status(500).json({ message: "Error Sending Message" });
    }
};

// Upvote a message
const upvoteMessage = async (req, res) => {
    try {
        const { messageId } = req.body;
        const userId = req.user.id;

        const message = await messagesCollection.findOne({ _id: new ObjectId(messageId) });

        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }

        const hasVoted = message.votes.some((vote) => vote.userId === userId);
        if (hasVoted) {
            return res.status(403).json({ message: "User has already voted" });
        }

        await messagesCollection.updateOne(
            { _id: new ObjectId(messageId) },
            { $inc: { upVotes: 1 }, $push: { votes: { userId, type: "upVote" } } }
        );

        io.emit("messageUpdated", { messageId, type: "upVote" });
        res.status(200).json({ message: "Message upvoted successfully" });
    } catch (e) {
        console.error(`Error upvoting message: ${e}`);
        res.status(500).json({ message: "Error upvoting message" });
    }
};

// Downvote a message
const downvoteMessage = async (req, res) => {
    try {
        const { messageId } = req.body;
        const userId = req.user.id;

        const message = await messagesCollection.findOne({ _id: new ObjectId(messageId) });

        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }

        const hasVoted = message.votes.some((vote) => vote.userId === userId);
        if (hasVoted) {
            return res.status(403).json({ message: "User has already voted" });
        }

        await messagesCollection.updateOne(
            { _id: new ObjectId(messageId) },
            { $inc: { downVotes: 1 }, $push: { votes: { userId, type: "downVote" } } }
        );

        io.emit("messageUpdated", { messageId, type: "downVote" });
        res.status(200).json({ message: "Message downvoted successfully" });
    } catch (e) {
        console.error(`Error downvoting message: ${e}`);
        res.status(500).json({ message: "Error downvoting message" });
    }
};

// Call initializeDatabase on startup
initializeDatabase().then(() => {
    console.log("Database initialized for discussion messages");
}).catch((error) => {
    console.error(`Failed to initialize database: ${error}`);
});

module.exports = { getMessages, sendMessage, upvoteMessage, downvoteMessage, initializeSocket };
