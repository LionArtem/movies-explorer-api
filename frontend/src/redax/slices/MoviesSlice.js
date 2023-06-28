import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { moviesApi } from '../../utils/MoviesApi';

export const fetchGetAllMovies = createAsyncThunk(
  'page/fetchGetAllMovies',
  async (params, thunkAPI) => {
    const data = await moviesApi.getAllMovies();
    const arrMoviesSaved = thunkAPI.getState().moviesSaved.moviesSaved;
    return { data, arrMoviesSaved };
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
    resetMoviesInPage(state, action) {
      state.moviesInPage = [];
    },
    setAddMoviesInPage(state, action) {
      state.moviesInPage = action.payload;
    },
    addMoviesInPage(state, action) {
      const lenghtListMovies = state.moviesInPage.length;
      const plusMore = lenghtListMovies + lenghtListMovies;
      state.moviesAll.slice(lenghtListMovies, plusMore).forEach((element) => {
        state.moviesInPage.push(element);
      });
    },
    addLike(state, action) {
      state.moviesInPage = action.payload;
      localStorage.setItem('moviesCard', JSON.stringify(action.payload));
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
    builder.addCase(fetchGetAllMovies.fulfilled, (state, action) => {
      console.log(action.payload.arrMoviesSaved);
      const arrMoviesSaved = action.payload.arrMoviesSaved;
      const moviesSearch = action.payload.data.filter((element) =>
        element.nameRU.toLowerCase().includes(state.value.toLowerCase())
      );
      const arrMovies = [];
      moviesSearch.forEach((element) => {
        let like;
        if (arrMoviesSaved.find((obj) => obj.movieId === element.id)) {
          like = true;
        } else {
          like = false;
        }
        arrMoviesSaved.find((obj) => obj.movieId === element.id);
        const discripshion = {
          country: element.country,
          director: element.director,
          duration: element.duration,
          year: element.year,
          description: element.description,
          image: `https://api.nomoreparties.co${element.image.url}`,
          trailerLink: element.trailerLink,
          nameRU: element.nameRU,
          nameEN: element.nameEN,
          thumbnail: `https://api.nomoreparties.co${element.image.url}`,
          movieId: element.id,
          like: like,
        };
        arrMovies.push(discripshion);
      });
      state.moviesAll = arrMovies;
      if (window.innerWidth > 320) {
        state.moviesInPage = arrMovies.slice(0, 7);
        localStorage.setItem(
          'moviesCard',
          JSON.stringify(arrMovies.slice(0, 7))
        );
      } else {
        state.moviesInPage = arrMovies.slice(0, 5);
      }
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

export const {
  isErrText,
  setValue,
  addLike,
  addMoviesInPage,
  setAddMoviesInPage,
  resetMoviesInPage
} = moviesSlice.actions;
export default moviesSlice.reducer;
