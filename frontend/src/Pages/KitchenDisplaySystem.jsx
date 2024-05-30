import React, { useEffect, useState } from 'react'
import KitchenDisplayCard from '../Components/Core/KitchenDisplay/KitchenDisplayCard'
import { incompleteOrders } from '../Services/Operations/OrderAPI';
import { useSelector } from 'react-redux';

const KitchenDisplaySystem = () => {
    const [inCompleteOrders, setInCompleteOrders] = useState([]);
    const {order, status} = useSelector(state=>state.socket)
    const getIncompleteOrders = async() => {
        const res = await incompleteOrders()
        if (res) {
            setInCompleteOrders(res)
        }
    }

    useEffect(()=>{
        setInCompleteOrders([])
        getIncompleteOrders()
    },[order, status])




  return (
    <div className='flex flex-wrap mx-auto w-full'>
        {
            inCompleteOrders?.map(customerData => 
                <KitchenDisplayCard customerData={customerData}/>
            )
        }

    </div>
  )
}

export default KitchenDisplaySystem