import { Status } from '@prepa-sn/shared/enums';
import { Grade } from '@prepa-sn/shared/interfaces';
import { createSlice } from '@reduxjs/toolkit';
import { Omit } from '@reduxjs/toolkit/dist/tsHelpers';
import { createApi } from '@reduxjs/toolkit/query/react';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { axiosBaseQuery } from '../../../config/api.config';

export interface GradesInitialState {
  loading: boolean;
  error: string;
  status: Status.PENDING | Status.SUCCESS | Status.ERROR;
  grades: Grade[];
}

const initialState: GradesInitialState = {
  loading: false,
  error: '',
  status: Status.PENDING,
  grades: [],
};

const BASE_PATH = `/grades` as const;
const TAG_TYPE = `Grades` as const;

export const gradesApi = createApi({
  reducerPath: 'gradesApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: [TAG_TYPE],
  endpoints: (build) => ({
    findOneGrade: build.query<Grade, string>({
      query: (id: string) => ({ url: `/grades/${id}`, method: 'GET' }),
    }),
    findAllGrades: build.query<Pagination<Grade>, IPaginationOptions>({
      query: (
        pagination: IPaginationOptions = {
          page: 1,
          limit: 10,
        }
      ) => {
        const { page, limit } = pagination;
        const params = new URLSearchParams({
          page: `${page}`,
          limit: `${limit}`,
        }).toString();
        return {
          url: `${BASE_PATH}?${params}`,
          method: 'GET',
        };
      },
      providesTags: (result, _error, _arg) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const final: any[] = [
          {
            type: TAG_TYPE,
          },
        ];
        const other =
          result.items?.map((grade) => ({ type: TAG_TYPE, id: grade.id })) ||
          [];
        return [...final, ...other];
      },
    }),
    createGrade: build.mutation<Grade, Omit<Grade, 'id'>>({
      query: (grade: Omit<Grade, 'id'>) => ({
        url: '/grades',
        method: 'POST',
        data: grade,
      }),
      invalidatesTags: [TAG_TYPE],
    }),
    updateGrade: build.mutation<Grade, Partial<Grade> & Pick<Grade, 'id'>>({
      query: ({ id, ...rest }) => ({
        url: `/grades/${id}`,
        method: 'PATCH',
        data: rest,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: TAG_TYPE, id: arg.id },
      ],
    }),
    deleteGrade: build.mutation<Grade, number>({
      query: (id: number) => ({ url: `/grades/${id}`, method: 'DELETE' }),
      invalidatesTags: (_result, _error, arg) => [{ type: TAG_TYPE, id: arg }],
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
