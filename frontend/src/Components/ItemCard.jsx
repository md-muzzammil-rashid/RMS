import React, { useEffect, useRef, useState } from 'react'
import shawarma from '../Assets/images/Chicken-Shawarma.webp'
import generatePDF from 'react-to-pdf'
import { useDispatch, useSelector } from 'react-redux';
import { addItems, removeItems } from '../redux/reducers/cartSlice';
import { MenuItem, Select } from '@mui/material';

const ItemCard = ({id, price, quantity, image, name, sizes, isSize}) => {
    const [selectVarient, setSelectVarient]=useState({})
    const reciept = useRef();
    const dispatch = useDispatch()
    
    const state = useSelector((state)=>state.cart.product)
    const productState = state.find((item)=>item.id===id) 

   

    const handleDecrement = () => {
        dispatch(removeItems(id))
      };
    
    const handleIncrement = () =>{
        dispatch(addItems())
    }

    const handleSelect = (e)=>{
        const values = e.target.value
        setSelectVarient({price:values.price, size:values.size})
    }



  return (
    <div ref={reciept}  className=' bg-white flex border border-zinc-400 shadow-lg flex-col justify-center items-center p-4 rounded-3xl flex-nowrap'>
        <div className='w-52'>
            <img src={image} alt="" className='h-56 rounded-2xl object-cover border-zinc-800 w-52 ' />
        </div>
        <div className='flex justify-between gap-1 flex-col'>
            <div className=''>
                <h2 className='text-start'>{name}</h2>
            </div>
            <div className='text-orange-600 w-full flex flex-col justify-center font-bold'>
                <h2>{selectVarient?.price}l</h2>
                <select onChange={handleSelect} value={selectVarient} className='h-8 m-2 max-w-48 min-w-48 z-0' >

                {sizes.map((item)=>(
                    <option className='h-10 z-0' value={{size:item.size, price:item.price}} >{item.size}</option>
                    ))}
                    </select>
            </div>
        </div>
        <div>
            <div className='border border-orange-600 flex rounded-lg cursor-pointer overflow-hidden font-semibold'>
                <div onClick={handleDecrement} className='w-8 bg-orange-600 text-white'>-</div>
                <div className='w-8 text-orange-600'>{productState? productState.quantity : 0}</div>
                <div onClick={handleIncrement} className='w-8 bg-orange-600 text-white'>+</div>
                {/* <button onClick={() => generatePDF(reciept, {filename: 'page.pdf'})}>Download PDF</button> */}
            </div>
        </div>
    </div>
  )
}

export default ItemCard