// src/middleware/validation.js
const { check, validationResult } = require('express-validator');

// Validation rules
const appointmentRules = [
  check('serviceId')
    .notEmpty()
    .withMessage('Service ID is required'),
  check('appointmentDate')
    .notEmpty()
    .withMessage('Appointment date is required')
    .isISO8601()
    .withMessage('Invalid date format'),
  check('timeSlot')
    .notEmpty()
    .withMessage('Time slot is required')
];

const serviceRules = [
  check('name')
    .notEmpty()
    .withMessage('Service name is required')
    .trim(),
  check('duration')
    .notEmpty()
    .withMessage('Duration is required')
    .isNumeric()
    .withMessage('Duration must be a number'),
  check('price')
    .notEmpty()
    .withMessage('Price is required')
    .isNumeric()
    .withMessage('Price must be a number'),
  check('description')
    .notEmpty()
    .withMessage('Description is required')
    .trim()
];

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      message: "Validation error",
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  appointmentRules,
  serviceRules,
  validate
};