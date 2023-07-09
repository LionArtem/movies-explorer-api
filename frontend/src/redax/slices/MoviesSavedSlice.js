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

export const fetchDeleteSavedMovies = createAsyncThunk(
  'page/fetchDeleteSavedMovies',
  async (params, thunkAPI) => {
    const data = await mainApi.deleteSaveMovies(params);
    return data;
  }
);

const initialState = {
  swowNodFaund: false,
  showPreloader: false,
  textAnswer: false,
  moviesSaved: [],
  valueSearch: '',
  errorText: true,
  stateTogl: false,
};

const moviesSavedSlice = createSlice({
  name: 'moviesSaved',
  initialState,
  reducers: {
    killAllStateMoviesSaved(state) {
      state.moviesSaved = [];
      state.valueSearch = '';
      state.errorText = true;
      state.stateTogl = false;
      state.swowNodFaund = false;
      state.showPreloader = false;
      state.textAnswer = false;
    },
    isStateTogl(state) {
      state.stateTogl = !state.stateTogl;
    },
    isErrText(state) {
      state.errorText = !state.errorText;
    },
    setValueSearch(state, action) {
      state.valueSearch = action.payload;
    },
    findSearchMovies(state) {
      state.moviesSaved = JSON.parse(
        localStorage.getItem('savedMovies')
      ).filter((element) =>
        element.nameRU.toLowerCase().includes(state.valueSearch.toLowerCase())
      );
      if (state.stateTogl) {
        state.moviesSaved = state.moviesSaved.filter(
          (element) => element.duration <= 40
        );
      }
      if (state.moviesSaved <= 0) {
        state.swowNodFaund = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddMovies.pending, (state) => {
      console.log('add movies');
    });
    builder.addCase(fetchAddMovies.fulfilled, (state, { payload }) => {});
    builder.addCase(fetchAddMovies.rejected, (state, action) => {
      console.log('error add movies');
      alert('error add movies');
    });

    builder.addCase(fetchGatSavedMovies.pending, (state) => {
      state.swowNodFaund = false;
      state.showPreloader = !state.showPreloader;
      console.log('get saved movies');
    });
    builder.addCase(fetchGatSavedMovies.fulfilled, (state, { payload }) => {
      if (state.stateTogl) {
        state.moviesSaved = payload.filter((element) => element.duration <= 40);
      } else {
        state.moviesSaved = payload;
      }
      if (state.moviesSaved <= 0) {
        state.swowNodFaund = true;
      }
      state.showPreloader = !state.showPreloader;
    });
    builder.addCase(fetchGatSavedMovies.rejected, (state, action) => {
      state.showPreloader = false;
      console.log('error get saved movies');
      alert('error get saved movies');
    });

    builder.addCase(fetchDeleteSavedMovies.pending, (state) => {
      state.showPreloader = true;
      console.log('delete saved movies');
    });
    builder.addCase(fetchDeleteSavedMovies.fulfilled, (state, { payload }) => {
      state.showPreloader = false;
      const arrNewSavedMovies = [];
      state.moviesSaved.forEach((element) => {
        if (element.movieId === payload.movieId) {
        } else {
          arrNewSavedMovies.push(element);
        }
      });
      state.moviesSaved = arrNewSavedMovies;
    });
    builder.addCase(fetchDeleteSavedMovies.rejected, (state, action) => {
      state.textAnswer = true;
      console.log('error delete saved movies');
      alert('error delete saved movies');
    });
  },
});

export const selectSavedMovies = (state) => state.moviesSaved;

export const {
  findSearchMovies,
  setValueSearch,
  isErrText,
  isStateTogl,
  killAllStateMoviesSaved,
} = moviesSavedSlice.actions;
export default moviesSavedSlice.reducer;
