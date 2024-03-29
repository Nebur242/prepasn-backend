import { Status } from '@prepa-sn/shared/enums';
import { Admin } from '@prepa-sn/shared/interfaces';
import { createSlice } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { axiosBaseQuery } from '../../../config/api.config';

export interface InstructorsInitialState {
  loading: boolean;
  error: string;
  status: Status.PENDING | Status.SUCCESS | Status.ERROR;
  admins: Admin[];
}

export const initialState: InstructorsInitialState = {
  loading: false,
  error: '',
  status: Status.PENDING,
  admins: [],
};

const BASE_PATH = `/admins` as const;
const TAG_TYPE = `Admins` as const;

export const adminsApi = createApi({
  reducerPath: 'adminsApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: [TAG_TYPE],
  endpoints: (builder) => ({
    findAllAdmins: builder.query<Pagination<Admin>, IPaginationOptions>({
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
    createAdmin: builder.mutation<Admin, Omit<Admin, 'id'>>({
      query: (student: Omit<Admin, 'id'>) => ({
        url: BASE_PATH,
        method: 'POST',
        data: student,
      }),
      invalidatesTags: [TAG_TYPE],
    }),
    updateAdmin: builder.mutation<Document, Partial<Admin>>({
      query: ({ uid, ...updated }) => ({
        url: `${BASE_PATH}/${uid}`,
        method: 'PATCH',
        data: updated,
      }),
    }),
    findOneAdmin: builder.query<Admin, { id: string }>({
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
    deleteAdmin: builder.mutation<Admin, { uid: string }>({
      query: ({ uid }) => ({
        url: `${BASE_PATH}/${uid}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAG_TYPE],
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useFindAllAdminsQuery,
  useUpdateAdminMutation,
  useFindOneAdminQuery,
  useDeleteAdminMutation,
} = adminsApi;

const adminsSlice = createSlice({
  name: 'admins',
  initialState,
  reducers: {},
  extraReducers: {},
});

const { reducer } = adminsSlice;
export default reducer;
