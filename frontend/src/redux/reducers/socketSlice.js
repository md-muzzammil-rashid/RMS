import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({

    name:'socket',

    initialState:{
        order:0,
        status:0

    },
    reducers:{
        updateOrderSocket:(state, action)=>{
            state.order = state.order+1;
        },
        updateStatusSocket:(state, action)=>{
            state.status = state.status+1;
        }

    },

})

export const {updateOrderSocket, updateStatusSocket} = socketSlice.actions;
export default socketSlice.reducer;