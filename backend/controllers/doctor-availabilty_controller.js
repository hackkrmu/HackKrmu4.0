const { MongoClient, ObjectId } = require('mongodb');
const nodemailer = require('nodemailer');
require('dotenv').config();

const { connectToDatabase } = require('./db');


// Email configuration using Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

// 1. View Availability Schedule (Doctor Side)
exports.viewAvailability = async (req, res) => {
    const doctorId = req.user.id;

    if (req.role !== 'doctor') {
        return res.status(403).json({ message: 'Access denied. You are not a doctor.' });
    }

    try {
        const db = await connectToDatabase();
        const doctorsCollection = db.collection('users');

        const doctor = await doctorsCollection.findOne({ _id: new ObjectId(`${doctorId}`) });

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.status(200).json({ availability: doctor.availability });
    } catch (e) {
        console.error(`Error: ${e}`);
        res.status(500).json({ message: 'Error fetching availability' });
    } 
};

// 2. Add Availability Slots (Doctor Side)
exports.addAvailability = async (req, res) => {
    const { date, time } = req.body;
    const doctorId = req.user.id;
    const timeSlots = time.split(',').map(slot => slot.trim());

    if (req.role !== 'doctor') {
        return res.status(403).json({ message: 'Access denied. You are not a doctor.' });
    }

    try {
        const db = await connectToDatabase();

        const doctorsCollection = db.collection('doctors');

        await doctorsCollection.updateOne(
            { _id: new ObjectId(doctorId) },
            { $push: { availability: { date, time: timeSlots } } },
            { upsert: true }
        );

        res.status(200).json({ message: 'Availability slots added successfully' });
    } catch (e) {
        console.error(`Error: ${e}`);
        res.status(500).json({ message: 'Error adding availability slots' });
    } 
};

// 3. Book an Appointment (User Side)
exports.bookAppointment = async (req, res) => {
    const { doctorId, date, time } = req.body;
    const userId = req.user.id;

    try {
        const db = await connectToDatabase();

        const appointmentsCollection = db.collection('appointments');
        const doctorsCollection = db.collection('doctors');

        const existingAppointment = await appointmentsCollection.findOne({ doctorId, date, time });

        if (existingAppointment) {
            return res.status(400).json({ message: 'This time slot is already booked.' });
        }

        const newAppointment = {
            userId,
            doctorId,
            date,
            time,
            status: 'Pending',
            createdAt: new Date()
        };

        const result = await appointmentsCollection.insertOne(newAppointment);

        await doctorsCollection.updateOne(
            { _id: new ObjectId(doctorId), 'availability.date': date },
            { $pull: { 'availability.$.time': time } }
        );

        res.status(201).json({ message: 'Appointment booked successfully', appointmentId: result.insertedId });
    } catch (e) {
        console.error(`Error: ${e}`);
        res.status(500).json({ message: 'Error booking appointment' });
    } 
};

// 4. Confirm Appointment (Doctor Side)
exports.confirmAppointment = async (req, res) => {
    const { appointmentId } = req.body;
    const doctorId = req.user.id;

    if (req.role !== 'doctor') {
        return res.status(403).json({ message: 'Access denied. You are not a doctor.' });
    }

    try {
        const db = await connectToDatabase();

        const appointmentsCollection = db.collection('appointments');
        const appointment = await appointmentsCollection.findOne({ _id: ObjectId(appointmentId), doctorId });

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        await appointmentsCollection.updateOne(
            { _id: ObjectId(appointmentId) },
            { $set: { status: 'Confirmed' } }
        );

        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({ _id: ObjectId(appointment.userId) });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: user.email,
            subject: 'Appointment Confirmation',
            text: `Your appointment with Doctor ${doctorId} has been confirmed for ${appointment.date} at ${appointment.time}.`
        };

        transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Appointment confirmed and email sent' });
    } catch (e) {
        console.error(`Error: ${e}`);
        res.status(500).json({ message: 'Error confirming appointment' });
    } 
};

// 5. Withdraw Appointment (User Side)
exports.withdrawAppointment = async (req, res) => {
    const { appointmentId } = req.body;
    const userId = req.user.id;

    try {
        const db = await connectToDatabase();

        const appointmentsCollection = db.collection('appointments');

        const appointment = await appointmentsCollection.findOne({ _id: ObjectId(appointmentId), userId });

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found or unauthorized' });
        }

        await appointmentsCollection.updateOne(
            { _id: ObjectId(appointmentId) },
            { $set: { status: 'Withdrawn' } }
        );

        res.status(200).json({ message: 'Appointment withdrawn successfully' });
    } catch (e) {
        console.error(`Error: ${e}`);
        res.status(500).json({ message: 'Error withdrawing appointment' });
    } 
};

// 6. Close Appointment (Doctor Side)
exports.closeAppointment = async (req, res) => {
    const { appointmentId } = req.body;
    const doctorId = req.user.id;

    if (req.role !== 'doctor') {
        return res.status(403).json({ message: 'Access denied. You are not a doctor.' });
    }

    try {
        const db = await connectToDatabase();

        const appointmentsCollection = db.collection('appointments');

        const result = await appointmentsCollection.updateOne(
            { _id: ObjectId(appointmentId), doctorId: ObjectId(doctorId) },
            { $set: { status: 'Closed' } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Appointment not found or unauthorized' });
        }

        res.status(200).json({ message: 'Appointment closed successfully' });
    } catch (e) {
        console.error(`Error: ${e}`);
        res.status(500).json({ message: 'Error closing appointment' });
    } 
};

// 7. update availabilty 

// router.post('/availability/update', authMiddleware, async (req, res) => {
//     const { day, oldSlots, newSlots } = req.body;
//     const doctorId = req.user.id;

//     if (req.role !== 'doctor') {
//         return res.status(403).json({ message: 'Access denied. You are not a doctor.' });
//     }

//     try {
//         await client.connect();
//         const db = client.db(dbName);
//         const doctorsCollection = db.collection('doctors');

//         const result = await doctorsCollection.updateOne(
//             { _id: ObjectId(doctorId), 'availability.day': day },
//             { $set: { 'availability.$.slots': newSlots } }
//         );

//         if (result.modifiedCount === 0) {
//             return res.status(404).json({ message: 'Availability not found for the specified day' });
//         }

//         res.status(200).json({ message: 'Availability updated successfully' });
//     } catch (e) {
//         console.log(`Error: ${e}`);
//         res.status(500).json({ message: 'Error updating availability' });
//     } finally {
//         await client.close();
//     }
// });

exports.updateAvailability = async (req, res) => {
    const { day, oldSlots, newSlots } = req.body;
    const doctorId = req.user.id;

    if (req.role !== 'doctor') {
        return res.status(403).json({ message: 'Access denied. You are not a doctor.' });
    }

    try {
        const db = await connectToDatabase();

        const doctorsCollection = db.collection('doctors');

        const result = await doctorsCollection.updateOne(
            { _id: ObjectId(doctorId), 'availability.day': day },
            { $set: { 'availability.$.slots': newSlots } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Availability not found for the specified day' });
        }

        res.status(200).json({ message: 'Availability updated successfully' });
    } catch (e) {
        console.log(`Error: ${e}`);
        res.status(500).json({ message: 'Error updating availability' });
    } 
};