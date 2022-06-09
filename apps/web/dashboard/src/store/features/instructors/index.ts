import { Status } from '@prepa-sn/shared/enums';
import { Instructor } from '@prepa-sn/shared/interfaces';
import { createSlice } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { axiosBaseQuery } from '../../../config/api.config';

export interface InstructorsInitialState {
  loading: boolean;
  error: string;
  status: Status.PENDING | Status.SUCCESS | Status.ERROR;
  instructors: Instructor[];
}

export const initialState: InstructorsInitialState = {
  loading: false,
  error: '',
  status: Status.PENDING,
  instructors: [],
};

const BASE_PATH = `/instructors` as const;
const TAG_TYPE = `Instructors` as const;

export const instructorsApi = createApi({
  reducerPath: 'instructorsApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: [TAG_TYPE],
  endpoints: (builder) => ({
    findAllInstructors: builder.query<
      Pagination<Instructor>,
      IPaginationOptions
    >({
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
        return result
          ? [
              ...result.items.map(({ id }) => ({
                type: TAG_TYPE,
                id,
              })),
              { type: TAG_TYPE, id: 'PARTIAL-LIST' },
            ]
          : [{ type: TAG_TYPE, id: 'PARTIAL-LIST' }];
      },
    }),
    createInstructor: builder.mutation<Instructor, Omit<Instructor, 'id'>>({
      query: (student: Omit<Instructor, 'id'>) => ({
        url: BASE_PATH,
        method: 'POST',
        data: student,
      }),
      invalidatesTags: [TAG_TYPE],
    }),
    updateInstructor: builder.mutation<Document, Partial<Instructor>>({
      query: ({ uid, ...updated }) => ({
        url: `${BASE_PATH}/${uid}`,
        method: 'PATCH',
        data: updated,
      }),
    }),
    findOneInstructor: builder.query<Instructor, { id: string }>({
      query: ({ id }) => ({
        url: `${BASE_PATH}/${id}`,
        method: 'GET',
      }),
      providesTags: (result, _error, _arg) => {
        return result
          ? [
              {
                type: TAG_TYPE,
                id: result.id,
              },
            ]
          : [];
      },
    }),
    deleteInstructor: builder.mutation<Instructor, { uid: string }>({
      query: ({ uid }) => ({
        url: `${BASE_PATH}/${uid}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAG_TYPE],
    }),
  }),
});

export const {
  useCreateInstructorMutation,
  useFindAllInstructorsQuery,
  useUpdateInstructorMutation,
  useFindOneInstructorQuery,
  useDeleteInstructorMutation,
} = instructorsApi;

const instructorsSlice = createSlice({
  name: 'instructors',
  initialState,
  reducers: {},
  extraReducers: {},
});

const { reducer } = instructorsSlice;
export default reducer;
