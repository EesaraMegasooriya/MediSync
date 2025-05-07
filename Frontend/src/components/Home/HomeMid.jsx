import React from 'react';
import Food from './Images/diet.png';
import Chat from './Images/chatbot.png';
import State from './Images/stats.png';

function HomeMid() {
  return (
    <div className="mx-48 font-poppins pb-12">
      <div className="text-center md:text-left bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text font-bold text-lg md:text-xl">
        FEATURES WE PROVIDE
      </div>
      {/* Calculating BMI */}
      <div className="w-full md:w-[550px] text-center md:text-left pb-8">
        
          <div className="text-3xl md:text-4xl font-bold">Calculating BMI is easier</div>
          
          <div className="text-gray-500 font-bold pt-3">
            We calculate your BMI index from data like age, height, weight.
          </div>
        </div>
      <div className="flex flex-col md:flex-row flex-wrap gap-10 justify-center items-center md:items-start pt-6">
        

        {/* Features Section */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-5xl mx-auto text-center">
  {/* Food Recommendation */}
  <div className="w-full max-w-xs flex flex-col items-center mx-auto">
    <img src={Food} className="w-14 pb-4" alt="Food Recommendation" />
    <div className="font-bold text-lg">Food Recommendation</div>
    <div className="text-gray-500 text-sm">
      We provide food accommodation according to your calorie requirements.
    </div>
  </div>

  {/* ChatBot */}
  <div className="w-full max-w-xs flex flex-col items-center mx-auto">
    <img src={Chat} className="w-14 pb-4" alt="ChatBot" />
    <div className="font-bold text-lg">ChatBot</div>
    <div className="text-gray-500 text-sm">
      Solve your queries by interacting with our bot.
    </div>
  </div>

  {/* Nutritional Value */}
  <div className="w-full max-w-xs flex flex-col items-center mx-auto">
    <img src={State} className="w-14 pb-4" alt="Nutritional Value" />
    <div className="font-bold text-lg">Nutritional Value</div>
    <div className="text-gray-500 text-sm">
      Get all the nutritional values of your preferred dish.
    </div>
  </div>
</div>

      </div>
    </div>
  );
}

export default HomeMid;