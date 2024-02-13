import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../reducers/cartSlice";
import itemSlice from "../reducers/itemSlice";


const store =  configureStore({
    reducer:{
        "cart":cartSlice,
        "items":itemSlice
    }

})

export default store