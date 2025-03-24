import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MedicalRecordForm = () => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleCloseModal = () => {
    setShowDeleteConfirm(false);
  };

  const deleteRecord = () => {
    // Add your delete logic here
    navigate("/records");
    setShowDeleteConfirm(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Add your update logic here
    setShowUpdateAlert(true);
  };

  const handleCloseAlert = () => {
    setShowUpdateAlert(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-white to-blue-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-xl font-bold text-blue-700 mb-4">Record</h2>
        <form className="grid grid-cols-2 gap-4" onSubmit={handleUpdate}>
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
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Update</button>
            <button type="button" onClick={handleDeleteClick} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Delete</button>
          </div>
        </form>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md">
            <div className="mb-4">
              <div className="font-bold text-xl mb-2">Confirm deletion?</div>
              <p className="text-gray-700 text-base">
                Are you sure you want to delete this record?
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <button 
                onClick={deleteRecord} 
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Yes
              </button>
              <button 
                onClick={handleCloseModal} 
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update success alert */}
      {showUpdateAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div id="alert-additional-content-5" className="p-4 border border-gray-300 rounded-lg bg-gray-50 max-w-md" role="alert">
            <div className="flex items-center">
              <svg className="shrink-0 w-4 h-4 me-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
              </svg>
              <span className="sr-only">Info</span>
            </div>
            <div className="mt-2 mb-4 text-sm text-black-800">
              Health record has been updated successfully.
            </div>
            <div className="flex">
              <button 
                type="button" 
                onClick={handleCloseAlert}
                className="text-black-800 bg-transparent border border-gray-700 hover:bg-gray-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalRecordForm;
