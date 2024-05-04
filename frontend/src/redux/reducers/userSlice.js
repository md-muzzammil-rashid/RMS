import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { extractErrorMessage } from "../../utils/ErrorExtractor";

export const STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error",
    IDLE: 'idle'
}

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        status: "",
        data: [],
        message: ''
    },
    reducers: {
        resetLogin: (state, action) => {
            state.data = []
            state.message = action.payload?.message
            state.status = STATUS.IDLE
        },
        getUserInfo:(state, action)=>{
            state.status = STATUS.IDLE
                state.data = JSON.parse(localStorage.getItem('UserData'))
                state.message = action.payload?.message
        }
        // setLogin: (state, action) =>{
        //     state.data = action.payload.data
        //     state.message = action.payload.message
        // },
        // setStatus: (state, action)=>{
        //     state.status = action.payload
        // },
        // setMessage: (state, action) =>{
        //     state.message = action.payload
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserData.fulfilled, (state, action) => {
                state.status = STATUS.SUCCESS
                state.data = action.payload?.data
                state.message = action.payload?.message
            })

            .addCase(getUserData.rejected, (state, action) => {
                // console.log(action);
                state.status = STATUS.ERROR
                state.data = action.payload
                state.message = action.payload

            })

            .addCase(getUserData.pending, (state, action) => {
                state.status = STATUS.pending
                state.message = 'Loading'
            })

    }
})



export const getUserData = createAsyncThunk('user/data', async (formData, {rejectWithValue}) => {
        try {
            const res = await axios.post("/api/v1/users/login", { usernameORemail: formData.usernameORemail, password: formData.password })
            // .catch((err)=>( extractErrorMessage(err.response.data)))
                    
            if (res.data.statusCode === 202) {
                        localStorage.setItem("AccessToken", res.data.data.AccessToken)
                        localStorage.setItem("RefreshToken", res.data.data.RefreshToken)
                        localStorage.setItem('UserData', JSON.stringify(res.data.data))
                        console.log(localStorage.getItem("AccessToken"));
                        console.log(res);
                        return res.data
                    }
        } catch (error) {
            console.log('error is: ', extractErrorMessage(error.response.data));
            return rejectWithValue(extractErrorMessage(error.response.data))
        }
            })

export default userSlice.reducer;
export const { resetLogin, setLogin, setStatus , setMessage, getUserInfo} = userSlice.actions

// export const getUserData = (formData)=>{
//     return async (dispatch, getStatus)=>{
//         console.log(formData);
//         try {
//             const res = await axios.post('/api/v1/users/login', { usernameORemail: formData.usernameORemail, password: formData.password })
//             localStorage.setItem("AccessToken", res.data.data.AccessToken)
//             localStorage.setItem("RefreshToken", res.data.data.RefreshToken)
//             dispatch(setLogin(res.data))
//             dispatch(setStatus(STATUS.SUCCESS))

//         } catch (error) {
//             console.log(error);
//             setMessage(error)
//             dispatch(setStatus(STATUS.SUCCESS))
//         }
//     }
// }
