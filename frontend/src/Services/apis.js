// const BASE_URL = "/api/v1"
const BASE_URL = "https://rms-csuw.onrender.com/api/v1";
const SOCKET_URL = "https://rms-csuw.onrender.com/";
// const SOCKET_URL = 'http://192.168.179.81:5005/';

const route = {
    ORDERS: BASE_URL + "/orders",
    USERS: BASE_URL + "/users",
    RESTAURANT: BASE_URL + "restaurant",
    PRODUCTS: BASE_URL + "/products",
    REPORTS: BASE_URL + "/reports"
}
const orderEndPoint = {
    SUBMIT_ORDER :  route.ORDERS+"/submit-order",
    ORDER_SUMMERY :  route.ORDERS+"/order-summery/",
    ORDER_HISTORY :  route.ORDERS+"/order-history",
    UPDATE_ORDER_STATUS :  route.ORDERS+"/update-order-status/",
    INCOMPLETE_ORDERS :  route.ORDERS + "/incomplete-orders"

}

const userEndPoint = {
    LOGIN :  route.USERS + "/login",
    REGISTER :  route.USERS + "/create-user",
    USER_DETAILS :  route.USERS + "/user-details",
    LOGOUT :  route.USERS + "/logout"
}

const restaurantEndPoint = {
    REGISTER_RESTAURANT :  route.RESTAURANT + "/register-restaurant"
}

const reportEndPoint = {
    MOST_SELLING_PRODUCT :  route.REPORTS + "/most-selling-product",
    DAILY_SALES :  route.REPORTS + "/daily-sales",
    TOTAL_SALES :  route.REPORTS + "/total-sales"
}

const productEndPoint = {
    ADD_CATEGORY :  route.PRODUCTS + "/add-category",
    ADD_ITEMS :  route.PRODUCTS + "/add-items",
    GET_CATEGORY :  route.PRODUCTS + "/get-category",
    GET_ITEMS :  route.PRODUCTS + "/get-items",
    EDIT_ITEM :  route.PRODUCTS + "/edit"
}


export {
    BASE_URL,
    orderEndPoint,
    userEndPoint,
    restaurantEndPoint,
    reportEndPoint,
    productEndPoint,
    SOCKET_URL
}