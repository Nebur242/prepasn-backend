/* eslint-disable @typescript-eslint/no-explicit-any */
import { Status } from '@prepa-sn/shared/enums';
import { LoginDto } from '../../../pages/auth/login.page';
import {
  authUser,
  logInFirebaseWithEmailAndPassword,
} from '../../../services/auth/auth.service';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setUser } from '../user/userSlice';

export interface AuthInitialState {
  isLoggedIn: boolean;
  loading: boolean;
  error: string;
  status: Status.PENDING | Status.SUCCESS | Status.ERROR;
  login: {
    loading: boolean;
    error: string;
    status: Status.PENDING | Status.SUCCESS | Status.ERROR;
  };
}

const initialState: AuthInitialState = {
  isLoggedIn: false,
  loading: true,
  error: '',
  status: Status.PENDING,
  login: {
    loading: false,
    error: '',
    status: Status.PENDING,
  },
};

export const loginUser = createAsyncThunk(
  'auth/login/emailPassword',
  async (loginDto: LoginDto, { rejectWithValue, dispatch }) => {
    try {
      const response = await logInFirebaseWithEmailAndPassword(loginDto);
      const [result, error] = response;
      console.log('response', response, result, error);
      if (!result?.user || error) throw error;
      const user: object = result.user.toJSON();
      dispatch(setUser(user));
      return user;
    } catch (error: any) {
      console.log('error', error);
      return rejectWithValue(error?.message || 'Error');
    }
  }
);

export const authenticateUser = createAsyncThunk(
  'auth/authenticate',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await authUser();
      const [result, error] = response;
      if (!result || error) {
        throw new Error('User not connected');
      }
      const user: object = result.toJSON();
      dispatch(setUser(user));
      return user;
    } catch (error: any) {
      return rejectWithValue(error?.message || 'User not found');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},

  extraReducers: {
    //Login actions
    [`${loginUser.pending}`]: (state: AuthInitialState, action) => {
      state.login.loading = true;
      state.login.status = Status.PENDING;
      state.login.error = '';
    },
    [`${loginUser.fulfilled}`]: (state: AuthInitialState, action) => {
      state.login.loading = false;
      state.login.status = Status.SUCCESS;
      state.isLoggedIn = true;
    },
    [`${loginUser.rejected}`]: (state: AuthInitialState, action) => {
      state.login.loading = false;
      state.login.status = Status.ERROR;
      state.login.error = action.payload || 'Error';
    },

    //authenticate actions
    [`${authenticateUser.pending}`]: (state: AuthInitialState, action) => {
      state.loading = true;
      state.status = Status.PENDING;
      state.error = '';
    },
    [`${authenticateUser.fulfilled}`]: (state: AuthInitialState, action) => {
      state.loading = false;
      state.status = Status.SUCCESS;
      state.isLoggedIn = true;
    },
    [`${authenticateUser.rejected}`]: (state: AuthInitialState, action) => {
      state.loading = false;
      state.status = Status.ERROR;
      state.error = action.payload || 'Error';
      state.isLoggedIn = false;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
