<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import React Router v6 components
import AppointmentForm from "./components/Appointments/AppointmentForm";
import AppointmentList from "./components/Appointments/AppointmentList";
import AppointmentUpdate from "./components/Appointments/AppointmentUpdate";
import HomeAppointment from "./components/Appointments/HomeAppointment";
import DeleteAppointment from "./components/Appointments/DeleteAppointment";
import Header from './components/Header';
import Home from './components/Home';
import './App.css';
import React from 'react';
import AboutUs from './components/AboutUs/AboutUs';

=======
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import React Router v6 components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import ChatBot from './components/ChatBot';
import Tracker from './components/MediTracker/Tracker';
import AddPrescriptions from './components/MediTracker/AddPrescriptions';
import PrescriptionHistory from './components/MediTracker/PrescriptionHistory';

import Login from './components/User/Login';
import Register from './components/User/Register';
import Profile from './components/User/Profile';
import './App.css';

// ScrollToTop component (optional)
>>>>>>> 754758db9095cb09684e49d5ff76f0447d9d732c
const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* Scrolls to the top whenever a new route is accessed */}
      <Header />
      <Routes> {/* React Router v6 uses Routes */}
        <Route path="/" element={<Home />} /> {/* Home route */}
<<<<<<< HEAD
        <Route path="/appointments" element={<HomeAppointment />} /> {/* HomeAppointment route */}
        <Route path="/appointmentform" element={<AppointmentForm />} /> {/* AppointmentForm route */}
        <Route path="/appointmentlist" element={<AppointmentList />} /> {/* AppointmentList route */}
        <Route path="/appointmentupdate/:id" element={<AppointmentUpdate />} /> {/* AppointmentUpdate route */}
        <Route path="/deleteappointment" element={<DeleteAppointment />} /> {/* DeleteAppointment route */}
        <Route path="/about" element={<AboutUs />} />
      </Routes>
=======
        <Route path="/login" element={<Login />} /> {/* Login route */}
        <Route path="/register" element={<Register />} /> {/* Register route */}
        <Route path="/profile" element={<Profile />} /> {/* Profile route */}
        <Route path="/tracker" element={<Tracker />} /> {/* Tracker route */}
        <Route path="/add-prescriptions" element={<AddPrescriptions />} /> {/* AddPrescriptions route */}
        <Route path="/chatbot" element={<ChatBot />} /> 
        <Route path="/prescription-history" element={<PrescriptionHistory />} />

        
        
        
      </Routes>
      <Footer />
>>>>>>> 754758db9095cb09684e49d5ff76f0447d9d732c
    </Router>
  );
}

export default App;
