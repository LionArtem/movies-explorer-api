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
    addLike(state, action) {
      state.moviesAll = action.payload;
    },
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
      const moviesSearch = payload.filter((element) =>
        element.nameRU.toLowerCase().includes(state.value.toLowerCase())
      );
      const arrMovies = [];
      moviesSearch.forEach((element) => {
        const discripshion = {
          country: element.country,
          director: element.director,
          duration: element.duration,
          year: element.year,
          description: element.description,
          image: element.image.url,
          trailerLink: element.trailerLink,
          nameRU: element.nameRU,
          nameEN: element.nameEN,
          thumbnail: element.image.previewUrl,
          movieId: element.id,
          like: false,
        };
        arrMovies.push(discripshion);
      });
      state.moviesAll = arrMovies;
    });
    builder.addCase(fetchGetAllMovies.rejected, (state, action) => {
      console.log('error get movies');
    });
  },
});

export const selectMovies = (state) => state.movies;

export const { isErrText, setValue, addLike } = moviesSlice.actions;
export default moviesSlice.reducer;
