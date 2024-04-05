import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ErrorToast, ShowToast} from '../../utils';
import {BASE_URL} from '../constant.js';
import axios from 'axios';

var formData = require('form-data');

export const STRIPE_KEY =
  'pk_test_51JALRfB7jkIJnWKxOqpPPz0kO8JUONib6u2FFsp4ZtASuMxlzDYnoPq7BC7Yekm8DIUQh9ACseyY0sn286dAg5DM00AQ0xCDSt';

export const register = createAsyncThunk(
  'signup',
  async ({
    first_name,
    last_name,
    phone_number,
    email,
    password,
    address,
    profile_pic,
    state,
    city,
    firebase_id
  }) => {
    let data = new formData();
    data.append('first_name', first_name);
    data.append('last_name', last_name);
    data.append('phone_number', phone_number);
    data.append('email', email);
    data.append('password', password);
    data.append('firebase_id', firebase_id);
    if (profile_pic) {
      data.append('profile_pic', {
        name: 'image.jpg',
        type: 'image/jpeg',
        uri:
          Platform.OS === 'android'
            ? profile_pic
            : profile_pic.replace('file://', ''),
      });
    }

    // console.log('dataaa', data);

    return await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    })
      .then(async res => {
        let user = await res.json();
        // console.log('signuppppppp response =============>', user);
        if (user.success) {
          ShowToast('Account created successfully');
        }
        return user;
      })
      .catch(error => {
        console.log('signuppppp error ==============>', error);
      });
  },
);

export const login = createAsyncThunk(
  'signin',
  async ({email, password, uId, providerId, firstName, lastName}) => {
    var data = new formData();
    if (uId != undefined) {
      data.append('email', email);
      data.append('uid', uId);
      data.append('provider_id', providerId);
      data.append('first_name', firstName);
      data.append('last_name', lastName);
    } else {
      data.append('email', email);
      data.append('password', password);
    }

    return await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    })
      .then(async res => {
        let data = await res.json();
        // console.log('login response ============>', data);
        if (data.success) {
          ShowToast('Login successfully');
        } else {
          ShowToast(data.message);
          // console.log(data.message);
        }
        return data;
      })
      .catch(error => {
        console.log('login error ================>', error);
      });
  },
);

export const editProfile = createAsyncThunk(
  'updateProfile',
  async (
    {first_name, last_name, phone_number, address, state, city, profile_pic},
    {getState},
  ) => {
    const stateData = getState().userData;
    const token = stateData.token;

    var data = new formData();

    data.append('first_name', first_name);
    data.append('last_name', last_name);
    data.append('phone_number', phone_number);
    data.append('address', address);
    data.append('state', state);
    data.append('city', city);
    if (profile_pic) {
      data.append('profile_pic', {
        name: 'image.jpg',
        type: 'image/jpeg',
        uri:
          Platform.OS === 'android'
            ? profile_pic
            : profile_pic.replace('file://', ''),
      });

      return await fetch(`${BASE_URL}/update-profile`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      })
        .then(async res => {
          let updatedData = await res.json();
          // console.log('edit response ===================>', updatedData.data);
          if (updatedData.data.success) {
            return true;
          }
          return updatedData;
        })
        .catch(error => {
          ErrorToast(error);
          return false;
        });
    }
  },
);

export const changePassword = createAsyncThunk(
  'passwordChange',
  async ({current_password, new_password}, {getState}) => {
    const stateData = getState().userData;
    const token = stateData.token;
    // console.log('tokennn', token)

    var data = new formData();
    data.append('current_password', current_password),
      data.append('new_password', new_password);

    return await fetch(`${BASE_URL}/change-password`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    })
      .then(async res => {
        let response = await res.json();
        // console.log('change password response ================>', response);
        if (response.success) {
          ShowToast(response.message);
          return response.success;
        } else {
          ShowToast(response.message);
          return response.success;
        }
      })
      .catch(error => {
        ErrorToast(error);
        return false;
      });
  },
);

export const generateOTP = createAsyncThunk('verifyEmail', async email => {
  var data = new formData();

  data.append('email', email);

  return await axios
    .post(`${BASE_URL}/forget-password-email`, data, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => {
      // console.log('forgetpassword response ===========>', res.data);
      return res.data;
    })
    .catch(error => {
      ErrorToast(error);
    });
});

