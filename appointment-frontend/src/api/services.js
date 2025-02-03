// src/api/services.js
import api from './axios';

export const serviceApi = {
  getAllServices: () => api.get('/services'),
  createService: (data) => api.post('/admin/services', data),
  updateService: (id, data) => api.put(`/admin/services/${id}`, data),
  deleteService: (id) => api.delete(`/admin/services/${id}`),
};

export const appointmentApi = {
  getMyAppointments: () => api.get('/appointments'),
  createAppointment: (data) => api.post('/appointments', data),
  cancelAppointment: (id) => api.delete(`/appointments/${id}`),
  getAllAppointments: () => api.get('/admin/appointments'),
  updateAppointmentStatus: (id, status) => 
    api.patch(`/admin/appointments/${id}`, { status }),
};