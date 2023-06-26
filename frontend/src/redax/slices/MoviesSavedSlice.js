import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mainApi } from '../../utils/MainApi';

export const fetchAddMovies = createAsyncThunk(
  'page/fetchAddMovies',
  async (params, thunkAPI) => {
    const data = await mainApi.addMovies(params);
    return data;
  }
);

export const fetchGatSavedMovies = createAsyncThunk(
  'page/fetchGatSavedMovies',
  async (params, thunkAPI) => {
    const data = await mainApi.getSavedMovies(params);
    return data;
  }
);

const initialState = {
  moviesSaved: [],
};

const moviesSavedSlice = createSlice({
  name: 'moviesSaved',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAddMovies.pending, (state) => {
      console.log('add movies');
    });
    builder.addCase(fetchAddMovies.fulfilled, (state, { payload }) => {
      console.log(payload);
    });
    builder.addCase(fetchAddMovies.rejected, (state, action) => {
      console.log(action);
      console.log('error add movies');
    });

    builder.addCase(fetchGatSavedMovies.pending, (state) => {
      console.log('get saved movies');
    });
    builder.addCase(fetchGatSavedMovies.fulfilled, (state, { payload }) => {
      //console.log(payload);
      state.moviesSaved = payload;
    });
    builder.addCase(fetchGatSavedMovies.rejected, (state, action) => {
      console.log(action);
      console.log('error get saved movies');
    });
  },
});

export const selectSavedMovies = (state) => state.moviesSaved;

export const { moviesSaved } = moviesSavedSlice.actions;
export default moviesSavedSlice.reducer;
