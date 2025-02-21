const { MongoClient, ObjectId } = require('mongodb');
const axios = require('axios');
require('dotenv').config();
const { connectToDatabase } = require('./db');


// Health Form Submission Handler
exports.submitHealthForm = async (req, res) => {
    const userId = req.user.id;
    const skinType = req.user.skinType; // Assuming skinType is available in user info
    const formData = req.body;

    try {
        const db = await connectToDatabase();
        const healthCollection = db.collection('healthData');
        const prescriptionsCollection = db.collection('prescriptions');
        const aiAnalysisCollection = db.collection('aihealthanalysis');

        // Fetch user's prescription history
        const prescriptions = await prescriptionsCollection.find({ userId: new ObjectId(userId) }).toArray();

        // Prepare health record
        const healthRecord = {
            userId: new ObjectId(userId),
            skinType,
            ...formData,
            createdAt: new Date(),
        };

        // Prepare data for AI analysis
        const message = `Analyze the following user data to provide personalized skin health suggestions:
        Form Data: ${JSON.stringify(formData)}
        Skin Type: ${skinType}
        Prescription History: ${JSON.stringify(prescriptions)}`;

        const dataForAI = { message };

        // Send request to AI model
        const aiResponse = await axios.post(
            'https://admiring-lamarr-charming.lemme.cloud/api/ed30d674-0ae7-4d5f-ad9c-6ce54bf02b8d',
            dataForAI,
            { headers: { 'Content-Type': 'application/json' } }
        );

        console.log('AI Response:', aiResponse.data);
        const aiResult = aiResponse.data;

        // Save records in the database
        await healthCollection.insertOne(healthRecord);
        await aiAnalysisCollection.insertOne({ userId: new ObjectId(userId), date: new Date(), analysis: aiResult });

        res.status(201).json({ message: 'Success', analysis: aiResult });

    } catch (e) {
        console.error(`Error: ${e}`);
        res.status(400).json({ message: 'Error storing health data', error: e.message });
    }
};

// Fetch AI Depth Analysis Handler
exports.getDepthAnalysis = async (req, res) => {
    const userId = req.user.id;

    try {
        const db = await connectToDatabase();
        const aiAnalysisCollection = db.collection('aihealthanalysis');

        // Fetch AI analysis data for the user
        const depthAnalysis = await aiAnalysisCollection.find({ userId: new ObjectId(userId) }).toArray();

        res.status(200).json({ message: 'Success', analysis: depthAnalysis });

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
