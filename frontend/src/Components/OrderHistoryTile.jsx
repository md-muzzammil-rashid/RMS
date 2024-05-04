import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const OrderHistoryTile = ({ item, index }) => {
    const navigate = useNavigate()
    // console.log(item);
    const uniqueItm = new Set(item.items.map((itm) => itm.name))
    const uniqueItems = Array.from(uniqueItm)
    // console.log(uniqueItems);


    const statusColor = (status) => {
        if (status === 'Pending') {
            return 'text-blue-500 bg-blue-100 px-3 py-1 rounded-2xl '
        } else if (status === 'In Progress') {
            return 'text-orange-400 bg-orange-100 px-3 py-1 rounded-2xl '
        } else if (status === 'Cancelled') {
            return 'text-red-600 bg-red-100 px-3 py-1 rounded-2xl '
        } else {
            return 'text-green-500 bg-green-100 px-3 py-1 rounded-2xl '
        }
    }

    return (
        <div key={item._id} onClick={() => navigate(`/order-summery/${item._id}`)} className={`flex cursor-pointer justify-between font-semibold text-sm text-ellipsis overflow-hidden overflow-ellipsis p-4 mx-3 my-1 hover:bg-yellow-50 rounded-lg gap-3 font-semibold hover:bg-opacity-100 text-start border bg-opacity-50"} `}>
            <div className='font-medium w-24 text-ellipsis overflow-hidden flex-shrink-0 ' >{item.orderId || 10000}</div>
            <div className='font-medium w-24 flex-shrink-0' >{item.createdAt.slice(0, 10)}</div>
            <div className='font-medium  flex-shrink-0 w-32' >{item.customerName}</div>
            <div className='font-medium  flex-shrink-0 w-24'  >{item.customerContact}</div>
            <div className='font-medium flex-grow text-ellipsis overflow-hidden w-full  ' >{item.items.map((itm) => (itm.name + ` ( ${itm.variants.variant} ) ` + ` (${itm.quantity}) `+ " | "))}</div>
            <div className='font-medium flex-grow-0 flex-shrink-0 w-20' >&#8377; {item.total}</div>
            <div className='font-medium flex-grow-0 flex-shrink-0 w-16 items-center flex justify-center' ><span className={`text-sm ${statusColor(item.orderStatus)}`}>{item.orderStatus}</span></div>
        </div>
    )
}

export default OrderHistoryTile