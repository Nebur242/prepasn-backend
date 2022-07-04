import { Status } from '@prepa-sn/shared/enums';
import { Classroom } from '@prepa-sn/shared/interfaces';
import { createSlice } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { axiosBaseQuery } from '../../../config/api.config';

export interface ClassroomsInitialState {
  loading: boolean;
  error: string;
  status: Status.PENDING | Status.SUCCESS | Status.ERROR;
  classrooms: Classroom[];
}

const initialState: ClassroomsInitialState = {
  loading: false,
  error: '',
  status: Status.PENDING,
  classrooms: [],
};

export const classroomsApi = createApi({
  reducerPath: 'classroomsApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    findOneClassroom: build.query<Classroom, string>({
      query: (id: string) => ({ url: `/classrooms/${id}`, method: 'GET' }),
    }),
    findAllClassrooms: build.query<Pagination<Classroom>, IPaginationOptions>({
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
          url: `/classrooms?${params}`,
          method: 'GET',
        };
      },
    }),
    createClassroom: build.mutation<Classroom, Omit<Classroom, 'id'>>({
      query: (classroom: Omit<Classroom, 'id'>) => ({
        url: '/classrooms',
        method: 'POST',
        data: classroom,
      }),
    }),
    updateClassroom: build.mutation<Classroom, Classroom>({
      query: (classroom: Classroom) => ({
        url: `/classrooms/${classroom.id}`,
        method: 'PATCH',
        data: classroom,
      }),
    }),
    deleteClassroom: build.mutation<Classroom, string>({
      query: (id: string) => ({
        url: `/classrooms/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useFindAllClassroomsQuery,
  useFindOneClassroomQuery,
  useCreateClassroomMutation,
  useUpdateClassroomMutation,
  useDeleteClassroomMutation,
} = classroomsApi;

const classroomsSlice = createSlice({
  name: 'classrooms',
  initialState,
  reducers: {},
  extraReducers: {},
});

const { reducer } = classroomsSlice;
export default reducer;
