import React, { useEffect, useRef, useState } from 'react'
import {  useParams } from 'react-router-dom';
import {ThreeDots} from "react-loader-spinner"
import { FaDownload } from "react-icons/fa"
import axios from 'axios';
import generatePDF from 'react-to-pdf';

const OrderSummery = () => {
    const [loading, setLoading] = useState(true)
    const {orderId}=useParams()
    const receipt = useRef()
    const [userData, setUserData]=useState({})
    const getOrderSummery = async()=>{
        setLoading(true)
        const res = await axios.get(`/api/v1/orders/order-summery/${orderId}`,{headers:{Authorization:localStorage.getItem("AccessToken")}})
        if(res.data.statusCode===200){
            console.log(res.data);
            setUserData(res.data.data)
            
            setLoading(false)
        }
    }
    useEffect(()=>{
        getOrderSummery()
    },[])
       return (

        loading? <div className='w-full h-full pl-72 h-screen flex justify-center items-center '><ThreeDots/></div> :
        <div >

        <div className='ml-72 flex justify-between p-16 '>
            <div className='w-1/2 gap-7 flex flex-col '>
                <h2 className='font-bold text-3xl text-start'>Your Order has placed Successfully!</h2>
                <h2 className='flex font-bold text-xl'>Customer Detail{}</h2>
                <div className='flex gap-20 text-start'>
                    <div className='font-bold'>
                        <h2>Name</h2>
                        <h2>Contact</h2>
                        <h2>Total</h2>
                    </div>
                    <div>
                        <h2>{userData.customerName}</h2>
                        <h2>{userData.customerContact}</h2>
                        <h2>&#8377; {userData.total}</h2>
                    </div>
                </div>
                <div>
                    <button onClick={()=>generatePDF(receipt)} className='flex  justify-center items-center gap-3 bg-green-500 text-white px-3 py-2 rounded-lg'> Download Receipt <FaDownload /> </button>
                </div>
            </div>
            <div className='w-1/2 relative'>
                <div className='flex w-full absolute -z-10 -translate-y-3 bg-gray-300 h-6 rounded-full'>{" "}</div>
                <div className='z-10 bg-stone-100 mx-3 p-4 '>

                    <div className='font-bold text-xl'>Order Summery</div>
                    <div className='flex items-center w-full justify-around text-start p-4 border-b-2 border-dashed'>
                        <div className='border-r w-1/2 p-4'> 
                            <h2 className='text-blue-600'>Date</h2>
                            <h2 className='font-bold'>{userData.createdAt.slice(0,10)}</h2>
                        </div>
                        <div className='w-1/2 p-4'> 
                            <h2 className='text-blue-600'>Order Number</h2>
                            <h2 className='font-bold text-ellipsis w-1/12 '>{userData._id}</h2>
                        </div>
                        
                    </div>
                    <div className='relative'>
                            <div className='bg-white w-10 h-10 rounded-full absolute -top-5 -left-10'>{" "}</div>
                            <div className='bg-white w-10 h-10 rounded-full absolute -top-5 -right-10'>{" "}</div>
                        {userData.items.map((item=>(

                            <div className='flex justify-center items-center'>
                        <img src={item.image} alt="" className='rounded-3xl h-20 aspect-square object-cover w-20 p-2' />
                        <div className='items-start text-start w-full p-4 text-sm justify-center '>
                            <div className='flex justify-between w-full font-bold '> 
                                <h2 className=''> {item.variants.variant}</h2>
                                <h2 >&#8377; {item.variants.price * item.quantity}</h2>
                            </div>
                            <h2>{item.name}</h2>
                            <h2>Rate: &#8377;  {item.variants.price}</h2>
                            <h2>Qty: {item.quantity}</h2>
                        </div>
                        </div>
                            )))} 
                        <div className='text-zinc-600 text-sm border-y-2 m-2 p-2'> 
                            <div className='flex justify-between'>
                                <h2>SubTotal</h2>
                                <h2>&#8377; {userData.subTotal}</h2>
                            </div>
                            <div className='flex justify-between'>
                                <h2>Taxes</h2>
                                <h2>&#8377; {userData.tax}</h2>
                            </div>
                            <div className='flex justify-between'>
                                <h2>Discount</h2>
                                <h2>&#8377; {userData.discountAmount}</h2>
                            </div>
                            
                        </div>
                        <div className='flex justify-between m-2 p-2 font-bold'>
                            <h2>Order Total</h2>
                            <h2>&#8377; {userData.total}</h2>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div ref={receipt} className=' box-border ml-72' >
            <div className='bg-red-400 z-20'  style={{width:"1754",height:"2300px"}}>
                fds
            </div>
        </div>
            
        </div>
    )
}

export default OrderSummery