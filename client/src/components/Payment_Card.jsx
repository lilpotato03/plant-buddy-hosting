import React from 'react'
import axios from 'axios'


function Payment_Card(props) {
async function handleDelete(){
  await axios.post('/api/updatePayment',{
    i1:paymt.card_no,
    i2:paymt.expiry,
    i3:paymt.cvv,
    i4:paymt.name,
    type:'sub'},{headers:{"Content-Type":"application/x-www-form-urlencoded"}})
}
const paymt=props.paymt
  return (
    <div className='w-full p-2 text-[12px] leading-tight drop-shadow-md bg-white rounded-md flex flex-col gap-y-2'>
        <ul>
            <li>XXXX-XXXX-XXXX-{paymt.card_no.substring(12)}</li>
            <li>{paymt.name}</li>
        </ul>
        <button className='w-[3rem] text-white bg-red-600 jost-500 rounded-md px-2 py-1' onClick={()=>{
          handleDelete()
          props.del(props.id)
        }}>Delete</button>
    </div>
  )
}

export default Payment_Card