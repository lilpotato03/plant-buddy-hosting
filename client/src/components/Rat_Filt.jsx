import React from 'react'

function Rat_Filt() {
    const ratings=[1.0,1.5,2.0,2.5,3.0,3.5,4.0,4.5]
    return (
        <div className='flex w-[12rem] m-2 h-[4rem] flex-wrap gap-2 p-2'>
            {ratings.map((rt)=>{
                return(
                    <button key={rt} className='bg-white w-8 h-5 text-[17px] rounded-md drop-shadow-md text-green-400 flex justify-center items-center'>{rt}</button>
                )
            })}
        </div>
    )
}
function gen_tile(){
    
}

export default Rat_Filt