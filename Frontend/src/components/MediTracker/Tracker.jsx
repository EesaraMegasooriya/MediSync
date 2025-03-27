import React, { useEffect, useState } from 'react';
import TrackImg from './Images/TrackImg.png';


function Tracker() {
  

  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5001/api/prescriptions");
      const data = await res.json();
      // Add `editing` flag
      const modified = data.map(p => ({ ...p, editing: false }));
      setPrescriptions(modified);
    };
    fetchData();
  }, []);

  // Handle nested input changes (e.g. prescriptions, tips)
  const handleArrayChange = (prescriptionIndex, field, itemIndex, newValue) => {
    const updated = [...prescriptions];
    updated[prescriptionIndex][field][itemIndex] = newValue;
    setPrescriptions(updated);
  };

  const handleRemoveItem = (prescriptionIndex, field, itemIndex) => {
    const updated = [...prescriptions];
    updated[prescriptionIndex][field].splice(itemIndex, 1);
    setPrescriptions(updated);
  };


  // Add an empty item to prescriptions or tips
const handleAddItem = (prescriptionIndex, field) => {
  const updated = [...prescriptions];
  updated[prescriptionIndex][field].push('');
  setPrescriptions(updated);
};


  const handleEdit = (index) => {
    const updated = [...prescriptions];
    updated[index].editing = true;
    setPrescriptions(updated);
  };
  
  const handleInputChange = (index, field, value) => {
    const updated = [...prescriptions];
    updated[index][field] = value;
    setPrescriptions(updated);
  };
  
  const handleImageChange = (index, file) => {
    const updated = [...prescriptions];
    updated[index].newImage = file;
    setPrescriptions(updated);
  };
  
  const handleSave = async (index) => {
    const pres = prescriptions[index];
    const formData = new FormData();
    formData.append('medicationName', pres.medicationName);
    formData.append('doctorName', pres.doctorName);
    formData.append('prescriptions', JSON.stringify(pres.prescriptions));
    formData.append('tips', JSON.stringify(pres.tips));
    if (pres.newImage) {
      formData.append('image', pres.newImage);
    }
  
    try {
      const res = await fetch(`http://localhost:5001/api/prescriptions/${pres._id}`, {
        method: 'PUT',
        body: formData,
      });
      if (res.ok) {
        const updated = [...prescriptions];
        updated[index].editing = false;
        updated[index].newImage = null;
        setPrescriptions(updated);
        Swal.fire('Updated!', 'Prescription updated successfully.', 'success');
      }
    } catch (error) {
      console.error('Error updating:', error);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5001/api/prescriptions/${id}`, {
        method: 'DELETE',
      });
      setPrescriptions(prescriptions.filter((p) => p._id !== id));
      Swal.fire('Deleted!', 'Prescription removed.', 'success');
    } catch (error) {
      console.error('Delete error:', error);
    }
  };
  

  
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
            <button  className="bg-gradient-to-r from-[#3A8EF6] to-[#6F3AFA] text-white px-4 py-2 rounded-xl font-bold hover:bg-purple-700 active:bg-purple-900 transition duration-200" >
              <a href='/add-prescriptions'>Add Prescriptions</a>
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div>
          <img src={TrackImg} alt="Tracker Illustration" className="w-[300px] md:w-[400px]" />
        </div>
      </div>

      <div className="ml-32">
      <div className="overflow-x-auto whitespace-nowrap px-4 py-6">
      <div className="flex gap-6 ">
        {prescriptions.map((prescription, index) => (
          <div key={index} className="flex flex-col items-center justify-center font-bold shadow-md rounded-lg p-4 text-center">
            <img
                src={
                  prescription.image
                    ? `http://localhost:5001/uploads/${prescription.image}`
                    : 'default-image.png' // 👈 Make sure this image is in your `public` folder
                }
                alt={prescription.medicationName}
                className="w-24 h-32 object-cover rounded-md mb-2"
              />

            <div className="font-bold">{prescription.medicationName}</div>
            <div className="text-sm text-gray-600">{prescription.doctorName}</div>
          </div>
        ))}
      </div>
    </div>
      </div>

        <div className="text-3xl font-bold ml-32 mt-20 mb-5">View Recent Medics </div>


     <div className="ml-32">

     <div className="flex flex-col gap-6 w-1/4">
  {prescriptions.map((prescription, index) => (
    <div key={index} className="flex flex-col font-bold shadow-md rounded-lg p-4 w-[500px]">
      <div className="flex gap-4">
        {/* Left Section: Medication Info */}
        <div className="flex flex-col items-center w-[200px]">
          {!prescription.editing ? (
            <>
              <div className="font-bold text-lg text-center">{prescription.medicationName}</div>
              <img
                src={`http://localhost:5001/uploads/${prescription.image}`}
                alt={prescription.medicationName}
                className="w-24 rounded-md my-2"
              />
            </>
          ) : (
            <>
              <input
                className="text-center font-medium"
                value={prescription.medicationName}
                onChange={(e) => handleInputChange(index, 'medicationName', e.target.value)}
              />
              <input type="file" onChange={(e) => handleImageChange(index, e.target.files[0])} />
            </>
          )}

          <div className="flex gap-2 mt-2">
            {prescription.editing ? (
              <button
                className="bg-green-500 text-white px-3 py-1 rounded-xl font-bold hover:bg-green-700"
                onClick={() => handleSave(index)}
              >
                Save
              </button>
            ) : (
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded-xl font-bold hover:bg-yellow-700"
                onClick={() => handleEdit(index)}
              >
                Edit
              </button>
            )}
            <button
              className="bg-red-500 text-white px-3 py-1 rounded-xl font-bold hover:bg-red-700"
              onClick={() => handleDelete(prescription._id)}
            >
              Delete
            </button>
          </div>
        </div>

        {/* Right Section: Prescriptions and Tips */}
        <div className="flex flex-col justify-between text-sm text-gray-700 w-full">
          {/* Prescriptions Section */}
<div>
  <div className="bg-blue-300 p-4 rounded-lg">
    <div className="font-semibold text-black underline mb-2">Prescriptions:</div>
    {prescription.prescriptions.map((p, i) => (
      <div key={i} className="flex items-center gap-2 mb-2">
        {prescription.editing ? (
          <>
            <input
              type="text"
              className="w-full p-1 rounded bg-white"
              value={p}
              onChange={(e) => handleArrayChange(index, 'prescriptions', i, e.target.value)}
            />
            <button
              onClick={() => handleRemoveItem(index, 'prescriptions', i)}
              className="text-red-600 font-bold"
            >
              ✕
            </button>
          </>
        ) : (
          <li className="list-disc list-inside ml-4">{p}</li>
        )}
      </div>
    ))}

    {prescription.editing && (
      <button
        onClick={() => handleAddItem(index, 'prescriptions')}
        className="text-blue-700 underline text-sm mt-1"
      >
        + Add Prescription
      </button>
    )}
  </div>
</div>

{/* Tips Section */}
<div className="mt-4">
  <div className="bg-blue-300 p-4 rounded-lg">
    <div className="font-semibold text-black underline mb-2">Tips:</div>
    {prescription.tips.map((tip, i) => (
      <div key={i} className="flex items-center gap-2 mb-2">
        {prescription.editing ? (
          <>
            <input
              type="text"
              className="w-full p-1 rounded bg-white"
              value={tip}
              onChange={(e) => handleArrayChange(index, 'tips', i, e.target.value)}
            />
            <button
              onClick={() => handleRemoveItem(index, 'tips', i)}
              className="text-red-600 font-bold"
            >
              ✕
            </button>
          </>
        ) : (
          <li className="list-disc list-inside ml-4">{tip}</li>
        )}
      </div>
    ))}

    {prescription.editing && (
      <button
        onClick={() => handleAddItem(index, 'tips')}
        className="text-blue-700 underline text-sm mt-1"
      >
        + Add Tip
      </button>
    )}
  </div>
</div>

    

         
         
        </div>
      </div>
    </div>
  ))}
</div>

     </div>
      
     

      
    </div>
  );
}

export default Tracker;
