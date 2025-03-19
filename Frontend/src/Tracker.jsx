import React from 'react'
import TrackImg from './Images/TrackImg.png'
import styled from 'styled-components';

// Define StyledWrapper
const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const medications = [
    { name: "Aspirin", dosage: "Take one tablet daily.", disabled: false },
    { name: "Paracetamol", dosage: "Take every 6 hours.", disabled: false },
    { name: "Ibuprofen", dosage: "Take after meals.", disabled: false },
    { name: "Metformin", dosage: "Take before breakfast.", disabled: false },
    { name: "Amoxicillin", dosage: "Take with water.", disabled: true }, // Disabled
    { name: "Lisinopril", dosage: "Take in the morning.", disabled: true }, // Disabled
  ];


function Tracker() {
  return (
    <div>
        <div className="">
            {/* Upper Part */}
            <div className="flex justify-center gap-20">
                <div className="">
                    <div className="text-blue-500 text-4xl md:text-5xl pt-10 font-bold font-poppins">Medication Tracker</div>
                    <div className="">
                    <div className="relative mt-9">
                        <input placeholder="Search your prescriptions or doctors here..." className="input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-full w-full transition-all focus:w-64 outline-none" name="search" type="search" />
                        <svg className="size-6 absolute top-3 right-3 text-gray-500" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" strokeLinejoin="round" strokeLinecap="round" />
                        </svg>
                        </div>
                    </div>
                    <div className="mt-9 text-gray-500 font-poppins font-bold">Your health, our commitment. We care, you heal.</div>
                    <div className="flex justify-center gap-10 mt-9">
                    <button className="bg-purple-500 text-white px-4 py-2 rounded-xl transition duration-200 ease-in-out hover:bg-purple-700 active:bg-purple-900 focus:outline-none font-bold font-poppins">
                    View Prescriptions 
                    </button>
                    <button className="bg-purple-500 text-white px-4 py-2 rounded-xl transition duration-200 ease-in-out hover:bg-purple-700 active:bg-purple-900 focus:outline-none font-bold font-poppins">
                    View Prescriptions 
                    </button>
                    </div>
                </div>
                <div className="">
                    <img src={TrackImg} className='w-[400px]' alt="" />
                </div>
            </div>

            {/* Lower Part */}
            <div className=" px-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5">
      {medications.map((med, index) => (
        <div key={index} className="flex w-[250px] p-6 bg-white shadow-lg rounded-2xl justify-between">
          {/* Left Side - Medication Info */}
          <div>
            <div className="text-2xl font-bold text-gray-800">{med.name}</div>
            <div className="text-sm text-gray-500">{med.dosage}</div>
          </div>

          {/* Right Side - Checkbox */}
          <div className="flex flex-col gap-5">
            <input id={`med-${index}`} type="checkbox" className="peer hidden" disabled={med.disabled} />
            <label
              htmlFor={`med-${index}`}
              className={`h-6 w-6 flex items-center justify-center rounded-md border border-gray-300 transition ${
                med.disabled ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 peer-checked:bg-green-500 cursor-pointer"
              }`}
            >
              {!med.disabled && (
                <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5 stroke-white" xmlns="http://www.w3.org/2000/svg">
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
    </div>
  )
}

export default Tracker