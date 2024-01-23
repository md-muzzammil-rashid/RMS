import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsCrosshair } from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa'
import { RiCloseLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'

const AddItems = () => {
    const navigate = useNavigate()
    const [sizes, setSizes]=useState([])
    const [sizeInput, setSizeInput]=useState({size:"",price:""})
    const [category, setCategory]=useState([])
    const [fileInput, setFileInput] = useState()
    const [formInput, setFormInput]=useState({})


    const handleChange = (e)=>{
        const {name, value} = e.target
        setFormInput((prev)=>({
            ...prev, [name]:value
        }))
    }
    const handleFile = (e)=>{
        const file = e.target.files[0];
        setFileInput(file)
    }
    

    const submitHandler = async ()=>{
        const formData = new FormData()
        formData.append("photo", fileInput)
        formData.append("itemId", formInput.itemId)
        formData.append("itemName", formInput.itemName)
        formData.append("category", formInput.category)

        formInput.sizes.forEach(item=>{
            formData.append("sizes[]",JSON.stringify(item))
        })
        
        for( let data of formData){
            console.log(data[0],data[1]);
        }
        const res = await axios.post("/api/v1/products/add-items",formData,{headers:{Authorization: localStorage.getItem("AccessToken"),"Content-Type":"multipart/form-data"}})
        console.log(res.data);

    }

    const addButtonHandler = () =>{
        setSizes((prev)=>([...prev, sizeInput]));
        setSizeInput({size:"",price:""});
        
        
    }
    useEffect(() => {
        setFormInput((data)=>({...data, sizes:sizes}))
    }, [sizes]);
    useEffect(() => {
        const getCategory = async() =>{
            const res = await axios.get("/api/v1/products/get-category",{headers:{Authorization:localStorage.getItem("AccessToken")}})
            console.log(res.data.data)
            setCategory(res.data.data)
        }
        getCategory()
    }, []);

    return (
        <div className='pl-72 w-full h-screen flex flex-col justify-center items-center'>
            <div className='max-w-96 box-content p-16 bg-white border rounded-xl shadow-lg relative'>
                <RiCloseLine onClick={() => navigate(-1)} className='text-2xl font-bold cursor-pointer absolute right-3 top-4 hover:text-red-600' />
                <form action="" className='flex flex-col text-start gap-2'>
                    <h2 className='text-center font-semibold text-lg'>Add Item</h2>
                    <select onChange={handleChange} name="category" id="" className='p-2 border rounded-lg'>
                        <option selected disabled value="">Category</option>
                        {category.map((elem)=>(
                            <option value={elem.category}>{elem.category}</option>
                        ))}
                        
                    </select>
                    <label htmlFor="title">Item Name</label>
                    <input type="text" onChange={handleChange} name='itemName' placeholder='Item Name' className='p-2 border rounded-lg' />
                    <label htmlFor="title">Item Id</label>
                    <input type="text" onChange={handleChange}  placeholder='Item Id' name="itemId" className='p-2  border rounded-lg' />
                    {/* <label htmlFor="price" >Price in &#8377; </label>
                    <input type="number" placeholder='&#8377; Price ' name='price' className='p-2 border rounded-lg' />
                     */}

                    
                    <div className='flex w-full justify-between items-center'>
                            <input value={sizeInput.size} onChange={(e)=>setSizeInput((prev)=>({...prev, size:e.target.value}))} type="text" placeholder='Size' className='p-2 w-/12  border rounded-lg'/>
                            <input value={sizeInput.price}  onChange={(e)=>setSizeInput((prev)=>({...prev, price:e.target.value }))}  type="number" placeholder=' Price' className='p-2 w-5/12 border rounded-lg'/>
                            <FaPlus  className='text-black'  onClick={addButtonHandler}/>

                    </div>
                    {sizes.map((size)=>(
                        <div key={size.size}>
                        <input value={size.size} disabled type="text" placeholder='Size' className='p-2 w-/12  border rounded-lg'/>
                        <input value={size.price} disabled  type="number" placeholder='Full Price' className='p-2 w-5/12 border rounded-lg'/>
                        </div>
                    ))}
                    <label htmlFor="title">Image</label>
                    <input onChange={handleFile}  type="file" className='' name='photo' />
                    <input type="button" value="Submit" onClick={submitHandler} className='bg-orange-400 w-28 color hover:bg-orange-500 text-white rounded-xl h-8 font-semibold ' />
                </form>
                <div className='text-blue-500 font-semibold p-3'><Link to={'add-new-category'} >Add a new Category ?</Link></div>
            </div>
        </div>
    )
}

export default AddItems