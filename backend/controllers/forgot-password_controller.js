const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const validator = require('validator');
require('dotenv').config();

const saltRounds = 10; // Define salt rounds for bcrypt hashing
const { connectToDatabase } = require('./db');
 

// Email Transport Initialization
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

// Connect to MongoDB


// Forgot Password Handler
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');
        const user = await collection.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Email not found' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedResetToken = await bcrypt.hash(resetToken, saltRounds);
        const resetTokenExpiry = Date.now() + 3600000; // 1-hour expiration

        await collection.updateOne(
            { email },
            { $set: { resetToken: hashedResetToken, resetTokenExpiry } }
        );

        // Send reset email
        const resetUrl = `${process.env.Hosted_URL}/reset-password?token=${resetToken}&email=${email}`;
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Password Reset',
            html: `<p>Click the following link to reset your password:</p><p><a href="${resetUrl}">Click Here</a></p>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Error sending email' });
            }
            res.status(200).json({ message: 'Password reset link sent to your email' });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Reset Password Handler
exports.resetPassword = async (req, res) => {
    const { token, email } = req.query;
    const { password, confrmpass } = req.body;

    console.log(`Token: ${token}, Email: ${email}`);

    if (password !== confrmpass) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (!validator.isLength(password, { min: 8 })) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    try {
        const db = client.db(dbName);
        const collection = db.collection('users');
        const user = await collection.findOne({ email });

        if (!user || !user.resetToken || !user.resetTokenExpiry) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        const isTokenValid = await bcrypt.compare(token, user.resetToken);

        if (!isTokenValid || Date.now() > user.resetTokenExpiry) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await collection.updateOne(
            { email },
            { $set: { password: hashedPassword }, $unset: { resetToken: "", resetTokenExpiry: "" } }
        );

        res.status(200).json({ message: "Password changed successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
