import React from 'react'
import chickenShawarma from '../../../Assets/images/Chicken-Shawarma.webp'


const ItemCardKDS = ({item}) => {
  return (
    <div className=' flex gap-2'>
    <img src={item.image} alt="" className='rounded-full w-12 aspect-square h-12 ' />
    <div className='flex flex-col gap-0 flex-shrink'>
        <div className='font-bold flex  text-gray-700 w-56 justify-between '>
            <span className='text-ellipsis flex flex-shrink hover:overflow-visible hover:bg-white hover:text-wrap hover:z-50 overflow-hidden text-nowrap whitespace-nowrap'>{item.name} </span>
            <span className='w-12 flex flex-shrink-0 text-nowrap mr-1'> &times; {item.quantity} </span>
        </div>
        <div className='font-semibold italic text-gray-500'>
            <span> {item.variants.variant}</span>
        </div>
    </div>

</div>
  )
}

export default ItemCardKDS