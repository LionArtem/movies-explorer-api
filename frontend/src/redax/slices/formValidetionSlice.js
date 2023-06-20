import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
  errors: {},
  valid: false,
};

const formValidetionSlice = createSlice({
  name: 'formValidetion',
  initialState,
  reducers: {
    setValue(state, action) {
      const { value, name, errors, valid } = action.payload;
      state.value = { ...state.value, [name]: value };
      state.errors = { ...state.errors, [name]: errors };
      state.valid = valid;
    },
    resetValues(state) {
      state.value = {};
    },
    setValid(state) {
      state.valid = false;
    },
  },
});

export const selectformValidetion = (state) => state.formValidetion;

export const { setValue, resetValues, setValid } = formValidetionSlice.actions;
export default formValidetionSlice.reducer;
