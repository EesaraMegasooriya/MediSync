import React from 'react'
import Home1 from './Home/HomeUpper' 
import Home2 from './Home/HomeMid'
import Home3 from './Home/HomeBottom'
import ChatBot from './ChatBot'

function Home() {
  return (
    <div>
        <Home1/>
        <Home2/>
        <Home3/>
        <ChatBot />
    </div>
  )
}

export default Home

