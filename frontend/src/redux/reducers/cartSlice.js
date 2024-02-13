import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "Cart",
    initialState:{product:[],total:0},
    reducers:{
        addItems:(state, action)=>{
           const existedProduct =  state.product.find((item)=>item.id  === action.payload.id && item.variants.variant === action.payload.variants.variant)
           if(!existedProduct){
                const {name, itemId, image, variants} = action.payload
                const data = {name, itemId, image, quantity:1, variants}
               state.product.push(data)
           }else{
            existedProduct.quantity =  existedProduct.quantity+1;
           }
           
           state.total = state.product.map((item)=>{
            return (item.variants.price*item.quantity);
           })
        },
        removeItems:(state, action)=>{
            const existedProduct = state.product.find((item)=>item.itemId === action.payload.itemId && item.variants.variant === action.payload.variants.variant)
            if(!existedProduct)return;
            if(existedProduct.quantity >1){
                existedProduct.quantity = existedProduct.quantity - 1;
            }else{
                state.product = state.product.filter((item)=> item.itemid !== action.payload.itemId && item.variants.variant !== action.payload.variants.variant)
            }
            state.total = state.product.map((item)=>{
                return (item.variants.price*item.quantity);
               })
            
        },
        clearItems:(state, action)=>{
            state.product = [];
        },
    
            
        
    }

})

export default cartSlice.reducer;
export const {addItems, removeItems, clearItems} = cartSlice.actions;
