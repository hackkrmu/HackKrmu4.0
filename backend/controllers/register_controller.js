const validator = require("validator");
const bcrypt = require("bcrypt");
const { connectToDatabase } = require('./db');
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();

const saltRounds = 10;


// Email Transport Initialization
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

exports.register = async (req, res) => {
    const { email, name, username, phone, password, cnfrm_password } = req.body;

    if (password !== cnfrm_password) {
        return res.status(202).json({ message: "Passwords Do Not Match" });
    }
    if (!validator.isEmail(email)) {
        return res.json({ message: "Invalid email format" });
    }
    if (!validator.isLength(phone, { min: 10, max: 10 })) {
        return res.json({ message: "Phone Number must be of 10 Digits" });
    }
    if (!validator.isLength(password, { min: 8 })) {
        return res.json({ message: "Password must be at least 8 characters long" });
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/g.test(password)) {
        return res.json({ message: "Password must contain at least one special character" });
    }
    if (!/[A-Z]/g.test(password)) {
        return res.json({ message: "Password must contain at least one Uppercase Letter" });
    }
    if (!/[a-z]/g.test(password)) {
        return res.json({ message: "Password must contain at least one Lowercase Letter" });
    }
    if (!/[0-9]/g.test(password)) {
        return res.json({ message: "Password must contain at least one Number" });
    }

    try {
        const db = await connectToDatabase();
        const collection = db.collection("users");

        const existUsermail = await collection.findOne({ email });
        if (existUsermail) {
            return res.status(400).json({ message: "User Already Exists" });
        }
        const existUserphone = await collection.findOne({ Mobile: phone });
        if (existUserphone) {
            return res.status(400).json({ message: "Mobile Number Already Registered" });
        }
        const existUsername = await collection.findOne({ username: username });
        if (existUsername) {
            return res.status(400).json({ message: "Username Already Taken" });
        }

        const confirmationToken = crypto.randomBytes(32).toString("hex");
        const hashedPswrd = await bcrypt.hash(password, saltRounds);

        await collection.insertOne({
            email,
            name,
            username,
            Mobile: phone,
            password: hashedPswrd,
            confirmationToken,
            isActive: false,
            isAdmin: false,
            skinType: null,
            role: "user",
        });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: "Account Confirmation",
            html: `<h3>Dear ${name},</h3>
                   <p>Please confirm your account by clicking the link below:</p>
                   <a href="${process.env.Hosted_URL}/register/confirm/${confirmationToken}">Confirm Account</a>`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: "Error sending email", messageType: "danger" });
            }
            res.status(200).json({ message: "Signup successful! Please check your email for confirmation.", messageType: "success" });
        });
    } catch (e) {
        console.log(`Error: ${e}`);
        res.status(500).json({ message: "Internal server error" });
    } 
};

exports.confirmRegistration = async (req, res) => {
    const { token } = req.params;
    try {
        const db = await connectToDatabase();
        const collection = db.collection("users");
        const user = await collection.findOne({ confirmationToken: token });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        await collection.updateOne({ confirmationToken: token }, { $set: { isActive: true }, $unset: { confirmationToken: "" } });
        res.status(200).json({ message: "Account confirmed successfully! You can now log in." });
    } catch (e) {
        console.log(`Error : ${e}`);
        res.status(500).json({ message: "Server Error" });
    } 
};
