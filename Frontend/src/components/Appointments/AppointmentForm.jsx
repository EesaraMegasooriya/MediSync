import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AppointmentImage from "../../assets/book app.jpg";

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
    sendReminders: true,
  });

  const [emailError, setEmailError] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sendingReminder, setSendingReminder] = useState(false);

  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  useEffect(() => {
    if (formData.email && emailError) {
      setEmailError(null);
    }
  }, [formData.email, emailError]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
      
      // If checking the sendReminders box and we have a valid email, send a test email
      if (name === "sendReminders" && checked && formData.email && emailRegex.test(formData.email)) {
        sendTestEmail(formData.email);
      }
    } else if (name === "email") {
      setFormData({ ...formData, email: value.toLowerCase() });
    } else if (name === "date") {
      const selectedDate = new Date(value);
      const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const correctDay = weekdays[selectedDate.getDay()];
      setFormData({ ...formData, date: value, day: correctDay });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const sendTestEmail = async (email) => {
    if (!email || !emailRegex.test(email)) {
      Swal.fire("Invalid Email", "Please enter a valid email address to receive reminders.", "error");
      return;
    }

    setSendingReminder(true);

    try {
      // Prepare data with current form information for a meaningful email
      const emailData = {
        email: email,
        doctorName: formData.doctorName || "Your doctor",
        date: formData.date || new Date().toISOString().split("T")[0],
        time: formData.time || "your scheduled time",
        location: formData.location || "our clinic",
        note: formData.note || "No additional notes"
      };
      
      const response = await fetch(`${API_URL}/test-reminder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        Swal.fire({
          title: "Email Sent!",
          text: `A test reminder has been sent to ${email}. Please check your inbox.`,
          icon: "success",
        });
      } else {
        Swal.fire("Email Failed", data.message || "Failed to send reminder email", "error");
        // If email fails, uncheck the reminder box
        setFormData(prev => ({ ...prev, sendReminders: false }));
      }
    } catch (error) {
      console.error("Error sending test email:", error);
      Swal.fire("Connection Error", "Failed to send email. Check your connection.", "error");
      // If email fails, uncheck the reminder box
      setFormData(prev => ({ ...prev, sendReminders: false }));
    } finally {
      setSendingReminder(false);
    }
  };

  const handleBlur = () => {
    if (formData.email && !emailRegex.test(formData.email)) {
      setEmailError("Please enter a valid email address (lowercase only).");
    } else {
      setEmailError(null);
    }
  };

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
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Appointment Added!",
          text: formData.sendReminders
            ? "Your appointment has been successfully added. We'll send you email reminders before your appointment."
            : "Your appointment has been successfully added.",
          icon: "success",
        });

        setFormData({
          email: "",
          doctorName: "",
          date: "",
          day: "",
          time: "",
          location: "",
          note: "",
          sendReminders: true,
        });

        setTimeout(() => {
          navigate("/appointments");
        }, 2000);
      } else {
        Swal.fire("Oops...", data.message || "Something went wrong!", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Connection Error", "Failed to connect to the server.", "error");
    }

    setLoading(false);
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100 mt-20">
      <div className="bg-white p-6 w-full max-w-lg mx-auto rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">Add an Appointment</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 ${emailError ? "border-red-500" : ""}`}
              required
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
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
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block font-medium">Day:</label>
              <select
                name="day"
                value={formData.day}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 bg-gray-100"
                required
                disabled
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
              required
              minLength="5"
              maxLength="200"
            ></textarea>
            <div className="text-xs text-gray-500 mt-1">
              {formData.note.length}/200 characters
            </div>
          </div>

          <div className="flex items-center mt-2">
            <label className="flex items-center space-x-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="sendReminders"
                checked={formData.sendReminders}
                onChange={handleChange}
                className="accent-blue-600 w-4 h-4"
                disabled={sendingReminder}
              />
              <span>
                {sendingReminder 
                  ? "Sending reminder email..." 
                  : "Send Reminder"
                }
              </span>
            </label>
          </div>

          <button
            type="submit"
            className={`w-full ${loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"} text-white p-2 rounded-lg transition`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Appointment"}
          </button>

          <button
            type="button"
            className="w-full bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition"
            onClick={() => navigate("/appointments")}
          >
            Back to Home
          </button>
        </form>

        <div className="flex justify-center mt-4">
          <img
            src={AppointmentImage}
            alt="Appointment"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;