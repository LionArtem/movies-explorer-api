import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  errMessage: '',
  user: {},
  textButton: 'Зарегистрироваться',
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setLoggedIn(state) {
      state.loggedIn = true;
    },
    addErrMessage(state, action) {
      state.errMessage = action.payload;
    },
    remuveErrMessage(state) {
      state.errMessage = '';
    },
    setTextButton(state, action) {
      state.textButton = action.payload;
    },
    addUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const selectRegistration = (state) => state.registration;

export const {
  addErrMessage,
  setTextButton,
  addUser,
  setLoggedIn,
  remuveErrMessage,
} = registrationSlice.actions;
export default registrationSlice.reducer;
