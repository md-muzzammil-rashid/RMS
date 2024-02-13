import React, { useEffect, useRef, useState } from 'react'
import shawarma from '../Assets/images/Chicken-Shawarma.webp'
import generatePDF from 'react-to-pdf'
import { useDispatch, useSelector } from 'react-redux';
import { addItems, removeItems } from '../redux/reducers/cartSlice';
import { MenuItem, Select } from '@mui/material';
import {FaPen} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';


const ItemCard = ({itemId, image, name, variants,uid}) => {
    const [selectVariant, setSelectVariant]=useState(variants[0])
    const [data, setData]=useState({itemId, image, name, variants:selectVariant  })
    const reciept = useRef();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const state = useSelector((state)=>state.cart.product)
    const productState = state.find((item)=>item.itemId===itemId && item.variants.variant === data.variants.variant) 
    const [quantity, setQuantity] = useState(productState?productState.quantity:0)

   
    const handleDecrement = () => {
        dispatch(removeItems(data))
      };
    
    const handleIncrement = () =>{
        dispatch(addItems(data))
    }

    const handleSelect = (e)=>{
        setSelectVariant(()=>variants.find((item)=>item.variant===e.target.value))
    }
    useEffect(() => {
        // console.log(selectVariant);
        setData((prev)=>({...prev, variants:selectVariant}))
    }, [selectVariant]);
    useEffect(()=>{
        setQuantity(productState?productState.quantity:0)
    },[handleDecrement,handleIncrement])
    


  return (
    <div ref={reciept}  className=' bg-white flex border border-zinc-400 shadow-lg flex-col justify-center items-center p-4 rounded-3xl flex-nowrap'>
        <div className='w-52 relative'>
            
            <img src={image} alt="" className='h-56 rounded-2xl object-cover border-zinc-800 w-52 ' />
        </div>
        <div className='flex justify-between gap-1 relative flex-col'>
            <div className='p-2 font-bold text-lg'>
                <h2 className='text-start'>{name}</h2>
            </div>
            <div onClick={()=>navigate(`/items/edit/${uid}`)} className='absolute flex right-0 top-0 p-2 text-black mt-1 hover:bg-zinc-900  hover:text-white  rounded-full hover:bg-opacity-40 cursor-pointer'>
                <FaPen className=' ' />
            </div>
            <div className='text-orange-600 w-full flex flex-col justify-center font-bold'>
                <h2> &#8377; {selectVariant.price || variants[0].price}</h2>
                <select onChange={handleSelect} value={selectVariant?.variant} className='h-8 m-2 max-w-48 min-w-48 z-0' >

                {variants.map((item)=>(
                    <option key={item.variant} className='h-10 z-0' value={item.variant} >{item.variant}</option>
                    ))}
                    </select>
            </div>
        </div>
        <div>
            <div className='border border-orange-600 flex rounded-lg cursor-pointer overflow-hidden font-semibold'>
                <div onClick={handleDecrement} className='w-8 bg-orange-600 text-white'>-</div>
                <div className='w-8 text-orange-600'>{quantity || 0}
                    {/* <input type='number' onChange={(e)=>setQuantity(e.target.value)} value={quantity}/> */}
                </div>
                <div onClick={handleIncrement} className='w-8 bg-orange-600 text-white'>+</div>
                {/* <button onClick={() => generatePDF(reciept, {filename: 'page.pdf'})}>Download PDF</button> */}
            </div>
        </div>
    </div>
  )
}

export default ItemCard