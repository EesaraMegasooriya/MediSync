import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ReportCard = ({ diseaseName, diagnosisDate, level, status, hospitalName, ...record }) => {
  const navigate = useNavigate();
  const formattedDate = new Date(diagnosisDate).toLocaleDateString();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold">{diseaseName}</h2>
      <p className="text-gray-500">Date: {formattedDate}</p>
      <p className="text-gray-500">Hospital: {hospitalName || 'N/A'}</p>
      <p className={`font-bold ${level === "High" ? "text-red-500" : "text-green-500"}`}>
        Current Status: {level || 'Normal'}
      </p>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => navigate("/records/update", { state: { record: { diseaseName, diagnosisDate, level, status, hospitalName, ...record } } })}
      >
        View
      </button>
    </div>
  );
};

const HealthRecords = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/healthrecords/getallrecords/user/507f1f77bcf86cd799439011');
        if (!response.ok) {
          throw new Error('Failed to fetch records');
        }
        const data = await response.json();
        // Sort records by date in descending order
        const sortedRecords = data.sort((a, b) => new Date(b.diagnosisDate) - new Date(a.diagnosisDate));
        setRecords(sortedRecords);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-white min-h-screen p-6 ">
      <h1 className="text-3xl font-bold text-blue-600 mt-20">Health Records</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mt-4">
        <form onSubmit={handleSearch} className="flex w-full justify-space-between md:w-1/2 mb-4 md:mb-0">
          {/* ...existing search form code... */}
        </form>
        <div className="flex space-x-3">
          <button 
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600" 
            onClick={() => navigate("/records/Allrecords")}
          >
            View All Records
          </button>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            onClick={() => navigate("/records/add")}
          >
            Add Records
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-8">Loading...</div>
      ) : error ? (
        <div className="text-center mt-8 text-red-500">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {records
            .slice(0, 3) // Only take the first 3 records
            .map((record, index) => (
              <ReportCard key={record._id || index} {...record} />
          ))}
          {records.length > 3 && (
            <div className="col-span-3 text-center mt-4">
              <p className="text-gray-600 mb-2">Showing 3 most recent records out of {records.length} total records</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HealthRecords;
