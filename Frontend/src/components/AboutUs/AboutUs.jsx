import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import AboutUsImg from "../../assets/selflove.png";

const AboutUs = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-100 to-purple-200 min-h-screen flex items-center justify-center px-6 py-12 overflow-hidden">
      
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 bg-white shadow-2xl rounded-3xl p-10">
        
        {/* Left Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={AboutUsImg} 
            alt="Healthcare"
            className="w-80 md:w-96 rounded-full shadow-lg border-8 border-blue-400 hover:rotate-3 hover:scale-105 transition-all duration-300"
          />
        </div>

        {/* Right Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-gray-900 drop-shadow-lg bg-gradient-to-r from-blue-700 to-purple-700 text-transparent bg-clip-text">
            About Us
          </h1>
          
          <p className="text-lg text-gray-900 mt-6 leading-relaxed">
            <Link to="/" className="text-blue-700 font-bold hover:underline">
              MediSync
            </Link> is a modern healthcare management platform. It streamlines 
            appointment scheduling, patient reminders, and doctor consultations.
          </p>

          <p className="text-lg text-gray-900 mt-4 leading-relaxed">
            Our mission is to enhance the patient experience with seamless, 
            technology-driven solutions. <strong className="text-purple-700">MediSync</strong> ensures efficient healthcare coordination.
          </p>

          <p className="text-lg text-gray-900 mt-4 leading-relaxed">
            <span className="text-blue-600 font-semibold">Join us</span> in revolutionizing the way healthcare services are managed.
          </p>

          {/* Call to Action Button */}
          <button className="mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
