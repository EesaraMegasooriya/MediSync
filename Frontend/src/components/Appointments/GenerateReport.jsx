import React, { useState, useEffect } from "react";
import GenerateReport from "./GenerateReport";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/appointments"); // Replace with your backend URL
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();
        setAppointments(data); // Set the fetched data in state
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []); // Run once when the component mounts

  return (
    <div>
      <h1 className="text-center text-2xl font-semibold">Appointment List</h1>
      
      {/* Show GenerateReport button only if there are appointments */}
      {appointments.length > 0 ? (
        <GenerateReport appointments={appointments} />
      ) : (
        <p>No appointments available to generate a report.</p>
      )}
    </div>
  );
};

export default AppointmentList;
