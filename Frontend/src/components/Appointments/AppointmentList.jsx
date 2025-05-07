import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaPlus, FaEdit, FaTrash, FaFilePdf, FaFileCsv, FaSearch } from "react-icons/fa";

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
        const token = localStorage.getItem('token');
        const response = await fetch(API_URL, {
          headers: {
            "Authorization": `Bearer ${token}`
        }
      });
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

  // Filter upcoming appointments based on search
  const filteredAppointments = appointments
    .filter((a) => new Date(a.date) >= new Date()) // Show only upcoming ones
    .filter(
      (appointment) =>
        appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Delete appointment
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;

    try {
      const response = await fetch(`${API_URL}${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete appointment");

      setAppointments(appointments.filter((appointment) => appointment._id !== id));
      alert("Appointment deleted successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  // Generate PDF Report - Enhanced to include email and reminder status
  const generatePDF = () => {
    if (filteredAppointments.length === 0) {
      alert("No matching appointments to generate a report.");
      return;
    }

    const doc = new jsPDF();
    
    // Add title and metadata
    doc.setFontSize(20);
    doc.setTextColor(0, 51, 102);
    doc.text("Medical Appointments Report", 14, 22);
    
    doc.setFontSize(11);
    doc.setTextColor(102, 102, 102);
    doc.text(`Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 14, 30);
    
    // Define table columns
    const tableColumn = ["Email", "Doctor", "Date", "Day", "Time", "Location", "Note", "Reminder Status"];
    const tableRows = [];

    filteredAppointments.forEach((appointment) => {
      const formattedDate = new Date(appointment.date).toLocaleDateString();
      
      // Ensure note is not too long for PDF
      const truncatedNote = appointment.note?.length > 20 
        ? appointment.note.substring(0, 20) + "..." 
        : appointment.note || "";
        
      // Determine reminder status
      const reminderStatus = appointment.reminder_sent ? "Sent" : 
      (appointment.sendReminders ? "Scheduled" : "Disabled");
      
      tableRows.push([
        appointment.email,
        appointment.doctorName,
        formattedDate,
        appointment.day,
        appointment.time,
        appointment.location,
        truncatedNote,
        reminderStatus
      ]);
    });

    // Create the table with styling
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { 
        fillColor: [66, 139, 202],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      },
      columnStyles: {
        0: { cellWidth: 'auto' }, // Email
        1: { cellWidth: 'auto' }, // Doctor
        2: { cellWidth: 'auto' }, // Date
        3: { cellWidth: 'auto' }, // Day
        4: { cellWidth: 'auto' }, // Time
        5: { cellWidth: 'auto' }, // Location
        6: { cellWidth: 'auto' }, // Note
        7: { cellWidth: 'auto' }  // Reminder Status
      }
    });
    
    // Add footer with appointment count
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(150);
      
      // Footer text
      const totalAppointments = `Total Appointments: ${filteredAppointments.length}`;
      const pageInfo = `Page ${i} of ${pageCount}`;
      
      // Position footer elements
      doc.text(totalAppointments, 14, doc.internal.pageSize.height - 10);
      doc.text(pageInfo, doc.internal.pageSize.width - 45, doc.internal.pageSize.height - 10);
    }
    
    doc.save("Appointment_Report.pdf");
  };

  // Generate CSV Report
  const generateCSV = () => {
    if (filteredAppointments.length === 0) {
      alert("No matching appointments to generate a report.");
      return;
    }

    // Properly escape CSV fields to handle commas within fields
    const escapeCSV = (text) => {
      if (text === null || text === undefined) return '';
      text = text.toString();
      if (text.includes(',') || text.includes('\n') || text.includes('"')) {
        return `"${text.replace(/"/g, '""')}"`;
      }
      return text;
    };

    const headers = ["Email", "Doctor", "Date", "Day", "Time", "Location", "Note", "Reminder Status"];
    
    const csvRows = [
      headers.join(',')
    ];
    
    filteredAppointments.forEach(appointment => {
      const formattedDate = new Date(appointment.date).toLocaleDateString();
      
      // Determine reminder status
      const reminderStatus = appointment.reminder_sent ? "Sent" : 
                            (appointment.sendReminders ? "Scheduled" : "Disabled");
      
      const row = [
        escapeCSV(appointment.email),
        escapeCSV(appointment.doctorName),
        escapeCSV(formattedDate),
        escapeCSV(appointment.day),
        escapeCSV(appointment.time),
        escapeCSV(appointment.location),
        escapeCSV(appointment.note),
        escapeCSV(reminderStatus)
      ].join(',');
      csvRows.push(row);
    });

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Appointment_Report.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 mt-20">Appointments List</h2>

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
                <th className="border p-2">Email</th>
                <th className="border p-2">Doctor</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Day</th>
                <th className="border p-2">Time</th>
                <th className="border p-2">Location</th>
                <th className="border p-2">Reminder</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <tr key={appointment._id} className="border hover:bg-gray-100">
                    <td className="border p-2">{appointment.email}</td>
                    <td className="border p-2">{appointment.doctorName}</td>
                    <td className="border p-2">
                      {new Date(appointment.date).toLocaleDateString()}
                    </td>
                    <td className="border p-2">{appointment.day}</td>
                    <td className="border p-2">{appointment.time}</td>
                    <td className="border p-2">{appointment.location}</td>
                    <td className="border p-2 text-center">
                      {appointment.reminder_sent ? (
                        <span className="text-blue-600 font-semibold">✉️ Sent</span>
                      ) : appointment.sendReminders ? (
                        <span className="text-green-600 font-semibold">✅ Scheduled</span>
                      ) : (
                        <span className="text-orange-600 font-semibold">❌ Disabled</span>
                      )}
                    </td>
                    <td className="border p-2 flex space-x-2">
                      <button
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
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
                  <td colSpan="8" className="text-center p-4 text-gray-500">
                    No appointments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="text-center mt-4 flex justify-center space-x-4">
        <button
          onClick={generatePDF}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition"
          disabled={filteredAppointments.length === 0}
        >
          <FaFilePdf className="mr-2" /> Download PDF Report
        </button>

        <button
          onClick={generateCSV}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-orange-700 transition"
          disabled={filteredAppointments.length === 0}
        >
          <FaFileCsv className="mr-2" /> Download CSV Report
        </button>
      </div>
    </div>
  );
};




export default AppointmentList;