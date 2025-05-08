import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRecords = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: localStorage.getItem("userId"),
    diseaseName: '',
    diagnosisDate: new Date().toISOString().split('T')[0], // Set today's date as default
    symptoms: '',
    diagnosedBy: '',
    doctorsNote: '',
    hospitalName: '',
    level: '',
    labTestResult: '',
    additionalNote: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:5000/api/healthrecords/createrecord", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
  
        if (!response.ok) {
          throw new Error("Failed to save record");
        }
  
        console.log("Payload:", formData);
        navigate("/records/Allrecords");
      } catch (error) {
        console.error("Error saving record:", error);
        alert("Failed to save record. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-white to-blue-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-2/3">
        <h2 className="text-xl font-bold text-blue-600 mb-4 ">Add Records</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
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
              max={new Date().toISOString().split('T')[0]} // This will disable future dates
              placeholder="Diagnosis Date"
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
              placeholder="Doctors Note"
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
              className="border p-2 rounded w-full"
            ></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 rounded col-span-2 hover:bg-blue-500" >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecords;
