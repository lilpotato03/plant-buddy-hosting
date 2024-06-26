import React from 'react'

function Categories() {
  return (
    <div className='p-4 grid grid-cols-12 grid-rows-12 gap-2 h-full w-full grid-flow-dense'>
        <div className='row-span-3 col-span-12 md:row-span-6 md:col-span-5 border-2 ct-bento '>
            <img src="/bento-ct\cacti.jpeg" alt="" />
            <p>Cacti</p>
        </div>
        <div className='row-span-2 col-span-8 md:row-span-3 md:col-span-4 border-2 ct-bento'>
        <img src="/bento-ct\ferns.jpg" className='object-center' alt="" />
            <p>Ferns</p>
        </div>
        <div className='row-span-2 col-span-4 md:row-span-3 md:col-span-4 border-2 ct-bento'>
        <img src="/bento-ct\crawler.jpeg" alt="" />
            <p>Crawlers</p>
            </div>
        <div className='row-span-1 col-span-12 md:row-span-6 md:col-span-3 border-2 ct-bento'>
        <img src="/bento-ct\shrubs.jpg" className='object-center' alt="" />
            <p>Shrubs</p></div>
        <div className='row-span-2 col-span-4 md:row-span-6 md:col-span-3 border-2 ct-bento'>
        <img src="/bento-ct\flower.jpg" className='object-center' alt="" />
            <p>Flowering</p>
        </div>
        <div className='row-span-2 col-span-8 md:row-span-6 md:col-span-5 border-2 ct-bento'>
        <img src="/bento-ct\medicinal.jpg" className='object-center' alt="" />
            <p>Medicinal</p>
        </div>
        <div className='row-span-3 col-span-12 md:row-span-3 md:col-span-4 border-2 ct-bento'>
        <img src="/bento-ct\fruits.jpg" className='object-center' alt="" />
            <p>Fruits</p>
        </div>
        <div className='row-span-1 col-span-12 md:row-span-3 md:col-span-4 border-2 ct-bento'>
        <img src="/bento-ct\hanging.jpg" className='object-center' alt="" />
            <p>Hanging Basket</p>
        </div>
    </div>
  )
}

export default Categories