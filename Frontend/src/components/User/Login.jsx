import React, { useState } from 'react';
import Swal from 'sweetalert2'; // For alert popups
import UserImg from './Images/UserLog.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire('Error', 'Please enter both email and password', 'error');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        // Store JWT token in localStorage
        localStorage.setItem('token', data.token);
        
        // Success alert
        Swal.fire({
          title: 'Success!',
          text: data.message || 'Logged in successfully!',
          icon: 'success',
          confirmButtonText: 'Proceed',
        }).then(() => {
          // Redirect to home after successful login
          window.location.href = '/';
        });
      } else {
        // If the login fails, show an error
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
        <div className="text-3xl font-poppins font-bold text-center">Login</div>
        <div className="text-center pt-5">Welcome back! Please enter your details.</div>
      </div>

      <div className="grid grid-cols-3">
        <div className="hidden md:block"></div>
        <div className="w-full">
          <div className="flex flex-col items-center w-full mt-10">
            <div className="w-full flex justify-center">
              <div className="w-full flex flex-col justify-center align-middle items-center">
                <label className="w-full text-xl font-medium text-gray-700 pl-2 pb-2 text-left md:w-4/6">Email</label>
                <input
                  className="w-full p-2 rounded-lg shadow-md md:w-2/3 border border-gray-300 focus:ring focus:ring-blue-300"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full flex justify-center pt-5">
              <div className="w-full flex flex-col justify-center align-middle items-center">
                <label className="w-full text-xl font-medium text-gray-700 pl-2 pb-2 text-left md:w-4/6">Password</label>
                <input
                  className="w-full p-2 rounded-lg shadow-md md:w-2/3 border border-gray-300 focus:ring focus:ring-blue-300"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-8 flex justify-evenly text-sm">
              <div className="">
                <input type="checkbox" className="mr-2" />Remember me
              </div>
              <div className="">
                <a href="#" className="text-black-500">Forgot Password?</a>
              </div>
            </div>

            <div className="items-center justify-center mt-8 w-full">
              <div className="w-full flex justify-center">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-xl transition duration-200 ease-in-out hover:bg-blue-700 active:bg-blue-900 focus:outline-none font-bold font-poppins w-4/6"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
            </div>

            <div className="flex gap-2 justify-center pt-6">
              <div className="text-center">Don’t have an account?</div>
              
              <a href='/register' className='text-blue-500'>Sign up for free!</a>
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

export default Login;
