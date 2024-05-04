import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItems, clearItems, removeItems } from '../redux/reducers/cartSlice';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {TailSpin} from "react-loader-spinner"

const Checkout = () => {
  const navigate = useNavigate()
  const products = useSelector((state) => state.cart)
  const [discount, setDiscount] = useState(0);
  const dispatch = useDispatch();
  const total = products.total? Math.round((products.total.reduce((accumulator, currentValue) => accumulator + currentValue, 0))): 0;
  const subTotal = Math.round(total/(1+.05))
  const discountAmt = Math.round((discount/100) *total * 1)
  const [loading, setLoading] = useState(false)
  const [data, setData]=useState({items:products.product,customerName:"", customerContact:"",tax:total-subTotal, discountAmount:discountAmt,subTotal, total})

  const handleDecrement = (item) => {
    dispatch(removeItems(item))
  };

  const handleIncrement = (item) => {
    dispatch(addItems(item))
  };
  const formInputHandler = (e) =>{
    const name = e.target.name;
    const value = e.target.value
    setData((prev)=>({...prev, [name]:value}))
  }

  useEffect(()=>{
    setData((prev)=>({...prev, discountAmount:discountAmt, items:products.product, tax:total-subTotal, subTotal:subTotal, total:total-discountAmt}))

  },[discount, products])

  const submitFormHandler =async (e) =>{
    e.preventDefault()
    setLoading(true)
    const res =await axios.post("/api/v1/orders/submit-order", data , { headers:{Authorization:localStorage.getItem("AccessToken")}} )
    // console.log(res);
    setLoading(false)
    if(res.data.statusCode==201){
      const data = res.data.data.orders
      const orderId = data[data.length-1]
      dispatch(clearItems())
      navigate(`/order-summery/${orderId._id}`)
    }
    
  }




  return (

    <div className=' flex relative flex-col h-full min-h-screen bg-white'>
      <div className='sticky h-12 top-0 gap-3 z-50 bg-orange-100 flex w-full justify-between pl-72 hover:bg-orange-200-72 box-border p-1 items-center  '>
        <div className='bg-white w-6 h-6 flex items-center justify-center rounded-full '>
         <FaArrowLeft onClick={() => navigate(-1)} className='cursor-pointer' />
        </div>
      </div>
      <div className='flex'>

        <div className='w-2/3 min-h-full border-r-2 text-zinc-700 font-semibold relative'>
          <div className='flex justify-between gap-4 text-lg font-bold sticky top-12 bg-white'>
            <div className='text-center w-24'> Item </div>
            <div className='text-start flex-grow'> Name </div>
            <div className='text-center w-44'> Unit </div>
            <div className='text-center w-24 '> Quantity </div>
            <div className='text-center w-44'> Price </div>
          </div>
          {products.product.map((item) => (
            <div key={item.id} className='flex items-center bg-white justify-between gap-4' >
              <div className=' h-24 overflow-hidden flex-shrink-0'>
                <img src={item.image} alt="" className='object-center aspect-square  object-fill h-24 w-24 p-2 rounded-3xl' />
              </div>
              <div className='flex-grow'>
                <h2 className='text-start'>
                  {item.name} : {item.variants.variant}
                </h2>
              </div>
              <div className='flex-shrink-0 w-44'>
                &#8377;{item.variants.price} &times; {item.quantity}
              </div>

              <div className='border flex-shrink-0 text-center  border-orange-600 flex rounded-lg cursor-pointer overflow-hidden font-semibold'>
                <div onClick={() => handleDecrement(item)} className='w-8 bg-orange-600 text-white'>-</div>
                <div className='w-8 text-orange-600'>{item.quantity}</div>
                <div onClick={() => handleIncrement(item)} className='w-8 bg-orange-600 text-white'>+</div>
              </div>

              <div className='w-44 bg-green-50 text-right pr-6 flex-shrink-0'>
                &#8377;{item.quantity * item.variants.price}
              </div>

            </div>
          ))}
        </div>
        <div className='w-1/3 bg-white min-h-full  '>
          <div className='bg-zinc-100  m-10 rounded-xl p-5 border border-zinc-200'>
            <h2 className='font-semibold text-2xl'>Amount</h2>
            <div className='flex justify-around'>
              <div className='text-start'>
                <h2>Subtotal</h2>
                <h2>Tax (5% GST)</h2>
                <h2>Discount</h2>
                <h2>Total</h2>
              </div>
              <div className='text-start'>
                <h2> : &#8377; {products.total ? subTotal  : 0}</h2>
                <h2> : &#8377; {total-subTotal} </h2>
                <h2> : &#8377; {discountAmt}</h2>
                <h2> : &#8377; {products.total ? total-discountAmt:0 }</h2>
              </div>
            </div>
          </div>
          <div className=''>
            <div>
              <h2 className='font-semibold text-3xl'>Customer Details</h2>
              <form action="" className='flex flex-col text-start gap-2 m-8 p-6'>
                <label htmlFor="customerName">Name</label>
                <input onChange={formInputHandler} type="text" name='customerName' id='customerName' className=' p-2 border-2 border-zinc-700 rounded-lg' />
                <label htmlFor="phoneNumber">Phone Number</label>
                <input onChange={formInputHandler}  type="text" name='customerContact' id='phoneNumber' className=' p-2 border-2 border-zinc-700 rounded-lg' />
                <label htmlFor="discount">Discount (%)</label>
                <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} name='discount' id='discount' className=' p-2 border-2 border-zinc-700 rounded-lg' />
                <label htmlFor="discount">Table Number (Optional)</label>
                <input type="number"  onChange={formInputHandler} name='tableNumber' id='tableNumber' className=' p-2 border-2 border-zinc-700 rounded-lg' />
                <button onClick={submitFormHandler} className='bg-orange-400 w-28 color hover:bg-orange-500 text-white rounded-xl h-8 font-semibold flex justify-center items-center '>{loading?<TailSpin height={20} color='white' />: "Confirm"}</button>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Checkout