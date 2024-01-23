import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "Cart",
    initialState:{product:[],total:0},
    reducers:{
        addItems:(state, action)=>{
           const existedProduct =  state.product.find((item)=>item.id  == action.payload.id)
           if(!existedProduct){
                const {name, id, image, selectedPrice} = action.payload
                const data = {name, id, selectedPrice, image, quantity:1}
               state.product.push(data)
           }else{
            existedProduct.quantity =  existedProduct.quantity+1;
           }
           
           state.total = state.product.map((item)=>{
            return (item.selectedPrice*item.quantity);
           })
        },
        removeItems:(state, action)=>{
            const existedProduct = state.product.find((item)=>item.id == action.payload)
            if(!existedProduct)return;
            if(existedProduct.quantity >1){
                existedProduct.quantity = existedProduct.quantity - 1;
            }else{
                state.product = state.product.filter((item)=> item.id != action.payload)
            }
            state.total = state.product.map((item)=>{
                return (item.selectedPrice*item.quantity);
               })
            
        },
        clearItems:(state, action)=>{
            state.product = [];
        },
    
            
        
    }

})

export default cartSlice.reducer;
export const {addItems, removeItems, clearItems} = cartSlice.actions;
