import React from 'react'
import { useState } from 'react'

function FilterOpt(props) {

  const [collapse,setCollapse]=useState(false)
  return (
    <div className='w-[98%]  flex flex-col items-center  p-2 border-black border-b-2'>
        <div className='flex items-center justify-between w-full' onClick={()=>setCollapse(!collapse)}>
        <h3>{props.title}</h3>
        <div className='size-[0.8rem] flex justify-center items-center'>
            {collapse?
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
            </svg>:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>    
            }
        </div>
        </div>
        {collapse?
            <div>
            {props.children}
            </div>:<></>
        }
        
    </div>
  )
}

export default FilterOpt