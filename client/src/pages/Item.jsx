import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams,Link } from 'react-router-dom'
import axios from 'axios'
import { MainContext } from '../contexts/AppContext'
function Item() {
    const [count,setCount]=useState(0)
    const {id}=useParams()
    const [actIndex,setActIndex]=useState(0)
    console.log(id)
    const {actPlant,setActPlant}=useContext(MainContext)
    const [data,setData]=useState(actPlant)
    const {setRefresh,refresh}=useContext(MainContext)
    async function handleAdd(){
        try{
            await axios.post('/api/updateCart',{
              id:data.Id,
              name:data.Data.name,
              price:data.Data.price,
              qty:count,
              type:'add',
              img:data.Data.img[0]
            },{headers:{"Content-Type":"application/x-www-form-urlencoded"}})
            await setRefresh(refresh+1)
          }catch(e){
            console.log(e)
          }
    }
    useEffect(()=>{
        const getData=async()=>{
            const result=await axios.post('/api/getPlant',{id:id},{headers:{"Content-Type":"application/x-www-form-urlencoded"}})
            setData(result.data)
            setActPlant(result.data)
        }
        if(actPlant==null){
            getData()
        }
    },[])
  return (
    <div className=" bg-yellow-50 w-[100vw] text-lg">
        <Navbar />
        <div className='w-[100vw]  md:h-[100vh] overflow-y-scroll flex  justify-center items-center md:scale-100 scale-90 '>
            {data?
            <div className='h-[55rem] shrink-0 md:h-[30rem] md:w-[44rem] bg-white flex md:flex-row  gap-y-2 flex-col  p-2 items-center md:gap-x-10 rounded-md drop-shadow-md'>
                <div className='h-[2rem]  w-full items-start md:w-[0.1rem] md:h-full'>
                    <Link to='/store' >
                        <div className='size-[1.7rem] hover:cursor-pointer '>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                            </svg>
                        </div>
                    </Link>
                </div>
                <div className='flex flex-col gap-y-4 drop-shadow-md rounded-md'>
                    <div className='size-[21rem] bg-green-400 shrink-0 '>
                        <img src={data.Data.img[actIndex]} alt="" />
                    </div>
                    <div className='flex gap-x-1 justify-center'>
                        <div className="size-[6.8rem] bg-blue-400">
                            <img src={data.Data.img[0]} onClick={()=>{setActIndex(0)}}/>
                        </div>
                        <div className="size-[6.8rem] bg-blue-400">
                        <img src={data.Data.img[1]} onClick={()=>{setActIndex(1)}}/>
                        </div>
                        <div className="size-[6.8rem] bg-blue-400">
                        <img src={data.Data.img[2]} onClick={()=>{setActIndex(2)}}/>
                        </div>
                    </div>
                </div>
                <div className='w-[20rem] h-full p-2 relative flex-col justify-center gap-y-4'>
                    <h1 className='w-full flex text-wrap mb-4 text-[30px] md:text-[40px] leading-tight'>{data.Data.name}</h1>
                    <h2 className='text-[25px] md:text-[30px] mb-4'>${data.Data.price}</h2>
                    <p className='text-[13px] w-[80%] leading-tight'>{data.Data.desc}</p>
                    <div className='flex flex-col absolute bottom-0 w-[98%]'>
                        <div className='flex w-[3.6rem] h-[1.5rem] rounded-md drop-shadow-md md:scale-150 my-3 md:m-5'>
                            <button className='w-[1.2rem] h-[1.5rem] flex justify-center items-center bg-white rounded-l-md text-red-600 hover:bg-neutral-200' onClick={()=>{
                            if(count>0){
                                setCount(count-1)
                            }
                            }} >
                                <div className='flex size-[80%] justify-center items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                                    </svg>
                                </div>
                            </button>
                            <div className='w-[1.2rem] h-[1.5rem] flex justify-center items-center bg-white text-[15px] border-x-[2px] border-neutral-100'>{count}</div>
                            <button className='w-[1.2rem] h-[1.5rem] flex justify-center items-center bg-white rounded-r-md text-green-600 hover:bg-neutral-200' onClick={()=>{setCount(count+1)}}>
                            <div className='flex size-[80%] justify-center items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </div>
                            </button>
                        </div>
                        <button className='bg-black text-white jost-500 rounded-md drop-shadow-md text-[25px] md:text-[30px] p-4 w-full text-center' onClick={handleAdd}>Add to Cart</button>
                    </div>
                    
                </div>
            </div>
            :<h2>Getting Data....</h2>}

           
        </div>
    </div>  
    )
}

export default Item