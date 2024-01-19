import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchRecentProducts = createAsyncThunk('recentProducts', async () => {

})

export const getProductDetails = createAsyncThunk('productDetails', async () => {

})

export const HomeSlice = createSlice({
    name: 'Home',
    initialState: {
        recentProducts: [],
        recent_loading: false,
        recent_error: '',
        productDetails: {},
        detail_loading: false,
        detail_error: ''
    },
    extraReducers: (builder) => {

    }
}) 