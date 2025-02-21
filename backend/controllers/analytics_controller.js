// const { MongoClient, ObjectId } = require('mongodb');
// require('dotenv').config();

// const url = process.env.MONGO_URL;
// const client = new MongoClient(url);
// const dbName = 'HTM';

// // Controller function to fetch historical health data
// const getHealthHistory = async (req, res) => {
//     const userId = req.user.id;

//     try {
//         await client.connect();
//         const db = client.db(dbName);
//         const collection = db.collection('healthData');

//         const healthData = await collection.find({ userId: new ObjectId(userId) })
//                                            .sort({ createdAt: 1 }) // Sort by date
//                                            .toArray();

//         res.status(200).json(healthData);
//     } catch (e) {
//         console.error(`Error: ${e}`);
//         res.status(400).json({ message: 'Error fetching health data', error: e.message });
//     } finally {
//         await client.close();
//     }
// };

// module.exports = { getHealthHistory };

// getHealthHistory_controller.js
const { connectToDatabase } = require('./db');
const { ObjectId } = require('mongodb');

// Controller function to fetch historical health data
const getHealthHistory = async (req, res) => {
    const userId = req.user.id;

    try {
        const db = await connectToDatabase();
        const collection = db.collection('healthData');

        const healthData = await collection.find({ userId: new ObjectId(userId) })
                                           .sort({ createdAt: 1 }) // Sort by creation date
                                           .toArray();

        res.status(200).json(healthData);
    } catch (e) {
        console.error(`Error: ${e}`);
        res.status(400).json({ message: 'Error fetching health data', error: e.message });
    }
};

module.exports = { getHealthHistory };
