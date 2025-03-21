
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
// const userRoutes = require('./Routes/UserRoute'); // Import routes
dotenv.config(); // Load environment variables

//Appoinments
const appoinmentRoutes = require('./Routes/AppointmentRoutes');


const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON requests

// UserRoutes
// app.use('/api/users', userRoutes); // Use the user routes
app.use('/api/appointments', appoinmentRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`MongoDB connected on port ${PORT}`))
  .catch((err) => console.log(err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
