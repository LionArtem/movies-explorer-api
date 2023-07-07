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
  valueSearch: '',
  showPreloader: false,
  swowNodFaund: false,
  textAnswer: false,
  stateTogl: false,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addAllMovies(state, action) {
      state.moviesAll = action.payload;
    },
    addStateTogl(state, action) {
      state.stateTogl = action.payload;
    },
    isStateTogl(state) {
      state.stateTogl = !state.stateTogl;
    },
    resetMoviesInPage(state, action) {
      state.moviesInPage = [];
    },
    setAddMoviesInPage(state, action) {
      if (window.innerWidth > 320) {
        state.moviesInPage = state.moviesAll.slice(0, 7);
      } else {
        state.moviesInPage = state.arrMovies.slice(0, 5);
      }
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
      const { togl, value } = JSON.parse(localStorage.getItem('defaultMovies'));
      localStorage.setItem(
        'defaultMovies',
        JSON.stringify({
          togl,
          value,
        })
      );
    },
    isErrText(state) {
      state.errorText = !state.errorText;
    },
    setValueSearch(state, action) {
      state.valueSearch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetAllMovies.pending, (state) => {
      console.log('запрос movies');
      state.showPreloader = !state.showPreloader;
    });
    builder.addCase(fetchGetAllMovies.fulfilled, (state, action) => {
      const arrMoviesSaved = action.payload.arrMoviesSaved;

      let moviesSearch = action.payload.data.filter((element) =>
        element.nameRU.toLowerCase().includes(state.valueSearch.toLowerCase())
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
      if (state.stateTogl) {
        state.moviesAll = arrMovies.filter((element) => element.duration <= 40);
      } else {
        state.moviesAll = arrMovies;
      }
      localStorage.setItem(
        'defaultMovies',
        JSON.stringify({
          togl: state.stateTogl,
          value: state.valueSearch,
        })
      );

      if (window.innerWidth > 320) {
        if (state.stateTogl) {
          state.moviesInPage = arrMovies
            .filter((element) => element.duration <= 40)
            .slice(0, 7);
        } else {
          state.moviesInPage = arrMovies.slice(0, 7);
        }
      } else {
        if (state.stateTogl) {
          state.moviesInPage = arrMovies
            .filter((element) => element.duration <= 40)
            .slice(0, 5);
        } else {
          state.moviesInPage = arrMovies.slice(0, 5);
        }
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
  setValueSearch,
  addLike,
  addMoviesInPage,
  setAddMoviesInPage,
  resetMoviesInPage,
  isStateTogl,
  addAllMovies,
  addStateTogl,
  addShortMovies,
} = moviesSlice.actions;
export default moviesSlice.reducer;
