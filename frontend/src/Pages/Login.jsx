import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import bgImg from '../Assets/images/nick-karvounis-Ciqxn7FE4vE-unsplash.jpg'
import { STATUS, getUserData, setStatus } from '../redux/reducers/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { TailSpin } from 'react-loader-spinner'

const Login = () => {
    const [formData, setFormData]=useState({})
    const loginStatus = useSelector((state)=>state.user.status)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [errorMessage, setErrorMessage] = useState(undefined)
    const loginStatusMessage = useSelector((state)=>state.user.message)
    const changeHandler = (e)=>{
        const {name, value}=e.target
        setFormData((prev)=>({...prev, [name]:value}))
    }
    const formHandler = async(formData) =>{
      dispatch(getUserData(formData))
        // const res = await axios.post("/api/v1/users/login",{usernameORemail:formData.usernameORemail ,password:formData.password})
        //   if(res.data.statusCode===202){
        //    localStorage.setItem("AccessToken",res.data.data.AccessToken)
        //    localStorage.setItem("RefreshToken",res.data.data.RefreshToken)
        //    console.log(localStorage.getItem("AccessToken"));
        
       
        }

    
  
    useEffect(()=>{
      // console.log("1");
      if (loginStatus === STATUS.SUCCESS){
        console.log("2");
        navigate("/")
      }
      // console.log("3");
      
    },[formData, loginStatus])
    
    // useEffect(()=>{
    //   console.log('something changed');
    //   // if (loginStatus !== STATUS.SUCCESS){
    //   //   setIsLoading(false)
    //   // }
    // },[loginStatus])
  return (
    <div className='w-full h-screen  ' >
      <div className='login-body absolute top-0 left-0 w-screen h-screen -z-10' ></div>
      <div className='z-10  w-8/12 overflow-hidden h-5/6 justify-center items-center login-form bg-opacity-40 bg-white rounded-3xl  absolute flex   top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div className='flex flex-col h-full justify-center items-center bg-white gap-5 w-3/5'>
              <span className='text-black p-5 font-extrabold text-4xl  text-center '>Login to Your Account</span>
              {
                loginStatusMessage? <span className='text-red-500 font-bold'>{loginStatusMessage}</span>:''
              }
              <input onChange={changeHandler} placeholder='Username or Email' type="text" name='usernameORemail' className='border-2 rounded-3xl w-72 px-4 py-2 focus:ring-white' />
              <input onChange={changeHandler} type="text" placeholder='Password' name='password' className='border-2 w-72  px-4 py-2 rounded-3xl ' />
              <button className='bg-red-600 text-white px-5 py-2 w-72 flex justify-center rounded-3xl' type="submit" onClick={()=>{formHandler(formData); setIsLoading(()=>(loginStatus===STATUS.ERROR)?false:loginStatus===STATUS.LOADING?true:'')}} value="submit" >{isLoading ? <TailSpin color='white ' strokeWidth={4} height={30}/> :'Submit'}</button>
            </div>
            <div className='w-2/5 h-full bg-green-500'>
                &nbsp;
            </div>
      </div>
    </div>
  )
}

export default Login