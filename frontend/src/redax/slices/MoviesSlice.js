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
  moviesInPage: [],
  errorText: true,
  value: '',
  showPreloader: false,
  swowNodFaund: false,
  textAnswer: false,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMoviesInPage(state, action) {
      const lenghtListMovies = state.moviesInPage.length;
      const plusMore = lenghtListMovies + 7;
      state.moviesAll.slice(lenghtListMovies, plusMore).forEach((element) => {
        state.moviesInPage.push(element);
      });
    },
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
      state.showPreloader = !state.showPreloader;
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
      state.moviesInPage = arrMovies.slice(0, 7);
      state.showPreloader = !state.showPreloader;
      if (arrMovies >= 0) {
        state.swowNodFaund = !state.swowNodFaund;
        state.textRezult = 'Не чего не найдено';
      }
    });
    builder.addCase(fetchGetAllMovies.rejected, (state, action) => {
      state.showPreloader = !state.showPreloader;
      state.textAnswer = !state.textAnswer;
      console.log('error get movies');
    });
  },
});

export const selectMovies = (state) => state.movies;

export const { isErrText, setValue, addLike, addMoviesInPage } =
  moviesSlice.actions;
export default moviesSlice.reducer;
