import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaPlus, FaTimes } from 'react-icons/fa'
import { RiCloseLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { TailSpin } from "react-loader-spinner"
import swal from "sweetalert"
import { BASE_URL } from '../utils/constants'
import { addItem, getCategory } from '../Services/Operations/ProductAPI'
import {Multiselect} from 'multiselect-react-dropdown'

const AddItems = () => {
    const dummy = [{name: 'name', id:'23'},{name: 'namse', id:'2a3',}]
    const navigate = useNavigate()
    const [variants, setVariants] = useState([])
    const [variantInput, setVariantInput] = useState({ variant: "", price: "" })
    const [category, setCategory] = useState([])
    const [selectedCategory, setSelectedCategory] = useState([])
    const [fileInput, setFileInput] = useState()
    const [formInput, setFormInput] = useState({})
    const [loading, setLoading] = useState(false)


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

    const handleCategory = () =>{
        
    }

    const onSelect = (selectedList, selectedItem) => {
        setSelectedCategory(prev=>([...prev, selectedItem.category]));
    }
    const onRemove = (selectedList, removedItem) => {
        setSelectedCategory(prev=> prev.filter(i=> i!== removedItem.category))
    }

    const submitHandler = async () => {
        setLoading(true)
        const formData = new FormData()
        formData.append("photo", fileInput)
        formData.append("itemId", formInput.itemId)
        formData.append("itemName", formInput.itemName)
        formData.append("category", selectedCategory)

        formInput.variants.forEach(item => {
            formData.append("variants[]", JSON.stringify(item))
        })

        for (let data of formData) {
            console.log(data[0], data[1]);
        }

        const res = await addItem({ formData })
        if (res) {
            swal({
                title: "Added!",
                icon: "success",
                text: "Your item has been added successfully"
            }).then(() => {
                navigate("/items")
            })
        }
        setLoading(false)

    }

    const addButtonHandler = () => {
        setVariants((prev) => ([...prev, variantInput]));
        setVariantInput({ variant: "", price: "" });
    }

    const removeButtonHandler = (itemVariant) => {
        setVariants((prev) => (prev.filter((item) => item.variant !== itemVariant)));
    }

    const getCategories = async () =>{
        const category = await getCategory()
        setCategory(category)
    }
    useEffect(() => {
        setFormInput((data) => ({ ...data, variants: variants }))
    }, [variants]);

    useEffect(() => {

        getCategories()
    }, []);

    return (
        <div className=' w-full h-screen flex flex-col justify-center items-center'>
            <div className='max-w-96 box-content p-16 bg-white border rounded-xl shadow-lg relative'>
                <RiCloseLine onClick={() => navigate(-1)} className='text-2xl font-bold cursor-pointer absolute right-3 top-4 hover:text-red-600' />
                <form action="" className='flex flex-col text-start gap-2'>
                    
                    <h2 className='text-center font-semibold text-lg'>Add Item</h2>
                    {/* <select onChange={handleChange} name="category" id="" className='p-2 border rounded-lg'>
                        <option selected disabled value="">Category</option>
                        {category.map((elem) => (
                            <option value={elem.category}>{elem.category}</option>
                        ))}

                    </select> */}
                    <div>
                    <label>Category</label>
                    <Multiselect
                        onSelect={onSelect}  
                        onRemove={onRemove}  
                        onSearch={()=>{}} 
                        options={category}
                        
                        displayValue='category'
                        disablePreSelectedValues="selected"
                    />

                        </div>
                    <label htmlFor="title">Item Name</label>
                    <input type="text" onChange={handleChange} name='itemName' placeholder='Item Name' className='p-2 border rounded-lg' />
                    <label htmlFor="title">Item Id</label>
                    <input type="text" onChange={handleChange} placeholder='Item Id' name="itemId" className='p-2  border rounded-lg' />


                    <div className='flex w-full justify-between items-center'>
                        <input value={variantInput.variant} onChange={(e) => setVariantInput((prev) => ({ ...prev, variant: e.target.value }))} type="text" placeholder='variant' className='p-2 w-/12  border rounded-lg' />
                        <input value={variantInput.price} onChange={(e) => setVariantInput((prev) => ({ ...prev, price: e.target.value }))} type="number" placeholder=' Price' className='p-2 w-5/12 border rounded-lg' />
                        <FaPlus className='text-black' onClick={addButtonHandler} />

                    </div>
                    {variants.map((variant) => (
                        <div className='w-full flex justify-center gap-2 items-center' key={variant.variant}>
                            <input value={variant.variant} disabled type="text" placeholder='variant' className='p-2 w-/12  border rounded-lg' />
                            <input value={variant.price} disabled type="number" placeholder='Full Price' className='p-2 w-5/12 border rounded-lg' />
                            <FaPlus onClick={() => { removeButtonHandler(variant.variant) }} className='rotate-45' />
                        </div>
                    ))}
                    <label htmlFor="title">Image</label>
                    <input onChange={handleFile} type="file" className='' name='photo' />
                    <button type="button" onClick={submitHandler} className='bg-orange-400 w-28 flex justify-center items-center color hover:bg-orange-500 text-white rounded-xl h-8 font-semibold ' >{loading ? <TailSpin color='white' width={20} strokeWidth={3} height={20} /> : "Submit"}</button>
                </form>
                <div className='text-blue-500 font-semibold p-3'><Link to={'add-new-category'} >Add a new Category ?</Link></div>
            </div>
        </div>
    )
}

export default AddItems