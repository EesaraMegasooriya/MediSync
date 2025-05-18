const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Route imports
const authMiddleware = require('./Middleware/authMiddleware');
const appointmentRoutes = require('./Routes/AppointmentRoutes');
const userRoutes = require('./Routes/UserRoute');
const PresRoutes = require('./Routes/PresRoute');
const doctorRoutes = require('./Routes/doctorRoute');
const medicationRoutes = require('./Routes/medicationRoute');

// Create Express app
const app = express();
const PORT = process.env.PORT || 5001;


// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/appointments', authMiddleware, appointmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/prescriptions', PresRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/medications', medicationRoutes);

// Simple test route
app.get('/test', (req, res) => {
  res.send('MediSync API is running');
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
