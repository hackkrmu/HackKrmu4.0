// addtocart_controller.js
const { connectToDatabase } = require('./db');
const { MongoClient } = require('mongodb');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();



// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Controller function to add a product
const addProduct = async (req, res) => {
    const { title, price, description, tags, skintypefor } = req.body;
    const trimmedType = typeof skintypefor === 'string' ? skintypefor.split(',').map(type => type.trim()) : [];

    try {
        const admin = req.admin;
        if (!admin) {
            return res.status(403).json({ message: "Unauthorized to add new products" });
        }

        const imageUrl = req.file ? req.file.path : null; // Get Cloudinary URL

        const db = await connectToDatabase();   
        const collection = db.collection('products');

        const newProduct = {
            title,
            price,
            description,
            tags: tags,
            skintypefor: trimmedType,
            imageUrl: imageUrl,
            createdAt: new Date()
        };

        const result = await collection.insertOne(newProduct);
        res.status(201).json({ message: 'Product added successfully', result });

    } catch (e) {
        console.error(`Error: ${e}`);
        res.status(400).json({ message: 'Error adding product', error: e.message });
    }
};

module.exports = { addProduct };
