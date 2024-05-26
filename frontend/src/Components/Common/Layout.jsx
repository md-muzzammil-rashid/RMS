import React, { useEffect } from 'react'
import Navbar from './Navbar'
import {  Outlet, useNavigate } from 'react-router-dom'
import { userDetails } from '../../Services/Operations/AuthAPI'

const Layout = () => {

  useEffect(()=>{
  },[])

  return (
    <div className='pl-72 '>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Layout