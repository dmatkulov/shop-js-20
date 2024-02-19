import { User, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { registerUser } from './usersThunk';

interface UsersState {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload: data }) => {
        state.registerLoading = false;
        state.user = data.user;
      })
      .addCase(registerUser.rejected, (state, { payload: error }) => {
        state.registerLoading = false;
        state.registerError = error || null;
      });
  },
});

export const usersReducer = usersSlice.reducer;

export const selectorUser = (state: RootState) => state.users.user;
export const selectorRegisterLoading = (state: RootState) =>
  state.users.registerLoading;
export const selectorRegisterError = (state: RootState) =>
  state.users.registerError;
