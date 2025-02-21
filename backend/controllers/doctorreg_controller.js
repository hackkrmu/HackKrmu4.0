// const validator = require('validator');
// const bcrypt = require('bcrypt');
// const { MongoClient } = require('mongodb');
// const nodemailer = require('nodemailer');
// const crypto = require('crypto');
// require('dotenv').config();

// const saltRounds = 10;
// const { connectToDatabase } = require('./db');

// // Email Transport Initialization
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_PASS
//     }
// });

// // User Registration
// exports.registerUser = async (req, res) => {
//     const { email, name, username, phone, password, cnfrm_password } = req.body;

//     // Validation
//     if (password !== cnfrm_password) {
//         return res.status(400).json({ message: 'Passwords do not match' });
//     }
//     if (!validator.isEmail(email)) {
//         return res.status(400).json({ message: 'Invalid email format' });
//     }
//     if (!validator.isLength(phone, { min: 10, max: 10 })) {
//         return res.status(400).json({ message: 'Phone number must be 10 digits' });
//     }
//     if (!validator.isLength(password, { min: 8 })) {
//         return res.status(400).json({ message: 'Password must be at least 8 characters long' });
//     }
//     if (!/[!@#$%^&*(),.?":{}|<>]/g.test(password)) {
//         return res.status(400).json({ message: 'Password must contain at least one special character' });
//     }
//     if (!/[A-Z]/g.test(password)) {
//         return res.status(400).json({ message: 'Password must contain at least one uppercase letter' });
//     }
//     if (!/[a-z]/g.test(password)) {
//         return res.status(400).json({ message: 'Password must contain at least one lowercase letter' });
//     }
//     if (!/[0-9]/g.test(password)) {
//         return res.status(400).json({ message: 'Password must contain at least one number' });
//     }

//     try {
//         const db = await connectToDatabase();
//         const collection = db.collection('doctors');

//         const existUsermail = await collection.findOne({ email });
//         if (existUsermail) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         const existUserphone = await collection.findOne({ Mobile: phone });
//         if (existUserphone) {
//             return res.status(400).json({ message: 'Mobile number already registered' });
//         }

//         const existUsername = await collection.findOne({ username });
//         if (existUsername) {
//             return res.status(400).json({ message: 'Username already taken' });
//         }

//         const confirmationToken = crypto.randomBytes(32).toString('hex');
//         const hashedPswrd = await bcrypt.hash(password, saltRounds);

//         await collection.insertOne({
//             email,
//             name,
//             username,
//             Mobile: phone,
//             password: hashedPswrd,
//             confirmationToken,
//             isActive: false , 
//             isApproved: false,
            
//         });

//         const mailOptions = {
//             from: process.env.GMAIL_USER,
//             to: email,
//             subject: 'Account Confirmation',
//             html: `<h3>Dear ${name},</h3>
//                    <p>Please confirm your account by clicking the link below:</p>
//                    <a href="http://localhost:5000/register/confirm/${confirmationToken}">Confirm Account</a>`
//         };

//         transporter.sendMail(mailOptions, (error) => {
//             if (error) {
//                 console.error(error);
//                 return res.status(500).json({ message: 'Error sending email' });
//             }
//             res.status(200).json({ message: 'Signup successful! Please check your email for confirmation.' });
//         });

//     } catch (e) {
//         console.error(`Error: ${e}`);
//         res.status(500).json({ message: 'Internal server error' });
//     } 
// };

// // Account Confirmation
// exports.confirmAccount = async (req, res) => {
//     const { token } = req.params;

//     try {
//         const db = await connectToDatabase();
//         const collection = db.collection('doctors');

//         const user = await collection.findOne({ confirmationToken: token });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid or expired token' });
//         }

//         await collection.updateOne(
//             { confirmationToken: token },
//             { $set: { isActive: true }, $unset: { confirmationToken: "" } }
//         );

//         res.status(200).json({ message: 'Account confirmed successfully! You can now log in.' });
//     } catch (e) {
//         console.error(`Error: ${e}`);
//         res.status(500).json({ message: 'Server error' });
//     } 
// };


const validator = require('validator');
const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

const saltRounds = 10;
const { connectToDatabase } = require('./db');

// Email Transport Initialization
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

// User Registration
exports.registerUser = async (req, res) => {
    const { email, name, username, phone, password, cnfrm_password } = req.body;

    // Validation
    if (password !== cnfrm_password) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }
    if (!validator.isLength(phone, { min: 10, max: 10 })) {
        return res.status(400).json({ message: 'Phone number must be 10 digits' });
    }
    if (!validator.isLength(password, { min: 8 })) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/g.test(password)) {
        return res.status(400).json({ message: 'Password must contain at least one special character' });
    }
    if (!/[A-Z]/g.test(password)) {
        return res.status(400).json({ message: 'Password must contain at least one uppercase letter' });
    }
    if (!/[a-z]/g.test(password)) {
        return res.status(400).json({ message: 'Password must contain at least one lowercase letter' });
    }
    if (!/[0-9]/g.test(password)) {
        return res.status(400).json({ message: 'Password must contain at least one number' });
    }

    try {
        const db = await connectToDatabase();
        const collection = db.collection('doctors');

        const existUsermail = await collection.findOne({ email });
        if (existUsermail) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const existUserphone = await collection.findOne({ Mobile: phone });
        if (existUserphone) {
            return res.status(400).json({ message: 'Mobile number already registered' });
        }

        const existUsername = await collection.findOne({ username });
        if (existUsername) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const confirmationToken = crypto.randomBytes(32).toString('hex');
        const hashedPswrd = await bcrypt.hash(password, saltRounds);

        await collection.insertOne({
            email,
            name,
            username,
            mobile: phone,
            password: hashedPswrd,
            confirmationToken,
            isActive: false , 
            isApproved: false,
            
        });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Account Confirmation',
            html: `<h3>Dear ${name},</h3>
                   <p>Please confirm your account by clicking the link below:</p>
                   <a href="http://localhost:5000/register/confirm/${confirmationToken}">Confirm Account</a>`
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Error sending email' });
            }
            res.status(200).json({ message: 'Signup successful! Please check your email for confirmation.' });
        });

    } catch (e) {
        console.error(`Error: ${e}`);
        res.status(500).json({ message: 'Internal server error' });
    } 
};

// Account Confirmation
exports.confirmAccount = async (req, res) => {
    const { token } = req.params;

    try {
        const db = await connectToDatabase();
        const collection = db.collection('doctors');

        const user = await collection.findOne({ confirmationToken: token });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        await collection.updateOne(
            { confirmationToken: token },
            { $set: { isActive: true }, $unset: { confirmationToken: "" } }
        );

        res.status(200).json({ message: 'Account confirmed successfully! You can now log in.' });
    } catch (e) {
        console.error(`Error: ${e}`);
        res.status(500).json({ message: 'Server error' });
    } 
};

exports.getDoctor = async(req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('doctors');
        const doctors = await collection.find({}, {
            projection: {
                _id: 1,
                name: 1,
                image: 1,
                qualification: 1,
                rating: 1
            }
        }).toArray();
        
        console.log(doctors)
        res.status(200).json({doctors})
    }
    catch(e){
        console.error(`Error: ${e}`);
        res.status(500).json({ message: 'Server error' });
    }
}