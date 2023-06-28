import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth } from '../../utils/Auth';

export const fetchAddUser = createAsyncThunk(
  'page/fetchAddUser',
  async (params, thunkAPI) => {
    const { formValidetion } = thunkAPI.getState();
    const { name, email, password } = formValidetion.value;
    const data = await auth.addUser(name, email, password);
    return data;
  }
);

export const fetchLoginUser = createAsyncThunk(
  'page/fetchLoginUser',
  async (params, thunkAPI) => {
    const { formValidetion } = thunkAPI.getState();
    const { email, password } = formValidetion.value;
    const data = await auth.loginUser(email, password);
    return data;
  }
);

const initialState = {
  loggedIn: false,
  errMessage: '',
  user: {},
  textButtonRegister: 'Зарегистрироваться',
  textButtonLogin: 'Войти',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn(state) {
      state.loggedIn = true;
    },
    remuveErrMessage(state) {
      state.errMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddUser.pending, (state) => {
      state.textButtonRegister = 'Регистрация...';
      console.log('запрос на регистрацию');
    });
    builder.addCase(fetchAddUser.fulfilled, (state, { payload }) => {
      state.user = { name: payload.name, email: payload.email };
      state.loggedIn = true;
      state.textButtonRegister = 'Регистрация';
    });
    builder.addCase(fetchAddUser.rejected, (state, action) => {
      state.errMessage = JSON.parse(action.error.message).message;
      state.textButtonRegister = 'Регистрация';
    });

    builder.addCase(fetchLoginUser.pending, (state) => {
      state.textButtonLogin = 'Вход...';
      console.log('авторизация');
    });
    builder.addCase(fetchLoginUser.fulfilled, (state, action) => {
      
      localStorage.setItem('token', action.payload.token);
      state.user = { name: action.payload.name, email: action.payload.email };
      state.loggedIn = true;
      state.textButtonLogin = 'Войти';
      console.log(localStorage.getItem('token'));
    });
    builder.addCase(fetchLoginUser.rejected, (state, action) => {
      state.errMessage = JSON.parse(action.error.message).message;
      state.textButtonLogin = 'Войти';
    });
  },
});

export const selectAuth = (state) => state.auth;

export const {
  setLoggedIn,
  remuveErrMessage,
} = authSlice.actions;
export default authSlice.reducer;
