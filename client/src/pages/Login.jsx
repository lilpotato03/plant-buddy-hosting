import React,{ useContext, useEffect, useState } from 'react'
import { Link, redirect,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { MainContext } from '../contexts/AppContext'
function Login() {
    const [em,setEm]=useState(null)
    const [pw,setPw]=useState(null)
    const [er,setEr]=useState(null)
    const [send,setSend]=useState(false)
    const {setRefresh,refresh}=useContext(MainContext)
    const Navigate=useNavigate()

    useEffect(()=>{
        const sendData=async ()=>{
            try{
                const result=await axios.post('/api/loginUser',{email:em,password:pw},{headers:{"Content-Type":"application/x-www-form-urlencoded"}})
                console.log('Login Successful')
                setEr('Logged In Succesfully')
                setTimeout(()=>{
                    window.location.replace('/')
                },3000)
            }catch(e){
                console.log(e.response.status)
                setEr('Incorrect Password or Email')

            }
        }
        if(send==true){
            sendData()
            setSend(false)
            setEm('')
            setPw('')
            setRefresh(refresh+1)   
        }
    },[send])
    
  return (
    <div className=" bg-yellow-50 w-[100vw] h-[100vh] relative flex flex-col items-center justify-center text-lg p-4 gap-y-4">
        <h2 className=''>Login</h2>
        <div className='flex flex-col gap-y-4'>
        <input type="text" className='rounded-md h-[7vh] drop-shadow-md px-2 outline-none text-[15px]'placeholder='Email' value={em} onChange={(e)=>{setEm(e.target.value)}}/>
        <input type="password" className='rounded-md h-[7vh] drop-shadow-md px-2 outline-none text-[15px]'placeholder='Password' value={pw} onChange={(e)=>{setPw(e.target.value)}}/>
        <button onClick={()=>setSend(true)} className='rounded-md h-[7vh] drop-shadow-md bg-green-500 text-[15px] jost-600 px-2 text-white'>Login</button>
        <p className='text-[12px] w-full text-center'>{er}</p>
        </div>
        <div className='flex justify-center items-center w-[13rem] h-[0.1rem] relative mt-2 mb-2'>
            <div className='w-[13rem] h-[0.1rem] bg-neutral-500'></div>
            <p className='absolute bg-yellow-50 text-[15px] px-2 h-[5.6vh] align-text-top'>or</p>
        </div>
        <button type='submit' className='rounded-md h-[7vh] drop-shadow-md bg-white text-[15px] jost-600 px-2 flex justify-center items-center w-[13rem] gap-x-2'>
            <img className='size-4'src="data:image/png;base64,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" alt="" />
            <h3>Google</h3>
        </button>
        <Link to='/signup' className='text-[11px] hover:text-blue-600'>Dont have an account?Click Here to SignUp..</Link>
        <Link to='/'>
            <button type='submit' className='rounded-md h-[4vh] drop-shadow-md bg-white text-[10px] jost-600 px-2 flex justify-center items-center w-[5rem] gap-x-1'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Home-icon.svg/2048px-Home-icon.svg.png" className='size-2' alt="" />
            <h4>Go Home</h4>
            </button>   
        </Link>
    </div> 
    )
}

export default Login