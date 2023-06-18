import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn(state) {
      state.loggedIn = true;
    },
  },
});

export const selectAuth = (state) => state.auth;

//export const {  } = authSlice.actions;
export default authSlice.reducer;
