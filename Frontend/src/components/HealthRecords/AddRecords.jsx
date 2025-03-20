import React from "react";

const AddRecords = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-white to-blue-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-2/3">
        <h2 className="text-xl font-bold text-blue-600 mb-4">Add Records</h2>
        <form className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Disease name" className="border p-2 rounded" />
          <input type="date" placeholder="Diagnosis Date" className="border p-2 rounded" />
          <input type="text" placeholder="Symptoms" className="border p-2 rounded col-span-2" />
          <input type="text" placeholder="Diagnosed By" className="border p-2 rounded" />
          <input type="text" placeholder="Doctors Note" className="border p-2 rounded" />
          <input type="text" placeholder="Hospital name" className="border p-2 rounded" />
          <input type="text" placeholder="Level" className="border p-2 rounded" />
          <input type="text" placeholder="Lab Test Result" className="border p-2 rounded" />
          <textarea placeholder="Additional Note" className="border p-2 rounded col-span-2"></textarea>
          <button className="bg-blue-500 text-white py-2 rounded col-span-2 hover:bg-blue-600">Save</button>
        </form>
      </div>
    </div>
  );
};

export default AddRecords;
