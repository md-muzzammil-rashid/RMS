import { Navigate } from "react-router-dom";
import { apiConnector } from "../apiconnector";
import { productEndPoint } from "../apis";


const addCategory = async ({formData}) =>{
    // const res = await axios.post(`${BASE_URL}/api/v1/products/add-category`,formData, {headers:{Authorization:localStorage.getItem("AccessToken"),"Content-Type":"multipart/form-data"}})
    try {
        const res = await apiConnector("POST", productEndPoint.ADD_CATEGORY, formData, {Authorization: localStorage.getItem('AccessToken'), "Content-Type":"multipart/form-data"} )
            console.log(res.data);
            return res.data.statusCode===201;
        
    } catch (error) {
        console.log(error);
    }
}

const getCategory = async() =>{
    // const res = await axios.get(`${BASE_URL}/api/v1/products/get-category`,{headers:{Authorization:localStorage.getItem("AccessToken")}})
    try {
        const res = await apiConnector("GET", productEndPoint.GET_CATEGORY, {}, {Authorization: localStorage.getItem('AccessToken')})
        console.log(res.data.data)
        return res.data.data
    } catch (error) {
        console.log(error);
    }
}

const addItem = async ({formData}) =>{
    // const res = await axios.post(`${BASE_URL}/api/v1/products/add-items`,formData,{headers:{Authorization: localStorage.getItem("AccessToken"),"Content-Type":"multipart/form-data"}})
    try {
        const res = await apiConnector("POST", productEndPoint.ADD_ITEMS, formData, {Authorization: localStorage.getItem('AccessToken'), "Content-Type":"multipart/form-data"})
        return res.data.statusCode===201;
    } catch (error) {
        console.log(error);
    }
}

const getItems  =async () => {
    try {
        const res = await apiConnector("GET", productEndPoint.GET_ITEMS, {}, {Authorization:localStorage.getItem('AccessToken')})
        return res.data
    } catch (error) {
        throw error
        
    }
}

const getItemDetails = async ({id}) => {
    // const res = await axios.get(`${BASE_URL}/api/v1/products/edit?id=${id}`, { headers: { Authorization: localStorage.getItem('AccessToken')}, })
    try {
        const res = await apiConnector("GET", productEndPoint.EDIT_ITEM,{}, {Authorization: localStorage.getItem('AccessToken')}, {id})
        return res.data.data
    } catch (error) {
        
    }
}


const editItem = async ({formData, id}) => {
    try {
        const res = await apiConnector("POST", productEndPoint.EDIT_ITEM, formData, {Authorization: localStorage.getItem('AccessToken'), "Content-Type":"multipart/form-data"}, {id})
        return res.data.statusCode===202;
    } catch (error) {
        console.log(error);
    }
       
}
    export{
        addCategory,
        getCategory,
        addItem,
        getItems,
        getItemDetails,
        editItem
    }