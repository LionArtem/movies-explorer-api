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
  answerRequest: '',
  succsesAnswer: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    killAllStateUser(state) {
      state.user = {};
      state.answerRequest = '';
      state.succsesAnswer = false;
    },
    resetAnswerRequest(state) {
      state.errRequest = '';
      state.answerRequest = false;
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
      alert('ошибка запроса данных профиля');
    });

    builder.addCase(fetchPatchUser.pending, (state) => {
      console.log('запрос данных профиля');
    });
    builder.addCase(fetchPatchUser.fulfilled, (state, { payload }) => {
      state.user = {
        name: payload.name,
        email: payload.email,
      };
      state.succsesAnswer = true;
      state.answerRequest = 'Данные пользователя изменены успешно';
    });
    builder.addCase(fetchPatchUser.rejected, (state, action) => {
      if (JSON.parse(action.error.message).error) {
        state.answerRequest = `Ошибка: ${
          JSON.parse(action.error.message).error
        }`;
      } else {
        state.answerRequest = JSON.parse(action.error.message).message;
      }
      console.log('ошибка запроса данных профиля');
    });
  },
});

export const selectUser = (state) => state.user;

export const {
  setLoggedIn,
  remuveErrMessage,
  resetAnswerRequest,
  killAllStateUser,
} = userSlice.actions;
export default userSlice.reducer;
