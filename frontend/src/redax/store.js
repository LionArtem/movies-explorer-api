import { configureStore } from '@reduxjs/toolkit';

import formValidetion from './slices/formValidetionSlice';
import auth from './slices/authSlice';
import movies from './slices/MoviesSlice';
import moviesSaved from './slices/MoviesSavedSlice';

export const store = configureStore({
  reducer: { formValidetion, auth, movies, moviesSaved },
});
