import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import React Router v6 components
import Header from './components/Header';
import Home from './components/Home';
// import ChatBot from './components/ChatBot/ChatBot';
import Tracker from './components/MediTracker/Tracker';
import AddPrescriptions from './components/MediTracker/AddPrescriptions';
3

import './App.css';

// ScrollToTop component (optional)
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

        <Route path="/tracker" element={<Tracker />} /> {/* Tracker route */}
        <Route path="/add-prescriptions" element={<AddPrescriptions />} /> {/* AddPrescriptions route */}
        {/* <Route path="/chatbot" element={<ChatBot />} /> ChatBot route */}
        
        
        
      </Routes>
    </Router>
  );
}

export default App;
