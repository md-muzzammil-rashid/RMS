import { apiConnector } from "../apiconnector"
import { orderEndPoint } from "../apis"

const ACCESS_TOKEN = localStorage.getItem("AccessToken")

const submitOrder = async ({data}) => {
    // const res =await axios.post(`${BASE_URL}/api/v1/orders/submit-order`, data , { headers:{Authorization:localStorage.getItem("AccessToken")}} )
    try {
        const res = await apiConnector("POST", orderEndPoint.SUBMIT_ORDER, data, {Authorization: localStorage.getItem('AccessToken')})
        return res
    } catch (error) {
        console.log(error)
    }
}

const getOrderHistory = async ({fromDate, toDate, page, limit}) => {
    limit = limit || 10
    try {
        // const res = await axios.get(`${BASE_URL}/api/v1/orders/order-history?fromDate=${fromDate}&toDate=${toDate}&page=${page}&limit=10`, { headers: { Authorization: localStorage.getItem("AccessToken") } })
        const res = await apiConnector("GET", orderEndPoint.ORDER_HISTORY, {}, {Authorization: localStorage.getItem('AccessToken')}, {fromDate, toDate, page, limit})
        
        if (res.data?.statusCode === 200) {
            return res.data.data
        }
    } catch (error) {
        if(error.response.status===401){
            return false;
        }
    }
}

const orderSummery = async({orderId})=>{
    try {
        const res = await apiConnector("GET", orderEndPoint.ORDER_SUMMERY+orderId, {}, {Authorization:localStorage.getItem('AccessToken')})
        // const res = await axios.get(`${BASE_URL}/api/v1/orders/order-summery/${orderId}`,{headers:{Authorization:localStorage.getItem("AccessToken")}})
        if(res.data.statusCode===200){
            return res.data.data
        }
    } catch (error) {
        
    }
}

const updateOrderStatusFromDB = async ({orderId, status})=>{
    // const res = await axios.post(`${BASE_URL}/api/v1/orders/update-order-status/${orderId}`,status,{headers:{Authorization:localStorage.getItem('AccessToken')}})
    const res = await apiConnector("POST", orderEndPoint.UPDATE_ORDER_STATUS+orderId, status, {Authorization: localStorage.getItem('AccessToken')})
    return true;
}



export{
    submitOrder,
    getOrderHistory,
    orderSummery,
    updateOrderStatusFromDB
}