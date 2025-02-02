// src/models/Service.js
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a service name'],
    trim: true,
    unique: true
  },
  duration: {
    type: Number,
    required: [true, 'Please add service duration in minutes']
  },
  price: {
    type: Number,
    required: [true, 'Please add service price']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);