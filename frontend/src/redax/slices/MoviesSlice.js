import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { moviesApi } from '../../utils/MoviesApi';

export const fetchGetAllMovies = createAsyncThunk(
  'page/fetchAddUser',
  async (params, thunkAPI) => {
    const data = await moviesApi.getAllMovies();
    return data;
  }
);

const initialState = {
  moviesAll:{}
};

const moviesSliceSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setLoggedIn(state) {
      state.loggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetAllMovies.pending, (state) => {
      console.log('запрос movies');
    });
    builder.addCase(fetchGetAllMovies.fulfilled, (state, { payload }) => {
    console.log(payload);
    });
    builder.addCase(fetchGetAllMovies.rejected, (state, action) => {
     console.log('error get movies');
    });
  },
});

export const selectMovies = (state) => state.auth;

export const {
  setLoggedIn,
  remuveErrMessage,
} = moviesSliceSlice.actions;
export default moviesSliceSlice.reducer;
