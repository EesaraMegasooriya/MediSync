import React from 'react';
import TrackImg from './Images/TrackImg.png';

const medications = [
  { name: "Aspirin", dosage: "Take one tablet daily.", disabled: false },
  { name: "Paracetamol", dosage: "Take every 6 hours.", disabled: false },
  { name: "Ibuprofen", dosage: "Take after meals.", disabled: false },
  { name: "Metformin", dosage: "Take before breakfast.", disabled: false },
  { name: "Amoxicillin", dosage: "Take with water.", disabled: true },
  { name: "Lisinopril", dosage: "Take in the morning.", disabled: true },
];

function Tracker() {
  return (
    <div>
      <div className="flex justify-center gap-20 pt-32 px-5 flex-wrap">
        {/* Left Section */}
        <div className="max-w-xl">
          <h1 className="text-blue-500 text-4xl md:text-5xl font-bold font-poppins">Medication Tracker</h1>
          
          {/* Search */}
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

          {/* Buttons */}
          <div className="flex gap-4 mt-9">
            <button className="bg-gradient-to-r from-[#3A8EF6] to-[#6F3AFA] text-white px-4 py-2 rounded-xl font-bold hover:bg-purple-700 active:bg-purple-900 transition duration-200">
              View Prescriptions
            </button>
            <button className="bg-gradient-to-r from-[#3A8EF6] to-[#6F3AFA] text-white px-4 py-2 rounded-xl font-bold hover:bg-purple-700 active:bg-purple-900 transition duration-200">
              Add Prescriptions
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div>
          <img src={TrackImg} alt="Tracker Illustration" className="w-[300px] md:w-[400px]" />
        </div>
      </div>

      {/* Medication Cards */}
      <div className="px-6 md:px-24 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {medications.map((med, index) => (
            <div key={index} className="flex w-[250px] p-6 bg-white shadow-lg rounded-2xl justify-between">
              {/* Info */}
              <div>
                <div className="text-2xl font-bold text-gray-800">{med.name}</div>
                <div className="text-sm text-gray-500">{med.dosage}</div>
              </div>

              {/* Checkbox */}
              <div className="flex items-center">
                <input id={`med-${index}`} type="checkbox" className="peer hidden" disabled={med.disabled} />
                <label
                  htmlFor={`med-${index}`}
                  className={`h-6 w-6 flex items-center justify-center rounded-md border transition ${
                    med.disabled
                      ? "bg-gray-300 border-gray-300 cursor-not-allowed"
                      : "bg-gray-200 border-gray-300 peer-checked:bg-green-500 cursor-pointer"
                  }`}
                >
                  {!med.disabled && (
                    <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 12.6111L8.92308 17.5L20 6.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tracker;
