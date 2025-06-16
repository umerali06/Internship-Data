require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const mongoose = require('mongoose');
const Contact = require('./models/contact');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Input validation middleware
const validateInput = (req, res, next) => {
  const { name, email, phone, service, message } = req.body;
  
  if (!name || !email || !phone || !service || !message) {
    return res.status(400).json({ 
      message: 'All fields are required' 
    });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      message: 'Invalid email format' 
    });
  }

  next();
};

// Add this to check if environment variables are loaded
console.log('Email User:', process.env.EMAIL_USER ? 'Set' : 'Not Set');
console.log('Email Password:', process.env.EMAIL_PASSWORD ? 'Set' : 'Not Set');

app.post('/contact', validateInput, async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  try {
    // Save to database
    const contact = new Contact({
      name,
      email,
      phone,
      service,
      message
    });
    await contact.save();
    console.log('Contact saved to database');

    // Send email
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Service: ${service}
        Message: ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');

    res.status(200).json({ 
      message: 'Message sent and saved successfully!' 
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      message: 'Failed to process message.',
      error: error.message 
    });
  }
});

// Add a route to get all contacts
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: err.message 
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));