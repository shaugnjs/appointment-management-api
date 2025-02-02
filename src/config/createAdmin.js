// src/config/createAdmin.js
const User = require('../models/User');

const createAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@admin.com' });
    
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@admin.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Admin user created successfully');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

module.exports = createAdminUser;