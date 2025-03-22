import React from "react";

const RecordDeleted = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-blue-300 p-10 rounded-2xl shadow-lg text-center w-96">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 flex items-center justify-center border-2 border-gray-800 rounded-full">
            <span className="text-2xl">✔️</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Record Deleted</h1>
        <p className="text-gray-700 mt-2">Successfully deleted the record</p>
        <button className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-6 rounded-lg hover:opacity-90">
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default RecordDeleted;
