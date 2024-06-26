import { useContext, useEffect, useState } from "react"
import { MainContext } from "../contexts/AppContext"
import Address_Card from "./Address_Card"
import Payment_Card from "./Payment_Card"
import axios from "axios"
import Order_Card from "./Order_Card"

function ProfileArea(){
    const {user}=useContext(MainContext)
    const [name,setName]=useState(user.name)
    const [num,setNum]=useState(user.num)
    const email=user.email
    return(
        <div className='p-2 w-full h-full  flex flex-col gap-y-4'>
            <h2>Profile</h2>
            <form action="" className="flex-col h-full flex gap-1 relative">
                <label htmlFor="pf-name" className="px-2 text-[14px] text-neutral-700">Name:</label>
                <input type="text" id='pf-name' className="border-neutral-200 border-2 drop-shadow-md outline-none rounded-md px-2 w-[12em]" value={name} onChange={(e)=>setName(e.target.value)} contentEditable='true' />
                <label htmlFor="pf-em" className="px-2 text-[14px] text-neutral-700">Email:</label>
                <input type="text" id='pf-em' className="border-neutral-200 border-2 drop-shadow-md outline-none text-neutral-400 rounded-md px-2 w-[16em]" value={email} contentEditable='false'/>
                <label htmlFor="pf-num" className="px-2 text-[14px] text-neutral-700">Number:</label>
                <input type="text" id='pf-num' className="border-neutral-200 border-2 drop-shadow-md outline-none rounded-md px-2 w-[12em]" value={num} onChange={(e)=>setNum(e.target.value)} contentEditable='true' />
                <button className="absolute bottom-0 right-10 w-[6rem] h-8  text-[14px] jost-500 rounded-md bg-black text-white drop-shadow-md">Save Changes</button>
            </form>
        </div>
    )
}
function OrderArea(){
    function ToggleOrder(i){
        setActOrder(i)
        setToggle(true)
    }
    const [orders,setOrders]=useState(null)
    const [toggle,setToggle]=useState(false)
    const [actOrder,setActOrder]=useState(null)
    useEffect(()=>{
        const get=async()=>{
            const {data}=await axios.get('/api/userOrders')
            if(data!=='error'){
                setOrders(data)
            }
        }
        get()
    },[])
    return(
        <div className="flex flex-col gap-y-2 overflow-y-scroll w-full h-full p-2 relative">
            <h3>Orders</h3>
            {toggle?
            <div className="flex flex-col w-full overflow-y-scroll no-scrollbar items-start gap-y-2  relative leading-snug">
                <button onClick={()=>setToggle(false)} className="w-[5rem] bg-black text-white jost-500 rounded-md">Go back</button>
                <h3 className='text-[15px] jost-500'>{orders[actOrder].data.name}</h3>
                <h3 className='text-[15px] jost-500'>{orders[actOrder].data.email}</h3>
                <h3 className='text-[15px] jost-500'>{orders[actOrder].id}</h3>
                <h3 className='text-[15px] jost-500'>{orders[actOrder].data.date}</h3>
                <h3 className='text-[15px] jost-500'>{orders[actOrder].data.time}</h3>
                <div className="w-[20rem] scale-75 origin-top-left flex flex-col gap-y-2">
                <div className='w-[20rem]  max-h-[20rem] bg-white p-2 rounded-md drop-shadow-md border-2 border-neutral-200 flex flex-col'>
                <h2 className='bg-black p-2 text-white rounded-md'>Items</h2>
                <div className='w-full h-full overflow-y-scroll no-scrollbar  flex flex-col gap-y-2 '>
                {orders[actOrder].data.cart.items.map((item)=>(
                    <div className='w-full h-[5rem]  flex items-center p-2 shrink-0 border-b-2 border-neutral-200 gap-x-2 relative'>
                                <div className='w-[4rem] h-[4rem] bg-pink-300 rounded-md'>
                                {/* insert image here*/}
                                <img src={item.img} className='rounded-md' alt="" />
                                </div>
                                <div className='h-full flex flex-col justify-between'>
                                <h3>{item.name}</h3>
                                <h3>x{item.qty}</h3>
                                </div>
                                <div className=' w-[5rem] h-[2rem] px-1 absolute right-2 top-2 text-end'>
                                    <h3>${(item.price*item.qty).toFixed(2)}</h3>
                                </div>
                            </div>
                        ))}
                        </div>
                        <h3>Total:${orders[actOrder].data.cart.value}</h3>
                </div>
                <div className='w-[20rem]   max-h-[20rem] bg-white  rounded-md drop-shadow-md gap-y-2  flex flex-col'>
                        <div className='flex gap-x-2 border-2 rounded-md p-2 border-neutral-200'>
                            <ul>
                            <li>{orders[actOrder].data.addr.flat}</li>
                            <li>{orders[actOrder].data.addr.street}</li>
                            <li>{orders[actOrder].data.addr.landmark}</li>
                            <li>{orders[actOrder].data.addr.city_state}</li>
                            <li>{orders[actOrder].data.addr.pincode}</li>
                            </ul>
                        </div>
                </div>   
                </div>

            </div>
            :
            orders===null?<>No orders to display</>:
            orders.map((order,index)=>(
                <Order_Card info={order} id={index} key={index} toggle={ToggleOrder}/>
            ))}
              
        </div>
    )
}

