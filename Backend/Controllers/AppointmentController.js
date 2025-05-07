const Appointment = require("../Models/AppointmentModel");
const sendEmail = require("./mailSender");

// @desc   Add a new appointment
// @route  POST /appointments
exports.AddAppointment = async (req, res) => {
    try {
        const userId = req.user._id; 
        const { email, doctorName, date, day, time, location, note, sendReminders } = req.body;

        const newAppointment = new Appointment({
            userId,
            email,
            doctorName,
            date,
            day,
            time,
            location,
            note,
            sendReminders: sendReminders !== false, // default to true
            reminder_sent: sendReminders === true  // if reminders are enabled, mark as sent
        });

        await newAppointment.save();

        const emailSubject = 'MediSync: Your Appointment Details';
        const emailBody = `
Dear Patient,

Your appointment has been successfully booked!

APPOINTMENT DETAILS:
- Doctor: ${doctorName}
- Date: ${new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
- Time: ${time}
- Location: ${location}
${note ? `- Notes: ${note}` : ''}

REMINDER:
Please arrive 15 minutes before your scheduled appointment time.
If you need to reschedule or cancel, please contact us at least 24 hours in advance.

Thank you for choosing MediSync!
        `;

        await sendEmail(email, emailSubject, emailBody);

        res.status(201).json({
            message: "Appointment added successfully and email sent",
            appointment: newAppointment
        });
    } catch (error) {
        console.error("Error in AddAppointment:", error);
        res.status(500).json({ message: "Failed to add appointment", error: error.message });
    }
};

// @desc   Get all appointments
// @route  GET /appointments
exports.GetAppointments = async (req, res) => {
    try {
        const userId = req.user._id;
        const appointments = await Appointment.find().sort({userId});
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch appointments", error: error.message });
    }
};

// @desc   Get a specific appointment by ID
// @route  GET /appointments/:id
exports.GetAppointmentById = async (req, res) => {
    try {
        const userId = req.user._id;
        const appointment = await Appointment.findOne({ _id: req.params.id, userId });
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch appointment", error: error.message });
    }
};

// @desc   Update an appointment by ID
// @route  PUT /appointments/:id
exports.UpdateAppointment = async (req, res) => {
    try {
        const userId = req.user._id;
        const oldAppointment = await Appointment.findOne({ _id: req.params.id, userId });
        if (!oldAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        const significantChanges =
            oldAppointment.date.toISOString() !== new Date(req.body.date).toISOString() ||
            oldAppointment.time !== req.body.time ||
            oldAppointment.doctorName !== req.body.doctorName ||
            oldAppointment.location !== req.body.location;

        if (significantChanges) {
            const emailSubject = 'MediSync: Appointment Updated';
            const emailBody = `
Dear Patient,

Your appointment has been updated.

New Details:
- Doctor: ${updatedAppointment.doctorName}
- Date: ${new Date(updatedAppointment.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
- Time: ${updatedAppointment.time}
- Location: ${updatedAppointment.location}
${updatedAppointment.note ? `- Notes: ${updatedAppointment.note}` : ''}

${updatedAppointment.sendReminders ? 'You will receive a reminder email one day before your appointment.' : 'You have opted out of reminder emails.'}

Thank you for choosing MediSync!
            `;

            await sendEmail(updatedAppointment.email, emailSubject, emailBody);

            if (
                oldAppointment.date.toISOString() !== new Date(req.body.date).toISOString() ||
                oldAppointment.time !== req.body.time
            ) {
                updatedAppointment.reminder_sent = false;
                await updatedAppointment.save();
            }
        }

        res.status(200).json({
            message: "Appointment updated successfully",
            appointment: updatedAppointment,
            emailSent: significantChanges
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to update appointment", error: error.message });
    }
};

// @desc   Delete an appointment by ID
// @route  DELETE /appointments/:id
exports.DeleteAppointment = async (req, res) => {
    try {
        const userId = req.user._id;
        const deletedAppointment = await Appointment.findOne({ _id: req.params.id, userId });

        if (!deletedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        const emailSubject = 'MediSync: Appointment Cancelled';
        const emailBody = `
Dear Patient,

Your appointment has been cancelled.

Cancelled Appointment Details:
- Doctor: ${deletedAppointment.doctorName}
- Date: ${new Date(deletedAppointment.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
- Time: ${deletedAppointment.time}

If this was not intended, please contact our support team.

Thank you for choosing MediSync!
        `;

        await sendEmail(deletedAppointment.email, emailSubject, emailBody);

        res.status(200).json({
            message: "Appointment deleted successfully and cancellation email sent"
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete appointment", error: error.message });
    }
};

// @desc   Send test reminder email
// @route  POST /appointments/test-reminder/:id
exports.SendTestReminder = async (req, res) => {
    try {const userId = req.user._id;
        const appointment = await Appointment.findOne({ _id: req.params.id, userId });

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        const emailSubject = 'MediSync: Appointment Reminder (TEST)';
        const emailBody = `
Dear Patient,

This is a TEST reminder about your upcoming appointment:

Doctor: ${appointment.doctorName}
Date: ${new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
Time: ${appointment.time}
Location: ${appointment.location}
${appointment.note ? `Additional Notes: ${appointment.note}` : ''}

Please arrive 15 minutes before your scheduled time.

Thank you for choosing MediSync!
        `;

        const result = await sendEmail(appointment.email, emailSubject, emailBody);

        res.status(200).json({
            message: result ? "Test reminder email sent successfully" : "Failed to send test reminder email",
            success: result
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to send test reminder", error: error.message });
    }
};

// @desc   Manually trigger reminders check
// @route  POST /appointments/check-reminders
exports.CheckReminders = async (req, res) => {
    try {
        const { sendReminderEmails } = require('../reminderJob');
        await sendReminderEmails();

        res.status(200).json({ message: "Reminder check triggered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to check reminders", error: error.message });
    }
};
