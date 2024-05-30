import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { getItems } from "../../Services/Operations/ProductAPI";

const STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error"
}



const initialState = { status: STATUS.SUCCESS, products: [], displayProducts: [], selectedCategory: "All", searchItems: [], searchQuery:'' };

const itemSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        getItem: (state, action) => {
            if (action.payload == "All") {
                state.displayProducts = state.products;
                state.selectedCategory = "All"
                return
            }
            state.displayProducts = state.products.filter((item) => item.category.some(e=>e=== action.payload) )
            state.selectedCategory = action.payload
        },
        isNotPresent: (state, action) => {

            for (const product of state.products) {
                if (product.itemName === action.payload.itemName) {
                    return 0;
                }
            }
            return 1;
        },
        searchItems: (state, action) => {
            state.searchQuery=action.payload
            state.searchItems = []
            if (action.payload === '') {
                state.searchItems = [];
            } else {
                for (const product of state.products) {
                    if (product.itemName.toLowerCase().includes(action.payload.toLowerCase()) ||
                        product.category.some(e=>e.toLowerCase().includes(action.payload.toLowerCase())) ||
                        product.itemId.toLowerCase().includes(action.payload.toLowerCase())
                    ) {
                        state.searchItems = [...state.searchItems, product]
                    } else {

                        for (const variant of product.variants) {
                            if (variant.variant.toLowerCase().includes(action.payload.toLowerCase())) {
                                state.searchItems = [...state.searchItems, product]
                                break
                            }

                        }
                    }
                }

            }
        },
  


    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state, action) => {
                state.status = STATUS.LOADING;
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.products = action.payload
                state.status = STATUS.SUCCESS
                state.displayProducts = action.payload
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.status = STATUS.ERROR
            })
    }
});

export const { getItem, searchItems, isNotPresent } = itemSlice.actions
export default itemSlice.reducer

export const fetchItems = createAsyncThunk("item/fetch", async () => {
    // const res = await axios.get(`${BASE_URL}/api/v1/products/get-items`, { headers: { Authorization: localStorage.getItem("AccessToken") } })

    const res = await getItems()
    console.log(res.data);
    if (res.statusCode === 200) {
        return res.data
    }
})