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

indexRouter.post('/contact', async (req, res) => {
    const { name, email, subject, message, 'g-recaptcha-response': recaptchaResponse } = req.body;

    console.log('Request Body:', req.body); // Add this line to debug

    // Check if fields are empty
    if (!name || !email || !subject || !message || !recaptchaResponse) {
        console.log(`Error: some fields are empty`);
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Dynamic import of node-fetch
    const fetch = (await import('node-fetch')).default;

    // Verify reCAPTCHA
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`;

    try {
        const response = await fetch(verificationUrl, { method: 'POST' });
        const verification = await response.json();

        if (!verification.success) {
            console.log('reCAPTCHA verification failed:', verification);
            return res.status(400).json({ error: 'reCAPTCHA verification failed' });
        }

        const mailOptions = {
            from: process.env.EMAIL_ID,
            to: process.env.EMAIL_ID,
            subject: subject,
            text: `New enquiry on Rose Haven Website\n\nFrom: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: `
                <h1>New enquiry on Rose Haven Website</h1><br>
                <p><strong>From:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong> ${message}</p>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                return res.status(500).json({ error: 'Error sending email' });
            }
            res.status(200).json({ message: 'Email sent: ' + info.response });
        });

    } catch (error) {
        console.log('Error verifying reCAPTCHA:', error);
        res.status(500).json({ error: 'Error verifying reCAPTCHA' });
    }
});

module.exports = indexRouter;
