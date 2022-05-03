import { Status } from '@prepa-sn/shared/enums';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import { AxiosError } from 'axios';
import { Grade } from '../../../common/interfaces/grade.interface';
import { axiosBaseQuery } from '../../../config/api.config';
import { findAll } from '../../../services/grades';

export interface GradesInitialState {
  loading: boolean;
  error: string;
  status: Status.PENDING | Status.SUCCESS | Status.ERROR;
  grades: Grade[];
}

export const initialState: GradesInitialState = {
  loading: false,
  error: '',
  status: Status.PENDING,
  grades: [],
};

export const fetchAll = createAsyncThunk(
  'grades/findAll',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await findAll();
      console.log('response', response);
      return fulfillWithValue(response.data);
    } catch (err) {
      const error = err as AxiosError;
      console.log('error', error);
      return rejectWithValue(error.message || 'Grades not found');
    }
  }
);

export const gradesApi = createApi({
  reducerPath: 'gradesApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    findOneGrade: build.query<Grade, string>({
      query: (id: string) => ({ url: `/grades/${id}`, method: 'GET' }),
    }),
    findAllGrades: build.query<Grade[], void>({
      query: () => ({ url: '/grades', method: 'GET' }),
    }),
    createGrade: build.mutation<Grade, Grade>({
      query: (grade: Grade) => ({
        url: '/grades',
        method: 'POST',
        data: grade,
      }),
    }),
    updateGrade: build.mutation<Grade, string>({
      query: (id: string) => ({ url: `/grades/${id}`, method: 'PATCH' }),
    }),
    deleteGrade: build.mutation<Grade, number>({
      query: (id: number) => ({ url: `/grades/${id}`, method: 'DELETE' }),
    }),
  }),
});

export const {
  useFindOneGradeQuery,
  useFindAllGradesQuery,
  useCreateGradeMutation,
  useUpdateGradeMutation,
  useDeleteGradeMutation,
  usePrefetch,
} = gradesApi;

const gradesSlice = createSlice({
  name: 'grades',
  initialState,
  reducers: {},
  extraReducers: {
    [`${fetchAll.fulfilled}`]: (state, action) => {
      state.grades = action.payload;
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
