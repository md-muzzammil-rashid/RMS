import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import io from 'socket.io-client'
import { BASE_URL } from '../../../Services/apis'
import { setSocket } from '../../../redux/reducers/socketSlice'

const ProtectedRoute = ({children}) => {
    const token = useSelector(state=>state?.user?.token|| state?.user?.data?.AccessToken)


    if(token){

        console.log("Token Found");
        return children
    }else{
        console.log('navigating');
        return <Navigate to={'/login'}/>
    }
  
}

export default ProtectedRoute