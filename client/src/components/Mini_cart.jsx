import React, { useContext, useEffect, useState } from 'react'
import Mini_Cart_Item from './Mini_Cart_Item.jsx'
import { MainContext } from '../contexts/AppContext.jsx'
import { Link } from 'react-router-dom'
import axios from 'axios'
function Mini_cart() {
  const {user,setUser}=useContext(MainContext)
  const [ref,setRef]=useState(1)
  useEffect(()=>{
    const get=async()=>{
      try{
        const res=await axios.get('/api/userData')
        if(res.status==200){
          setUser(res.data)
          console.log(res.data)
        }
      }catch(e){
        console.log(e)
      }
    }
      get()
  },[ref]
  )
  return (
    <div className='z-10 absolute top-[7vh] w-[20rem] md:w-[20rem] sm:w-[20rem] h-[25rem] md:h-[25rem] gap-y-4 bg-white text-black p-4 flex flex-col drop-shadow-md rounded-b-md'>
      <h2 className='text-center'>Cart</h2>
      {user?
      <div className='flex flex-col w-full h-full relative'>
        <div className='w-full h-[75%] overflow-y-scroll no-scrollbar  flex flex-col gap-y-2 '>

        {user.cart.items.length===0||user.cart.items[0]===null?<h3>Add items to cart</h3>:user.cart.items.map((item,index)=> {
          return(
            <Mini_Cart_Item data={item} key={index} func={setRef} refer={ref}/>
          )
        })}
        </div>
        <div className='w-full h-[7vh] flex flex-col  justify-center gap-x-4 absolute bottom-5'>
          <h3 className=''>{user.cart.value>0?`Cart value:${user.cart.value}`:<></>}</h3>
          {user.cart.items.length===0||user.cart.items[0]===null?<></>:<Link to='/checkout'>
          <button className='text-white jost-400 px-2 bg-green-400 rounded-md drop-shadow-md hover:bg-green-500 hover:text-neutral-100'>Checkout</button>
          </Link>}
        </div>
      </div>:<h3 className='text-center'>Sign in to access Cart</h3>}
    </div>
  )
}

export default Mini_cart