import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logIn, userDetails } from "../../Services/Operations/AuthAPI";

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
        message: '',
        token: null,
        restaurantId:null
    },
    reducers: {
        resetLogin: (state, action) => {
            state.data = []
            state.message = action.payload?.message
            state.status = STATUS.IDLE
            state.token = null
            state.restaurantId = null
            localStorage.clear()
        },
        getUserInfo:(state, action)=>{
            console.log("getting user Info");
            const localStorageData = JSON.parse(localStorage.getItem('UserData'))
            state.status = STATUS.IDLE
                state.data = localStorageData
                state.message = action.payload?.message
                state.token = action.payload?.data?.AccessToken
                state.restaurantId = localStorageData.user.restaurant._id
                localStorage.setItem('restaurantId', localStorageData.user.restaurant._id)
        },
        setUserDetails: (state, action) => {
            state.status = STATUS.SUCCESS
            state.data = action.payload.data
            state.message = action.payload.message
            state.token = action.payload.data?.AccessToken
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
            .addCase(LoginUser.fulfilled, (state, action) => {
                console.log(action.payload);
                if(action.payload.statusCode === 202){
                    state.status = STATUS.SUCCESS
                }else{
                    state.status = STATUS.ERROR
                }
                state.data = action.payload?.data
                state.message = action.payload?.message
                state.token = action.payload?.data?.AccessToken
            })

            .addCase(LoginUser.rejected, (state, action) => {
                state.status = STATUS.ERROR
                state.data = action.payload
                state.message = action.error.message
                console.log("the msg is " , action.payload);
                

            })

            .addCase(LoginUser.pending, (state, action) => {
                state.status = STATUS.pending
                state.message = 'Loading'
            })

            .addCase(getUserData.fulfilled, (state, action)=>{
                state.status = STATUS.SUCCESS
                state.data = action.payload?.data
                state.message = action.payload?.message
                state.token = action.payload?.data?.AccessToken
            })
            .addCase(getUserData.rejected, (state, action)=>{
                state.status = STATUS.ERROR
                state.data = action.payload
                state.message = action.error.message
            })
            .addCase(getUserData.pending, (state, action)=>{
                state.status = STATUS.LOADING
                state.message = 'Loading'
            })

    }
})



export const LoginUser = createAsyncThunk('user/data', async (formData, {rejectWithValue}) => {

            const res = await logIn({usernameORemail: formData.usernameORemail, password: formData.password})

            if (res.statusCode === 202) {
                
                        localStorage.setItem("AccessToken", res.data.AccessToken)
                        localStorage.setItem("restaurantId", res.data.user.restaurant._id)
                        localStorage.setItem("RefreshToken", res.data.RefreshToken)
                        localStorage.setItem('UserData', JSON.stringify(res.data))
                        console.log(localStorage.getItem("AccessToken"));
                    }
                    return res


            })

export const getUserData = createAsyncThunk  ('user/details', async(data, {rejectWithValue})=>{
    const res = await  userDetails()
    if(res.statusCode === 200)
        console.log(res);
    return res
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
