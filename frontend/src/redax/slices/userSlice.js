import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth } from '../../utils/Auth';

export const fetchGetUser = createAsyncThunk(
  'page/fetchGetUser',
  async (params, thunkAPI) => {
    const data = await auth.getUser();
    return data;
  }
);

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetUser.pending, (state) => {
      console.log('редоктирование профиля');
    });
    builder.addCase(fetchGetUser.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.user = {
        name: payload.name,
        email: payload.email,
      };
    });
    builder.addCase(fetchGetUser.rejected, (state, action) => {
      console.log('ошибка редоктирования');
    });
  },
});

export const selectUser = (state) => state.user;

export const { setLoggedIn, remuveErrMessage } = userSlice.actions;
export default userSlice.reducer;
