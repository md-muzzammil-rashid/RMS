import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import ItemCard from '../Components/ItemCard'
import { foods } from '../utils/food'
import ItemPageNav from '../Components/ItemPageNav'
import axios from 'axios'

const ItemsPage = () => {
  const [category, setCategory] = useState([])
  useEffect(() => {
    const getCategory = async () => {
      const res = await axios.get("/api/v1/products/get-category", { headers: { Authorization: localStorage.getItem("AccessToken") } })
      console.log(res.data.data)
      setCategory(res.data.data)
    }
    getCategory()
  }, []);
  return (
    <div className='w-full pl-72'>
      <ItemPageNav />
      <div className='w-full flex gap-2 m-2'>
            <div className='flex border justify-center items-center text-center rounded-xl gap-2 pr-2 overflow-hidden ' >
              {/* <div className='w-14 h-14' >
                <img src='' alt="" className='rounded-xl aspect-square object-cover ' />
              </div> */}
              <h2 className=' text-center w-full font-semibold min-w-20'>All</h2>
            </div>
        {
          category.map((cat) => (
            <div className='flex border justify-center items-center rounded-xl gap-2 pr-2 overflow-hidden ' key={cat.category}>
              <div className='w-14 h-14' >
                <img src={cat.categoryImage} alt="" className='rounded-xl aspect-square object-cover ' />
              </div>
              <h2 className='flex text-center font-semibold min-w-20'>{cat.category}</h2>
            </div>
          ))
        }
      </div>
      <div className='gap-y-8 p-8 flex flex-wrap justify-center gap-6 m-auto w-full '>
        {foods.map((food) => 
        {
          console.log(food.sizes);
          return(
          <ItemCard key={food._id} name={food.itemName} price={food.price} sizes={food.sizes} image={food.photo} id={food._id} />
        )}
        )}

      </div>
    </div>
  )
}

export default ItemsPage