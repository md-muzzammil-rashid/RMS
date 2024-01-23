import React from 'react'
import { BsGrid1X2Fill } from 'react-icons/bs'
import { CiMemoPad } from 'react-icons/ci'
import { IoIosRestaurant, IoMdSettings } from "react-icons/io";
import { GiWallet } from "react-icons/gi";
import { RiTodoFill } from "react-icons/ri";
import Logo from "../Assets/images/logo.png"
import { Link, NavLink } from 'react-router-dom';



const Navbar = () => {

    const navLinkStyle = ({isActive}) => {
        return{
            color: isActive? "#f8a100" : "white",
            backgroundColor: isActive? "#ffffff30" : " ",

            
        }
    }

    return (
        <div style={{backgroundColor:"#2d2c2d"}} className= '  flex-col p-8 gap-10 fixed top-0 left-0 text-white h-screen flex w-72 box-border z-10'>
            <div>
                <img src={Logo} alt="" />
            </div>
            <div className='ml-5 text-xl'>
                <ul className='gap-y-5 flex flex-col'>
                    
                    <li className='flex gap-2 w-full items-center justify-start'>
                        <NavLink to={'/'} style={navLinkStyle} className='flex gap-2 hover:bg-white hover:bg-opacity-15 w-48 py-2 rounded-lg px-3  bg-opacity-30 items-center justify-start'>
                            <BsGrid1X2Fill /> Dashboard
                        </NavLink>
                    </li>
                    <li className='flex gap-2 w-full items-center justify-start'>
                        <NavLink to={'/orders'} style={navLinkStyle} className=' hover:bg-white hover:bg-opacity-15  w-48 py-2 rounded-lg px-3  bg-opacity-30 flex gap-2 items-center justify-start'>
                            <CiMemoPad /> Orders
                        </NavLink>
                    </li>
                    <li className='flex gap-2 items-center justify-start'>
                        <NavLink to={'/items'} style={navLinkStyle} className=' hover:bg-white hover:bg-opacity-15  w-48 py-2 rounded-lg px-3  bg-opacity-30 flex gap-2 items-center justify-start'>
                            <IoIosRestaurant /> Items
                        </NavLink>
                    </li>
                    <li className='flex gap-2 items-center justify-start'>
                        <NavLink to={'/sales'} style={navLinkStyle} className=' hover:bg-white hover:bg-opacity-15  w-48 py-2 rounded-lg px-3  bg-opacity-30 flex gap-2 items-center justify-start'>
                            <GiWallet /> Sales
                        </NavLink>
                    </li>
                    <li className='flex gap-2 items-center justify-start'>
                        <NavLink to={"/order-history"} style={navLinkStyle} className=' hover:bg-white hover:bg-opacity-15   w-48 py-2 rounded-lg px-3  bg-opacity-30 flex gap-2 items-center justify-start'>
                            <RiTodoFill /> Order History
                        </NavLink>
                    </li>
                    <li className='flex gap-2 items-center justify-start'>
                        <NavLink to={'/setting'} style={navLinkStyle} className=' hover:bg-white hover:bg-opacity-15  w-48 py-2 rounded-lg px-3  bg-opacity-30 flex gap-2 items-center justify-start'>
                            <IoMdSettings /> Setting
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar