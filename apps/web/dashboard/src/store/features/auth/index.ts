import { Status } from '@prepa-sn/shared/enums';
import { LoginDto } from '../../../pages/auth/login.page';
import {
  authUser,
  logInFirebaseWithEmailAndPassword,
} from '../../../services/auth/auth.service';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setUser } from '../user';
import { AuthError } from 'firebase/auth';

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

export const displayAuthError = (error: AuthError) => {
  switch (error.code) {
    case 'auth/wrong-password':
      return 'Wrong password';
    case 'auth/user-not-found':
      return 'User not found';
    case 'auth/user-disabled':
      return 'User disabled';
    case 'auth/invalid-email':
      return 'Invalid email';
    case 'auth/email-already-in-use':
      return 'Email already in use';
    case 'auth/weak-password':
      return 'Weak password';
    case 'auth/operation-not-allowed':
      return 'Operation not allowed';
    case 'auth/invalid-verification-code':
      return 'Invalid verification code';
    case 'auth/account-exists-with-different-credential':
      return 'Account exists with different credential';
    case 'auth/requires-recent-login':
      return 'Requires recent login';
    case 'auth/too-many-requests':
      return 'Too many requests';
    case 'auth/network-request-failed':
      return 'Network request failed';
    case 'auth/invalid-credential':
      return 'Invalid credential';
    case 'auth/invalid-user-token':
      return 'Invalid user token';
    case 'auth/invalid-password':
      return 'Invalid password';
    default:
      return 'Error';
  }
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
      dispatch(setUser(user));
      return fulfillWithValue(user);
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
      dispatch(setUser(user));
      return fulfillWithValue(user);
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
  },
});

const { reducer } = authSlice;
export default reducer;
