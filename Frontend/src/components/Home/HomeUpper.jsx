import React from 'react';
import Photo1 from '../../assets/Photo1.png';

function HomeUpper() {
  return (
    <div className="bg-gradient-radial from-blue-400/70 to-white py-20 flex items-center">
      <div className="w-full flex flex-col-reverse md:flex-row justify-between items-center mx-48 gap-10">
        <div className="text-center md:text-left">
          <div className="flex flex-col gap-5">
            <div className="text-blue-500 text-4xl md:text-5xl font-extrabold font-poppins">Expert Healthcare</div>
            <div className="text-4xl md:text-5xl font-extrabold font-poppins">Right at Your</div>
            <div className="text-4xl md:text-5xl font-extrabold font-poppins">Fingertips</div>    
          </div>
          <div className="text-gray-600 pt-6 md:pt-10 font-poppins font-semibold">
            Your health, our commitment. We care, you heal.
          </div>

          {/* Search Bar Part */}
          <div className="pt-6 md:pt-10"> 
            <form className="flex flex-col sm:flex-row items-center max-w-lg mx-auto md:mx-0">
              <label className="sr-only" htmlFor="voice-search">Search</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  >
                    <path
                      d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      stroke="currentColor"
                    ></path>
                  </svg>
                </div>
                <input
                  required
                  placeholder="Search..."
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="voice-search"
                  type="text"
                />
              </div>
              <button
                className="mt-4 sm:mt-0 sm:ml-2 inline-flex items-center py-2.5 px-3 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="submit"
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="w-4 h-4 me-2"
                >
                  <path
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    stroke="currentColor"
                  ></path>
                </svg>
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="flex justify-center">
          <img src={Photo1} alt="Photo1" className="w-64 md:w-[800px]" />
        </div>
      </div>
    </div>
  );
}

export default HomeUpper;