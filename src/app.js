// src/app.js
require('dotenv').config();
console.log('JWT_SECRET:', process.env.JWT_SECRET);

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const createAdminUser = require('./config/createAdmin');

// Import routes
const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/services');
const adminRoutes = require('./routes/admin');
const appointmentRoutes = require('./routes/appointments');

const app = express();

// Connect to database and create admin user
connectDB().then(() => {
    createAdminUser();
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/appointments', appointmentRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Appointment Management System API' });
});

// Test POST route
app.post('/test-post', (req, res) => {
    console.log('Body received:', req.body);
    res.json({
        message: 'Test post route',
        receivedBody: req.body
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: "error",
        message: "Something went wrong!"
    });
});

// Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});