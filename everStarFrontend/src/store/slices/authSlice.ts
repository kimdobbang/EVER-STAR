// src/store/slices/authSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserInfo, UserInfo } from 'api/authApi';

interface AuthState {
  accessToken: string;
  userInfo: UserInfo | null;
  notifications: string[];
}

const initialState: AuthState = {
  accessToken: '',
  userInfo: null,
  notifications: [],
};

export const fetchUser = createAsyncThunk<UserInfo, string>(
  'auth/fetchUser',
  async (token: string) => {
    const userInfo = await fetchUserInfo(token);
    return userInfo;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    deleteToken: (state) => {
      state.accessToken = '';
    },
    deleteUser: (state) => {
      state.userInfo = null;
    },
    addNotification: (state, action: PayloadAction<string>) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      state.notifications.splice(action.payload, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    });
  },
});

export const { setToken, setUser, deleteToken, deleteUser, addNotification, removeNotification } =
  authSlice.actions;
export default authSlice.reducer;
