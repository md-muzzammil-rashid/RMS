import React, { useState } from 'react'

const AddEmployee = () => {
    const [isAdmin, setIsAdmin] = useState(false)
  return (
    <div>
        <div>
            Add A Employee
        </div>
        <div className='flex flex-col'>
            <input type="text" placeholder='Full Name' />
            <input type="text" placeholder='Email' />
            <input type="number" placeholder='Contact Number' />
            <input type="text" placeholder='Username' />
            <span>Address</span>
            <input type="text" placeholder='Country' />
            <input type="text" placeholder='State' />
            <input type="text" placeholder='City' />
            <input type="Number" placeholder='PinCode' />
            <input type="text" placeholder='Full Address' />
            <input type="date" name="" placeholder='Hiring Date' id="" />
            <input type="text" placeholder='Position' />
            <select name="" id="">
                <option value="Front of House">Front of House</option>
                <option value="Back of House">Back of House</option>
                <option value="Management and Administrative">Management and Administrative</option>
                <option value="Other">Other</option>
            </select>
            <input type="number" placeholder='Salary' />
            <span>Software Management</span>
            <label className="inline-flex items-center cursor-pointer">
                <span className="px-4  ">Is Admin</span>
                <input  checked={isAdmin} onChange={()=>setIsAdmin(prev=>!prev)} type="checkbox" name='isAvailable' className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
            <label className="inline-flex items-center cursor-pointer">
                <span className="px-4  ">Can Create Orders</span>
                <input  checked={isAdmin} onChange={()=>setIsAdmin(prev=>!prev)} type="checkbox" name='isAvailable' className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
            <label className="inline-flex items-center cursor-pointer">
                <span className="px-4  ">Can Make Orders</span>
                <input  checked={isAdmin} onChange={()=>setIsAdmin(prev=>!prev)} type="checkbox" name='isAvailable' className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
            <label className="inline-flex items-center cursor-pointer">
                <span className="px-4  ">Can Add New Employees</span>
                <input  checked={isAdmin} onChange={()=>setIsAdmin(prev=>!prev)} type="checkbox" name='isAvailable' className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
            <label class="inline-flex items-center cursor-pointer">
                <span class="px-4  ">Can Login</span>
                <input  checked={isAdmin} onChange={()=>setIsAdmin(prev=>!prev)} type="checkbox" name='isAvailable' className="sr-only peer" />
                <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
            <label className="inline-flex items-center cursor-pointer">
                <span className="px-4  ">Can Manage Order Status</span>
                <input  checked={isAdmin} onChange={()=>setIsAdmin(prev=>!prev)} type="checkbox" name='isAvailable' className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
        <input type="submit" value="Submit" className='' />
        </div>
    </div>
  )
}

export default AddEmployee