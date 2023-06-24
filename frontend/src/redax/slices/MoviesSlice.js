import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { moviesApi } from '../../utils/MoviesApi';

export const fetchGetAllMovies = createAsyncThunk(
  'page/fetchGetAllMovies',
  async (params, thunkAPI) => {
    const data = await moviesApi.getAllMovies();
    return data;
  }
);

const initialState = {
  moviesAll: [],
  errorText: true,
  value: '',
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    isErrText(state) {
      state.errorText = !state.errorText;
    },
    setValue(state, action) {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetAllMovies.pending, (state) => {
      console.log('запрос movies');
    });
    builder.addCase(fetchGetAllMovies.fulfilled, (state, { payload }) => {
      console.log(state.value);
      console.log(payload);
      console.log(
        payload.filter((element) =>
          element.nameRU.toLowerCase().includes(state.value.toLowerCase())
        )
      );
      state.moviesAll = payload.filter((element) =>
        element.nameRU.toLowerCase().includes(state.value.toLowerCase())
      );
    });
    builder.addCase(fetchGetAllMovies.rejected, (state, action) => {
      console.log('error get movies');
    });
  },
});

export const selectMovies = (state) => state.movies;

export const { isErrText, setValue } = moviesSlice.actions;
export default moviesSlice.reducer;
