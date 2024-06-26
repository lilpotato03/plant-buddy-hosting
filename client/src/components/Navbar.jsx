import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Mini_cart from './Mini_cart'
import { MainContext } from '../contexts/AppContext'

function Navbar() {

  const [cartSt,setCartSt]=useState(false)
  const {user}=useContext(MainContext)

  return (
    <div className='Navbar w-full h-[7vh] sticky top-0 z-10 text-neutral-100 bg-black flex items-center px-4 justify-between relative'>
        <Link to="/">
        <div className='flex items-center gap-x-1'>
        <div className='size-[1.5rem] '>
          <img src="/plant-white-svg.svg" alt="" />
        </div>
        <p className='z-10 md:z-0 absolute md:relative invisible md:visible'>Plant Buddy</p>
        </div>
        </Link>
        <div className=' flex flex-row-reverse items-center gap-x-4 justify-between'>
        <button onClick={()=>setCartSt(!cartSt)}>
        <div className='flex items-center gap-x-1'>
          <div className='size-[1.5rem] '>
          <img src="/cart-svg.svg" alt="" />
        </div>
        <p className='z-10 md:z-0 absolute md:relative invisible md:visible'>Cart</p>
        </div></button>
        {user?(<Link to='/profile'>
          <div className='flex items-center gap-x-1'>
          <div className='size-[1.5rem] '>
          <img src="/profile-svg.svg" alt="" />
        </div>
        <p className='z-10 md:z-0 absolute md:relative invisible md:visible'>Profile</p>
        </div>
        </Link>):(<Link to="/signup">
        <div className='flex items-center gap-x-1'>
          <div className='size-[1.5rem] '>
          <img src="/signup-svg.svg" alt="" />
        </div>
        <p className='z-10 md:z-0 absolute md:relative invisible md:visible'>SignUp</p>
        </div></Link>)}
        <Link to="/store"><div className='flex items-center gap-x-1'>
        <div className='size-[1.5rem] '>
          <img src="/store.svg" alt="" />
        </div>
        <p className='z-10 md:z-0 absolute md:relative invisible md:visible'>Store</p>
        </div>
        </Link>
        {cartSt?<Mini_cart />:<></>}
        </div>
    </div>
  )
}

export default Navbar