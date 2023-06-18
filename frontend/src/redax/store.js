import { configureStore } from '@reduxjs/toolkit';

import auth from './slices/authSlice';
import form from './slices/formSlice';

export const store = configureStore({
  reducer: { auth, form },
});
