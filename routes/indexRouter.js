const express = require('express');
const indexRouter = express.Router();
const transporter = require('../service/mail');

indexRouter.get('/', (req, res) => {
    res.render('home', {
        pageTitle: 'Welcome'
    });
});

indexRouter.get('/our-story', (req, res) => {
    res.render('our-story', {
        pageTitle: 'Our Story'
    });
});

indexRouter.get('/blog', (req, res) => {
    res.render('blog', {
        pageTitle: 'Blog'
    });
});

indexRouter.get('/blogs', (req, res) => {
    res.render('blogs', {
        pageTitle: 'Blog'
    });
});

indexRouter.get('/gallery', (req, res) => {
    res.render('gallery', {
        pageTitle: 'Gallery'
    });
});

indexRouter.get('/contact', (req, res) => {
    res.render('contact', {
        pageTitle: 'Contact'
    });
});

indexRouter.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    console.log('Request Body:', req.body); // Add this line to debug

    // Check if fields are empty
    if (!name || !email || !subject || !message) {
        console.log(`Error: some fields are empty`);
        return res.status(400).json({ error: 'All fields are required' });
    }

    const mailOptions = {
        from: process.env.EMAIL_ID,
        to: process.env.EMAIL_ID,
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            return res.status(500).json({ error: 'Error sending email' });
        }
        res.status(200).json({ message: 'Email sent: ' + info.response });
    });
});

module.exports = indexRouter;
