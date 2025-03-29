import React from 'react'
import Logo from '../assets/Logo.png';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';


function Footer() {
  return (
    <div>
      <div className="w-full py-10 bg-white mt-10 rounded-full">
        <div className="">
        
          <div className="flex justify-center items-center mb-5">
            <img src={Logo} alt="MediSync Logo" className="w-20" />
            <div className="font-poppins bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text font-bold text-lg md:text-3xl ml-3">MediSync</div>
          </div>
        <div className="text-center text-gray-500">Expert care, advanced treatments, and compassionate service—because you deserve the best.</div>
        <div className=" flex gap-7 justify-center pt-10">
        <div className="flex gap-1"><div className="mt-1 text-blue-500"><HiOutlineMail /></div>contact@medisync.com</div>
          <div className="flex gap-1"><div className="mt-1 text-blue-500"><FaPhoneAlt /></div>(0112) 687 - 5892</div>
          <div className="flex gap-1"><div className="mt-1 text-blue-500"><FaMapMarkerAlt /></div>794 Temple St Pittugala, Kaduwela</div>
        </div>
        <div className="">
        <div className="flex flex-wrap justify-center items-center gap-6 mt-16 text-gray-700">
          {/* Social Icons */}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 text-2xl">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 text-2xl">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 text-2xl">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 text-2xl">
            <FaLinkedinIn />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 text-2xl">
            <FaYoutube />
          </a>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Footer