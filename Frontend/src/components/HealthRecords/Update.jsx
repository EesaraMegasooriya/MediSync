import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const MedicalRecordForm = () => {
  const location = useLocation();
  const recordData = location.state?.record || {};
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [formData, setFormData] = useState({
    diseaseName: recordData.diseaseName || '',
    diagnosisDate: recordData.diagnosisDate || '',
    symptoms: recordData.symptoms || '',
    diagnosedBy: recordData.diagnosedBy || '',
    doctorsNote: recordData.doctorsNote || '',
    hospitalName: recordData.hospitalName || '',
    level: recordData.level || '',
    labTestResult: recordData.labTestResult || '',
    additionalNote: recordData.additionalNote || ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [recordId, setRecordId] = useState(null);

  useEffect(() => {
    if (location.state?.record?._id) {
      setRecordId(location.state.record._id);
      console.log(location.state.record._id);
    }
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.diseaseName.trim()) newErrors.diseaseName = 'Disease name is required';
    if (!formData.diagnosisDate) newErrors.diagnosisDate = 'Diagnosis date is required';
    if (!formData.symptoms.trim()) newErrors.symptoms = 'Symptoms are required';
    if (!formData.diagnosedBy.trim()) newErrors.diagnosedBy = 'Doctor name is required';
    if (!formData.hospitalName.trim()) newErrors.hospitalName = 'Hospital name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleCloseModal = () => {
    setShowDeleteConfirm(false);
  };

  const deleteRecord = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/healthrecords/deleterecord/${recordId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete record');
      }

      // Navigate back to records page after successful deletion
      navigate("/records");
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Error deleting record:', error);
      alert(error.message || 'Failed to delete record');
      setShowDeleteConfirm(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(`http://localhost:5000/api/healthrecords/updaterecord/${recordId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to update record');
        }

        setShowUpdateAlert(true);
        setTimeout(() => {
          navigate('/records');
        }, 2000);
      } catch (error) {
        console.error('Error updating record:', error);
        // You might want to show an error alert to the user here
        alert(error.message || 'Failed to update record');
      }
    }
  };

  const handleCloseAlert = () => {
    setShowUpdateAlert(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-white to-blue-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-xl font-bold text-blue-700 mb-4">Record</h2>
        <form className="grid grid-cols-2 gap-4" onSubmit={handleUpdate}>
          <div className="relative">
            <input
              type="text"
              name="diseaseName"
              value={formData.diseaseName}
              onChange={handleInputChange}
              placeholder="Disease name"
              className={`border p-2 rounded w-full ${errors.diseaseName ? 'border-red-500' : ''}`}
            />
            {errors.diseaseName && <span className="text-red-500 text-xs">{errors.diseaseName}</span>}
          </div>

          <div className="relative">
            <input
              type="date"
              name="diagnosisDate"
              value={formData.diagnosisDate}
              onChange={handleInputChange}
              className={`border p-2 rounded w-full ${errors.diagnosisDate ? 'border-red-500' : ''}`}
            />
            {errors.diagnosisDate && <span className="text-red-500 text-xs">{errors.diagnosisDate}</span>}
          </div>

          <div className="relative col-span-2">
            <input
              type="text"
              name="symptoms"
              value={formData.symptoms}
              onChange={handleInputChange}
              placeholder="Symptoms"
              className={`border p-2 rounded w-full ${errors.symptoms ? 'border-red-500' : ''}`}
            />
            {errors.symptoms && <span className="text-red-500 text-xs">{errors.symptoms}</span>}
          </div>

          <div className="relative">
            <input
              type="text"
              name="diagnosedBy"
              value={formData.diagnosedBy}
              onChange={handleInputChange}
              placeholder="Diagnosed By"
              className={`border p-2 rounded w-full ${errors.diagnosedBy ? 'border-red-500' : ''}`}
            />
            {errors.diagnosedBy && <span className="text-red-500 text-xs">{errors.diagnosedBy}</span>}
          </div>

          <div className="relative">
            <input
              type="text"
              name="doctorsNote"
              value={formData.doctorsNote}
              onChange={handleInputChange}
              placeholder="Doctor Note"
              className="border p-2 rounded w-full"
            />
          </div>

          

          <div className="relative">
            <input
              type="text"
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleInputChange}
              placeholder="Hospital name"
              className={`border p-2 rounded w-full ${errors.hospitalName ? 'border-red-500' : ''}`}
            />
            {errors.hospitalName && <span className="text-red-500 text-xs">{errors.hospitalName}</span>}
          </div>

          <div className="relative">
            <input
              type="text"
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              placeholder="Level"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="relative">
            <input
              type="text"
              name="labTestResult"
              value={formData.labTestResult}
              onChange={handleInputChange}
              placeholder="Lab Test Result"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="relative col-span-2">
            <textarea
              name="additionalNote"
              value={formData.additionalNote}
              onChange={handleInputChange}
              placeholder="Additional Note"
              className="border p-2 rounded w-full h-20"
            />
          </div>

          <div className="col-span-2 flex justify-between">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Update
            </button>
            <button type="button" onClick={handleDeleteClick} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              Delete
            </button>
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
