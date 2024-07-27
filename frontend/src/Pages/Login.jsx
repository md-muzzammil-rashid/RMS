import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginUser, STATUS } from '../redux/reducers/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { TailSpin } from 'react-loader-spinner'

const Login = () => {
    const [formData, setFormData]=useState({})
    const loginStatus = useSelector((state)=>state.user.status)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loginStatusMessage = useSelector((state)=>state.user.message)

    const changeHandler = (e)=>{
        const {name, value}=e.target
        setFormData((prev)=>({...prev, [name]:value}))
    }
    const formHandler = async(formData) =>{
       dispatch(LoginUser(formData))
       
        }

    
  
    useEffect(()=>{
      if (loginStatus === STATUS.SUCCESS){
        navigate("/dashboard")
      }
      
    },[formData, loginStatus])
    

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

              <div className='border-t-4 pt-4 text-center w-6/12'>
                <span>Don't have Account? <span className='text-blue-500 font-semibold cursor-pointer'><Link to={'/signup'}>Create a Account</Link></span></span>

              </div>
            </div>
            <div className='w-2/5 h-full bg-green-500'>
                &nbsp;
            </div>
      </div>
    </div>
  )
}

export default Login