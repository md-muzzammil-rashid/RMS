import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

const Setting = () => {
  const borderStyle = ({isActive}) => {
    return{
        backgroundColor: isActive? "#ffffff30" : "",
        "border-bottom": isActive? '4px solid rgb(200,200,200)':  " ",

        
    }
}
  return (
    <div className='px-24 py-20'>
      <span className='text-4xl text-black font-bold p-5'>Setting</span>
      <div className='flex gap-5 px-5 py-2'>
        <NavLink style={borderStyle} className=' ' to={'/setting/personal'}>Personal Info</NavLink>
        <NavLink style={borderStyle} to={'/setting/business'}>Business Info</NavLink>

      </div>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default Setting