import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
  errors: {},
  valid: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setValue(state, action) {
      const { value, name, errors, valid } = action.payload;
      //console.log(value, name, errors);
      state.value = { ...state.value, [name]: value };
      state.errors = { ...state.errors, [name]: errors };
      state.valid = valid;
      // state.value = action.payload;
      // if (action.payload.length < 3) {
      //   state.nameInputError = 'имя должно быть более трёх символов';
      // } else {
      //   state.nameInputError = '';
      // }
    },
    resetValues(state) {
      state.value = {};
    },
  },
});

export const selectForm = (state) => state.form;

export const { setValue, resetValues } = formSlice.actions;
export default formSlice.reducer;
