import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const LoggedInRoute = ({children}) => {
    const token = useSelector(state=>state?.user?.token|| state?.user?.data?.AccessToken)
    if(token){
        console.log("Token Found");
        return <Navigate to={'/dashboard'}/>
    }else{
        return children
    }
  
}

export default LoggedInRoute