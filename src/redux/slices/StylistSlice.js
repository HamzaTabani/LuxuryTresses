import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../constant.js';
import {ErrorToast} from '../../utils';
import FormData from 'form-data';
import {Alert} from 'react-native';

// export const getTopStylists = createAsyncThunk(
//   'topStylists',
//   async (_, {getState}) => {
//     const stateData = getState().userData;
//     const token = stateData.token;
//     try {
//       const response = await axios.get(`${BASE_URL}/top-stylist-profile`, {
//         headers: {
//           Accept: 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log('topStylists =============>', response.data.data);
//       return response.data.data;
//     } catch (error) {
//       console.log('top stylist error', error);
//       throw error; // Ensure the error is propagated
//     }
//   },
// );

export const getTopStylists = createAsyncThunk(
  'topStylists',
  async (setStylistData, {getState}) => {
    const stateData = getState().userData;
    const token = stateData.token;
    return await axios
      .get(`${BASE_URL}/top-stylist-profile`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        // console.log('topStylists =============>', res.data.data);
        setStylistData(res.data.data);
        return res.data;
      })
      .catch(error => {
        console.log('top stylist error', error);
        ErrorToast(error);
      });
  },
);

export const getRecentStylists = createAsyncThunk(
  'recentStylists',
  async (_, {getState}) => {
    const stateData = getState().userData;
    // console.log('stateData-->',stateData)
    const token = stateData.token;
    return await axios
      .get(`${BASE_URL}/recent-stylist-profile`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        // console.log('recentStylists =============>', res.data);
        return res.data;
      })
      .catch(error => {
        ErrorToast(error);
      });
  },
);

export const getPopularStylists = createAsyncThunk(
  'popularStylists',
  async (_, {getState}) => {
    const stateData = getState().userData;
    // console.log('stateData-->',stateData)
    const token = stateData.token;
    return await axios
      .get(`${BASE_URL}/popular-stylist-profile`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        // console.log('popularStylists =============>', res.data);
        return res.data;
      })
      .catch(error => {
        ErrorToast(error);
      });
  },
);

export const stylistProfileById = createAsyncThunk(
  'profileDetails',
  async (id, {getState}) => {
    const stateData = getState().userData;
    const token = stateData.token;
    //  return Alert.alert('hello world');

    let abc = await axios
      .get(`${BASE_URL}/stylist-profile/${id}/detail`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        // console.log('stylist profile detail =============>', res.data.data);
        // setProfiledetail(res.data.data);
        return res.data;
      })
      .catch(error => {
        ErrorToast(error);
      });
    return abc;
  },
);

export const getServiceById = createAsyncThunk(
  'serviceById',
  async (serviceId, {getState}) => {
    const stateData = getState().userData;
    const token = stateData.token;
    //  return Alert.alert('hello world');
    console.log('serviceId=-->', serviceId);

    let abc = await axios
      .get(`${BASE_URL}/search-by-service/${serviceId}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log('getServiceById response =============>', res.data.data);
        // setProfiledetail(res.data.data);
        return res.data;
      })
      .catch(error => {
        console.log('getServiceById error-=->',error)
        // ErrorToast(error);
      });
    return abc;
  },
);

export const getAllServices = createAsyncThunk(
  'allServices',
  async (setStylistServices, {getState}) => {
    const stateData = getState().userData;
    const token = stateData.token;
    //  return Alert.alert('hello world');

    // let abc = await axios
    return await axios
      .get(`${BASE_URL}/get-all-services`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        // console.log('getAllServices response =============>', res.data.data);
        setStylistServices(res.data.data);
        return res.data;
      })
      .catch(error => {
        console.log('getAllServices error-=-=>', error);
        ErrorToast(error);
      });
    // return abc;
  },
);

export const stylistReviewById = createAsyncThunk(
  'stylistReview',
  async (stylist_id, {getState}) => {
    const stateData = getState().userData;
    const token = stateData.token;
    console.log('stylist_id: ', stylist_id);

    return await axios
      .get(`${BASE_URL}/stylist-profile/${stylist_id}/review`, {
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

export const trendingStylists = createAsyncThunk(
  'trending',
  async (_, {getState}) => {
    const stateData = getState().userData;
    const token = stateData.token;

    return await axios
      .get(`${BASE_URL}/trending-stylist-profile`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        // console.log('trending stylists response ============>', res.data);
        return res.data;
      })
      .catch(error => {
        ErrorToast(error);
      });
  },
);

export const getNearbyStylists = createAsyncThunk(
  'nearbyStylists',
  async ({lat, long}, {getState}) => {
    const stateData = getState().userData;
    const token = stateData.token;

    console.log('latttt', lat, long);

    return await axios
      .get(`${BASE_URL}/near-by-stylists?latitude=${lat}&longitude=${long}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log('nearbyStylists res ============>', res.data);
        return res.data;
      })
      .catch(error => {
        ErrorToast(error);
      });
  },
);

