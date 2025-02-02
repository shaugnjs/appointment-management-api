// src/utils/validators.js
const isValidEmail = (email) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };
  
  const isValidDate = (date) => {
    const d = new Date(date);
    return d instanceof Date && !isNaN(d);
  };
  
  const isWorkingHours = (timeSlot) => {
    const hour = parseInt(timeSlot.split(':')[0]);
    return hour >= 9 && hour <= 17; // 9 AM to 5 PM
  };
  
  const sanitizeInput = (input) => {
    return input.trim().replace(/[<>]/g, '');
  };
  
  module.exports = {
    isValidEmail,
    isValidDate,
    isWorkingHours,
    sanitizeInput
  };