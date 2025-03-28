import React, { useState, useEffect } from 'react';

import Swal from 'sweetalert2';

import { useNavigate } from 'react-router-dom'; // For React Router v6
import ProfilePic from "../User/Images/Profile.png";

function Profile() {
  const navigate = useNavigate(); // For redirecting after logout


  const [bmi, setBmi] = useState(null);
  
  const calculateBmi = (weightVal = weight, heightVal = height) => {
    const weightNum = parseFloat(weightVal);
    const heightNum = parseFloat(heightVal) / 100; // convert cm to meters
  
    if (!isNaN(weightNum) && !isNaN(heightNum) && heightNum > 0) {
      const bmiValue = (weightNum / (heightNum * heightNum)).toFixed(2);
      setBmi(bmiValue);
    } else {
      setBmi(null);
    }
  };
  
  const getBmiMessage = (bmi) => {
    const value = parseFloat(bmi);
  
    if (isNaN(value)) return { heading: '', message: '' };
  
    if (value >= 18.5 && value <= 24.9) {
      return {
        heading: '🎉 Congratulations !!',
        message: 'You are in the healthy BMI range. Keep it up with your active lifestyle and balanced nutrition!'
      };
    } else {
      return {
        heading: '⚠️ Attention !!',
        message:
          value < 18.5
            ? 'You are underweight. Consider consulting a nutritionist to reach a healthy weight.'
            : value < 30
            ? 'You are overweight. A more active lifestyle and improved diet may help.'
            : 'You are in the obese range. It is highly recommended to consult a healthcare provider.'
      };
    }
  };

  const bmiFeedback = getBmiMessage(bmi); 
  
  


  const calculateAgeFromDob = (dobString) => {
    if (!dobString) return;
  
    const today = new Date();
    const dob = new Date(dobString);
  
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
  
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
  
    setAge(age.toString());
  };
  

  



const getBmiAdvice = (bmi) => {
  if (!bmi) return '';

  const value = parseFloat(bmi);
  if (value < 18.5) {
    return 'You are underweight. Consider consulting a nutritionist.';
  } else if (value < 25) {
    return 'You are in a healthy range. Keep up the good work!';
  } else if (value < 30) {
    return 'You are overweight. A balanced diet and regular exercise could help.';
  } else if (value < 35) {
    return 'You are in Obese Class 1. Medical guidance is recommended.';
  } else if (value < 40) {
    return 'You are in Obese Class 2. Consider a professional health plan.';
  } else {
    return 'You are in Obese Class 3. Immediate medical attention is advised.';
  }
};





  


const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('profilePicture');
  localStorage.removeItem('userId');

  window.dispatchEvent(new Event('authChange')); // 👈 Force header to update
  navigate('/login');
};



  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
const [dob, setDob] = useState('');
const [age, setAge] = useState('');
const [address, setAddress] = useState('');
const [weight, setWeight] = useState('');
const [height, setHeight] = useState('');
const [emergency1, setEmergency1] = useState('');
const [emergency2, setEmergency2] = useState('');
const [profileImageFile, setProfileImageFile] = useState(null);




