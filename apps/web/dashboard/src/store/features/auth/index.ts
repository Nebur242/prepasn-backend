import { Status } from '@prepa-sn/shared/enums';
import { LoginDto } from '../../../pages/auth/login.page';
import {
  authUser,
  logInFirebaseWithEmailAndPassword,
  logout,
} from '../../../services/auth/auth.service';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setUser } from '../user';
import { AuthError } from 'firebase/auth';
import { displayAuthError } from './authSlice';

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
  logout: {
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
  logout: {
    loading: false,
    error: '',
    status: Status.PENDING,
  },
};

export const loginUser = createAsyncThunk(
  'auth/login/emailPassword',
  async (
    loginDto: LoginDto,
    { rejectWithValue, dispatch, fulfillWithValue }
  ) => {
    try {
      const response = await logInFirebaseWithEmailAndPassword(loginDto);
      const user = response.user.toJSON();
      const token = await response.user.getIdTokenResult(true);

      dispatch(
        setUser({
          ...user,
          roles: token.claims.roles,
        })
      );
      return fulfillWithValue({
        ...user,
        roles: token.claims.roles,
      });
    } catch (err) {
      console.log('error', err);
      const error = err as AuthError;
      const message = displayAuthError(error);
      return rejectWithValue(message || 'Error');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logout();
      return;
    } catch (err) {
      console.log('error', err);
      const error = err as AuthError;
      const message = displayAuthError(error);
      return rejectWithValue(message || 'Error');
    }
  }
);

export const authenticateUser = createAsyncThunk(
  'auth/authenticate',
  async (_, { rejectWithValue, dispatch, fulfillWithValue }) => {
    try {
      const response = await authUser();

      if (!response) throw new Error('User not connected');
      const user = response.toJSON();
      const token = await response.getIdTokenResult(true);
      // console.log('token', token.claims);
      dispatch(
        setUser({
          ...user,
          roles: token.claims.roles,
        })
      );
      return fulfillWithValue({
        ...user,
        roles: token.claims.roles,
      });
    } catch (error) {
      const err = error as Error;
      return rejectWithValue(err.message || 'User not found');
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

    //logout actions
    [`${logoutUser.pending}`]: (state: AuthInitialState, action) => {
      state.logout.loading = true;
      state.logout.status = Status.PENDING;
      state.logout.error = '';
    },
    [`${logoutUser.fulfilled}`]: (state: AuthInitialState, action) => {
      state.logout.loading = false;
      state.logout.status = Status.SUCCESS;
      state.isLoggedIn = false;
    },
    [`${logoutUser.rejected}`]: (state: AuthInitialState, action) => {
      state.logout.loading = false;
      state.logout.status = Status.ERROR;
      state.logout.error = action.payload || 'Error';
    },
  },
});

const { reducer } = authSlice;
export default reducer;
