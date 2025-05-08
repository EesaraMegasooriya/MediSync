import React, { useState } from 'react';
import Swal from 'sweetalert2'; // For alert popups
import UserImg from './Images/UserLog.png';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire('Error', 'Passwords do not match', 'error');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password, confirmPassword }),
      });

      const data = await response.json();

      if (response.status === 201) {
        Swal.fire('Success', data.message, 'success');
        window.location.href = '/login'; // Redirect to login page after successful registration
      } else {
        Swal.fire('Error', data.message, 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Something went wrong. Please try again later.', 'error');
    }
  };

  return (
    <div>
      <div className="mt-20">
        <div className="text-[#1678F2] font-bold font-poppins text-5xl pt-10 text-center">MEDISYNC</div>
        <div className="text-xl font-semibold text-center pt-5">Your Expert Healthcare</div>
      </div>
      <div className="mt-10">
        <div className="text-3xl font-poppins font-bold text-center">Create an Account</div>
        <div className="text-center pt-5">Welcome to MediSync! Please enter your details.</div>
      </div>

      <div className="grid p-2 grid-cols-3">
        <div className="hidden md:block"></div>
        <div className="w-full">
          <div className="flex flex-col items-center w-full mt-10">
            
              <label className="w-full text-xl font-medium text-gray-700 pl-2  text-left md:w-4/6">Email</label>
              <input
                className="w-full p-2 rounded-lg shadow-md md:w-2/3 mb-2 border border-gray-300 focus:ring focus:ring-blue-300"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            

                <label className="w-full text-xl font-medium text-gray-700 pl-2  text-left md:w-4/6">Username</label>
                <input
                  className="w-full p-2 rounded-lg shadow-md md:w-2/3 border border-gray-300 mb-2 focus:ring focus:ring-blue-300"
                  placeholder="Enter your username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              
            

            
              
                <label className="w-full text-xl font-medium text-gray-700 pl-2  text-left md:w-4/6">Password</label>
                <input
                  className="w-full p-2 rounded-lg shadow-md md:w-2/3 border mb-2 border-gray-300 focus:ring focus:ring-blue-300"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              
            

            
                <label className="w-full text-xl font-medium text-gray-700 pl-2 text-left md:w-4/6">Confirm Password</label>
                <input
                  className="w-full p-2 rounded-lg shadow-md md:w-2/3 border border-gray-300 mb-2 focus:ring focus:ring-blue-300"
                  placeholder="Re-enter your password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              

            <div className="items-center justify-center mt-8 w-full">
              <div className="w-full flex justify-center">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-xl transition duration-200 ease-in-out hover:bg-blue-700 active:bg-blue-900 focus:outline-none font-bold font-poppins w-4/6"
                  onClick={handleRegister}
                >
                  Register
                </button>
              </div>
            </div>
            

            <div className="flex gap-2 justify-center pt-6">
              <div className="text-center"> You have an account? </div>
              <a href='/login' className='text-blue-500'>Signin here</a>
            </div>
          </div>
          
        </div>
        <div className="flex justify-end">
        <img src={UserImg} className="md:w-[300px] justify-end" alt="" />
      </div>
        
      </div>
    </div>
  );
}

export default Register;
