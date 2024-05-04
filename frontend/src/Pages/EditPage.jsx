import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { TailSpin } from 'react-loader-spinner'
import { useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert'
import { BASE_URL } from '../utils/constants'

const EditPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [item, setItem] = useState({})
    const [updateItemDetail, setUpdateItemDetail] = useState({})
    const [isAvailable, setIsAvailable] = useState(false)
    const [fileInput, setFileInput] = useState()
    const [variants, setVariants] = useState(updateItemDetail.variants)
    const [variantInput, setVariantInput] = useState({ variant: "", price: "" })
    const [category, setCategory] = useState(updateItemDetail.category)
    const [formInput, setFormInput] = useState(updateItemDetail)
    const [loading, setLoading] = useState(false)


    const getItemDetail = async () => {
        const res = await axios.get(`${BASE_URL}/api/v1/products/edit?id=${id}`, { headers: { Authorization: localStorage.getItem('AccessToken'), "Content-Type": "multipart/form-data" }, })
        setItem(res.data.data)
        setFormInput(res.data.data)
        setUpdateItemDetail(res.data.data)
        setVariants(res.data.data.variants)
        setIsAvailable(res.data.data.isAvailable)

    }


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormInput((prev) => ({
            ...prev, [name]: value
        }))
    }
    const handleFile = (e) => {
        const file = e.target.files[0];
        setFileInput(file)
    }


    const submitHandler = async () => {
        setLoading(true)
        const formData = new FormData()
        // formData.append("photo", fileInput)
        formData.append("itemId", formInput.itemId)
        formData.append("itemName", formInput.itemName)
        formData.append("category", formInput.category)
        formData.append("isAvailable", formInput.isAvailable)

        formInput.variants.forEach(item => {
            formData.append("variants[]", JSON.stringify(item))
        })

        const res = await axios.post(`${BASE_URL}/api/v1/products/edit?id=${id}`, formData, { headers: { Authorization: localStorage.getItem("AccessToken"), "Content-Type": "multipart/form-data" } })
        console.log(res.data);
        setLoading(false)
        if (res.data.statusCode === 202) {
            swal({
                title: "Updated!",
                icon: "success",
                text: "Your item has been updated successfully"
            }).then(() => {
                navigate("/items")
            })
        } else {
            swal({
                title: "Failed!",
                icon: "error",
                text: "Failed to Updated"
            }).then(() => {
                navigate("/items")
            })
        }

    }

    const addButtonHandler = () => {
        setVariants((prev) => ([...prev, variantInput]));
        setVariantInput({ variant: "", price: "" });
    }
    const removeButtonHandler = (itemVariant) => {
        setVariants((prev) => (prev.filter((item) => item.variant !== itemVariant)));
    }

    const getCategory = async () => {
        const res = await axios.get(`${BASE_URL}/api/v1/products/get-category`, { headers: { Authorization: localStorage.getItem("AccessToken") } })
        // console.log(res.data.data)
        setCategory(res.data.data)
    }

    useEffect(() => {
        setFormInput((data) => ({ ...data, variants: variants, isAvailable:isAvailable }))

    }, [variants, isAvailable]);

    useEffect(() => {
        getCategory()
        getItemDetail()
    }, []);



    return (
        <div className=' pt-10 box-border flex w-full'>
            <div className='flex p-4 h-80 aspect-square relative'>


                <img src={item.photo} className='rounded-full aspect-square object-cover' alt="" />
            </div>
            <div className='flex justify-center '>
                <div>
                    <form action="" className='flex flex-col text-start gap-2'>
                        <h2 className='text-center font-semibold text-lg'>Item Detail</h2>
                        <select onChange={handleChange} value={formInput?.category || updateItemDetail.category} name="category" id="" className='p-2 border rounded-lg'>
                            <option selected disabled value="">Category</option>
                            {category?.map((elem) => (
                                <option value={elem.category}>{elem.category}</option>
                            ))}

                        </select>
                        <label htmlFor="title">Item Name </label>
                        <input type="text" onChange={handleChange} value={formInput?.itemName || updateItemDetail?.itemName} name='itemName' placeholder='Item Name' className='p-2 border rounded-lg' />
                        <label htmlFor="title">Item Id</label>



                        <span>Available</span>

                        <label class="inline-flex items-center cursor-pointer">
                            <input value={formInput.isAvailable} checked={isAvailable} onChange={(e) => { setIsAvailable(prev => !prev)}} type="checkbox" name='isAvailable' className="sr-only peer" />
                            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            {/* <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span> */}
                        </label>


                        <input type="text" onChange={handleChange} value={formInput?.itemId || updateItemDetail.itemId} placeholder='Item Id' name="itemId" className='p-2  border rounded-lg' />



                        <div className='flex w-full justify-between items-center'>

                            <input value={variantInput.variant} onChange={(e) => setVariantInput((prev) => ({ ...prev, variant: e.target.value }))} type="text" placeholder='Variant' className='p-2 w-/12  border rounded-lg' />
                            <input value={variantInput.price} onChange={(e) => setVariantInput((prev) => ({ ...prev, price: e.target.value }))} type="number" placeholder=' Price' className='p-2 w-5/12 border rounded-lg' />
                            <FaPlus className='text-black' onClick={addButtonHandler} />

                        </div>
                        {variants?.map((variant) => (
                            <div className='w-full flex justify-center gap-8 items-center' key={variant.variant}>
                                <input value={variant.variant} disabled type="text" placeholder='variant' className='p-2 w-/12  border rounded-lg' />
                                <input value={variant.price} disabled type="number" placeholder='Full Price' className='p-2 w-5/12 border rounded-lg' />
                                <FaPlus onClick={() => { removeButtonHandler(variant.variant) }} className='rotate-45 cursor-pointer hover:text-red-600' />
                            </div>
                        ))}
                        {/* <label htmlFor="title">Image</label>
                    <input onChange={handleFile}  type="file" className='' name='photo' /> */}
                        <button type="button" onClick={submitHandler} className='bg-orange-400 w-28 flex justify-center items-center color hover:bg-orange-500 text-white rounded-xl h-8 font-semibold ' >{loading ? <TailSpin color='white' width={20} strokeWidth={3} height={20} /> : "Save"}</button>
                    </form>

                </div>
            </div>

        </div>
    )
}

export default EditPage