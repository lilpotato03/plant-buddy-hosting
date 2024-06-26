import React, { useContext } from 'react'
import { MainContext } from '../contexts/AppContext'

function Card(props) {
  const {setActPlant}=useContext(MainContext)
  return (
    <div className='min-h-[15rem] min-w-[10rem] drop-shadow-md bg-white rounded-md flex max-w-[17rem] gap-y-2 max-h-[19rem] flex-col items-center p-2 md:scale-100 scale-[97%] origin-top-left' onClick={()=>{setActPlant(props.Data)}}>
    <div className='w-[10rem] h-[10rem] bg-pink-300 rounded-md'>
    {/* insert image here*/}
    <img src={props.img[0]} className='rounded-md' alt="" />
    </div>
    <div className='w-[10rem] h-[2rem]  rounded-md'>
      {/*insert name of plant */}
      <h2 className='text-neutral-700 w-full text-[15px]'>{props.name}</h2>
    </div>
    <div className='w-[7rem] h-[1.5rem]  rounded-md self-start ml-2'>
      {/*insert price of plant */}
      <h3 className='text-green-600'>${props.price}</h3>
    </div>
    <div className='w-[10rem] h-[1rem] flex'>
    <div className='w-[4.5rem] h-[1rem]  rounded-md self-start flex items-center px-1 '>
        <img src="/star-svg.svg" className='size-[0.8rem] ' alt="" />
        <img src="/star-svg.svg" className='size-[0.8rem] ' alt="" />
        <img src="/star-svg.svg" className='size-[0.8rem] ' alt="" />
        <img src="/star-svg.svg" className='size-[0.8rem] ' alt="" />
        <img src="/star-svg.svg" className='size-[0.8rem] ' alt="" />
    </div>
    <div className='w-[2rem] h-[1rem]  rounded-md self-start text-[13px] flex items-center p-1 '>
        5.0
    </div>
    </div>
    
  </div>
  )
}

export default Card