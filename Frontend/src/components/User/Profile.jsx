import React from 'react';
import { useNavigate } from 'react-router-dom'; // For React Router v6

function Profile() {
  const navigate = useNavigate(); // For redirecting after logout

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/login'); // Redirect to login page
  };

  // Check if the user is logged in by checking for the token in localStorage
  const isLoggedIn = localStorage.getItem('token');

  return (
    <div>
      <h1 className='pt-20'>Profile</h1>
      
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-xl transition duration-200 ease-in-out hover:bg-red-700 active:bg-red-900 focus:outline-none font-bold"
        disabled={!isLoggedIn} // Disable the button if the user is not logged in
      >
        Log Out
      </button>

      {!isLoggedIn && (
        <p className="mt-4 text-red-500">
          You are not logged in. Please log in first.
        </p>
      )}
    </div>
  );
}

export default Profile;
