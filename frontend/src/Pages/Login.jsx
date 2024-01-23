import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [formData, setFormData]=useState({})
    const navigate = useNavigate()
    const changeHandler = (e)=>{
        const {name, value}=e.target
        setFormData((prev)=>({...prev, [name]:value}))
    }
    const formHandler = async(formData) =>{
        const res = await axios.post("/api/v1/users/login",{usernameORemail:"ayaan",password:"ayaan"})
          if(res.data.statusCode===202){
           localStorage.setItem("AccessToken",res.data.data.AccessToken)
           localStorage.setItem("RefreshToken",res.data.data.RefreshToken)
           console.log(localStorage.getItem("AccessToken"));
           navigate("/")
        }
    }
  return (
    <div>
            <input onChange={changeHandler} type="text" name='usernameORemail ' className='border-2' />
            <input onChange={changeHandler} type="text" name='password' className='border-2' />
            <button type="submit" onClick={()=>formHandler(formData)} value="submit" >Submit</button>
    </div>
  )
}

export default Login