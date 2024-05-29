import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ThreeDots } from "react-loader-spinner"
import { PDFViewer, render, PDFDownloadLink } from '@react-pdf/renderer';
import { FaDownload } from 'react-icons/fa';
import Reciept from '../Components/Common/Reciept';
import { useSelector } from 'react-redux';
import { orderSummery, updateOrderStatusFromDB } from '../Services/Operations/OrderAPI';
import OrderEReceipt from '../Components/Core/OrderHistory/OrderEReceipt';

const OrderSummery = () => {
    const [loading, setLoading] = useState(true)
    const { orderId } = useParams()
    const receipt = useRef()
    const [userData, setUserData] = useState({})
    const [statusFetch, setStatusFetch] = useState(false)
    const [statusColor, setStatusColor] = useState('bg-blue-500')
    const [status, setStatus] = useState({ orderId, status: userData.orderStatus })
    const restaurant = useSelector(state => state?.user?.data?.user?.restaurant)

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
             getOrderSummery()
        }
    }
    useEffect(() => {
        if(statusFetch){
            updateOrderStatus()
        }else{
            setStatusFetch(true)
        }
    }, [status])



    useEffect(() => {
        getOrderSummery()
    }, [])
    useEffect(() => {
        setStatusColor(() => {
            if (userData.orderStatus === 'Pending') {
                return 'bg-blue-500'
            } else if (userData.orderStatus === 'In Progress') {
                return 'bg-orange-400'
            } else if (userData.orderStatus === 'Cancelled') {
                return 'bg-red-600'
            } else {
                return 'bg-green-500'
            }
        })
    }, [userData])
    return (

        loading || !restaurant ? <div className='w-full   h-screen flex justify-center items-center '><ThreeDots /></div> :
            <div >

                <div className=' flex justify-between p-16 '>
                    <div className='w-1/2 gap-7 flex flex-col '>
                        <h2 className='font-bold text-3xl text-start'>Your Order has placed Successfully!</h2>
                        <h2 className='flex font-bold text-xl'>Customer Detail{ }</h2>
                        <div className='flex gap-20 text-start'>
                            <div className='font-bold'>
                                <h2>Name</h2>
                                <h2>Contact</h2>
                                <h2>Total</h2>
                                <h2>Table</h2>
                            </div>
                            <div>
                                <h2>{userData.customerName}</h2>
                                <h2>{userData.customerContact}</h2>
                                <h2>&#8377; {userData.total}</h2>
                                <h2>{userData.tableNumber}</h2>
                            </div>
                        </div>
                        <div className='flex items-center gap-5'>
                            <span className='font-bold'>Order Status:</span>
                            <button className={`flex  justify-center items-center gap-3 text-white  ${statusColor} px-3 py-2 rounded-lg`} >{userData.orderStatus}</button>
                            <select name="orderStatus" id="orderStatus" value={userData.orderStatus} onChange={changeStatus}>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                        
                        <div>
                            <PDFDownloadLink document={<Reciept receiptData={userData} restaurant={restaurant} />} fileName={`${userData._id}.pdf`}>
                                {
                                    ({ blob, url, loading, error }) => (
                                        <button className='flex  justify-center items-center gap-3 bg-green-500 text-white px-3 py-2 rounded-lg'>{loading ? 'Loading...' : "Download Receipt"} <FaDownload /></button>

                                    )
                                }
                            </PDFDownloadLink>
                        </div>

                        <div ref={receipt} className=' box-border h-full' >
                            <PDFViewer className='w-full min-h-96 h-full'>
                                <Reciept receiptData={userData} restaurant={restaurant} />
                            </PDFViewer>
                        </div>
                    </div>

                    {/* Receipt  */}
                    <OrderEReceipt userData={userData}/>

                </div>

            </div>
    )
}

export default OrderSummery