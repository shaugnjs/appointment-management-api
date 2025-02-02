// tests/appointments.test.js
const request = require('supertest');
const app = require('../src/app');
const Appointment = require('../src/models/Appointment');
const User = require('../src/models/User');
const Service = require('../src/models/Service');

describe('Appointment Endpoints', () => {
  let token;
  let serviceId;

  beforeEach(async () => {
    await Appointment.deleteMany({});
    await User.deleteMany({});
    await Service.deleteMany({});

    // Create test user and get token
    const user = await User.create({
      name: 'Test User',
      email: 'test@test.com',
      password: 'password123'
    });

    // Create test service
    const service = await Service.create({
      name: 'Test Service',
      duration: 30,
      price: 50,
      description: 'Test service description'
    });

    serviceId = service._id;

    // Login to get token
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password123'
      });

    token = res.body.data.token;
  });

  describe('POST /api/appointments', () => {
    it('should create a new appointment', async () => {
      const res = await request(app)
        .post('/api/appointments')
        .set('Authorization', `Bearer ${token}`)
        .send({
          serviceId: serviceId,
          appointmentDate: '2024-03-01T10:00:00.000Z',
          timeSlot: '10:00 AM'
        });
      expect(res.statusCode).toBe(201);
      expect(res.body.status).toBe('success');
    });
  });
});