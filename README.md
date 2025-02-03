# Appointment Management System

A full-stack appointment booking system built with Node.js/Express.js backend and React frontend.

## Features

- User Authentication (JWT)
- Role-based access (Admin/Customer)
- Service Management
- Appointment Booking System
- Admin Dashboard with sorting capabilities
- Responsive Design

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Mongoose

### Frontend
- React
- React Router DOM
- Tailwind CSS
- Axios

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- Git

### Installation

1. Clone the repository

git clone (https://github.com/shaugnjs/appointment-management-api)

Backend Setup

cd appointment-system
npm install
# Create .env file with:
# PORT=3000
# MONGODB_URI=mongodb://localhost:27017/appointment-system
# JWT_SECRET=your_jwt_secret_key
# JWT_EXPIRE=24h
npm run dev

Frontend Setup

cd appointment-frontend
npm install
npm run dev
API Endpoints
Auth Routes

POST /api/auth/register - Register new customer
POST /api/auth/login - Login
POST /api/auth/logout - Logout

Customer Routes

GET /api/appointments - Get user appointments
POST /api/appointments - Create appointment
DELETE /api/appointments/:id - Cancel appointment

Admin Routes

GET /api/admin/appointments - Get all appointments
PATCH /api/admin/appointments/:id - Update appointment status
POST /api/admin/services - Add new service
PUT /api/admin/services/:id - Update service
DELETE /api/admin/services/:id - Delete service