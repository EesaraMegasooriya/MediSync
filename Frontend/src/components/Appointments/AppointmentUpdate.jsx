import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import AppointmentImage from "../../assets/book app.jpg";

const API_URL = "http://localhost:5001/api/appointments"; // Update based on your backend URL

const AppointmentUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    doctorName: "",
    date: "",
    day: "",
    time: "",
    location: "",
    note: "",
  });

  const [emailError, setEmailError] = useState(null); // Track email error
  const [loading, setLoading] = useState(false);

  // Email validation regex
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  // Fetch appointment data by ID
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch appointment data");
        }
        const data = await response.json();
        
        // Format date correctly for input field
        const formattedDate = new Date(data.date).toISOString().split('T')[0];

        // Convert stored date to correct weekday
        const selectedDate = new Date(data.date);
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const correctDay = weekdays[selectedDate.getDay()];


        setFormData({ ...data, date: formattedDate, day: correctDay });
      } catch (error) {
        console.error("Error fetching appointment:", error);
      }
    };

    fetchAppointment();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "date") {
      const selectedDate = new Date(value);
      const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const correctDay = weekdays[selectedDate.getDay()];

      setFormData({ ...formData, date: value, day: correctDay });
    } else if (name === "email") {
      setFormData({ ...formData, email: value.toLowerCase() });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Validate email when input is blurred
  const handleBlur = () => {
    if (!emailRegex.test(formData.email)) {
      setEmailError("Please enter a valid email address (lowercase only).");
    } else {
      setEmailError(null);
    }
  };

  // Handle form submission (Update appointment)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailRegex.test(formData.email)) {
      return Swal.fire("Invalid Email", "Please enter a valid email address.", "error");
    }
    if (formData.doctorName.length < 3) {
      return Swal.fire("Invalid Doctor Name", "Doctor's name must be at least 3 characters.", "error");
    }
    if (formData.location.length < 5) {
      return Swal.fire("Invalid Location", "Location must be at least 5 characters.", "error");
    }
    if (formData.note.length < 5 || formData.note.length > 200) {
      return Swal.fire("Invalid Note", "Note must be between 5 and 200 characters.", "error");
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update appointment");
      }

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Appointment Updated!",
        text: "Your appointment has been successfully updated.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });

      navigate("/appointments");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Could not update the appointment. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100 mt-20">
      <div className="bg-white p-6 w-full max-w-lg mx-auto rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">Update Appointment</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur} // Call handleBlur on input field blur to check email validation
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p> // Show error message
            )}
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
              min={new Date().toISOString().split("T")[0]} // Ensure past dates are not selected
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block font-medium">Day:</label>
              <select
                name="day"
                value={formData.day}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                disabled // Prevents incorrect manual selection
              >
                <option value={formData.day}>{formData.day || "Select a day"}</option>
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
            {loading ? "Updating..." : "Update Appointment"}
          </button>

          <button
            type="button"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => navigate("/appointments")}
          >
            Back to Home
          </button>
        </form>

        <div className="flex justify-center mt-4">
          <img
            src={AppointmentImage}
            alt="Appointment"
            className="w-[500px] h-[400px] object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default AppointmentUpdate;
