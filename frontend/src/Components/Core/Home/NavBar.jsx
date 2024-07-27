import React from 'react'
import logo from '../../../Assets/images/logo-db.png'
const NavBar = () => {
    
  return (
    <div className='w-full h-24 flex items-center sticky top-0 left-0 bg-white z-50 justify-evenly font-poppins'>
        <div className=' box-border'>
        <img src={logo} className=' h-14   object-cover'/>
        </div>

        <button className='font-poppins border-[2px] h-11 rounded-md hover:bg-black hover:text-white transition-all border-black  w-36' >
            Login
        </button>
    </div>
  )
}

export default NavBar