export const verifyCode = createAsyncThunk('verifyCode', async ({code, id}) => {
  var data = new formData();

  data.append('code', code);
  data.append('id', id);
  return await axios
    .post(`${BASE_URL}/check-forget-password-code`, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => {
      // console.log('verifyCode res =========>', res.data);
      return res.data;
    })
    .catch(error => {
      ErrorToast(error);
    });
});

export const logoutUser = createAsyncThunk('logout/authUser', async () => {
  try {
    return true;
  } catch (error) {
    ErrorToast(error);
    return false;
  }
});

export const updateForgetPassword = createAsyncThunk(
  'updatePasswprd',
  async ({id, password}) => {
    var data = new formData();

    data.append('id', id);
    data.append('password', password);

    return await axios
      .post(`${BASE_URL}/update-forget-password`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        // console.log('update password response ============>', res.data);
        return res.data;
      })
      .catch(error => {
        ErrorToast(error);
      });
  },
);

export const Payment = createAsyncThunk(
  'pay',
  async ({product, total, note, stripe_token}, {getState}) => {
    const stateData = getState().userData;
    const token = stateData.token;

    let payload = {
      order: {
        products: product,
        grand_total: total,
        note: note,
        stripeToken: stripe_token,
      },
    };

    return await axios
      .post(`${BASE_URL}/order`, payload, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        // console.log('payment res ================>', res.data);
        return res.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
);

export const createCard = createAsyncThunk('card', async data => {
  return data;
});
export const postLatLng = createAsyncThunk('latlong', async data => {
  return data;
});

export const authState = createSlice({
  name: 'userAuth',
  initialState: {
    signup_loading: false,
    signin_loading: false,
    edit_loading: false,
    change_loading: false,
    forget_password_loading: false,
    otpcode_loading: false,
    update_loading: false,
    token: '',
    pic_url: '',
    user: {},
    card: [],
    latLng: {},
    latLng_loading: false,
    payment_loading: false,
  },
  extraReducers: builder => {
    builder.addCase(register.pending, state => {
      state.signup_loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.signup_loading = false;
      state.user = action.payload.user;
      (state.token = action.payload.token),
        (state.pic_url = action.payload.profile_url);
    });
    builder.addCase(login.pending, state => {
      state.signin_loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.signin_loading = false;
      // console.log('why yar', action.payload);
      state.user = action.payload.user;
      (state.token = action.payload.token),
        (state.pic_url = action.payload.profile_url);
    });
    builder.addCase(editProfile.pending, state => {
      state.edit_loading = true;
    });
    builder.addCase(editProfile.fulfilled, (state, action) => {
      (state.edit_loading = false), (state.user = action.payload.data);
    });
    builder.addCase(changePassword.pending, state => {
      state.change_loading = true;
    });
    builder.addCase(changePassword.fulfilled, state => {
      state.change_loading = false;
    });
    builder.addCase(generateOTP.pending, state => {
      state.forget_password_loading = true;
    });
    builder.addCase(generateOTP.fulfilled, state => {
      state.forget_password_loading = false;
    });
    builder.addCase(logoutUser.fulfilled, state => {
      (state.token = ''), (state.user = {}), (state.pic_url = '');
    });
    builder.addCase(verifyCode.pending, state => {
      state.otpcode_loading = true;
    });
    builder.addCase(verifyCode.fulfilled, state => {
      state.otpcode_loading = false;
    });
    builder.addCase(updateForgetPassword.pending, state => {
      state.update_loading = true;
    });
    builder.addCase(updateForgetPassword.fulfilled, state => {
      state.update_loading = false;
    });
    builder.addCase(Payment.pending, state => {
      state.payment_loading = true;
    });
    builder.addCase(Payment.fulfilled, state => {
      state.payment_loading = false;
    });
    builder.addCase(Payment.rejected, state => {
      state.payment_loading = false;
    });
    builder.addCase(createCard.fulfilled, (state, action) => {
      state.card = action.payload;
    });
    builder.addCase(postLatLng.pending, state => {
      state.latLng_loading = true;
    });
    builder.addCase(postLatLng.fulfilled, (state, action) => {
      (state.latLng_loading = false),(state.latLng = action.payload);
      // console.log('action.payload', action.payload);
    });
  },
});

export default authState.reducer;
