import { useEffect, useState } from "react";
import { createContext } from "react";
import React from 'react'
import axios from 'axios'

export const MainContext=createContext()
function AppContext({children}) {
  
  const [user,setUser]=useState(null)
  const [refresh,setRefresh]=useState(1)
  const [plants,setPlants]=useState(null)
  const [actPlant,setActPlant]=useState(null)
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
  },[refresh])

  return (
    <MainContext.Provider value={{user,setUser,refresh,setRefresh,plants,setPlants,actPlant,setActPlant}}>
        {children}
    </MainContext.Provider>
  )
}

export default AppContext