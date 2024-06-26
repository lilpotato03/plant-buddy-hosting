import React, { useContext, useState,useEffect } from 'react'
import { MainContext } from '../contexts/AppContext'
import Address_Card from '../components/Address_Card'
import Payment_Card from '../components/Payment_Card'
import { Link } from 'react-router-dom'
import axios from 'axios'
import NotFound from './NotFound'

function Checkout() {
    const {user,setUser}=useContext(MainContext)
    const [render,setRender]=useState(false)
    useEffect(()=>{
        if(user!=null){
            setRender(true)
        }
    },[])
    const [adI,setAdI]=useState(null)
    const [pmI,setPmI]=useState(null)
    const [er,setEr]=useState('')
    console.log(user)
    async function ValidateForm(){
        var currentdate = new Date(); 
        var date=currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear();
        var time=currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        if(adI===null){
            setEr('Choose an Address')
        }
        else if(pmI===null){
            setEr('Choose a Payment Method')
        }
        else{
            const data={
                email:user.email,
                name:user.name,
                date:date,
                time:time,
                addr:user.addrs[adI],
                uid:user.uid,
                paymt:{card_no:`XXXX-XXXX-XXXX-${user.paymt[pmI].card_no.substring(12)}`,name:user.paymt[pmI].name},
                cart:user.cart
            }
            const result=await axios.post('/api/addOrder',data,{headers:{"Content-Type":"application/x-www-form-urlencoded"}})
            if(result.data==='success'){
                setEr('This is just a dummy transaction,You will be redirected to the Home Page')
                setInterval(()=>{
                    window.location.replace('/')
                },5000)
            }
            else{
                setEr('Issue processing transaction')
            }
            
        }
    }
  return (
    <>{render?    <div className='w-[100vw] min-h-[60rem] py-10 overflow-y-scroll  bg-yellow-50 flex flex-col gap-y-4 justify-center items-center'>
        <div className='w-[20rem] max-h-[20rem] bg-white p-2 rounded-md drop-shadow-md border-2 border-neutral-200 flex flex-col'>
            <h2 className='bg-black p-2 text-white rounded-md'>Items</h2>
            <div className='w-full h-full overflow-y-scroll no-scrollbar  flex flex-col gap-y-2 '>
            {user.cart.items.map((item)=>(
                <div className='w-full h-[6rem]  flex items-center p-2 shrink-0 border-b-2 border-neutral-200 gap-x-2 relative'>
                    <div className='w-[4rem] h-[4rem] bg-pink-300 rounded-md'>
                    {/* insert image here*/}
                    <img src={item.img} className='rounded-md' alt="" />
                    </div>
                    <div className='h-full flex flex-col justify-between'>
                    <h3 className='w-[9rem]'>{item.name}</h3>
                    <h3>x{item.qty}</h3>
                    </div>
                    <div className=' w-[5rem] h-[2rem] px-1 absolute right-2 top-2 text-end'>
                        <h3>${(item.price*item.qty).toFixed(2)}</h3>
                    </div>
                </div>
            ))}
            </div>
            <h3>Total:${user.cart.value}</h3>
        </div>
        <div className='w-[20rem]  max-h-[20rem] bg-white p-2 rounded-md drop-shadow-md border-2 gap-y-2 border-neutral-200 flex flex-col'>
            <h2 className='bg-black p-2 text-white rounded-md'>Addresses</h2>
            <div className='w-full h-full   flex flex-col gap-y-2 '>
            {user.addrs.length>1?
            <div className='w-full p-2 text-[12px] leading-tight  flex flex-col gap-y-2 overflow-y-scroll no-scrollbar'>
                {user.addrs.map((addr,index)=>(
                    <>{addr!=null?
                    <div className='flex gap-x-2 border-2 rounded-md p-2 border-neutral-200'>
                        <input type="radio" id={`checkbox-${index}`} name='address-rb' onClick={()=>setAdI(index)}/>
                        <ul>
                        <li>{addr.flat}</li>
                        <li>{addr.street}</li>
                        <li>{addr.landmark}</li>
                        <li>{addr.city_state}</li>
                        <li>{addr.pincode}</li>
                        </ul>
                    </div>
                    :<></>}</>
                ))}
                
            </div>:
            <div>
                <h4>There arent any addresses</h4>  
            </div>}
            <Link to='/profile/addresses'>
                    <button className="bg-black text-white w-[8rem] jost-500 rounded-md drop-shadow-md" >Go to Addresses</button> 
            </Link>
            </div>
        </div>
        <div className='w-[20rem]  max-h-[20rem] bg-white p-2 rounded-md drop-shadow-md border-2 gap-y-2 border-neutral-200 flex flex-col'>
            <h2 className='bg-black p-2 text-white rounded-md'>Payment</h2>
            <div className='w-full h-full   flex flex-col gap-y-2 '>
            {user.paymt.length>1?
            <div className='w-full p-2 text-[12px] leading-tight  flex flex-col gap-y-2 overflow-y-scroll no-scrollbar'>
                {user.paymt.map((pay,index)=>(
                    <>{pay!=null?
                    <div className='flex gap-x-2 border-2 rounded-md p-2 border-neutral-200'>
                        <input type="radio" id={`checkbox-${index}`} name='payment-rb' onClick={()=>setPmI(index)}/>
                        <ul>
                            <li>XXXX-XXXX-XXXX-{pay.card_no.substring(12)}</li>
                            <li>{pay.name}</li>
                        </ul>       
                    </div>
                    :<></>}</>
                ))}
                
            </div>:
            <div>
                <h4>There arent any payment methods</h4>
                
            </div>}
            <Link to='/profile/payments'>
                    <button className="bg-black text-white w-[8rem] jost-500 rounded-md drop-shadow-md" >Go to Payments</button> 
            </Link>
            </div>
        </div>
        <p>{er}</p>
        <button className="bg-green-400 text-white w-[14rem] py-2 jost-500 rounded-md drop-shadow-md" onClick={()=>ValidateForm()}>Proceed to payment page</button>
    </div>:<NotFound />}</>

  )
}

export default Checkout