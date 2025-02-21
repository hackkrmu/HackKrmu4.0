const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const { connectToDatabase } = require('./db');

exports.getAllProducts = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("products");

        const { skintypefor } = req.query;
        let filter = {};

        if (skintypefor) {
            const skintypeArray = skintypefor.split(",").map(type => type.trim());
            filter.skintypefor = { $in: skintypeArray };
        }

        const products = await collection.find(filter).toArray();
        res.status(200).json({ products });

    } catch (e) {
        console.log(`Error fetching products: ${e}`);
        res.status(500).json({ message: "Error fetching products", error: e.message });
    } 
};

exports.getProductById = async (req, res) => {
    try {
        const db = await connectToDatabase();        
        const collection = db.collection("products");

        const { productId } = req.params;
        const product = await collection.findOne({ _id: new ObjectId(`${productId}`) });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ product });

    } catch (e) {
        console.log(`Error fetching product: ${e}`);
        res.status(500).json({ message: "Error fetching product", error: e.message });
    }
};
