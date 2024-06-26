import React, { useContext, useEffect,useState } from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import FilterOpt from '../components/FilterOpt'
import Cat_Filt from '../components/Cat_Filt'
import Rat_Filt from '../components/Rat_Filt'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { MainContext } from '../contexts/AppContext'
function Store() {
  const {plants,setPlants}=useContext(MainContext)
  var ref=false
  useEffect(()=>{
    const getData=async()=>{
      const {data}=await axios.get('/api/getPlants')
      setPlants(data)
    }
    if(!ref){
      getData()
      ref=true
    }
  },[ref])
  return (
    <div className=" bg-yellow-50 w-[100vw]  text-lg">
        <Navbar />
        <div className='w-full h-[93vh]  flex '>
            {/* <div className='h-full flex flex-col flex-[0.2] min-w-[10rem]  border-r-2 border-black items-center'>
              <FilterOpt title='category'>
                <Cat_Filt />
              </FilterOpt>
              <FilterOpt title='rating'>
                <Rat_Filt />
              </FilterOpt>
            </div> */}
            <div className='h-full  flex flex-col flex-1 gap-4 overflow-y-scroll  p-4 relative items-center'>
                <input type="text" className='min-w-[16rem] w-[30%] h-[3rem] rounded-md px-4 outline-none drop-shadow-lg text-green-600' placeholder='Search Plant'/>
                <div className='flex gap-2 overflow-y-scroll w-full md:w-[70%] min-w-[16rem] justify-center flex-wrap no-scrollbar '>
                  {plants?
                  plants.map((pl)=>(
                    <Link to={`/item/${pl.Id}`}> 
                      <Card key={pl.Id} name={pl.Data.name} img={pl.Data.img} price={pl.Data.price} Data={pl}/>
                    </Link>
                  ))
                  :<p>Data is being fetched</p>}
                  {/* {plants? 
                    plants.map((pl) =>(
                      <Card key={pl.Id} name={pl.Data.name} img={pl.Data.img} price={pl.Data.price} />
                    ))
                  :<></>} */}
                </div>  
            </div>
        </div>
    </div>
  )
}

export default Store