import { configureStore } from '@reduxjs/toolkit';

import formValidetion from './slices/formValidetionSlice';

import auth from './slices/authSlice';

export const store = configureStore({
  reducer: { formValidetion, auth },
});