function AddressArea(){
    const {user,setUser}=useContext(MainContext)
    const [temp,setTemp]=useState(user)
    const [formT,setFormT]=useState(false)
    const [i1,setI1]=useState('')
    const [i2,setI2]=useState('')
    const [i3,setI3]=useState('')
    const [i4,setI4]=useState('')
    const [i5,setI5]=useState('')
    const [er,setEr]=useState('')
    useEffect(()=>{
        const get=async()=>{
            try{
              const res=await axios.get('/api/userData')
              if(res.status==200){
                setUser(res.data)
                setTemp(res.data)
              }
            }catch(e){
              console.log(e)
            }
          }
            get()
    },[formT])
    async function validateForm(){
        if(i1==''){
            setEr('Add Flat No. and Building Name')
        }else if(i2==''){
            setEr('Add Stree Name')
        }else if(i4==''){
            setEr('Add City and State')
        }else if(i5==''){
            setEr('Add PinCode')
        }else{
            await axios.post('/api/updateAddress',{
                fn:i1,
                st:i2,
                lm:i3,
                ct:i4,
                pc:i5,
                type:'add'},{headers:{"Content-Type":"application/x-www-form-urlencoded"}})
            setEr('Added Address')
            setI1('')
            setI2('')
            setI3('')
            setI4('')
            setI5('')
            setFormT(false)
        }
    }
    function handleList(i){
        setTemp(a => ({
            ...a,
            addrs: a.addrs.filter((_, index) => index !== i)
        }))
    }
    return(
        <div className="flex flex-col gap-y-1 overflow-y-scroll w-full h-full p-2 relative">
            <h3>Addresses</h3>
            {temp.addrs.length>1?temp.addrs.map((addr,index)=>(
                <p>{addr!=null?<Address_Card addr={addr} key={index} id={index} del={handleList}/>:''}</p>
            )):<>There arent addresses</>}
            {formT?
                <div className="w-full flex flex-col justify-center gap-y-2 p-2 addressForm border-2 border-neutral-300 rounded-md ">
                    <input type="text" name="fn" placeholder="Flant No. and Building Name" value={i1} onChange={(e)=>setI1(e.target.value)}/>
                    <input type="text" name="st" placeholder="Street" value={i2} onChange={(e)=>setI2(e.target.value)}/>
                    <input type="text" name="lm" placeholder="Landmark" value={i3} onChange={(e)=>setI3(e.target.value)}/>
                    <input type="text" name="ct" placeholder="City and State" value={i4} onChange={(e)=>setI4(e.target.value)}/>
                    <input type="text" name="pc" placeholder="Pin Code" value={i5} onChange={(e)=>setI5(e.target.value)}/>
                    {er?<p className="text-red-500 text-[12px] ml-2">{er}</p>:<></>}
                    <button className="bg-black text-white w-[6rem] text-[12px] jost-500 rounded-md drop-shadow-md" onClick={()=>{
                        validateForm()
                    }
                    }>Save Addresses</button>
                </div>
                :<button className="bg-black text-white w-[8rem] jost-500 rounded-md drop-shadow-md" onClick={()=>setFormT(true)}>Add Addresses</button>
            }
        </div>
    )
}
function PayMTArea(){
    const {user,setUser}=useContext(MainContext)
    const [formT,setFormT]=useState(false)
    const [temp,setTemp]=useState(user)
    const [i1,setI1]=useState('')
    const [i2,setI2]=useState('')
    const [i3,setI3]=useState('')
    const [i4,setI4]=useState('')
    const [er,setEr]=useState('')
    useEffect(()=>{
        const get=async()=>{
            try{
              const res=await axios.get('/api/userData')
              if(res.status==200){
                setUser(res.data)
                setTemp(res.data)
              }
            }catch(e){
              console.log(e)
            }
          }
            get()
    },[formT])
    async function validateForm(){
        try{
            if(i1==''){
                setEr('Add Card No.')
            }
            else if(isNaN(parseFloat(i1))){
                setEr('Card No. has to be Numeric')
            }
            else if(i1.length!=16){
                setEr('Card Length has to be 16 digits')
            }
            else if(i2==''){
                setEr('Add Expiry') 
            }
            else if(i2.length!=5){
                setEr('Incorrect Format of Expiry, should be MM/YY')
            }
            else if(i3==''){
                setEr('Add CVV')
            }else if(i3.length!=3){
                setEr('CVV has to be 3 digits')
            }else if(i4==''){
                setEr('Add Card Holder Name')
            }else{
                await axios.post('/api/updatePayment',{
                    'i1':i1,
                    'i2':i2,
                    'i3':i3,
                    'i4':i4,
                    type:'add'},{headers:{"Content-Type":"application/x-www-form-urlencoded"}})
                setEr('Added Card')
                setI1('')
                setI2('')
                setI3('')
                setI4('')
                setFormT(false)
            }
        }catch(e){
            console.log(e.message)
        }

    }
    function handleList(i){
        setTemp(a => ({
            ...a,
            paymt: a.paymt.filter((_, index) => index !== i)
        }))
    }
    return(
        <div className="flex flex-col gap-y-1 overflow-y-scroll w-full h-full p-2 relative">
            <h3>Payment Methods</h3>
            {temp.paymt.length>1?temp.paymt.map((pay,index)=>(
                <p>{pay!=null?<Payment_Card paymt={pay} key={index} id={index} del={handleList}/>:''}</p>
            )):<>There arent addresses</>}
            {formT?
                <div className="w-full flex flex-col justify-center gap-y-2 p-2 addressForm border-2 border-neutral-300 rounded-md ">
                    <input type="text" placeholder="Card No." value={i1} onChange={(e)=>setI1(e.target.value)}/>
                    <div className="flex w-full">
                    <input type="text" placeholder="Expiry" value={i2} onChange={(e)=>setI2(e.target.value)}/>
                    <input type="text" placeholder="CVV" value={i3} onChange={(e)=>setI3(e.target.value)}/>
                    </div>
                    <input type="text" placeholder="Name of the Card Holder" value={i4} onChange={(e)=>setI4(e.target.value)}/>
                    {er?<p className="text-red-500 text-[12px] ml-2">{er}</p>:<></>}
                    <button className="bg-black text-white w-[6rem] text-[12px] jost-500 rounded-md drop-shadow-md" onClick={()=>{
                        validateForm()
                    }
                    }>Save Card</button>
                </div>
                :<button className="bg-black text-white w-[7rem] jost-500 rounded-md drop-shadow-md" onClick={()=>setFormT(true)}>Add Card</button>
            }
        </div>
    )

}

