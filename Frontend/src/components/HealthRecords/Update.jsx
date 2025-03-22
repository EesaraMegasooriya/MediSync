import React from "react";

const MedicalRecordForm = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-white to-blue-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-xl font-bold text-blue-700 mb-4">Record</h2>
        <form className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Disease name" className="border p-2 rounded" />
          <input type="date" placeholder="Diagnosis Date" className="border p-2 rounded" />
          <input type="text" placeholder="Symptoms" className="border p-2 rounded col-span-2" />
          <input type="text" placeholder="Diagnosed By" className="border p-2 rounded" />
          <input type="text" placeholder="Current Status" className="border p-2 rounded" />
          <input type="date" placeholder="Follow-up Date" className="border p-2 rounded" />
          <input type="text" placeholder="Hospital name" className="border p-2 rounded" />
          <input type="text" placeholder="Level" className="border p-2 rounded" />
          <input type="text" placeholder="Lab Test Result" className="border p-2 rounded" />
          <textarea placeholder="Additional Note" className="border p-2 rounded col-span-2 h-20" />
          <div className="col-span-2 flex justify-between">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Update</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Delete</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicalRecordForm;
