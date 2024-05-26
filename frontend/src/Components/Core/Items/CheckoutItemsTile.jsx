import React from 'react'

const CheckoutItemsTile = ({item, handleDecrement, handleIncrement}) => {
  return (
<div key={item.id} className='flex items-center bg-white justify-between gap-4' >
              <div className=' h-24 overflow-hidden flex-shrink-0'>
                <img src={item.image} alt="" className='object-center aspect-square  object-fill h-24 w-24 p-2 rounded-3xl' />
              </div>
              <div className='flex-grow'>
                <h2 className='text-start'>
                  {item.name} : {item.variants.variant}
                </h2>
              </div>
              <div className='flex-shrink-0 w-44'>
                &#8377;{item.variants.price} &times; {item.quantity}
              </div>

              <div className='border flex-shrink-0 text-center  border-orange-600 flex rounded-lg cursor-pointer overflow-hidden font-semibold'>
                <div onClick={() => handleDecrement(item)} className='w-8 bg-orange-600 text-white'>-</div>
                <div className='w-8 text-orange-600'>{item.quantity}</div>
                <div onClick={() => handleIncrement(item)} className='w-8 bg-orange-600 text-white'>+</div>
              </div>

              <div className='w-44 bg-green-50 text-right pr-6 flex-shrink-0'>
                &#8377;{item.quantity * item.variants.price}
              </div>

            </div>
              )
}

export default CheckoutItemsTile