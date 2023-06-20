import { configureStore } from '@reduxjs/toolkit';

import registration from './slices/registrationSlice';
import formValidetion from './slices/formValidetionSlice';

export const store = configureStore({
  reducer: { registration, formValidetion },
});
