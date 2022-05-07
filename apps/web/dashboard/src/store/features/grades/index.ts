import { Status } from '@prepa-sn/shared/enums';
import { createSlice } from '@reduxjs/toolkit';
import { Omit } from '@reduxjs/toolkit/dist/tsHelpers';
import { createApi } from '@reduxjs/toolkit/query/react';
import { Grade } from '../../../common/interfaces/grade.interface';
import { axiosBaseQuery } from '../../../config/api.config';

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

export const gradesApi = createApi({
  reducerPath: 'gradesApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Grades'],
  endpoints: (build) => ({
    findOneGrade: build.query<Grade, string>({
      query: (id: string) => ({ url: `/grades/${id}`, method: 'GET' }),
    }),
    findAllGrades: build.query<Grade[], void>({
      query: () => ({ url: '/grades', method: 'GET' }),
      providesTags: (result = [], error, arg) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const final: any[] = [
          {
            type: 'Grades',
          },
        ];
        const other = result.map((grade) => ({ type: 'Grades', id: grade.id }));
        return [...final, ...other];
      },
    }),
    createGrade: build.mutation<Grade, Omit<Grade, 'id'>>({
      query: (grade: Omit<Grade, 'id'>) => ({
        url: '/grades',
        method: 'POST',
        data: grade,
      }),
      invalidatesTags: ['Grades'],
    }),
    updateGrade: build.mutation<Grade, Partial<Grade> & Pick<Grade, 'id'>>({
      query: ({ id, ...rest }) => ({
        url: `/grades/${id}`,
        method: 'PATCH',
        data: rest,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Grades', id: arg.id as number },
      ],
    }),
    deleteGrade: build.mutation<Grade, number>({
      query: (id: number) => ({ url: `/grades/${id}`, method: 'DELETE' }),
      invalidatesTags: (result, error, arg) => [{ type: 'Grades', id: arg }],
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
  extraReducers: {},
});

const { reducer } = gradesSlice;
export default reducer;
