import axios from 'axios'
import React, { useState } from 'react'

const Signup = () => {
    const [formData, setFormData]=useState({})
    const changeHandler = (e)=>{
        const {name, value}=e.target
        setFormData((prev)=>({...prev, [name]:value}))
    }
    const formHandler = async(formData) =>{
        const res = await axios.post("http://localhost:5005/api/v1/users/register",{password:"ayaan",email:"ayaan@ayaan",businessName:"ayaan",displayName:"ayaan",username:"ayaan"})
        
    }
  return (
    <div>
            <input onChange={changeHandler} type="text" name='usernameORemail ' className='border-2' />
            <input onChange={changeHandler} type="text" name='password' className='border-2' />
            <button type="submit" onClick={()=>formHandler(formData)} value="submit" >Submit</button>
    </div>
  )
}

export default Signup