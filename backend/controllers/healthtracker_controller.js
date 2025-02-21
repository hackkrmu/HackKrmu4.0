const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const { connectToDatabase } = require('./db');
 



// Health Form Submission Handler
exports.submitHealthForm = async (req, res) => {
    const userId = req.user.id;
    const skinType = req.user.skinType; // Assuming skinType is available in user info
    const formData = req.body;

    try {
        const db = await connectToDatabase();
        const collection = db.collection('healthData');

        const healthRecord = {
            userId: new ObjectId(`${userId}`),
            skinType,
            ...formData,
            createdAt: new Date(),
        };

        const result = await collection.insertOne(healthRecord);
        res.status(201).json({ message: 'Health data stored successfully', result });

    } catch (e) {
        console.error(`Error: ${e}`);
        res.status(400).json({ message: 'Error storing health data', error: e.message });
    }
};
