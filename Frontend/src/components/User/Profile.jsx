import React from 'react';
import { useNavigate } from 'react-router-dom'; // For React Router v6
import ProfilePic from "../User/Images/Profile.png";

function Profile() {
  const navigate = useNavigate(); // For redirecting after logout

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/login'); // Redirect to login page
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
              <button className='px-4 border-2 border-gray-500 rounded-full font-bold flex'>Health Profile 
              <div className=""><img className='ml-2 mt-1' width="16" height="16" src="https://img.icons8.com/metro/26/create-new.png" alt="create-new"/></div>
              </button>

              <div className="mt-10 flex flex-col">
                <label className="w-full text-lg font-medium text-gray-700 pl-2 text-left md:w-4/6">Name</label>
                <input
                  className="w-full p-2 rounded-lg shadow-md  border border-gray-300 focus:ring focus:ring-blue-300"
                  placeholder='Shamila Liyanarachchi'
                />
              </div>
              
              <div className="flex gap-8 w-full">
              <div className="mt-5 flex flex-col">
              <label className=" text-lg font-medium text-gray-700 pl-2  text-left md:w-4/6">Date of Birth</label>
                <input
                  className="w-full p-2 rounded-lg shadow-md  border border-gray-300 focus:ring focus:ring-blue-300"
                  placeholder='12 - May - 1995'
                />
              </div>

              <div className="mt-5 flex flex-col">
              <label className=" text-lg font-medium text-gray-700 pl-2  text-left md:w-4/6">Age</label>
                <input
                  className="w-full p-2 rounded-lg shadow-md  border border-gray-300 focus:ring focus:ring-blue-300"
                  placeholder='30 Years'
                />
              </div>
              </div>

              <div className="mt-5 flex flex-col">
                <label className="w-full text-lg font-medium text-gray-700 pl-2 text-left md:w-4/6">Address</label>
                <input
                  className="w-full p-2 rounded-lg shadow-md  border border-gray-300 focus:ring focus:ring-blue-300"
                  placeholder='22/10, Maharagama Road, Kaduwela'
                />
              </div>

              <div className="flex gap-8  w-full">
              <div className="mt-5 flex flex-col">
              <label className=" text-lg font-medium text-gray-700 pl-2  text-left md:w-4/6">Weight</label>
                <input
                  className="w-full p-2 rounded-lg shadow-md  border border-gray-300 focus:ring focus:ring-blue-300"
                  placeholder='12 - May - 1995'
                />
              </div>

              <div className="mt-5 flex flex-col">
              <label className=" text-lg font-medium text-gray-700 pl-2  text-left md:w-4/6">Height</label>
                <input
                  className="w-full p-2 rounded-lg shadow-md  border border-gray-300 focus:ring focus:ring-blue-300"
                  placeholder='30 Years'
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
                />
                <input
                  className="w-full p-2 rounded-lg shadow-md  border border-gray-300 focus:ring focus:ring-blue-300"
                  placeholder='077 6945 876'
                />
              </div>
              </div>
              </div>
  

            </div>
            <div className="flex flex-col justify-center items-center ">
              {/* Profile Picture */}
              <div className="">
                <img src={profilePicUrl} alt="" className='rounded-full w-40'  />
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
