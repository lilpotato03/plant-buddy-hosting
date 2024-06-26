import React from 'react'
import { Link } from 'react-router-dom'
function Hero() {
  return (
    <div className='w-full h-[100vh]  relative'>
      <div>
        <img src="/Hero_img.webp" className='z-0 absolute' alt="Hero Image"/>
      </div>
        <div className='text-center w-full  absolute top-[25%]  flex flex-col items-center'>
        <h1 className='text-green-100'>Get the Plant that is right for</h1>
        <h1 className='text-green-100'>You</h1>
        <Link to="/store">
        <button className='mt-5 w-40 p-4 bg-green-100 jost-500 text-green-700 drop-shadow-md hover:bg-green-200 hover:text-green-900'>Go to Store</button>
        </Link>
        </div>
    </div>

  )
}

export default Hero