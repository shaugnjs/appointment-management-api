// src/middleware/admin.js
const isAdmin = (req, res, next) => {
    // Check if user exists and is admin
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({
        status: "error",
        message: 'Not authorized as admin'
      });
    }
    next();
  };
  
  module.exports = { isAdmin };