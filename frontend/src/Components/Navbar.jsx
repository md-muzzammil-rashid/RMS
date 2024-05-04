import React from 'react'
import { BsGrid1X2Fill } from 'react-icons/bs'
import { CiMemoPad } from 'react-icons/ci'
import { IoIosLogOut, IoIosRestaurant, IoMdLogOut, IoMdSettings } from "react-icons/io";
import { GiWallet } from "react-icons/gi";
import { RiTodoFill } from "react-icons/ri";
import Logo from "../Assets/images/logo.png"
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaWarehouse } from "react-icons/fa"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { resetLogin } from '../redux/reducers/userSlice';
import { BASE_URL } from '../utils/constants';



const Navbar = () => {

    const navLinkStyle = ({ isActive }) => {
        return {
            color: isActive ? "#f8a100" : "white",
            backgroundColor: isActive ? "#ffffff30" : " ",


        }
    }
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const restaurant = useSelector(state=>state?.user?.data?.user?.restaurant)

    const handleLogout = async ()=>{
        await axios.post(`${BASE_URL}/api/v1/users/logout`, {}, {headers:{Authorization: localStorage.getItem('AccessToken')}})
        // console.log(res.data);
        .then((res)=>{
                console.log('success');
                dispatch(resetLogin({message:'Logout Successful'}))
                navigate('/login')
                localStorage.clear()
        })
        .catch((err=>{
            if(err.response.status===401){
                navigate('/login')
            }
        }))
    }

    return (
        <div style={{ backgroundColor: "#000000" }} className='  flex-col p-8 gap-10 fixed top-0 left-0 items-start text-white h-screen flex w-72 box-border   z-10'>
            <div>

                <div className='mb-10'>
                    <img src={Logo} alt="" />
                    <h2 className='uppercase font-bold m-2 text-xl text-center'>{restaurant?.restaurantName || ""}</h2>
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
                        {/* <li className='flex gap-2 items-center justify-start'>
                            <NavLink to={'/sales'} style={navLinkStyle} className=' hover:bg-white hover:bg-opacity-15  w-48 py-2 rounded-lg px-3  bg-opacity-30 flex gap-2 items-center justify-start'>
                                <GiWallet /> Sales
                            </NavLink>
                        </li> */}
                        {/* <li className='flex gap-2 items-center justify-start'>
                            <NavLink to={'/inventory'} style={navLinkStyle} className=' hover:bg-white hover:bg-opacity-15  w-48 py-2 rounded-lg px-3  bg-opacity-30 flex gap-2 items-center justify-start'>
                                < FaWarehouse /> Inventory
                            </NavLink>
                        </li> */}
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
                <div className='ml-5 text-xl'>
                    <ul className='gap-y-5 flex flex-col'>
                        <li className='flex gap-2 items-center justify-start'>
                            <div  onClick={handleLogout} className=' hover:bg-white hover:bg-opacity-15  w-48 py-2 rounded-lg px-3  bg-opacity-30 flex gap-2 items-center justify-start'>
                                <IoIosLogOut /> Logout
                            </div>
                        </li>
                    </ul>
                </div>
        </div>

    )
}

export default Navbar