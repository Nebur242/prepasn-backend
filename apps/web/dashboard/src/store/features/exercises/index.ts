import { Status } from '@prepa-sn/shared/enums';
import { Exercise } from '@prepa-sn/shared/interfaces';
import { createSlice } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { axiosBaseQuery } from '../../../config/api.config';

export interface ExercisesInitialState {
  loading: boolean;
  error: string;
  status: Status.PENDING | Status.SUCCESS | Status.ERROR;
  exercises: Exercise[];
}

const initialState: ExercisesInitialState = {
  loading: false,
  error: '',
  status: Status.PENDING,
  exercises: [],
};

const BASE_PATH = `/exercises` as const;
const TAG_TYPE = `Exercises` as const;
const NAME = 'exercises' as const;

export const exercisesApi = createApi({
  reducerPath: 'exercisesApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: [TAG_TYPE],
  endpoints: (build) => ({
    findOneExercise: build.query<Exercise, string>({
      query: (id: string) => ({ url: `${BASE_PATH}/${id}`, method: 'GET' }),
    }),
    findAllExercises: build.query<Pagination<Exercise>, IPaginationOptions>({
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
    createExercise: build.mutation<
      Exercise,
      Omit<Exercise, 'id' | 'chapter'> | { chapter: number }
    >({
      query: (Categories: Omit<Exercise, 'id' | 'chapter'>) => ({
        url: BASE_PATH,
        method: 'POST',
        data: Categories,
      }),
      invalidatesTags: [TAG_TYPE],
    }),
    updateExercise: build.mutation<Exercise, Exercise>({
      query: (Categories: Exercise) => ({
        url: `${BASE_PATH}/${Categories.id}`,
        method: 'PATCH',
        data: Categories,
      }),
      invalidatesTags: [TAG_TYPE],
    }),
    deleteExercise: build.mutation<Exercise, string>({
      query: (id: string) => ({
        url: `${BASE_PATH}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAG_TYPE],
    }),
  }),
});

export const {
  useCreateExerciseMutation,
  useFindOneExerciseQuery,
  useDeleteExerciseMutation,
  useFindAllExercisesQuery,
  useUpdateExerciseMutation,
} = exercisesApi;

const exercisesSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: {},
});

const { reducer } = exercisesSlice;
export default reducer;
