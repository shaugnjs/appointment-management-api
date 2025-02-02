// src/controllers/appointmentController.js
const Appointment = require('../models/Appointment');
const Service = require('../models/Service');

// @desc    Get all appointments (admin)
// @route   GET /api/admin/appointments
// @access  Admin
const getAllAppointments = async (req, res) => {
  try {
    const { sortBy, order } = req.query;
    let sort = {};
    
    if (sortBy && order) {
      sort[sortBy] = order === 'desc' ? -1 : 1;
    }

    const appointments = await Appointment.find()
      .sort(sort)
      .populate('userId', 'name email')
      .populate('serviceId', 'name duration price');

    res.json({
      status: "success",
      data: appointments
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};

// @desc    Get user appointments
// @route   GET /api/appointments
// @access  Private
const getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user._id })
      .populate('serviceId', 'name duration price');

    res.json({
      status: "success",
      data: appointments
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = async (req, res) => {
  try {
    const { serviceId, appointmentDate, timeSlot, notes } = req.body;

    // Check if service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        status: "error",
        message: 'Service not found'
      });
    }

    const appointment = await Appointment.create({
      userId: req.user._id,
      serviceId,
      appointmentDate,
      timeSlot,
      notes
    });

    res.status(201).json({
      status: "success",
      data: appointment
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};

// @desc    Update appointment status (admin)
// @route   PATCH /api/admin/appointments/:id
// @access  Admin
const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { 
        status,
        lastUpdated: Date.now()
      },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        status: "error",
        message: 'Appointment not found'
      });
    }

    res.json({
      status: "success",
      data: appointment
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};

// @desc    Cancel appointment
// @route   DELETE /api/appointments/:id
// @access  Private
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!appointment) {
      return res.status(404).json({
        status: "error",
        message: 'Appointment not found'
      });
    }

    appointment.status = 'cancelled';
    appointment.lastUpdated = Date.now();
    await appointment.save();

    res.json({
      status: "success",
      message: 'Appointment cancelled successfully'
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};

module.exports = {
  getAllAppointments,
  getUserAppointments,
  createAppointment,
  updateAppointmentStatus,
  cancelAppointment
};