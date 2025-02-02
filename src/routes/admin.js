// src/routes/admin.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { isAdmin } = require('../middleware/admin');
const { getDashboardStats } = require('../controllers/adminController');
const { 
  addService, 
  updateService, 
  deleteService 
} = require('../controllers/serviceController');
const {
  getAllAppointments,
  updateAppointmentStatus
} = require('../controllers/appointmentController');

// Apply both protection middlewares for all admin routes
router.use(protect); // First check if user is authenticated
router.use(isAdmin); // Then check if user is admin

// Dashboard route
router.get('/dashboard', getDashboardStats);

// Service routes
router.post('/services', addService);
router.put('/services/:id', updateService);
router.delete('/services/:id', deleteService);

// Appointment routes
router.get('/appointments', getAllAppointments);
router.patch('/appointments/:id', updateAppointmentStatus);

module.exports = router;