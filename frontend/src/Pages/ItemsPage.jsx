import React, { useEffect, useReducer, useState } from 'react'
import ItemCard from '../Components/ItemCard'
import ItemPageNav from '../Components/ItemPageNav'
import axios from 'axios'
import { fetchItems, getItem } from '../redux/reducers/itemSlice'
import { useDispatch, useSelector } from 'react-redux'

const ItemsPage = () => {
  const [category, setCategory] = useState([])
  const dispatch = useDispatch()
  const itemState = useSelector((state)=>state.items)
  const searchItemState = useSelector(state=>state.items.searchItems)
  const searchQueryState = useSelector(state=>state.items.searchQuery)
  useEffect(() => {
    const getCategory = async () => {
      const res = await axios.get("/api/v1/products/get-category", { headers: { Authorization: localStorage.getItem("AccessToken") } })
      setCategory(res.data.data)
    }
    getCategory()

    dispatch(fetchItems())

  }, []);
  return (
    <div className='w-full pl-72'>
      <ItemPageNav />
      <div className='w-full flex gap-2 m-2'>
            <div  onClick={()=>dispatch(getItem("All"))}  className={`flex border cursor-pointer justify-center items-center rounded-xl gap-2 pr-2 overflow-hidden ${"All" === itemState.selectedCategory ?"bg-orange-400 bg-opacity-25":" "} `}  >
              {/* <div className='w-14 h-14' >
                <img src='' alt="" className='rounded-xl aspect-square object-cover ' />
              </div> */}
              <h2 className=' text-center w-full font-semibold min-w-20'>All</h2>
            </div>
        {
          category.map((cat) => (
            <div  onClick={()=>dispatch(getItem(cat.category))} className={`flex border cursor-pointer justify-center items-center rounded-xl gap-2 pr-2 overflow-hidden ${cat.category === itemState.selectedCategory ?"bg-orange-300 bg-opacity-25":" "} `} key={cat.category}>
              <div className='w-14 h-14' >
                <img src={cat.categoryImage} alt="" className='rounded-xl aspect-square object-cover ' />
              </div>
              <h2 className='flex text-center font-semibold min-w-20'>{cat.category}</h2>
            </div>
          ))
        }
      </div>
      <div className='gap-y-8 p-8 flex flex-wrap justify-center gap-6 m-auto w-full '>

        {searchQueryState===''?
        itemState.displayProducts.map((food) => 
        {
          return(
          <ItemCard key={food._id} name={food.itemName} uid={food._id}  price={food.price} variants={food.variants} image={food.photo} itemId={food.itemId} />
        )}
        ):
        searchItemState.map((food)=>{
          return(
            <ItemCard key={food._id} name={food.itemName} uid={food._id} price={food.price} variants={food.variants} image={food.photo} itemId={food.itemId} />
          
        )
        })
      }

      </div>
    </div>
  )
}

export default ItemsPage