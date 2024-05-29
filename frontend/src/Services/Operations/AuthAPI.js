import { apiConnector } from "../apiconnector";
import { userEndPoint } from "../apis";


const ACCESS_TOKEN = localStorage.getItem("AccessToken")

const userDetails = async ()=>{
  try {
    const res = await apiConnector("GET", userEndPoint.USER_DETAILS, {}, {Authorization: localStorage.getItem('AccessToken')} )
    console.log("res is :", res);
    return res.data
  } catch (error) {
    throw error
  }
  
}

const logOut = async () => {
  
  try {
    return await apiConnector("POST", userEndPoint.LOGOUT, {}, {Authorization: localStorage.getItem('AccessToken')})
    
  } catch (error) {
    console.log(error)
  }
  }

const signUp = async ({formData}) => {
  try {
    const res = await apiConnector("POST", userEndPoint.REGISTER, JSON.stringify(formData))
    if(res.data.status === 201){
      return {status:true}
      
    }
  } catch (error) {
    return {status: false, error: error}
  }
}

const logIn = async ({usernameORemail, password}) =>{
  console.log("in login");
  try {
    const res = await apiConnector("POST", userEndPoint.LOGIN, {usernameORemail, password} )
    return res.data
  } catch (error) {
    throw error
  }
}


  export{
    userDetails,
    logOut,
    signUp,
    logIn
  }