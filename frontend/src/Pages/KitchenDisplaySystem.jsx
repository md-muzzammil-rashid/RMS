import React, { useEffect, useState } from 'react'
import KitchenDisplayCard from '../Components/Core/KitchenDisplay/KitchenDisplayCard'
import { incompleteOrders } from '../Services/Operations/OrderAPI';

const KitchenDisplaySystem = () => {
    const [inCompleteOrders, setInCompleteOrders] = useState([]);
    const getIncompleteOrders = async() => {
        const res = await incompleteOrders()
        if (res) {
            setInCompleteOrders(res)
        }
    }

    useEffect(()=>{
        getIncompleteOrders()
    },[])


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