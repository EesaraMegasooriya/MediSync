import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

// Common
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import './App.css';
import AboutUs from './components/AboutUs/AboutUs';

// Appointment Components
import AppointmentForm from "./components/Appointments/AppointmentForm";
import AppointmentList from "./components/Appointments/AppointmentList";
import AppointmentUpdate from "./components/Appointments/AppointmentUpdate";
import HomeAppointment from "./components/Appointments/HomeAppointment";
import DeleteAppointment from "./components/Appointments/DeleteAppointment";

// MediTracker Components
import Tracker from './components/MediTracker/Tracker';
import AddPrescriptions from './components/MediTracker/AddPrescriptions';
import PrescriptionHistory from './components/MediTracker/PrescriptionHistory';

// User/Auth Components
import Login from './components/User/Login';
import Register from './components/User/Register';
import Profile from './components/User/Profile';

// ChatBot
import ChatBot from './components/ChatBot';

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Appointment routes */}
        <Route path="/appointments" element={<HomeAppointment />} />
        <Route path="/appointmentform" element={<AppointmentForm />} />
        <Route path="/appointmentlist" element={<AppointmentList />} />
        <Route path="/appointmentupdate/:id" element={<AppointmentUpdate />} />
        <Route path="/deleteappointment" element={<DeleteAppointment />} />
        <Route path="/about" element={<AboutUs />} />

        {/* Auth and user */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        {/* MediTracker */}
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/add-prescriptions" element={<AddPrescriptions />} />
        <Route path="/prescription-history" element={<PrescriptionHistory />} />

        {/* Other */}
        <Route path="/chatbot" element={<ChatBot />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
