import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaPen, FaPlus } from 'react-icons/fa'
import { TailSpin } from 'react-loader-spinner'
import { useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert'

const EditPage = () => {
    const {id} = useParams()
    const [item, setItem]=useState({})
    const [updateItemDetail, setUpdateItemDetail]=useState({})
    const getItemDetail = async()=>{
        const res = await axios.get(`/api/v1/products/edit?id=${id}`,{headers : {Authorization: localStorage.getItem('AccessToken'),"Content-Type":"multipart/form-data"},})
        setItem(res.data.data)
        setFormInput(res.data.data)
        setUpdateItemDetail(res.data.data)
        setVariants(res.data.data.variants)
        // setCategory(res.data.data.category)
        
    }

    const updateItem = async()=>{
        const res = await axios.post()
    }
    useEffect(()=>{
        getItemDetail()
        
    },[])


    const navigate = useNavigate()
    const [fileInput, setFileInput] = useState()
    const [variants, setVariants]=useState(updateItemDetail.variants)
    const [variantInput, setVariantInput]=useState({variant:"",price:""})
    const [category, setCategory]=useState(updateItemDetail.category)
    const [formInput, setFormInput]=useState(updateItemDetail)
    const [loading, setLoading] = useState(false)


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
        setLoading(true)
        const formData = new FormData()
        // formData.append("photo", fileInput)
        formData.append("itemId", formInput.itemId)
        formData.append("itemName", formInput.itemName)
        formData.append("category", formInput.category)

        formInput.variants.forEach(item=>{
            formData.append("variants[]",JSON.stringify(item))
        })
        
        // for( let data of formData){
        //     console.log(data[0],data[1]);
        // }
        const res = await axios.post(`/api/v1/products/edit?id=${id}`,formData,{headers:{Authorization: localStorage.getItem("AccessToken"),"Content-Type":"multipart/form-data"}})
        console.log(res.data);
        setLoading(false)
        if(res.data.statusCode===202){
            swal({
                title:"Updated!",
                icon: "success",
                text:"Your item has been updated successfully"
            }).then(()=>{
                navigate("/items")
            })
        }else{
            swal({
                title:"Failed!",
                icon: "error",
                text:"Failed to Updated"
            }).then(()=>{
                navigate("/items")
            })
        }

    }

    const addButtonHandler = () =>{
        setVariants((prev)=>([...prev, variantInput]));
        setVariantInput({variant:"",price:""});
        
        
    }
    const removeButtonHandler = (itemVariant) =>{
        setVariants((prev)=>(prev.filter((item)=>item.variant!==itemVariant)));
        
        
    }
    useEffect(() => {
        setFormInput((data)=>({...data, variants:variants}))
    }, [variants]);
    useEffect(() => {
        const getCategory = async() =>{
            const res = await axios.get("/api/v1/products/get-category",{headers:{Authorization:localStorage.getItem("AccessToken")}})
            // console.log(res.data.data)
            setCategory(res.data.data)
        }
        getCategory()
    }, []);
    useEffect(()=>{
        // console.log(variants);
    },[variants])


  return (
    <div className='pl-72 pt-10 box-border flex w-full'>
        <div className='flex p-4 h-80 aspect-square relative'>
            {/* <div  className='absolute p-4 right-8 bottom-8 bg-white rounded-full'>
                <FaPen className='text-2xl'/>
            </div> */}
            <img src={item.photo} className='rounded-full aspect-square object-cover' alt="" />
        </div>
        <div className='flex justify-center '>
            <div>
            <form action="" className='flex flex-col text-start gap-2'>
                    <h2 className='text-center font-semibold text-lg'>Item Detail</h2>
                    <select onChange={handleChange}  value={formInput?.category|| updateItemDetail.category}   name="category" id="" className='p-2 border rounded-lg'>
                        <option selected disabled value="">Category</option>
                        {category?.map((elem)=>(
                            <option value={elem.category}>{elem.category}</option>
                        ))}
                        
                    </select>
                    <label htmlFor="title">Item Name</label>
                    <input type="text" onChange={handleChange} value={formInput?.itemName|| updateItemDetail?.itemName} name='itemName' placeholder='Item Name' className='p-2 border rounded-lg' />
                    <label htmlFor="title">Item Id</label>
                    <input type="text" onChange={handleChange} value={formInput?.itemId|| updateItemDetail.itemId}  placeholder='Item Id' name="itemId" className='p-2  border rounded-lg' />
                    {/* <label htmlFor="price" >Price in &#8377; </label>
                    <input type="number" placeholder='&#8377; Price ' name='price' className='p-2 border rounded-lg' />
                     */}

                    
                    <div className='flex w-full justify-between items-center'>
                        
                            <input value={variantInput.variant} onChange={(e)=>setVariantInput((prev)=>({...prev, variant:e.target.value}))} type="text" placeholder='Variant' className='p-2 w-/12  border rounded-lg'/>
                            <input value={variantInput.price}  onChange={(e)=>setVariantInput((prev)=>({...prev, price:e.target.value }))}  type="number" placeholder=' Price' className='p-2 w-5/12 border rounded-lg'/>
                            <FaPlus  className='text-black'  onClick={addButtonHandler}/>

                    </div>
                    {variants?.map((variant)=>(
                        <div className='w-full flex justify-center gap-8 items-center' key={variant.variant}>
                        <input value={variant.variant} disabled type="text" placeholder='variant' className='p-2 w-/12  border rounded-lg'/>
                        <input value={variant.price}  disabled type="number" placeholder='Full Price' className='p-2 w-5/12 border rounded-lg'/>
                        <FaPlus onClick={()=>{removeButtonHandler(variant.variant)}} className='rotate-45 cursor-pointer hover:text-red-600'/>
                        </div>
                    ))}
                    {/* <label htmlFor="title">Image</label>
                    <input onChange={handleFile}  type="file" className='' name='photo' /> */}
                    <button type="button"  onClick={submitHandler} className='bg-orange-400 w-28 flex justify-center items-center color hover:bg-orange-500 text-white rounded-xl h-8 font-semibold ' >{loading?<TailSpin color='white' width={20} strokeWidth={3} height={20}/>:"Save"}</button>
                </form>
    
            </div>
        </div>
        
    </div>
  )
}

export default EditPage