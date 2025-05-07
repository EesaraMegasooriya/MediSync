import React, { useState, useEffect } from 'react';

import TrackImg2 from '../MediTracker/Images/Track2.png';
import axios from 'axios';
import Swal from 'sweetalert2';

function AddPrescriptions() {

  

  const [tips, setTips] = useState(['']);
  const [prescriptions, setPrescriptions] = useState(['']);
  const [medicationName, setMedicationName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [medicationsList, setMedicationsList] = useState([]);
const [doctorsList, setDoctorsList] = useState([]);
const [isNewMedication, setIsNewMedication] = useState(false);
const [isNewDoctor, setIsNewDoctor] = useState(false);
const DEFAULT_IMAGE = 'df-img.jpeg'; // Default image 



useEffect(() => {
  const fetchData = async () => {
    try {
      const meds = await axios.get('http://localhost:5001/api/medications');
      const docs = await axios.get('http://localhost:5001/api/doctors');
      setMedicationsList(meds.data);
      setDoctorsList(docs.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };
  fetchData();
}, []);


  const handleChange = (index, value) => {
    const updatedTips = [...tips];
    updatedTips[index] = value;
    setTips(updatedTips);
  };

  const addTipField = () => {
    setTips([...tips, '']);
  };

  const removeTipField = (index) => {
    const updatedTips = tips.filter((_, i) => i !== index);
    setTips(updatedTips);
  };

  const handlePresChange = (index, value) => {
    const updated = [...prescriptions];
    updated[index] = value;
    setPrescriptions(updated);
  };

  const addPrescriptionField = () => {
    setPrescriptions([...prescriptions, '']);
  };

  const removePrescriptionField = (index) => {
    const updated = prescriptions.filter((_, i) => i !== index);
    setPrescriptions(updated);
  };

  const handleSubmit = async () => {
    const nonEmptyPrescriptions = prescriptions.filter(p => p.trim() !== '');
    const nonEmptyTips = tips.filter(t => t.trim() !== '');
  
    const errors = [];
  
    if (!medicationName.trim()) errors.push('Medication is required.');
    if (!doctorName.trim()) errors.push('Doctor name is required.');
    if (nonEmptyPrescriptions.length === 0) errors.push('At least one prescription is required.');
  
    if (errors.length > 0) {
      Swal.fire('Validation Error', errors.join('<br/>'), 'warning');
      return;
    }
  
    try {
      // 1. Save new medication if manually added
      if (isNewMedication) {
        await axios.post('http://localhost:5001/api/medications', {
          name: medicationName,
          description: '',
        });
      }
  
      // 2. Save new doctor if manually added
      if (isNewDoctor) {
        await axios.post('http://localhost:5001/api/doctors', {
          name: doctorName,
          specialization: '',
          contact: '',
        });
      }

      const userId = localStorage.getItem('userId'); // Get userId from local storage
if (!userId) {
  Swal.fire('Error', 'User not logged in.', 'error');
  return;
}
  
      // 3. Submit prescription
      const formData = new FormData();
      formData.append('medicationName', medicationName);
      formData.append('doctorName', doctorName);
      formData.append('userId', userId);
      //  Use selected image OR fallback to default
if (selectedImage) {
  formData.append('image', selectedImage);
} else {
  formData.append('image', DEFAULT_IMAGE); // Must match server logic
}
      nonEmptyTips.forEach(tip => formData.append('tips', tip));
      nonEmptyPrescriptions.forEach(p => formData.append('prescriptions', p));
  
      const res = await axios.post('http://localhost:5001/api/prescriptions', formData);
  
      // 4. Refresh lists
      const updatedMeds = await axios.get('http://localhost:5001/api/medications');
      const updatedDocs = await axios.get('http://localhost:5001/api/doctors');
      setMedicationsList(updatedMeds.data);
      setDoctorsList(updatedDocs.data);
  
      // 5. Reset form
      setMedicationName('');
      setDoctorName('');
      setSelectedImage(null);
      setTips(['']);
      setPrescriptions(['']);
      setIsNewMedication(false);
      setIsNewDoctor(false);
  
      Swal.fire('Success!', res.data.message, 'success');
    } catch (err) {
      console.error(err);
      Swal.fire('Error!', 'Failed to add prescription.', 'error');
    }
  };
  
  

  return (
    <div>
      <div className="flex justify-center gap-20 pt-32 px-5 flex-wrap">
        <div className="max-w-xl">
          <h1 className="text-blue-500 text-4xl md:text-5xl font-bold font-poppins">Medication Tracker</h1>
          <div className="relative mt-9">
            <input
              placeholder="Search your prescriptions or doctors here..."
              className="shadow-lg px-5 py-3 rounded-full w-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-300"
              name="search"
              type="search"
            />
            <svg className="w-6 h-6 absolute top-3 right-4 text-gray-500" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" fill="none">
              <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
          </div>
          <p className="mt-9 text-gray-500 font-poppins font-bold">Your health, our commitment. We care, you heal.</p>
          <div className="flex gap-4 mt-9">
            <button className="bg-gradient-to-r from-[#3A8EF6] to-[#6F3AFA] text-white px-4 py-2 rounded-xl font-bold hover:bg-purple-700 active:bg-purple-900 transition duration-200">
              <a href='/tracker'>View Prescriptions</a>
            </button>
            <button  className="bg-gradient-to-r from-[#3A8EF6] to-[#6F3AFA] text-white px-4 py-2 rounded-xl font-bold hover:bg-purple-700 active:bg-purple-900 transition duration-200" >
              <a href='/add-prescriptions'>Add Prescriptions</a>
            </button>
          </div>
        </div>
        <div>
          <img src={TrackImg2} alt="Tracker Illustration" className="w-[300px] md:w-[400px]" />
        </div>
      </div>

      <div className="flex flex-col gap-4 w-2/4 pl-32">
        <div className="flex gap-1 justify-center">
        <div className="w-full flex flex-col items-center">
  <label className="w-full text-xl font-medium text-gray-700 pl-2 pb-2 text-left">Medication</label>
  {!isNewMedication ? (
    <select
      className="w-full p-2 rounded-lg shadow-md border border-gray-300 focus:ring focus:ring-blue-300"
      value={medicationName}
      onChange={(e) => setMedicationName(e.target.value)}
    >
      <option value="">-- Select Medication --</option>
      {medicationsList.map((med, idx) => (
        <option key={idx} value={med.name}>{med.name}</option>
      ))}
    </select>
  ) : (
    <input
      className="w-full p-2 rounded-lg shadow-md border border-gray-300 focus:ring focus:ring-blue-300"
      placeholder="Enter New Medication"
      value={medicationName}
      onChange={(e) => setMedicationName(e.target.value)}
    />
  )}
  <button
    onClick={() => setIsNewMedication(!isNewMedication)}
    className="text-sm text-blue-600 underline mt-2"
  >
    {isNewMedication ? "Select Existing" : "Add New Medication"}
  </button>
</div>

          <div className="w-full flex flex-col items-center">
            <label className="w-full text-xl font-medium text-gray-700 pl-2 pb-2 text-left">Upload Image</label>
            <input
              className="w-full p-2 rounded-lg shadow-md border border-gray-300 focus:ring focus:ring-blue-300"
              type="file"
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />
          </div>
        </div>

        <div className="w-full flex flex-col items-center">
  <label className="w-full text-xl font-medium text-gray-700 pl-2 pb-2 text-left">Doctor Name</label>
  {!isNewDoctor ? (
    <select
      className="w-full p-2 rounded-lg shadow-md border border-gray-300 focus:ring focus:ring-blue-300"
      value={doctorName}
      onChange={(e) => setDoctorName(e.target.value)}
    >
      <option value="">-- Select Doctor --</option>
      {doctorsList.map((doc, idx) => (
        <option key={idx} value={doc.name}>{doc.name}</option>
      ))}
    </select>
  ) : (
    <input
      className="w-full p-2 rounded-lg shadow-md border border-gray-300 focus:ring focus:ring-blue-300"
      placeholder="Enter New Doctor Name"
      value={doctorName}
      onChange={(e) => setDoctorName(e.target.value)}
    />
  )}
  <button
    onClick={() => setIsNewDoctor(!isNewDoctor)}
    className="text-sm text-blue-600 underline mt-2"
  >
    {isNewDoctor ? "Select Existing" : "Add New Doctor"}
  </button>
</div>


        <div className="w-full flex flex-col items-center">
          <label className="w-full text-xl font-medium text-gray-700 pl-2 pb-2 text-left">Prescriptions</label>
          <div className="flex flex-col w-full gap-3">
            {prescriptions.map((prescription, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder={`Prescription ${index + 1}`}
                  value={prescription}
                  onChange={(e) => handlePresChange(index, e.target.value)}
                  className="w-full p-2 rounded-lg shadow-md border border-gray-300 focus:ring focus:ring-blue-300"
                />
                {prescriptions.length > 1 && (
                  <button
                    onClick={() => removePrescriptionField(index)}
                    className="bg-red-500 text-white px-3 py-2 rounded-lg font-bold hover:bg-red-700 transition"
                  >
                    -
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addPrescriptionField}
            className="mt-4 bg-gradient-to-r from-[#3A8EF6] to-[#6F3AFA] text-white px-4 py-2 rounded-xl font-bold hover:opacity-90 shadow-md"
          >
            + Add Prescription
          </button>
        </div>

        <div className="w-full flex flex-col items-center">
          <label className="w-full text-xl font-medium text-gray-700 pl-2 pb-2 text-left">Tips</label>
          <div className="flex flex-col w-full gap-3">
            {tips.map((tip, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  value={tip}
                  onChange={(e) => handleChange(index, e.target.value)}
                  placeholder={`Tip ${index + 1}`}
                  type="text"
                  className="w-full p-2 rounded-lg shadow-md border border-gray-300 focus:ring focus:ring-blue-300"
                />
                {tips.length > 1 && (
                  <button
                    onClick={() => removeTipField(index)}
                    className="bg-red-500 text-white px-3 py-2 rounded-lg font-bold hover:bg-red-700 transition"
                  >
                    -
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addTipField}
            className="mt-4 bg-gradient-to-r from-[#3A8EF6] to-[#6F3AFA] text-white px-4 py-2 rounded-xl font-bold hover:opacity-90 shadow-md"
          >
            + Add Tip
          </button>
        </div>

        <div className="w-full justify-center flex gap-6 mt-9">
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-[#3A8EF6] to-[#6F3AFA] text-white px-4 py-2 rounded-xl font-bold hover:bg-purple-700 active:bg-purple-900 transition duration-200"
          >
            Add Prescription
          </button>
          <button className="bg-gradient-to-r from-[#3A8EF6] to-[#6F3AFA] text-white px-4 py-2 rounded-xl font-bold hover:bg-purple-700 active:bg-purple-900 transition duration-200">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPrescriptions;