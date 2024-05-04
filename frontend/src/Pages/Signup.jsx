import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { STATUS, getUserData } from '../redux/reducers/userSlice'
import { TailSpin } from 'react-loader-spinner'
import swal from 'sweetalert'
import toast from 'react-hot-toast'
import { BASE_URL } from '../utils/constants'

const Signup = () => {
  const [formData, setFormData] = useState({
    restaurantName: "",
    restaurantCode: "",
    restaurantEmail: "",
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const loginStatus = useSelector((state) => state.user.status)
  const [isLoading, setIsLoading] = useState(false)
  const [formPart, setFormPart] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState(undefined)
  const loginStatusMessage = useSelector((state) => state.user.message)
  const changeHandler = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  const loginHandler = async () => {

    try {
      const res = await axios.post(`${BASE_URL}/api/v1/restaurant/register-restaurant`, {data:JSON.stringify(formData)})
      console.log(res);
      if(res){
        swal({
          title:"Created!",
          icon: "success",
          text:"Account Created and Restaurant Registered Successfully"
      }).then(()=>{
          navigate("/")
      })
      }
    } catch (error) {

      toast.success(error.response.data.message)
      swal({
        title:"Error!",
        icon: "error",
        text:error.response.data.message
    }).then(()=>{
        // navigate("/items")
        console.log(error);
    })      
    }


  }



  useEffect(() => {
    // console.log("1");
    if (loginStatus === STATUS.SUCCESS) {
      console.log("2");
      navigate("/")
    }
    // console.log("3");

  }, [formData, loginStatus])

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
        <div className='w-2/5 h-full bg-green-500'>
          &nbsp;
        </div>
        <div className='flex flex-col h-full justify-center items-center bg-white gap-5 w-3/5'>
          <span className='text-black p-5 font-extrabold text-4xl  text-center '>Create An Account</span>
          {
            loginStatusMessage ? <span className='text-red-500 font-bold'>{loginStatusMessage}</span> : ''
          }
          {formPart ?

            <div className='flex flex-col h-full justify-center items-center bg-white gap-5 w-3/5'>
              <span className='font-semibold text-xl'>Owner's Details</span>

              <input value={formData.email} onChange={changeHandler} placeholder='Email' type="email" name='email' className='border-2 rounded-3xl w-72 px-4 py-2 focus:ring-white' />
              <input value={formData.username} onChange={changeHandler} placeholder='Username' type="text" name='username' className='border-2 rounded-3xl w-72 px-4 py-2 focus:ring-white' />
              <input value={formData.fullName} onChange={changeHandler} placeholder='Full Name' type="text" name='fullName' className='border-2 rounded-3xl w-72 px-4 py-2 focus:ring-white' />
              <input value={formData.password} onChange={changeHandler} placeholder='Password' type="password" name='password' className='border-2 rounded-3xl w-72 px-4 py-2 focus:ring-white' />
              <input value={formData.confirmPassword} onChange={changeHandler} placeholder='Confirm Password' type="password" name='confirmPassword' className='border-2 rounded-3xl w-72 px-4 py-2 focus:ring-white' />
              <div className='flex w-72'>

                <button className='bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 w-72 flex justify-center rounded-3xl' type="submit" onClick={() => { setFormPart(0) }} value="submit" >Back</button>
                <button className='bg-red-600 text-white px-5 py-2 w-72 flex justify-center rounded-3xl' type="submit" onClick={loginHandler} value="submit" >{isLoading ? <TailSpin color='white ' strokeWidth={4} height={30} /> : 'Submit'}</button>
              </div>
            </div>
            :
            <div className='flex flex-col h-full justify-center items-center bg-white gap-5 w-3/5'>
              <span className='font-semibold text-xl'>Restaurant Details</span>


              <input value={formData.restaurantName} onChange={changeHandler} placeholder='Restaurant Name' type="text" name='restaurantName' className='border-2 rounded-3xl w-72 px-4 py-2 focus:ring-white' />

              <input value={formData.restaurantEmail} onChange={changeHandler} type="email" placeholder='Restaurant Email' name='restaurantEmail' className='border-2 w-72  px-4 py-2 rounded-3xl ' />

              <input value={formData.restaurantCode} onChange={changeHandler} placeholder='Restaurant Code' type="text" name='restaurantCode' className='border-2 rounded-3xl w-72 px-4 py-2 focus:ring-white' />

              <button className='bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 w-72 flex justify-center rounded-3xl' type="submit" onClick={() => { setFormPart(1) }} value="submit" >Next</button>

            </div>
          }

        </div>
      </div>
    </div>
  )
}

export default Signup