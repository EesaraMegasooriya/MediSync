// import express from 'express';
const express = require('express');

const {
    AddAppointment,
    GetAppointments,
    GetAppointmentById,
    DeleteAppointment,
    UpdateAppointment
} = require('../Controllers/AppointmentController.js');

const router = express.Router();

// POST: Add a new appointment
router.post('/', AddAppointment);

// GET: Fetch all appointments
router.get('/', GetAppointments);

// GET: Fetch a specific appointment by ID
router.get('/:id', GetAppointmentById);

// PUT: Update an appointment by ID
router.put('/:id', UpdateAppointment);

// DELETE: Remove an appointment by ID
router.delete('/:id', DeleteAppointment);

module.exports = router;