export const Appointment = createAsyncThunk(
  'appointment',
  async (
    {stylist_id, service_id, appointment_date, no_of_guests},
    {getState},
  ) => {
    const stateData = getState().userData;
    const token = stateData.token;

    var data = new FormData();

    // console.log('attributes',data)

    data.append('service_provider_id', stylist_id);
    data.append('service_id', service_id);
    data.append('appointment_date', appointment_date);
    data.append('no_of_guests', no_of_guests);

    return await axios
      .post(`${BASE_URL}/appointment`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        return res.data;
      })
      .catch(error => {
        console.log('appointment error =========>', error);
      });
  },
);

export const PostReview = createAsyncThunk(
  'review',
  async ({userId, userRating, userComment}, {getState}) => {
    const stateData = getState().userData;
    const token = stateData.token;

    var data = new FormData();

    data.append('rating', userRating);
    data.append('comment', userComment);

    return await axios
      .post(`${BASE_URL}/stylist-profile/${userId}/review`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        return res.data;
      })
      .catch(error => {
        console.log('PostReview error =========>', error);
      });
  },
);

export const StylistSlice = createSlice({
  name: 'stylistDetails',
  initialState: {
    topStylists: [],
    recentStylists: [],
    popularStylists: [],
    loading: false,
    topStylist_error: '',
    recentStylist_error: '',
    popularStylist_error: '',
    stylistDetail: {},
    stylistDetail_error: '',
    stylistDetail_loading: false,
    stylistReview: [],
    stylistReview_error: '',
    stylistReview_loading: true,

    profileDetails: null,
    profileDetails_error: '',
    profileDetails_loading: true,

    trending_stylists: [],
    trending_loader: false,
    trending_error: '',
    nearbyStylists: {},
    nearbyStylists_loader: true,
    appointment_loader: false,

    allServices: {},
    serviceById: {},
  },
  extraReducers: builders => {
    builders.addCase(getTopStylists.pending, state => {
      state.loading = true;
    });
    builders.addCase(getTopStylists.fulfilled, (state, action) => {
      state.loading = false;
      state.topStylists = action.payload.data;
    });
    builders.addCase(getTopStylists.rejected, state => {
      (state.topStylist_error = 'Some problem occured'),
        (state.loading = false);
    });

    builders.addCase(getRecentStylists.pending, state => {
      state.loading = true;
    });
    builders.addCase(getRecentStylists.fulfilled, (state, action) => {
      state.loading = false;
      state.recentStylists = action.payload.data;
    });
    builders.addCase(getRecentStylists.rejected, state => {
      (state.recentStylist_error = 'Some problem occured'),
        (state.loading = false);
    });

    builders.addCase(getPopularStylists.pending, state => {
      state.loading = true;
    });
    builders.addCase(getPopularStylists.fulfilled, (state, action) => {
      state.loading = false;
      state.popularStylists = action.payload.data;
    });
    builders.addCase(getPopularStylists.rejected, state => {
      (state.popularStylist_error = 'Some problem occured'),
        (state.loading = false);
    });

    builders.addCase(stylistProfileById.pending, state => {
      state.profileDetails_loading = true;
    });
    builders.addCase(stylistProfileById.fulfilled, (state, action) => {
      state.profileDetails_loading = false;
      // (state.profileDetails = action.payload.data);
      // console.log('action.payload.data=-=-=>', action.payload.data);
    });
    builders.addCase(stylistProfileById.rejected, state => {
      (state.profileDetails_error = 'Some problem occured'),
        (state.profileDetails_loading = false);
    });

    builders.addCase(stylistReviewById.pending, state => {
      state.stylistReview_loading = true;
    });
    builders.addCase(stylistReviewById.fulfilled, (state, action) => {
      // (state.stylistReview_loading = false),
      // (state.stylistReview[action.payload.data.id] = action.payload.data);
      state.stylistReview_loading = false;
      state.stylistReview = action.payload.data;
      // console.log('action.payload.data.id:=-=',action.payload.data)
      // Alert.alert(state.stylistReview)
    });
    builders.addCase(stylistReviewById.rejected, state => {
      (state.stylistReview_error = 'Some problem occured'),
        (state.stylistReview_loading = false);
    });

    builders.addCase(trendingStylists.pending, state => {
      state.trending_loader = true;
    });
    builders.addCase(trendingStylists.fulfilled, (state, action) => {
      (state.trending_stylists = action.payload.data),
        (state.trending_loader = false);
    });
    builders.addCase(trendingStylists.rejected, state => {
      (state.trending_loader = false),
        (state.trending_error = 'Some problem occured');
    });
    builders.addCase(getNearbyStylists.pending, state => {
      state.nearbyStylists_loader = true;
    });
    builders.addCase(getNearbyStylists.fulfilled, (state, action) => {
      state.nearbyStylists_loader = false;
      state.nearbyStylists = action.payload.data;
      console.log('redux state', action.payload.data);
    });
    builders.addCase(Appointment.pending, state => {
      state.appointment_loader = true;
    });
    builders.addCase(Appointment.fulfilled, state => {
      state.appointment_loader = false;
    });
  },
});

export default StylistSlice.reducer;
