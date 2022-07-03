import { Role, Status } from '@prepa-sn/shared/enums';
import { User } from '@prepa-sn/shared/interfaces';
import { createSlice } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { axiosBaseQuery } from '../../../config/api.config';

export interface UsersInitialState {
  loading: boolean;
  error: string;
  status: Status.PENDING | Status.SUCCESS | Status.ERROR;
  users: User[];
}

const initialState: UsersInitialState = {
  loading: false,
  error: '',
  status: Status.PENDING,
  users: [],
};

const BASE_PATH = `/users` as const;
const TAG_TYPE = `Users` as const;
const NAME = 'users' as const;

export const usersApi = createApi({
  reducerPath: `${NAME}Api`,
  baseQuery: axiosBaseQuery(),
  tagTypes: [TAG_TYPE],
  endpoints: (builder) => ({
    findAllUsers: builder.query<
      Pagination<User>,
      {
        pagination: IPaginationOptions;
        filter: Partial<User>;
      }
    >({
      query: ({ pagination, filter = {} }) => {
        const { page = 1, limit = 10 } = pagination;
        const params = new URLSearchParams({
          page: `${page}`,
          limit: `${limit}`,
          ...Object.entries(filter).reduce(
            (acc, [key, value]) => ({
              ...acc,
              [key]:
                key === 'roles' ? (value as Role[])?.join(',') : `${value}`,
            }),
            {}
          ),
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
    createUser: builder.mutation<User, Omit<User, 'id'>>({
      query: (student: Omit<User, 'id'>) => ({
        url: BASE_PATH,
        method: 'POST',
        data: student,
      }),
      invalidatesTags: [TAG_TYPE],
    }),
    createStudent: builder.mutation<User, Omit<User, 'id'>>({
      query: (student: Omit<User, 'id'>) => ({
        url: `${BASE_PATH}/students`,
        method: 'POST',
        data: student,
      }),
      invalidatesTags: [TAG_TYPE],
    }),
    createInstructor: builder.mutation<User, Omit<User, 'id'>>({
      query: (instructor: Omit<User, 'id'>) => ({
        url: `${BASE_PATH}/instructors`,
        method: 'POST',
        data: instructor,
      }),
      invalidatesTags: [TAG_TYPE],
    }),
    createAdmin: builder.mutation<User, Omit<User, 'id'>>({
      query: (student: Omit<User, 'id'>) => ({
        url: `${BASE_PATH}/admins`,
        method: 'POST',
        data: student,
      }),
      invalidatesTags: [TAG_TYPE],
    }),
    updateUser: builder.mutation<Document, Partial<User>>({
      query: ({ uid, ...updated }) => ({
        url: `${BASE_PATH}/${uid}`,
        method: 'PATCH',
        data: updated,
      }),
    }),
    findOneUser: builder.query<User, { id: string }>({
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
    deleteUser: builder.mutation<User, { uid: string }>({
      query: ({ uid }) => ({
        url: `${BASE_PATH}/${uid}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAG_TYPE],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useFindAllUsersQuery,
  useUpdateUserMutation,
  useFindOneUserQuery,
  useDeleteUserMutation,
  useCreateInstructorMutation,
  useCreateStudentMutation,
  useCreateAdminMutation,
} = usersApi;

const usersSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: {},
});

const { reducer } = usersSlice;
export default reducer;
