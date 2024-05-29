import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


const ProtectedRoute = ({children}) => {
    
    const token = useSelector(state=>state?.user?.token|| state?.user?.data?.AccessToken)
    const localToken = localStorage.getItem('AccessToken')
    useEffect(()=>{
        
    },[])


    if(localToken || token){
        console.log("Token Found");
        return children
    }else{
        return <Navigate to={'/login'}/>
    }
  
}

export default ProtectedRoute