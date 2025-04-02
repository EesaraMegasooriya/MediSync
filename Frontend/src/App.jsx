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
        <Route path="/appointments" element={<HomeAppointment />} /> {/* HomeAppointment route */}
        <Route path="/appointmentform" element={<AppointmentForm />} /> {/* AppointmentForm route */}
        <Route path="/appointmentlist" element={<AppointmentList />} /> {/* AppointmentList route */}
        <Route path="/appointmentupdate/:id" element={<AppointmentUpdate />} /> {/* AppointmentUpdate route */}
        <Route path="/deleteappointment" element={<DeleteAppointment />} /> {/* DeleteAppointment route */}
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
