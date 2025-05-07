const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables
const authMiddleware = require('./Middleware/authMiddleware');

//Appointments
const appointmentRoutes = require('./Routes/AppointmentRoutes');

// Create Express app
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors()); 
app.use(express.json()); // For parsing JSON requests
app.use('/api/appointments', authMiddleware, appointmentRoutes);

// Routes
app.use('/api/appointments', appointmentRoutes);

// Simple test route
app.get('/test', (req, res) => {
  res.send('MediSync API is running');
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`MongoDB connected on port ${PORT}`))
  .catch((err) => console.log(err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});