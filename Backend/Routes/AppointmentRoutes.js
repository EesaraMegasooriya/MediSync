const express = require('express');
const router = express.Router();
const AppointmentController = require('../Controllers/AppointmentController');
const authMiddleware = require('../Middleware/authMiddleware'); // You'll need to implement this

// All routes now require authentication
router.use(authMiddleware);
// POST: Create a new appointment
router.post('/', AppointmentController.AddAppointment);

// GET: Fetch all appointments
router.get('/', AppointmentController.GetAppointments);

// GET: Fetch a specific appointment by ID
router.get('/:id', AppointmentController.GetAppointmentById);

// PUT: Update an appointment by ID
router.put('/:id', AppointmentController.UpdateAppointment);

// DELETE: Delete an appointment by ID
router.delete('/:id', AppointmentController.DeleteAppointment);

// POST: Send a test reminder email for a specific appointment (by ID)
router.post('/test-reminder/:id', AppointmentController.SendTestReminder);

// POST: Send a test reminder email using form data (no appointment ID)
//router.post('/test-reminder', AppointmentController.SendTestReminderFromForm);

// POST: Manually trigger reminder job (e.g., daily reminder check)
router.post('/check-reminders', AppointmentController.CheckReminders);

module.exports = router;
