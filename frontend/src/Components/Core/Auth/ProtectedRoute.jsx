import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

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