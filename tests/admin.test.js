// tests/admin.test.js
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');
const Service = require('../src/models/Service');

describe('Admin Endpoints', () => {
  let adminToken;

  beforeEach(async () => {
    await User.deleteMany({});
    await Service.deleteMany({});

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@test.com',
      password: 'admin123',
      role: 'admin'
    });

    // Login to get admin token
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'admin123'
      });

    adminToken = res.body.data.token;
  });

  describe('POST /api/admin/services', () => {
    it('should create a new service', async () => {
      const res = await request(app)
        .post('/api/admin/services')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Test Service',
          duration: 30,
          price: 50,
          description: 'Test service description'
        });
      expect(res.statusCode).toBe(201);
      expect(res.body.status).toBe('success');
    });
  });
});