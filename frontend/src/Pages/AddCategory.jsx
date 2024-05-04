import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { RiCloseLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import swal from "sweetalert"
import { TailSpin } from "react-loader-spinner"
const AddCategory = () => {
    const navigate = useNavigate()
    const [formInput, setFormInput]=useState({})
    const [formFile, setFormFile]=useState()
    const [loading, setLoading] = useState(false)

    const handleChange = (e)=>{
        const category = e.target.value
        setFormInput((prev)=>({
            ...prev, category:category
        }))
    }

    const fileHandler = (e) =>{
        setFormFile(e.target.files[0])
    }


    const submitHandler = async ()=>{
        setLoading(true)
        const formData = new FormData()
        formData.append("category",formInput.category)
        formData.append("categoryImage",formFile)
        console.log(formFile);
        
        for( let data of formData){
            console.log(data[0],data[1]);
        }

        const res = await axios.post("/api/v1/products/add-category",formData, {headers:{Authorization:localStorage.getItem("AccessToken"),"Content-Type":"multipart/form-data"}})
        console.log(res.data);
        setLoading(false)
        if(res.data.statusCode===201){
            swal({
                title:"Added!",
                icon: "success",
                text:"Your item has been added successfully"
            }).then(()=>{
                navigate("/items/add")
            })
        }
        
        
    }



    return (
        <div className=' w-full h-screen flex flex-col justify-center items-center'>
            <div className='max-w-96 box-content p-16 bg-white border rounded-xl shadow-lg relative'>
                <RiCloseLine onClick={() => navigate(-1)} className='text-2xl font-bold cursor-pointer absolute right-3 top-4 hover:text-red-600' />
                <form action="" id='categoryForm' className='flex flex-col text-start gap-2'>
                    <h2 className='text-center font-semibold text-lg'>Add Category</h2>
                    
                    <label htmlFor="title">Category Name</label>
                    <input type="text" onChange={handleChange} name='category' placeholder='Category Name' className='p-2 border rounded-lg' />
                    <label htmlFor="title">Image</label>
                    <input onChange={fileHandler} type="file" className='' name='categoryImage' />
                    <button type="button"  onClick={submitHandler} className='bg-orange-400 w-28 flex justify-center items-center color hover:bg-orange-500 text-white rounded-xl h-8 font-semibold ' >{loading?<TailSpin color='white' width={20} strokeWidth={3} height={20}/>:"Submit"}</button>
                </form>
                <div className='text-blue-500 font-semibold p-3'><Link to={'/add'} >Add a new Item ?</Link></div>
            </div>
        </div>
    )
}

export default AddCategory