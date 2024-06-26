import React from 'react'
import axios from 'axios'
function Address_Card(props) {
async function handleDelete(){
  await axios.post('/api/updateAddress',{
    fn:addr.flat,
    st:addr.street,
    lm:addr.landmark,
    ct:addr.city_state,
    pc:addr.pincode,
    type:'sub'},{headers:{"Content-Type":"application/x-www-form-urlencoded"}})
}
const addr=props.addr
  return (
    <div className='w-full p-2 text-[12px] leading-tight drop-shadow-md bg-white rounded-md  flex flex-col gap-y-2'>
        <ul>
            <li>{addr.flat}</li>
            <li>{addr.street}</li>
            <li>{addr.landmark}</li>
            <li>{addr.city_state}</li>
            <li>{addr.pincode}</li>
        </ul>
        <button className='w-[3rem] text-white bg-red-600 jost-500 rounded-md px-2 py-1' onClick={()=>{
          handleDelete()
          props.del(props.id)
        }}>Delete</button>
    </div>
  )
}

export default Address_Card