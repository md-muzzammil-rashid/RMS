import React, { useEffect, useState } from 'react'
import ItemDetailsKDS from './ItemDetailsKDS'
import ItemCardKDS from './ItemCardKDS'
import ItemStatus from './ItemStatus'
import { orderSummery, updateOrderStatusFromDB } from '../../../Services/Operations/OrderAPI'



const KitchenDisplayCard = ({customerData}) => {
    const [orderId, setOrderId] = useState(customerData._id)
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState(customerData)
    const [statusFetch, setStatusFetch] = useState(false)
    const [status, setStatus] = useState({ orderId, status: customerData?.orderStatus })

    const getOrderSummery =async () => {
        setLoading(true)
        const res =await orderSummery({ orderId })
        if (res) {
            setUserData(res)
            setLoading(false)
        }
    }
    const changeStatus = (e) => {
        console.log('changes');
        setStatus((prev) => ({ ...prev, status: e.target.value }))
    }
    
    const updateOrderStatus = async () => {
        const res =await updateOrderStatusFromDB({ orderId, status })
        if (res) {
            // getOrderSummery()
            setUserData(res)
        }
    }
    
    useEffect(() => {
        if(statusFetch){
            updateOrderStatus()
        }else{
            setStatusFetch(true)
        }
    }, [status])
    
    // useEffect(()=>{
    //     if(statusFetch){
    //         getOrderSummery()
    //     }
    // },[orderId])



  return (     

    <div className='flex flex-col w-72 rounded-xl overflow-hidden m-2 border relative pb-20'>
        
        
        <ItemDetailsKDS customerData={userData}/>

        <div className=' w-full flex flex-col gap-3 p-3'>
            {/* item map */}
            {
                userData?.items?.map(item =>
                    <ItemCardKDS item={item}/>
                )
            }

        </div>

        {/* Update Order Status */}
        <div className='p-2 bottom-0 absolute '>
            <span className='font-bold'>Order Status:</span>

            <ItemStatus changeStatus={changeStatus} customerData={userData}/>

        </div>

    </div>

  )
}

export default KitchenDisplayCard