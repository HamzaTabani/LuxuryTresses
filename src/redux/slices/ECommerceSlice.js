import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../constant.js';
import {ErrorToast} from '../../utils/index.js';

export const fetchRecentProducts = createAsyncThunk(
  'recentProducts',
  async (_, {getState}) => {
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

export const getProductDetails = createAsyncThunk(
  'productDetails',
  async (product_id, {getState}) => {
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
        // console.log('product detailssss response ============>', res.data);
        return res.data;
      });
  },
);

export const addProductinCart = createAsyncThunk('productCart', async data => {
  // console.log('from action =========>', data)
  return data;
});

export const Payment = createAsyncThunk(
  'pay',
  async ({product, total, note, stripe_token}, {getState}) => {
    const stateData = getState().userData;
    const token = stateData.token;

    let payload = {
      order: {
        product: product,
        grand_total: total,
        note: note,
        stripeToken: stripe_token,
      },
    };

    return await axios.post(`${BASE_URL}/order`);
  },
);

export const HomeSlice = createSlice({
  name: 'ecommerce',
  initialState: {
    recentProducts: [],
    recent_error: '',
    productDetails: {},
    detail_loading: false,
    payment_loading: false,
    payment_error: '',
    cart_product: [],
    cart_error: '',
    detail_error: '',
  },
  extraReducers: builder => {
    builder.addCase(fetchRecentProducts.fulfilled, (state, action) => {
      state.recentProducts = action.payload.data;
    });
    builder.addCase(fetchRecentProducts.rejected, state => {
      state.recent_error = 'Some problem occured';
    });
    builder.addCase(getProductDetails.pending, state => {
      state.detail_loading = true;
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      (state.detail_loading = false),
        (state.productDetails = action.payload.data);
    });
    builder.addCase(getProductDetails.rejected, state => {
      (state.detail_loading = false),
        (state.detail_error = 'Some problem occured');
    });
    builder.addCase(addProductinCart.fulfilled, (state, action) => {
      // console.log('cart state ========>', action.payload);
      state.cart_product = action.payload;
    });
    builder.addCase(addProductinCart.rejected, state => {
      state.cart_error = 'Error adding product in your cart';
    });
    builder.addCase(Payment.pending, state => {
      state.payment_loading = true;
    });
    builder.addCase(Payment.fulfilled, state => {
      state.payment_loading = false;
    });
    builder.addCase(Payment.rejected, state => {
      (state.payment_loading = false),
        (state.payment_error = 'Some problem occured');
    });
  },
});

export default HomeSlice.reducer;
