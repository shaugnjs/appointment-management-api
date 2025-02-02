// src/config/jwt.js
const jwt = require('jsonwebtoken');

const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRE || '24h',
  options: {
    algorithm: 'HS256',
    issuer: 'appointment-system'
  }
};

module.exports = jwtConfig;