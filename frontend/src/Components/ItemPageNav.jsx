import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {FaPlus, FaSearch} from "react-icons/fa"
import { searchItems } from '../redux/reducers/itemSlice'

const ItemPageNav = () => {
  const navigate = useNavigate()
  const products = useSelector((state)=>state.cart)
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()

  const searchHander = (e) =>{
    setSearch(e.target.value)
  }

  useEffect(()=>{
    dispatch(searchItems(search))
  },[search])


  return (
    <div className='sticky top-0 gap-3 bg-orange-100 flex w-full justify-between pl-72 hover:bg-orange-200-72 box-border p-1 items-center z-10 '>
      <div>
        <button onClick={()=>navigate('/items/add')} className='bg-orange-300 flex justify-center items-center gap-2 text-white px-3 rounded-md py-2 hover:bg-orange-400 transition-all relative right-0'><FaPlus/> Add </button>
      </div>
      <div className='flex relative '>
        <input type="text" onChange={searchHander} placeholder='Search' className='p-2 rounded-md pr-8' />
        <FaSearch  className='absolute right-1 m-2 top-1 '/>
      </div>
      <div>
        <button onClick={()=>navigate('/items/check-out')} className='bg-orange-300 text-white px-5 rounded-md py-2 hover:bg-orange-400 transition-all relative right-0'>Checkout "{products.product.length}"</button>
      </div>
    </div>
  )
}

export default ItemPageNav