import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BusinessInfo = () => {
  const userData = useSelector((state)=>state.user.data?.user)

  return (
    <div>
        <div className='flex justify-around '>
            <div className='flex items-center flex-col'>
              <div className='font-bold text-xl mb-5 text-center m-2'>BrandMark</div>
              <img className='h-24 ' src='https://i0.wp.com/skyje.com/wp-content/uploads/2019/04/4-1-800x450.png?resize=720%2C405' alt="" />
              <button className=' bg-blue-500 px-5 py-2 mt-12 font-semibold text-white rounded-xl my-auto w-44'>Change</button>
            </div>
            <div className='flex flex-col items-center '>
            <div className='font-bold text-xl mb-5 text-center m-2'>Logo</div>
              <img className='h-32 ' src='https://logolook.net/wp-content/uploads/2023/02/Logo-Pinterest-1.png' alt="" />
              <button className='bg-blue-500 px-4 py-2 mt-4 font-semibold text-white rounded-xl w-44 my-auto'>Change</button>
            </div>
        </div>
        
        <div className='grid gap-y-12 gap-x-10 grid-cols-2'>
            <div className='flex flex-col'>
                <label className='font-semibold px-1 text-gray-950' htmlFor="fullname">Restaurant Name</label>
                <input className='border-2 p-2 rounded-xl' value={userData.restaurant.restaurantName} type="text" name='fullname' placeholder='Full Name' />
            </div> 
            <div className='flex flex-col px-1'>
                <label className='font-semibold text-gray-950' htmlFor="fullname"> Username</label>
                <input value  className='border-2 p-2  rounded-xl' type="text" name='fullname' placeholder='Full Name' />
            </div>
            <div className='flex flex-col px-1'>
                <label className='font-semibold text-gray-950' htmlFor="fullname">Email</label>
                <input     className='border-2 p-2  rounded-xl' type="text" value={userData.restaurant.restaurantEmail} name='fullname' placeholder='Full Name' />
            </div>
            <div className='flex flex-col px-1'>
                <label className='font-semibold text-gray-950' htmlFor="fullname">Restaurant Code</label>
                <input  disabled className='border-2 p-2  rounded-xl' type="text" name='fullname' value={userData.restaurant.restaurantCode} placeholder='Full Name' />
            </div>
        </div>
        <div className='flex flex-row-reverse'>
            {true?
                <div className='flex gap-5'>
                <button className='bg-green-500 px-4 py-2 mt-24 font-semibold text-white rounded-xl my-auto'>Update</button>
                <button   className='bg-red-500 px-4 py-2 mt-24 font-semibold text-white rounded-xl my-auto'>Cancel</button>
                </div>
                :
                <button className='bg-blue-500 px-4 py-2 mt-24 font-semibold text-white rounded-xl my-auto'>Edit</button>
        }
        </div>
        <div>
          <Link to={'/setting/business/add-employee'}>
            Add Employee
          </Link>
        </div>
    </div>
  )
}

export default BusinessInfo