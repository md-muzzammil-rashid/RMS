import React, { useEffect } from 'react'
import Navbar from './Navbar'
import {  Outlet, useNavigate } from 'react-router-dom'
import { userDetails } from '../../Services/Operations/AuthAPI'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import toast, { Toaster } from 'react-hot-toast'
const Layout = () => {
  
  // const restaurantId = useSelector(state=>state?.user?.data?.user?.restaurant?._id)
  const userId = useSelector(state=>state?.user?.data?.user?._id)

  // const socket = useSelector(state=>state.socket.socket)
  
  // useEffect(()=>{
  //   const socket = io('http://192.168.77.81:5005/', {
  //   query:{
  //     restaurantId : localStorage.getItem('restaurantId'),
  //     userId : userId
  //   }
  
  // }
  // )
    
  // socket?.on('newOrder', (data)=>{
  //   console.log("new Order:", data);
  //   toast.success('New Order Created')
  // })

  // socket?.on('connect', ()=>{
  //   console.log("connected with socketId :", socket.id);
  // })

  // socket?.on('orderStatusUpdated', (data)=>{
  //   toast.success('Order Status Updated')
  //   console.log("order status updated",data);
  // })

  // return ()=> socket.close()


  // },[userId,])

  return (
    <div className='pl-72 '>
      <Toaster position='top-center'/>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Layout