function AdminArea(){
    const [files,setFiles]=useState(null)
    const [pn,setPn]=useState(null)
    const [ct,setCt]=useState(null)
    const [pr,setPr]=useState(null)
    const [ds,setDs]=useState(null)
    const[er,setEr]=useState(null)
    async function uploadFiles(){
        try{const data=new FormData()
        data.append('name',pn)
        data.append('price',pr)
        data.append('ctg',ct)
        data.append('desc',ds)
        for (let i = 0; i < files.length; i++) {
            data.append('file', files[i]);
        }       
        const result=await axios.post('/api/addPlant',data,{headers:{"Content-Type":"multipart/form-data"}})
        setEr(result.data)
        }
        catch(e){
            console.log(e.message)
            setEr('Request not sent')
        }
    }
    function validateForm(){
        if(!pn){
            setEr('Add a Plant Name')
        }
        else if(!ct){
            setEr('Add a Category')
        }
        else if(!pr){
            setEr('Add the Price')
        }
        else if(!ds){
            setEr('Add a Description')
        }
        else if(!files){
            setEr('Add atleast one image')
        }
        else{
            uploadFiles()
        }
    }
    return(
        <div className="flex flex-col gap-y-1 overflow-y-scroll w-full h-full p-2">
            <h3>Upload Files</h3>
            <input type="text" className="border-2 rounded-md  p-1" name="name" placeholder="Plant Name" id="plant-name" value={pn} onChange={(e)=>{setPn(e.target.value)}}/>
            <input type="text" className="border-2 rounded-md  p-1" name="price" placeholder="Price" id="plant-price" value={pr} onChange={(e)=>{setPr(e.target.value)}}/>
            <input type="text" className="border-2 rounded-md  p-1" name="ctg" placeholder="Category" id="" value={ct} onChange={(e)=>{setCt(e.target.value)}} />
            <textarea name="desc" className="border-2 rounded-md  p-1" placeholder="Description" id="plant-desc" value={ds} onChange={(e)=>{setDs(e.target.value)}}></textarea>
            <input type="file" multiple onChange={(e)=>{setFiles(e.target.files)}}/>
            <p className="text-[13px] text-red-600">{er}</p>
            <button className="bg-black text-white p-2 rounded-md  drop-shadow-md jost-500 w-[8rem] " onClick={validateForm}>Submit Files</button>
        </div>
    )
}
function SignoutArea(){
    const [text,setText]=useState('Click the button to SignOut')
    return(
        <div className="flex flex-col gap-y-2">
            <h2>Sign Out</h2>
            <p>{text}</p>
            <button className="bg-black text-white w-[8rem] jost-500 rounded-md drop-shadow-md " onClick={async()=>{
                setText('Signing Out User...')
                await axios.get('/api/signOutUser')
                setTimeout(()=>{
                    setText('User Signed Out')
                },1000)
                setTimeout(()=>{
                    setText('Sending you to home Page')
                    window.location.replace('/')
                },2000)
            }}> SignOut</button>
        </div>
    )
}

export {ProfileArea,AdminArea,SignoutArea,AddressArea,PayMTArea,OrderArea}