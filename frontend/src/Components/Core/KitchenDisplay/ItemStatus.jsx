import React, { useEffect, useState } from 'react'

const ItemStatus = ({customerData, changeStatus}) => {
    const [statusColor, setStatusColor] = useState('bg-blue-500')

    useEffect(() => {
        setStatusColor(() => {
            if (customerData?.orderStatus === 'Pending') {
                return 'bg-blue-500'
            } else if (customerData?.orderStatus === 'In Progress') {
                return 'bg-orange-400'
            } else if (customerData?.orderStatus === 'Cancelled') {
                return 'bg-red-600'
            } else {
                return 'bg-green-500'
            }
        })
    }, [customerData])

    

  return (
    <div className='flex items-center gap-5 '>
        <button className={`flex  justify-center items-center gap-3 text-white  ${statusColor} px-3 py-2 rounded-lg`} >{customerData?.orderStatus}</button>
        <select name="orderStatus" id="orderStatus" value={customerData?.orderStatus} className='p-2 ' onChange={changeStatus}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
        </select>
    </div>
  )
}

export default ItemStatus