import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const PersonalInfo = () => {

    const [isEditable, setIsEditable] = useState(false)
    const userData = useSelector((state) => state.user.data?.user)
    console.log(userData);

    return (
        <div className='m-5 max-w-4xl'>
            <div className='  overflow-hidden flex mb-12 gap-5'>
                <img className='w-56 rounded-full' src="https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg" alt="" />
                <div className='h-full'>
                    <button className='bg-blue-500 px-4 py-2 mt-24 font-semibold text-white rounded-xl my-auto'>Change Avatar</button>
                </div>
            </div>
            <div className='grid gap-y-12 gap-x-10 grid-cols-2'>
                <div className='flex flex-col'>
                    <label className='font-semibold px-1 text-gray-950' htmlFor="fullname">Full Name</label>
                    <input value={userData?.fullName} disabled={!isEditable} className='border-2 p-2 rounded-xl' type="text" name='fullname' placeholder='Full Name' />
                </div>
                <div className='flex flex-col px-1'>
                    <label className='font-semibold text-gray-950' htmlFor="fullname"> Username</label>
                    <input value={userData?.username} disabled={!isEditable} className='border-2 p-2  rounded-xl' type="text" name='fullname' placeholder='Full Name' />
                </div>
                <div className='flex flex-col px-1'>
                    <label className='font-semibold text-gray-950' htmlFor="fullname">Email</label>
                    <input value={userData?.email} disabled={!isEditable} className='border-2 p-2  rounded-xl' type="text" name='fullname' placeholder='Full Name' />
                </div>
                <div className='flex flex-col px-1'>
                    <label className='font-semibold text-gray-950' htmlFor="fullname">Employee Id</label>
                    <input value={userData?._id} disabled className='border-2 p-2  rounded-xl' type="text" name='fullname' placeholder='Full Name' />
                </div>
            </div>
            <div className='flex flex-row-reverse'>
                {isEditable ?
                    <div className='flex gap-5'>
                        <button className='bg-green-500 px-4 py-2 mt-24 font-semibold text-white rounded-xl my-auto'>Update</button>
                        <button onClick={() => { setIsEditable((prev) => (!prev)) }} className='bg-red-500 px-4 py-2 mt-24 font-semibold text-white rounded-xl my-auto'>Cancel</button>
                    </div>
                    :
                    <button onClick={() => { setIsEditable((prev) => (!prev)) }} className='bg-blue-500 px-4 py-2 mt-24 font-semibold text-white rounded-xl my-auto'>Edit</button>
                }
            </div>
        </div>
    )
}

export default PersonalInfo