useEffect(() => {
  const fetchProfile = async () => {
    const userId = localStorage.getItem('userId');

    const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login'); // Redirect if no token
  }
    
    if (!userId) return;

    try {
      const response = await fetch(`http://localhost:5001/api/users/${userId}`);
      const data = await response.json();

      setName(data.name || '');
      if (data.dob) {
        setDob(data.dob);
        calculateAgeFromDob(data.dob); // ✅ Update age from loaded DOB
      }
      
       // ✅ Calculate age from DOB
      setAge(data.age || '');
      setAddress(data.address || '');
      setWeight(data.weight || '');
      setHeight(data.height || '');

      if (Array.isArray(data.emergencyContacts)) {
        setEmergency1(data.emergencyContacts[0] || '');
        setEmergency2(data.emergencyContacts[1] || '');
      }
      setTimeout(() => calculateBmi(data.weight, data.height), 100);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  fetchProfile();
}, [navigate]);


const handleSave = async () => {
  


  const userId = localStorage.getItem('userId'); // ✅ Define it here first
  if (!userId) {
    Swal.fire('Error', 'User ID is missing. Please log in again.', 'error');
    return;
  }
  const formData = new FormData();
  formData.append('userId', userId);
  formData.append('name', name);
  formData.append('dob', dob);
  formData.append('age', age);
  formData.append('address', address);
  formData.append('weight', weight);
  formData.append('height', height);
  formData.append('emergencyContacts[]', emergency1);
  formData.append('emergencyContacts[]', emergency2);
  if (profileImageFile) {
    formData.append('profilePicture', profileImageFile);
  }

  try {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5001/api/users/update-profile', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (res.status === 200) {
      Swal.fire('Success', 'Profile updated successfully!', 'success');
      setEditMode(false);

      // Optional: update localStorage
      if (data.updatedUser?.profilePicture) {
        localStorage.setItem('profilePicture', data.updatedUser.profilePicture);
      }
    } else {
      Swal.fire('Error', data.message, 'error');
    }
  } catch (err) {
    Swal.fire('Error', 'Server error', 'error');
  }
};


  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };
  const username = localStorage.getItem('username');
  
  const greeting = `${getGreeting()}, ${username}`;
  
  // Check if the user is logged in by checking for the token in localStorage
  const isLoggedIn = localStorage.getItem('token');
  const profilePicture = localStorage.getItem('profilePicture');
  
  const profilePicUrl =
  profilePicture && profilePicture !== 'undefined' && profilePicture !== 'null' && profilePicture.trim() !== ''
    ? `http://localhost:5001/uploads/${profilePicture}`
    : '/default-profile.png'; // ✅ Path to your default image in `public/`


  return (
    <div>
      <div className="mt-32">
        <div className="px-52 flex w-full justify-between gap-12">
            <div className=" ">
            <button
                className="px-4 border-2 border-gray-500 rounded-full font-bold flex"
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? 'Cancel Edit' : 'Health Profile'}
                <img className='ml-2 mt-1' width="16" height="16" src="https://img.icons8.com/metro/26/create-new.png" alt="edit" />
              </button>


              <div className="mt-10 flex flex-col">
                <label className="w-full text-lg font-medium text-gray-700 pl-2 text-left md:w-4/6">Name</label>
                <input
                  className="w-full p-2 rounded-lg shadow-md  border border-gray-300 focus:ring focus:ring-blue-300"
                  placeholder='Shamila Liyanarachchi'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!editMode}
                />
                
              </div>
              
              <div className="flex gap-8 w-full">
              <div className="mt-5 flex flex-col">
              <label className=" text-lg font-medium text-gray-700 pl-2  text-left ">Date of Birth</label>
              <input
                type="date"
                className="w-full p-2 rounded-lg shadow-md border border-gray-300 focus:ring focus:ring-blue-300"
                value={dob}
                onChange={(e) => {
                  const value = e.target.value;
                  setDob(value);
                  calculateAgeFromDob(value); // ✅ Calculate and update age
                }}
                disabled={!editMode}
              />


              </div>

              <div className="mt-5 flex flex-col">
              <label className=" text-lg font-medium text-gray-700 pl-2  text-left md:w-4/6">Age</label>
              <input
                className="w-full p-2 rounded-lg shadow-md border border-gray-300 focus:ring focus:ring-blue-300"
                placeholder="Age"
                value={age}
                disabled={true} // ✅ Disable manual editing
              />


              </div>
              </div>

              <div className="mt-5 flex flex-col">
                <label className="w-full text-lg font-medium text-gray-700 pl-2 text-left md:w-4/6">Address</label>
                <input
                  className="w-full p-2 rounded-lg shadow-md  border border-gray-300 focus:ring focus:ring-blue-300"
                  placeholder='22/10, Maharagama Road, Kaduwela'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={!editMode}
                />
              </div>

              <div className="flex gap-8  w-full">
              <div className="mt-5 flex flex-col">
              <label className=" text-lg font-medium text-gray-700 pl-2  text-left md:w-4/6">Weight (KG)</label>
              <input
                  className="w-full p-2 rounded-lg shadow-md border border-gray-300 focus:ring focus:ring-blue-300"
                  placeholder="Weight in KG"
                  value={weight}
                  onChange={(e) => {
                    const input = e.target.value;

                    // Allow only digits with optional single decimal point
                    const valid = input.match(/^\d{0,3}(\.\d{0,1})?$/);
                    if (valid) {
                      setWeight(input);
                      calculateBmi(input, height); // ✅ updated weight value, current height
                    }
                  }}
                  disabled={!editMode}
                />

              </div>

              <div className="mt-5 flex flex-col">
              <label className=" text-lg font-medium text-gray-700 pl-2  text-left md:w-4/6">Height (CM)</label>
              <input
                  className="w-full p-2 rounded-lg shadow-md border border-gray-300 focus:ring focus:ring-blue-300"
                  placeholder="Height in CM"
                  value={height}
                  onChange={(e) => {
                    const input = e.target.value;

                    // Allow only digits and a single decimal point
                    const valid = input.match(/^\d{0,3}(\.\d{0,1})?$/);
                    if (valid) {
                      setHeight(input);
                      calculateBmi(weight, input); // calculate using current weight and new height
                    }
                  }}
                  disabled={!editMode}
                />

              </div>
              </div>

              <div className="flex gap-8 w-full">
              <div className="mt-5 flex flex-col">
              <label className=" text-lg font-medium text-gray-700 pl-2  text-left md:w-4/6">Emergency Contacts</label>
              <div className="flex gap-8 w-full">
              <input
                  className="w-full p-2 rounded-lg shadow-md  border border-gray-300 focus:ring focus:ring-blue-300"
                  placeholder='071 6285 849'
                  value={emergency1}
                  onChange={(e) => {
                    const input = e.target.value.replace(/\D/g, ''); // Remove non-digits
                    if (input.length <= 10) {
                      setEmergency1(input);
                    }
                  }}
                  maxLength={10}
                  disabled={!editMode}
                />
                <input
                  className="w-full p-2 rounded-lg shadow-md  border border-gray-300 focus:ring focus:ring-blue-300"
                  placeholder='077 6945 876'
                  value={emergency2}
                  onChange={(e) => {
                    const input = e.target.value.replace(/\D/g, ''); // Remove non-digits
                    if (input.length <= 10) {
                      setEmergency2(input);
                    }
                  }}
                  maxLength={10}
                  disabled={!editMode}
                />
              </div>
              </div>
              </div>
  

            </div>
            <div className="flex flex-col justify-center items-center ">
              {/* Profile Picture */}
              <div className="">
                <img src={profilePicUrl} alt="" className='rounded-full w-40'  />
                
                {editMode && (
                  <div className="flex justify-center items-center">
                <input
                  type="file"
                  accept="image/*"
                  className="flex w-full mt-4 justify-center "
                  onChange={(e) => setProfileImageFile(e.target.files[0])}
                />
                </div>
              )}

              </div>
              <div className="font-bold pt-5">{greeting}</div>
              
              <div className="text-center">Please keep Complete and Up to date your profile.</div>
              <div className="pt-20 ">
          <div className="">
          <div className="font-bold text-2xl font-poppins text-center">{bmiFeedback.heading}</div>
          <div className="text-gray-600 font-bold mt-5 text-center">Your BMI is {bmi} , {getBmiAdvice(bmi)}</div>
          </div>


        </div>
              
            </div>

        </div>

        <div className="mt-20 flex justify-center">{editMode && (
  <button
    onClick={handleSave}
    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-green-700 transition"
  >
    Save Changes
  </button>
)}

</div>


       
      </div>
      <div className="flex pt-10 justify-center items-center">
       
      
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-xl transition duration-200 ease-in-out hover:bg-red-700 active:bg-red-900 focus:outline-none font-bold"
        disabled={!isLoggedIn} // Disable the button if the user is not logged in
      >
        Log Out
      </button>

      {!isLoggedIn && (
        navigate('/login')
        // <p className="mt-4 text-red-500">
        //   You are not logged in. Please log in first.
        // </p>
      )}
       </div>

      
    </div>
  );
}

export default Profile;
