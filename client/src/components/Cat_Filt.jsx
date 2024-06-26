import React from 'react'

function Cat_Filt() {
  return (
        <ul>
            <li className='w-full flex gap-x-4 jost-500 '>
            <input type="checkbox" id='ct'/>  
            <label htmlFor="ct">Cacti</label>
            </li>
            <li className='w-full flex gap-x-4 jost-500 '>
            <input type="checkbox" id='fl'/>  
            <label htmlFor="fl">Flowering</label>
            </li>
            <li className='w-full flex gap-x-4 jost-500 '>
            <input type="checkbox" id='sh'/>  
            <label htmlFor="sh">Shrubs</label>
            </li>
            <li className='w-full flex gap-x-4 jost-500 '>
            <input type="checkbox" id='hg'/>  
            <label htmlFor="hg">Hanging</label>
            </li>
            <li className='w-full flex gap-x-4 jost-500 '>
            <input type="checkbox" id='fn'/>  
            <label htmlFor="fn">Ferns</label>
            </li>
            <li className='w-full flex gap-x-4 jost-500 '>
            <input type="checkbox" id='cr'/>  
            <label htmlFor="cr">Crawlers</label>
            </li>
            <li className='w-full flex gap-x-4 jost-500 '>
            <input type="checkbox" id='md'/>  
            <label htmlFor="md">Medicinal</label>
            </li>
            <li className='w-full flex gap-x-4 jost-500 '>
            <input type="checkbox" id='fr'/>  
            <label htmlFor="fr">Fruits</label>
            </li>
        </ul>  
    )
}

export default Cat_Filt