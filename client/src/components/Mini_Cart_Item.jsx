import React, { useContext, useEffect, useState } from 'react'
import { MainContext } from '../contexts/AppContext'
import axios from 'axios'

function Mini_Cart_Item(props) {
    const [count,setCount]=useState()
    const price=props.data.price
    useEffect(()=>{
      setCount(props.data.qty)
    },[props.data.qty])
    async function handleDec(){
      try{
        await axios.post('/api/updateCart',{
          id:props.data.id,
          name:props.data.name,
          price:props.data.price,
          qty:1,
          img:props.data.img,
          type:'sub'
        },{headers:{"Content-Type":"application/x-www-form-urlencoded"}})
        props.func(props.refer+1)     
      }catch(e){  
        console.log('Couldnt decrement')
      }
    }
    async function handleInc(){
      try{
        await axios.post('/api/updateCart',{
          id:props.data.id,
          name:props.data.name,
          price:props.data.price,
          img:props.data.img,
          qty:1,
          type:'add'
        },{headers:{"Content-Type":"application/x-www-form-urlencoded"}})
        await props.func(props.refer+1)
      }catch(e){
        console.log('Couldnt increment')
      }

    }
  return (
    <div className='w-full h-[5rem]  flex items-center p-2 shrink-0 border-b-2 border-neutral-200 gap-x-2 relative'>
    <div className='w-[4rem] h-[4rem] bg-pink-300 rounded-md'>
    {/* insert image here*/}
    <img src={props.data.img} className='rounded-md' alt="" />
    </div>
    <div className='h-full flex flex-col justify-between'>
    <h3>{props.data.name}</h3>
    <div className='flex w-[3.6rem] h-[1.5rem] bg-blue-800 rounded-md drop-shadow-md'>
        <button className='w-[1.2rem] h-[1.5rem] flex justify-center items-center bg-white rounded-l-md text-red-600 hover:bg-neutral-200' onClick={()=>{
            setCount(count-1)
            handleDec()
        }} >{count<=1?
        <div className='flex size-[80%] justify-center items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </div>
        :<div className='flex size-[80%] justify-center items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
        </svg>
      </div>
      }</button>
        <div className='w-[1.2rem] h-[1.5rem] flex justify-center items-center bg-white text-[15px] border-x-[2px] border-neutral-100'>{count}</div>
        <button className='w-[1.2rem] h-[1.5rem] flex justify-center items-center bg-white rounded-r-md text-green-600 hover:bg-neutral-200' onClick={()=>{
          setCount(count+1)
          handleInc()
          }}>
          <div className='flex size-[80%] justify-center items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
        </button>

    </div>
    </div>
    <div className=' w-[5rem] h-[2rem] px-1 absolute right-2 top-2 text-end'>
        <h3>${(price*count).toFixed(2)}</h3>
    </div>
    </div>
  )
}

export default Mini_Cart_Item