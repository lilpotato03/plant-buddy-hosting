import React from 'react'
import { Link } from 'react-router-dom'
function NotFound() {
  return (
    <div className=" bg-neutral-700 w-[100vw] h-[100vh] text-lg flex flex-col gap-y-4 justify-center items-center text-[40px] text-white">
        404 Not Found
        <Link to="/">
        <button className='mt-5 w-50 p-4 rounded-md bg-green-700 jost-500 text-green-200 drop-shadow-md hover:bg-green-800 hover:text-green-300'>Go Home</button>
        </Link>
    </div>
  )
}

export default NotFound