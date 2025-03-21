const Appointment = require("../Models/AppointmentModel");

// @desc   Add a new appointment
// @route  POST /appointments
exports.AddAppointment = async (req, res) => {
    try {
        const { email, doctorName, date, day, time, location, note } = req.body;

        // Create a new appointment
        const newAppointment = new Appointment({
            email,
            doctorName,
            date,
            day,
            time,
            location,
            note,
        });

        await newAppointment.save();
        res.status(201).json({ message: "Appointment added successfully", appointment: newAppointment });
    } catch (error) {
        res.status(500).json({ message: "Failed to add appointment", error: error.message });
    }
};

// @desc   Get all appointments
// @route  GET /appointments
exports.GetAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ date: 1 });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch appointments", error: error.message });
    }
};

// @desc   Get a specific appointment by ID
// @route  GET /appointments/:id
exports.GetAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
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
        const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!updatedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.status(200).json({ message: "Appointment updated successfully", appointment: updatedAppointment });
    } catch (error) {
        res.status(500).json({ message: "Failed to update appointment", error: error.message });
    }
};

// @desc   Delete an appointment by ID
// @route  DELETE /appointments/:id
exports.DeleteAppointment = async (req, res) => {
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);

        if (!deletedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete appointment", error: error.message });
    }
};
