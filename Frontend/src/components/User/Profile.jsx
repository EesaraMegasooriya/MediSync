import React, { useState, useEffect } from 'react';

import Swal from 'sweetalert2';

import { useNavigate } from 'react-router-dom'; // For React Router v6
import ProfilePic from "../User/Images/Profile.png";

function Profile() {
  const navigate = useNavigate(); // For redirecting after logout

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/login'); // Redirect to login page
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
    if (!userId) return;

    try {
      const response = await fetch(`http://localhost:5001/api/users/${userId}`);
      const data = await response.json();

      setName(data.name || '');
      setDob(data.dob || '');
      setAge(data.age || '');
      setAddress(data.address || '');
      setWeight(data.weight || '');
      setHeight(data.height || '');

      if (Array.isArray(data.emergencyContacts)) {
        setEmergency1(data.emergencyContacts[0] || '');
        setEmergency2(data.emergencyContacts[1] || '');
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  fetchProfile();
}, []);


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
  
const profilePicUrl = profilePicture
  ? `http://localhost:5001/uploads/${profilePicture}`
  : '/default-profile.png'; // Put default image in your public folder

  return (
    <div>
      <div className="mt-32">
        <div className="px-32 flex w-full justify-between">
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
              <label className=" text-lg font-medium text-gray-700 pl-2  text-left md:w-4/6">Date of Birth</label>
                <input
                  className="w-full p-2 rounded-lg shadow-md  border border-gray-300 focus:ring focus:ring-blue-300"
                  placeholder='12 - May - 1995'
                  type='date'
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  disabled={!editMode}
                />
              </div>

              <div className="mt-5 flex flex-col">
              <label className=" text-lg font-medium text-gray-700 pl-2  text-left md:w-4/6">Age</label>
                <input
                  className="w-full p-2 rounded-lg shadow-md  border border-gray-300 focus:ring focus:ring-blue-300"
                  placeholder='30 Years'
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  disabled={!editMode}
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
              <label className=" text-lg font-medium text-gray-700 pl-2  text-left md:w-4/6">Weight</label>
                <input
                  className="w-full p-2 rounded-lg shadow-md  border border-gray-300 focus:ring focus:ring-blue-300"
                  placeholder='50KG'
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  disabled={!editMode}
                />
              </div>

              <div className="mt-5 flex flex-col">
              <label className=" text-lg font-medium text-gray-700 pl-2  text-left md:w-4/6">Height</label>
                <input
                  className="w-full p-2 rounded-lg shadow-md  border border-gray-300 focus:ring focus:ring-blue-300"
                  placeholder='30 Years'
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
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
                  onChange={(e) => setEmergency1(e.target.value)}
                  disabled={!editMode}
                />
                <input
                  className="w-full p-2 rounded-lg shadow-md  border border-gray-300 focus:ring focus:ring-blue-300"
                  placeholder='077 6945 876'
                  value={emergency2}
                  onChange={(e) => setEmergency2(e.target.value)}
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
                <input
                  type="file"
                  accept="image/*"
                  className="mt-4"
                  onChange={(e) => setProfileImageFile(e.target.files[0])}
                />
)}

              </div>
              <div className="font-bold pt-5">{greeting}</div>
              
              <div className="text-center">View and update your health profile anytime.</div>
              
            </div>

        </div>


        {/* BMI Cal */}
        <div className="pt-32 px-32">
          <div className="">
          <div className="font-bold text-2xl font-poppins">Calculating BMI is easier now</div>
          <div className="text-gray-600 font-bold mt-5">Your BMI is 22.04 based on a weight and height, placing you in the normal weight range. Keep up the good work!</div>
          </div>


        </div>
        {editMode && (
  <button
    onClick={handleSave}
    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-green-700 transition"
  >
    Save Changes
  </button>
)}



        
        
        

      </div>


      <h1 className='pt-20'>Profile</h1>
      
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
  );
}

export default Profile;
