import React from "react";
import { useNavigate } from "react-router-dom";

const records = [
  {
    title: "Diabetes Report",
    date: "April 4th",
    level: "90 mg/dL",
    status: "Normal",
  },
  {
    title: "Fatty Liver Report",
    date: "September 3rd",
    level: "Normal Fatty liver",
    status: "Normal",
  },
  {
    title: "Cholesterol Report",
    date: "October 4th",
    level: "200 mg/dL",
    status: "High",
  },
];

const ReportCard = ({ title, date, level, status }) => {


  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center w-72">
      <h2 className="font-bold text-lg">{title}</h2>
      <p className="text-gray-600">Date: {date}</p>
      <p className="text-gray-600">Level: {level}</p>
      <p className={`font-semibold ${status === "High" ? "text-red-500" : "text-green-500"}`}>
        Current Status: {status}
      </p>
      <div className="flex justify-center gap-4 mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => navigate("/records/update")}>View</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Download</button>
      </div>
    </div>
  );
};

const ViewRecords = () => {
  return (
    
    <main id="main" className="main">
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">View Records</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {records.map((record, index) => (
          <ReportCard key={index} {...record} />
        ))}
      </div>
    </div>
    </main>
  );
};

export default ViewRecords;
