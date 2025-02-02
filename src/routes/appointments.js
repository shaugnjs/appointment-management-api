// src/routes/appointments.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getUserAppointments,
  createAppointment,
  cancelAppointment
} = require('../controllers/appointmentController');

router.use(protect);

router.route('/')
  .get(getUserAppointments)
  .post(createAppointment);

router.delete('/:id', cancelAppointment);

module.exports = router;