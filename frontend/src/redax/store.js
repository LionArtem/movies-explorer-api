import { configureStore } from '@reduxjs/toolkit';

import formValidetion from './slices/formValidetionSlice';
import auth from './slices/authSlice';
import movies from './slices/MoviesSlice';

export const store = configureStore({
  reducer: { formValidetion, auth, movies },
});
