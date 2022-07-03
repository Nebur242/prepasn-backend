import { Status } from '@prepa-sn/shared/enums';
import { Course } from '@prepa-sn/shared/interfaces';
import { axiosBaseQuery } from '../../../config/api.config';
import { createApi } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

export interface CoursesInitialState {
  loading: boolean;
  error: string;
  status: Status.PENDING | Status.SUCCESS | Status.ERROR;
  courses: Course[];
}

const initialState: CoursesInitialState = {
  loading: false,
  error: '',
  status: Status.PENDING,
  courses: [],
};

const NAME = `courses` as const;
const BASE_PATH = `/${NAME}` as const;
const TAG_TYPE = `Courses` as const;

export const coursesApi = createApi({
  reducerPath: `${NAME}Api`,
  baseQuery: axiosBaseQuery(),
  tagTypes: [TAG_TYPE],
  endpoints: (build) => ({
    findOneCourse: build.query<Course, string>({
      query: (id: string) => ({ url: `/courses/${id}`, method: 'GET' }),
    }),
    findAllCourses: build.query<Pagination<Course>, IPaginationOptions>({
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
        return [
          ...final,
          ...(result.items?.map((course) => ({
            type: TAG_TYPE,
            id: course.id,
          })) || []),
        ];
      },
    }),
    createCourse: build.mutation<Course, Omit<Course, 'id'>>({
      query: (course: Omit<Course, 'id'>) => ({
        url: '/courses',
        method: 'POST',
        data: course,
      }),
      invalidatesTags: [TAG_TYPE],
    }),
    updateCourse: build.mutation<Course, Course>({
      query: (course: Course) => ({
        url: `/courses/${course.id}`,
        method: 'PATCH',
        data: course,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: TAG_TYPE, id: arg.id },
      ],
    }),
    deleteCourse: build.mutation<Course, number>({
      query: (id: number) => ({
        url: `/courses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: TAG_TYPE, id: arg }],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useFindAllCoursesQuery,
  useFindOneCourseQuery,
  usePrefetch,
} = coursesApi;

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: {},
});

const { reducer } = coursesSlice;
export default reducer;
