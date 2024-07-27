import React, { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import { SOCKET_URL } from '../Services/apis';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { updateOrderSocket, updateStatusSocket } from '../redux/reducers/socketSlice';

const useSocket = () => {

    const socketRef = useRef(null);
    const userData = JSON.parse(localStorage.getItem('UserData'))
    const restaurantId = localStorage.getItem('restaurantId')
    const dispatch = useDispatch()

    useEffect(()=>{
        socketRef.current = io(SOCKET_URL, {
            query: {
                restaurantId : restaurantId,
                userId : userData?.user?._id
            }
        })

        socketRef.current?.on('newOrder', (data)=>{
            console.log("new Order:", data);
            dispatch(updateOrderSocket())
            toast.success('New Order Created')
        })
        
        socketRef.current?.on('connect', ()=>{
            console.log("connected with socketId :", socketRef?.current?.id);
        })
        
        socketRef.current?.on('orderStatusUpdated', (data)=>{
            toast.success('Order Status Updated')
            dispatch(updateStatusSocket(data._id))
            console.log("order status updated",data);
          })
        
          return ()=> {
            if( socketRef.current){
                socketRef.current.disconnect();
                socketRef.current = null;
            }
          }
    },[restaurantId, userData])

  return socketRef.current
}

export default useSocket