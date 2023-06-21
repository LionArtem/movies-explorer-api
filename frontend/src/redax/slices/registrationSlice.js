import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth } from '../../utils/Auth';

export const fetchAddUser = createAsyncThunk(
  'page/fetchAddUser',
  async (params, thunkAPI) => {
    const { formValidetion } = thunkAPI.getState();
    const { name, email, password } = formValidetion.value;
    //console.log(name, email, password);
    const data = await auth.addUser(name, email, password);
    return data;
  }
);

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
    // setLoggedIn(state) {
    //   state.loggedIn = true;
    // },
    // addErrMessage(state, action) {
    //   state.errMessage = action.payload;
    // },
    remuveErrMessage(state) {
      state.errMessage = '';
    },
    setTextButton(state, action) {
      state.textButton = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddUser.pending, (state) => {
      console.log('запрос на регистрацию');
    });
    builder.addCase(fetchAddUser.fulfilled, (state, { payload }) => {
      state.user = { name: payload.name, email: payload.email };
      state.loggedIn = true;
    });
    builder.addCase(fetchAddUser.rejected, (state, action) => {
      state.errMessage = JSON.parse(action.error.message).message;
      console.log(JSON.parse(action.error.message).message);
    });
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
