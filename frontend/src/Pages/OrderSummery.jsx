import React, { useEffect, useRef, useState } from 'react'
import {  useParams } from 'react-router-dom';
import {ThreeDots} from "react-loader-spinner"
import { FaDownload } from "react-icons/fa"
import axios from 'axios';
import { PDFViewer, render, PDFDownloadLink } from '@react-pdf/renderer';
import Reciept from '../Components/Reciept';
import { BASE_URL } from '../utils/constants';

const OrderSummery = () => {
    const [loading, setLoading] = useState(true)
    const {orderId}=useParams()
    const receipt = useRef()
    const [userData, setUserData]=useState({})
    const [statusColor, setStatusColor] = useState('bg-blue-500')
    const [status, setStatus] = useState({orderId,status:userData.orderStatus})
    const getOrderSummery = async()=>{
        setLoading(true)
        const res = await axios.get(`${BASE_URL}/api/v1/orders/order-summery/${orderId}`,{headers:{Authorization:localStorage.getItem("AccessToken")}})
        if(res.data.statusCode===200){
            console.log(res.data);
            setUserData(res.data.data)
            
            setLoading(false)
        }
    }
    const generateReceipt = async ()=>{
        await render(<Reciept receiptData={userData} />, 'mydir/receipt.pdf')
    }

    const changeStatus = (e) =>{
        console.log('changes');
        setStatus((prev)=>({...prev,status:e.target.value}))
    }
    const updateStatusFromDB = async ()=>{
        const res = await axios.post(`${BASE_URL}/api/v1/orders/update-order-status/${orderId}`,status,{headers:{Authorization:localStorage.getItem('AccessToken')}})
        console.log(res);
        getOrderSummery()
    }
    useEffect(()=>{
        updateStatusFromDB()
    },[status])

    useEffect(()=>{
        getOrderSummery()
    },[])
    useEffect(()=>{
        setStatusColor(()=>{
            if(userData.orderStatus==='Pending'){
                return 'bg-blue-500'
            }else if(userData.orderStatus==='In Progress'){
                return 'bg-orange-400'
            }else if(userData.orderStatus==='Cancelled'){
                return 'bg-red-600'
            }else{
                return 'bg-green-500'
            }
        })
    },[userData])
       return (

        loading? <div className='w-full   h-screen flex justify-center items-center '><ThreeDots/></div> :
        <div >

        <div className=' flex justify-between p-16 '>
            <div className='w-1/2 gap-7 flex flex-col '>
                <h2 className='font-bold text-3xl text-start'>Your Order has placed Successfully!</h2>
                <h2 className='flex font-bold text-xl'>Customer Detail{}</h2>
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
                    <PDFDownloadLink document={<Reciept receiptData={userData} />} fileName={`${userData._id}.pdf`}>
                        {
                            ({blob, url, loading, error})=>(
                                <button className='flex  justify-center items-center gap-3 bg-green-500 text-white px-3 py-2 rounded-lg'>{loading?'Loading...':"Download Receipt"} <FaDownload /></button>

                            )
                        }
                    </PDFDownloadLink>
                </div>
                <div ref={receipt} className=' box-border h-full' >
            <PDFViewer className='w-full min-h-96 h-full'>
                <Reciept receiptData={userData}/>
            </PDFViewer>
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
                            <h2 className='font-bold text-ellipsis w-1/12 '>{userData.orderId}</h2>
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
       
        </div>
    )
}

export default OrderSummery