import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth } from '../../utils/Auth';

export const fetchGetUser = createAsyncThunk(
  'page/fetchGetUser',
  async (params, thunkAPI) => {
    const data = await auth.getUser(params.token);
    return data;
  }
);

export const fetchPatchUser = createAsyncThunk(
  'page/fetchPatchUser',
  async (params, thunkAPI) => {
    const { token, name, email } = params;
    const data = await auth.patchUser(token, name, email);
    return data;
  }
);

const initialState = {
  user: {},
  errRequest: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetErrRequest(state) {
      state.errRequest = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetUser.pending, (state) => {
      console.log('запрос данных профиля');
    });
    builder.addCase(fetchGetUser.fulfilled, (state, { payload }) => {
      state.user = {
        name: payload.name,
        email: payload.email,
      };
    });
    builder.addCase(fetchGetUser.rejected, (state, action) => {
      console.log('ошибка запроса данных профиля');
    });

    builder.addCase(fetchPatchUser.pending, (state) => {
      console.log('запрос данных профиля');
    });
    builder.addCase(fetchPatchUser.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.user = {
        name: payload.name,
        email: payload.email,
      };
    });
    builder.addCase(fetchPatchUser.rejected, (state, action) => {
      if (JSON.parse(action.error.message).error) {
        state.errRequest = `Ошибка: ${JSON.parse(action.error.message).error}`;
      } else {
        state.errRequest = JSON.parse(action.error.message).message;
      }
      console.log(JSON.parse(action.error.message).message);
      console.log('ошибка запроса данных профиля');
    });
  },
});

export const selectUser = (state) => state.user;

export const { setLoggedIn, remuveErrMessage, resetErrRequest } =
  userSlice.actions;
export default userSlice.reducer;
