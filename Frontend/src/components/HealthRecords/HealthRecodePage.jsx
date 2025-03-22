import React from "react";
import { useNavigate } from "react-router-dom";
import MedicalRecordForm from "./Update";

const HealthRecords = () => {
  const navigate = useNavigate();
  const records = [
    { title: "Diabetes", date: "April 4th", level: "90 mg/dL", status: "Normal" },
    { title: "Fatty Liver", date: "September 3rd", level: "Normal Fatty liver", status: "Normal" },
    { title: "Cholesterol", date: "October 4th", level: "200 mg/dL", status: "High" },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-100 to-white min-h-screen p-6">
      <h1 className="text-3xl font-bold text-blue-600">Health Records</h1>
      
      <div className="flex justify-between items-center mt-4">
        <input
          type="text"
          placeholder="Search your prescriptions or doctors here..."
          className="w-1/2 p-2 border rounded-md shadow-sm"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">🔍</button>
      </div>

      <div className="flex gap-4 mt-6">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-md" onClick={() => navigate("/records/viewrecord")}>View Records</button>
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-md"
          onClick={() => navigate("/records/add")}
        >
          Add Records
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-8">
        {records.map((record, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold">{record.title}</h2>
            <p className="text-gray-500">Date: {record.date}</p>
            <p className="text-gray-500">Level: {record.level}</p>
            <p className={`font-bold ${record.status === "High" ? "text-red-500" : "text-green-500"}`}>
              Current Status: {record.status}
            </p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => navigate(`/records/view/${index}`)}
            >
              View
            </button>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => navigate(`/records/update/${index}`)}
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthRecords;
