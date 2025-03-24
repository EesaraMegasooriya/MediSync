import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MedicalRecordForm from "./Update";

const HealthRecords = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const records = [
    { title: "Diabetes", date: "April 4th", level: "90 mg/dL", status: "Normal" },
    { title: "Fatty Liver", date: "September 3rd", level: "Normal Fatty liver", status: "Normal" },
    { title: "Cholesterol", date: "October 4th", level: "200 mg/dL", status: "High" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Add your search logic here
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-white min-h-screen p-6">
      <h1 className="text-3xl font-bold text-blue-600">Health Records</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mt-4">
        <form onSubmit={handleSearch} className="flex w-full justify-space-between md:w-1/2 mb-4 md:mb-0">
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-4 text-gray-500">
                <path d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor"></path>
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
              placeholder="Search your prescriptions or doctors here..."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
            />
          </div>
          <button
            type="submit"
            className="ml-2 inline-flex items-center py-2.5 px-3 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-4 me-2">
              <path d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor"></path>
            </svg>
            Search
          </button>
        </form>
        <div className="flex space-x-3">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-md" onClick={() => navigate("/records/Allrecords")}>View Records</button>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-md"
            onClick={() => navigate("/records/add")}
          >
            Add Records
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
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
              onClick={() => navigate(`/records/update`)}
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthRecords;
