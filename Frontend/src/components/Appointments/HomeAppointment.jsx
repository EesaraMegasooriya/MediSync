import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookImg from "../../assets/book i.png";
import HealthCare from "../../assets/healthcare.png";
import Calender from "../../assets/calender.png";
import Home from '../Home';

const HomeAppointment = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]); // State to hold the appointment data

  // Fetch appointments from the backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/appointments"); // Your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();
        setAppointments(data); // Set appointments in state
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="flex flex-col items-center bg-[#F1F5FE] min-h-screen p-10">
   
      <div className="w-full max-w-5xl flex justify-center mb-6">
        <img
          src={BookImg}
          alt="Appointment"
          className="w-full h-auto max-h-[500px] object-cover rounded-lg"
        />
      </div>

      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-4xl font-bold text-[#2979FF] flex items-center gap-2">
          APPOINTMENT AND REMINDERS <span role="img" aria-label="health"></span>
        </h1>
        <img
          src={HealthCare}
          alt="Healthcare"
          className="w-[50px] h-[50px] object-cover rounded-lg"
        />
      </div>

      <p className="text-lg text-gray-700 text-center max-w-2xl mb-8">
        The appointment system in MediSync provides a hassle-free way for
        patients to schedule medical consultations.
      </p>

      {/* Display appointments if fetched */}
      {/* <div className="w-full max-w-4xl mb-6">
        <h2 className="text-2xl font-bold text-[#2979FF] mb-4">Upcoming Appointments</h2>
        {appointments.length > 0 ? (
          <ul className="list-none space-y-4">
            {appointments.map((appointment) => (
              <li
                key={appointment.id}
                className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
              >
                <span className="text-lg font-semibold">{appointment.doctorName}</span>
                <span>{appointment.date} at {appointment.time}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming appointments.</p>
        )}
      </div> */}

      <div className="flex flex-col md:flex-row items-center gap-10 w-full max-w-4xl">
        <div className="flex flex-col items-center w-full max-w-sm">
          <button
            className="bg-[#2979FF] text-white px-6 py-3 w-full rounded-xl text-lg shadow-md hover:bg-[#1E5FC3] transition mb-4"
            onClick={() => navigate("/appointmentform")}
          >
            Add Appointment
          </button>
          <button
            className="bg-[#2979FF] text-white px-6 py-3 w-full rounded-xl text-lg shadow-md hover:bg-[#1E5FC3] transition"
            onClick={() => navigate("/appointmentlist")}
          >
            View Appointment
          </button>
        </div>

        <div className="w-full max-w-md flex justify-center">
          <img
            src={Calender}
            alt="Calendar"
            className="w-full max-w-[450px] h-auto object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeAppointment;
