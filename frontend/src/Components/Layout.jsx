import React, { useEffect } from 'react'
import Navbar from './Navbar'
import {  Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'

const Layout = () => {
  const navigate = useNavigate()
  const userDetails = async ()=>{
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/users/user-details`,{headers:{Authorization: localStorage.getItem('AccessToken')}})
  
      console.log("res is :", res);
    } catch (error) {
      navigate('/login')
      console.log(error);
      
    }

  }

  useEffect(()=>{
    userDetails()
  },[])

  return (
    <div className='pl-72 '>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Layout