import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../reducers/cartSlice";
import itemSlice from "../reducers/itemSlice";
import userSlice from "../reducers/userSlice";
import socketSlice from "../reducers/socketSlice";


const store =  configureStore({
    reducer:{
        "cart":cartSlice,
        "items":itemSlice,
        'user':userSlice,
        "socket":socketSlice
    }

})

export default store