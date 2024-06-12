import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../constant.js';
import { ErrorToast } from '../../utils/index.js';

export const fetchRecentProducts = createAsyncThunk(
  'recentProducts',
  async (_, { getState }) => {
    const stateData = getState().userData;
    const token = stateData.token;
    return await axios
      .get(`${BASE_URL}/recent-products`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        // console.log('recent products =========>', res.data);
        return res.data;
      })
      .catch(error => {
        ErrorToast(error);
      });
  },
);

export const getCompletedOrders = createAsyncThunk(
  'completedOrders',
  async (_, { getState }) => {
    const stateData = getState().userData;
    const token = stateData.token;
    return await axios
      .get(`${BASE_URL}/completed-orders`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        // console.log('completed orders =========>', res.data);
        // setCompleteLoader(false);
        return res.data;
      })
      .catch(error => {
        ErrorToast(error);
      });
  },
);

export const getActiveOrders = createAsyncThunk(
  'activeOrders',
  async (_, { getState }) => {
    const stateData = getState().userData;
    const token = stateData.token;
    return await axios
      .get(`${BASE_URL}/active-orders`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        return res.data;
      })
      .catch(error => {
        ErrorToast(error);
      });
  },
);

export const getProductDetails = createAsyncThunk(
  'productDetails',
  async ({ product_id, setLoad }, { getState }) => {
    const stateData = getState().userData;
    const token = stateData.token;
    return await axios
      .get(`${BASE_URL}/product/${product_id}/detail`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setLoad(false);
        return res.data;
      })
      .catch(error => {
        console.log('product detailssss error ============>', error);
        ErrorToast(error);
      });
  },
);

export const addProductinCart = createAsyncThunk('productCart', async data => {
  // console.log('from action =========>', data)
  return data;
});

export const HomeSlice = createSlice({
  name: 'ecommerce',
  initialState: {
    recentProducts: [],
    recent_error: '',
    productDetails: {},
    detail_loading: false,
    cart_product: [],
    cart_error: '',
    detail_error: '',
    pic_baseUrl: '',
    completedOrders: [],
    completedOrders_error: '',
    completedOrders_loading: false,
    activeOrders: [],
    activeOrders_error: '',
    activeOrders_loading: false,
  },
  extraReducers: builder => {
    builder.addCase(fetchRecentProducts.fulfilled, (state, action) => {
      state.recentProducts = action.payload.data;
      state.pic_baseUrl = action.payload.base_url;
    });
    builder.addCase(fetchRecentProducts.rejected, state => {
      state.recent_error = 'Some problem occured';
    });

    builder.addCase(getCompletedOrders.pending, state => {
      state.completedOrders_loading = true;
    });
    builder.addCase(getCompletedOrders.fulfilled, (state, action) => {
      state.completedOrders_loading = false;
      state.completedOrders = action.payload.data;
    });
    builder.addCase(getCompletedOrders.rejected, state => {
      state.recent_error = 'Some problem occured';
    });

    builder.addCase(getActiveOrders.pending, state => {
      state.activeOrders_loading = true;
    });
    builder.addCase(getActiveOrders.fulfilled, (state, action) => {
      state.activeOrders_loading = false;
      state.activeOrders = action.payload.data;
    });
    builder.addCase(getActiveOrders.rejected, state => {
      state.activeOrders_error = 'Some problem occured';
    });

    builder.addCase(getProductDetails.pending, state => {
      state.detail_loading = true;
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.detail_loading = false;
      state.productDetails[action.payload.data.id] = action.payload.data;
    });
    builder.addCase(getProductDetails.rejected, state => {
      (state.detail_loading = false),
        (state.detail_error = 'Some problem occured');
    });
    builder.addCase(addProductinCart.fulfilled, (state, action) => {
      state.cart_product = action.payload;
    });
    builder.addCase(addProductinCart.rejected, state => {
      state.cart_error = 'Error adding product in your cart';
    });
  },
});

export default HomeSlice.reducer;
