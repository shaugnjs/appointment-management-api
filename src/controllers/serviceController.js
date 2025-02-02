// src/controllers/serviceController.js
const Service = require('../models/Service');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true });
    res.json({
      status: "success",
      data: services
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};

// @desc    Add new service
// @route   POST /api/admin/services
// @access  Admin
const addService = async (req, res) => {
  try {
    const { name, duration, price, description } = req.body;
    
    const service = await Service.create({
      name,
      duration,
      price,
      description
    });

    res.status(201).json({
      status: "success",
      data: service
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};

// @desc    Update service
// @route   PUT /api/admin/services/:id
// @access  Admin
const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({
        status: "error",
        message: 'Service not found'
      });
    }

    res.json({
      status: "success",
      data: service
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};

// @desc    Delete service
// @route   DELETE /api/admin/services/:id
// @access  Admin
const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({
        status: "error",
        message: 'Service not found'
      });
    }

    res.json({
      status: "success",
      message: 'Service deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};

module.exports = {
  getAllServices,
  addService,
  updateService,
  deleteService
};