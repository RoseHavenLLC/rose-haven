const nodemailer = require('nodemailer');
require('dotenv').config();

let transporter = nodemailer.createTransport({
    host: "smtp.zoho.in",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS,
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.log('Error connecting to email server:', error);
    } else {
        console.log('Server is ready to take our messages:', success);
    }
});

module.exports = transporter;
