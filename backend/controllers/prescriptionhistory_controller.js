const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const { connectToDatabase } = require('./db');


exports.addPrescription = async (req, res) => {
    const { userId, prescription } = req.body;
    const doctorId = req.user.id;

    if (req.role !== 'doctor') {
        return res.status(403).json({ message: 'Access denied. You are not a doctor.' });
    }

    try {
        const db = await connectToDatabase();

        const collection = db.collection('prescriptions');

        const newPrescription = {
            userId: new ObjectId(`${userId}`),
            prescription,
            doctorId: new ObjectId(`${doctorId}`),
            docName: req.user.name,
            createdAt: new Date()
        };

        const result = await collection.insertOne(newPrescription);
        res.status(201).json({ message: 'Prescription Added Successfully', result });
    } catch (e) {
        console.log(`Error: ${e}`);
        res.status(400).json({ message: 'Error adding prescription', error: e.message });
    } 
};

exports.getPrescriptions = async (req, res) => {
    const userId = req.user.id;

    try {
        const db = await connectToDatabase();
        const collection = db.collection('prescriptions');

        const prescriptions = await collection.find({ userId: userId }).sort({ createdAt: -1 }).toArray();

        res.status(200).json({ prescriptions });
    } catch (e) {
        console.log(`Error: ${e}`);
        res.status(400).json({ message: 'Error fetching prescriptions', error: e.message });
    }
};
