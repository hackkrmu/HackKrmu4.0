// db.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGO_URL;
const client = new MongoClient(url);
const dbName = 'HTM';

let db;

async function connectToDatabase() {
    if (!db) {
        try {
            await client.connect();
            console.log("Connected to MongoDB");
            db = client.db(dbName);
        } catch (err) {
            console.error("Error connecting to MongoDB:", err);
            throw err;
        }
    }
    return db;
}

module.exports = { connectToDatabase, client };
