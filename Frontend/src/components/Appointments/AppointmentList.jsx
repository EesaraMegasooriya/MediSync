import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaPlus, FaEdit, FaTrash, FaFilePdf, FaSearch } from "react-icons/fa";

const API_URL = "http://localhost:5001/api/appointments/"; 

const AppointmentList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch appointments from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch appointments");

        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Filter appointments based on search
  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete appointment
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete appointment");

      setAppointments(appointments.filter((appointment) => appointment._id !== id));
      alert("Appointment deleted successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  // Generate PDF Report
  const generatePDF = () => {
    if (filteredAppointments.length === 0) {
      alert("No matching appointments to generate a report.");
      return;
    }

    const doc = new jsPDF();
    doc.text("Appointment Report", 20, 10);

    const tableColumn = ["Email", "Doctor", "Date", "Day", "Time", "Location", "Note"];
    const tableRows = [];

    filteredAppointments.forEach((appointment) => {
      tableRows.push([
        appointment.email,
        appointment.doctorName,
        appointment.date,
        appointment.day,
        appointment.time,
        appointment.location,
        appointment.note,
      ]);
    });

    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });
    doc.save("Appointment_Report.pdf");
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Appointments List</h2>

      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search Doctor or Location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[299px] h-[59.2px] pl-10 p-2 border rounded-tl-lg rounded-br-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition"
          onClick={() => navigate("/appointmentform")}
        >
          <FaPlus className="mr-2" /> Add Appointment
        </button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Doctor</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Day</th>
                <th className="border p-2">Time</th>
                <th className="border p-2">Location</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <tr key={appointment._id} className="border hover:bg-gray-100">
                    <td className="border p-2">{appointment.doctorName}</td>
                    <td className="border p-2">
                      {new Date(appointment.date).toLocaleDateString('en-CA')} {/* Format as YYYY-MM-DD */}
                    </td>
                    <td className="border p-2">{appointment.day}</td>
                    <td className="border p-2">{appointment.time}</td>
                    <td className="border p-2">{appointment.location}</td>
                    <td className="border p-2 flex space-x-2">
                      <button
                        className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                        onClick={() => navigate(`/appointmentupdate/${appointment._id}`)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                        onClick={() => handleDelete(appointment._id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    No appointments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="text-center mt-4">
        <button
          onClick={generatePDF}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-green-700 transition"
        >
          <FaFilePdf className="mr-2" /> Generate Report
        </button>
      </div>
    </div>
  );
};

export default AppointmentList;
