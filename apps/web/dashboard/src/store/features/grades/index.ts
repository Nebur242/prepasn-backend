/* eslint-disable @typescript-eslint/no-explicit-any */
import { Status } from '@prepa-sn/shared/enums';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Grade } from '../../../common/interfaces/grade.interface';
import { findAll } from '../../../services/grades';

export interface GradesInitialState {
  loading: boolean;
  error: string;
  status: Status.PENDING | Status.SUCCESS | Status.ERROR;
  items: Grade[];
}

export const initialState: GradesInitialState = {
  loading: false,
  error: '',
  status: Status.PENDING,
  items: [],
};

export const fetchAll = createAsyncThunk(
  'grades/findAll',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await findAll();
      console.log('response', response);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Grades not found');
    }
  }
);

const gradesSlice = createSlice({
  name: 'grades',
  initialState,
  reducers: {},
  extraReducers: {
    [`${fetchAll.fulfilled}`]: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.status = Status.SUCCESS;
    },
    [`${fetchAll.rejected}`]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.status = Status.ERROR;
    },
    [`${fetchAll.pending}`]: (state) => {
      state.loading = true;
      state.error = '';
      state.status = Status.PENDING;
    },
  },
});

const { reducer } = gradesSlice;
export default reducer;
