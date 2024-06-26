import React, { useContext, useEffect, useState } from 'react'
import { Outlet,Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { MainContext } from '../contexts/AppContext'
import NotFound from './NotFound'
function Profile() {
    const {user}=useContext(MainContext)
    const [render,setRender]=useState(false)
    useEffect(()=>{
        if(user!=null){
            setRender(true)
        }
    },[])
    return (
        <>{render?<div className="bg-yellow-50 h-[100vh] w-[100vw]   text-lg">
            <Navbar />
            <div className='w-full h-[93vh] sm:scale-100 flex sm:flex-row  flex-col justify-center items-center rounded-md drop-shadow-md'>
                
                <div className='sm:h-[24rem] sm:w-[13rem] w-[95%] h-[3rem]   rounded-t-md sm:rounded-l-md sm:rounded-r-none py-2 px-4 flex sm:flex-col bg-white items-center justify-between sm:justify-start gap-y-2 drop-shadow-md'>
                    <Link to='/profile'>
                    <div className='w-[3rem]  sm:w-[11rem] h-[3rem] sm:border-b-2  sm:border-neutral-200 flex p-2  hover:border-neutral-600'>
                            <div className='bg-purple-400 w-[2rem] h-[2rem] shrink-0 rounded-full '></div>
                            <div className='invisible sm:visible  flex p-2 flex-col justify-center'>
                                <p className='z-10 sm:z-0 text-[12px]'>Aaron Furtado</p>
                            </div>
                        </div>
                    </Link>
                    <div className='sm:h-[2.5rem] size-[2rem] sm:w-full shrink-0  sm:scale-100 origin-top-left  text-black border-neutral-200 border-b-2  p-2 flex items-center justify-center hover:text-neutral-600 hover:border-neutral-600'>
                         <Link to='/profile/orders'>
                         <div className='flex items-center gap-x-2'>
                            <div className='size-[1rem]'>
                                <img src="/order-svg.svg" alt="" />
                            </div>
                            <p className='z-10 sm:z-0 absolute sm:relative invisible sm:visible'>Orders</p>
                         </div>
                            
                         </Link>
                    </div>

                    <div className='sm:h-[2.5rem] size-[2rem] sm:w-full shrink-0  sm:scale-100 origin-top-left   text-black border-neutral-200 border-b-2  p-2 flex items-center justify-center hover:text-neutral-600 hover:border-neutral-600'>
                        <Link to='/profile/addresses'>
                        <div className='flex items-center gap-x-2'>
                        <div className='size-[1rem]'>
                                <img src="/address-svg.svg" alt="" />
                            </div>
                            <p className='z-10 sm:z-0 absolute sm:relative invisible sm:visible'>Addresses</p>
                        </div>
                            
                        </Link>
                    </div>
                    <div className='sm:h-[2.5rem] size-[2rem] sm:w-full shrink-0  sm:scale-100    text-black border-neutral-200 border-b-2  p-2 flex items-center justify-center hover:text-neutral-600 hover:border-neutral-600'>
                        <Link to='/profile/payments'>
                        <div className='flex items-center gap-x-2'>
                        <div className='size-[1rem]'>
                                <img src="/payment-svg.svg" alt="" />
                        </div>
                        <p className='z-10 sm:z-0 absolute sm:relative invisible sm:visible'>Payments </p>
                        </div>
                        
                        </Link>
                    </div>
                    
                    <div className='sm:h-[2.5rem] size-[2rem] sm:w-full shrink-0  sm:scale-100 origin-top-left   text-black border-neutral-200 border-b-2 2 p-2 flex items-center justify-center hover:text-neutral-600 hover:border-neutral-600'>
                        <Link to='/profile/admin'>
                        <div className='flex items-center gap-x-2'>
                        <div className='size-[1rem]'>
                                <img src="/admin-svg.svg" alt="" />
                            </div>
                        <p className='z-10 sm:z-0 absolute sm:relative invisible sm:visible'>Admin</p>
                        </div>
                        
                        </Link>
                    </div>
                    <div className='sm:h-[2.5rem] size-[2rem] sm:w-full shrink-0  sm:scale-100 origin-top-left   text-black border-neutral-200 border-b-2 2 p-2 flex items-center justify-center hover:text-neutral-600 hover:border-neutral-600'>
                        <Link to='/profile/signout'>
                        <div className='flex items-center gap-x-2'><div className='size-[1rem]'>
                                <img src="/logout-svg.svg" alt="" />
                            </div>
                        <p className='z-10 sm:z-0 absolute sm:relative invisible sm:visible'>Signout</p>
                        </div>
                        
                        </Link>
                    </div>
                </div>
                <div className='size-[95vw] sm:size-[24rem] bg-neutral-100 rounded-b-md sm:rounded-r-md sm:rounded-l-none flex p-4 justify-center items-center relative'>
                <div className="size-[90%] top-[5%] left=[5%] rounded-md bg-white blur absolute z-[0]">
                </div>
                <div className='size-[90%] z-10'>
                    <Outlet />
                </div>
                </div>
            </div>
        </div>:<NotFound />}</>
        
      )
}

export default Profile