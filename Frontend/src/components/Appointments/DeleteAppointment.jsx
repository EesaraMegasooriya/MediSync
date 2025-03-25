import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const DeleteAppointment = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const navigate = useNavigate();

  // Fetch appointment details before deletion
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/appointments/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch appointment details");
        }
        const data = await response.json();
        setAppointment(data);
      } catch (error) {
        console.error("Error fetching appointment:", error);
      }
    };

    fetchAppointment();
  }, [id]);

  // Handle delete action
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/appointments/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete appointment");
      }

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Appointment Deleted!",
        text: `The appointment with Dr. ${appointment.doctorName} on ${appointment.date} at ${appointment.time} has been successfully deleted.`,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/appointmentlist"); // Redirect to appointment list after confirmation
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Deletion Failed",
        text: "Could not delete the appointment. Please try again later.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F1F5FE] p-6 mt-20">
      <h1 className="text-3xl font-bold text-black mb-4">Delete Appointment</h1>

      {appointment ? (
        <>
          <p className="text-lg text-[#2979FF] mb-4">
            Are you sure you want to delete the appointment with{" "}
            <span className="font-semibold">{appointment.doctorName}</span> on{" "}
            <span className="font-semibold">{appointment.date}</span> at{" "}
            <span className="font-semibold">{appointment.time}</span>?
          </p>

          <div className="flex flex-col gap-4 w-[300px]">
            <button
              className="bg-red-600 text-white px-6 py-3 rounded-xl text-lg shadow-md hover:opacity-90 transition"
              onClick={handleDelete}
            >
              Yes, Delete
            </button>
            <button
              className="bg-gray-400 text-white px-6 py-3 rounded-xl text-lg shadow-md hover:opacity-90 transition"
              onClick={() => navigate("/appointmentlist")}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <p className="text-lg text-gray-600">Loading appointment details...</p>
      )}
    </div>
  );
};

export default DeleteAppointment;
