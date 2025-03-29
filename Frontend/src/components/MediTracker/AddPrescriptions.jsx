import React, { useState } from 'react';
import TrackImg2 from '../MediTracker/Images/Track2.png';
import axios from 'axios';
import Swal from 'sweetalert2';

import { useNavigate } from 'react-router-dom';



function AddPrescriptions() {

  
  const navigate = useNavigate();
  const [tips, setTips] = useState(['']);
  const [prescriptions, setPrescriptions] = useState(['']);
  const [medicationName, setMedicationName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

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
    const username = localStorage.getItem('username'); // ✅ Make sure this returns a value

const formData = new FormData();
formData.append('username', username); // ✅ This line must exist BEFORE sending
 // ✅ fetch userId
    
    formData.append('medicationName', medicationName);
    formData.append('doctorName', doctorName);
    if (selectedImage) {
      formData.append('image', selectedImage);
    }
    tips.forEach(tip => formData.append('tips[]', tip));
    prescriptions.forEach(p => formData.append('prescriptions[]', p));

    try {
      const res = await axios.post('http://localhost:5001/api/prescriptions', formData);
        Swal.fire('Success!', res.data.message, 'success').then(() => {
            navigate('/tracker'); // ✅ Navigates after the user confirms success
        });
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
            <button className="bg-gradient-to-r from-[#3A8EF6] to-[#6F3AFA] text-white px-4 py-2 rounded-xl font-bold hover:bg-purple-700 active:bg-purple-900 transition duration-200">
              Add Prescriptions
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
            <label className="w-full text-xl font-medium text-gray-700 pl-2 pb-2 text-left">Medication Name</label>
            <input
              className="w-full p-2 rounded-lg shadow-md border border-gray-300 focus:ring focus:ring-blue-300"
              placeholder="Enter Medication Name"
              value={medicationName}
              onChange={(e) => setMedicationName(e.target.value)}
            />
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
          <input
            className="w-full p-2 rounded-lg shadow-md border border-gray-300 focus:ring focus:ring-blue-300"
            placeholder="Enter Doctor Name"
            type="text"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          />
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
            Save
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