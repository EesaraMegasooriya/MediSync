import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5001/api/appointments"; // Update based on your backend URL

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    doctorName: "",
    date: "",
    day: "",
    time: "",
    location: "",
    note: "",
  });
  
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Appointment booked successfully!");
        setFormData({
          email: "",
          doctorName: "",
          date: "",
          day: "",
          time: "",
          location: "",
          note: "",
        });
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      setMessage("Failed to connect to the server");
    }

    setLoading(false);
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 w-full max-w-lg mx-auto rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">Book an Appointment</h2>

        {message && <p className="text-center text-red-600">{message}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Doctor Name:</label>
            <input
              type="text"
              name="doctorName"
              value={formData.doctorName}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
              min={new Date().toISOString().split("T")[0]} // Set minimum date to today
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block font-medium">Day:</label>
              <select
                name="day"
                value={formData.day}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>

            <div className="w-1/2">
              <label className="block font-medium">Time:</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-medium">Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Note:</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              rows="3"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add"}
          </button>
          
          <button
            type="button"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => navigate("/appointments")}

          >
            {"Back to Home"}         
            </button>
        </form>
      </div>
    </section>
  );
};

export default AppointmentForm;
