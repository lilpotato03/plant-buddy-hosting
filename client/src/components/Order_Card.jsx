import React from 'react'

function Order_Card(props) {
    const data=props.info
  return (
    <div className='w-full h-[8rem] md:h-[6rem] shrink-0 flex  bg-white drop-shadow-md   rounded-xl p-2 items-center gap-x-2' onClick={()=>{
        props.toggle(props.id)
    }}>
        <div className='size-[4rem] rounded-md shrink-0 bg-red-500 drop-shadow-md'>
            <img src={data.data.cart.items[0].img} className='rounded-md 'alt="" />
        </div>
        <div className='w-full h-[4rem]  flex flex-col leading-snug justify-center'>
            <h4 className='text-[10px] md:text-[11px] jost-500'>{data.id}</h4>
            <h4 className='text-[10px] md:text-[11px] jost-500'>{data.data.email}</h4>
            <h4 className='text-[10px] md:text-[11px] jost-500'>{`${data.data.date}@${data.data.time} `}</h4>
            <h4 className='text-[10px] md:text-[11px] jost-500'>{`${data.data.addr.flat},${data.data.addr.city_state},${data.data.addr.pincode}`}</h4>
            <h4 className='text-[10px] md:text-[11px] jost-500'>{`$ ${data.data.cart.value}`}</h4>
        </div>
    </div>  
  )
}

export default Order_Card