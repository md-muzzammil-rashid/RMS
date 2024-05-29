import React from 'react'
import { MdTableBar } from 'react-icons/md'
import { RiCoupon3Fill } from 'react-icons/ri'
import { BsPersonFill } from 'react-icons/bs'
import { FaRegClock } from 'react-icons/fa'
import ElapsedTimeClock from './ElapsedTimeClock'

const ItemDetailsKDS = ({customerData}) => {
  return (
    <div className='flex flex-col bg-green-500 p-3 font-bold text-white'>
    <div className=' flex gap-2'>
        <MdTableBar/> 
        <span>Table {customerData?.tableNumber? customerData.tableNumber : " 0 "}</span>
    </div>

    <div className=' flex gap-2'>
        <RiCoupon3Fill/> 
        <span> KOT No {customerData?.orderId}</span>
    </div>

    <div className=' flex gap-2'>
        <BsPersonFill/>
        <span> {customerData?.customerName? customerData.customerName : " Unknown "}</span>
    </div>

    <div className=' flex gap-2'>
        <FaRegClock/>
        <span> <ElapsedTimeClock  timestamp={customerData.createdAt}  /></span>
    </div>


</div>
  )
}

export default ItemDetailsKDS