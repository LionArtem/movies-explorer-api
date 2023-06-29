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
    defaultValues(state, action) {
      console.log(action.payload);
      state.value = { name: action.payload.name, email: action.payload.email };
    },
    setValue(state, action) {
      const { value, name, errors, valid } = action.payload;
      state.value = { ...state.value, [name]: value };
      state.errors = { ...state.errors, [name]: errors };
      state.valid = valid;
    },
    // savedValues(state) {

    //   localStorage.setItem('email', state.value.email);
    // },
    resetValues(state) {
      state.value = {};
    },
    setValid(state) {
      state.valid = false;
    },
  },
});

export const selectformValidetion = (state) => state.formValidetion;

export const { setValue, resetValues, setValid, savedValues, defaultValues } =
  formValidetionSlice.actions;
export default formValidetionSlice.reducer;
