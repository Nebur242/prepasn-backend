import { Status } from '@prepa-sn/shared/enums';
import { Course } from '@prepa-sn/shared/interfaces';
import { axiosBaseQuery } from '../../../config/api.config';
import { createApi } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';

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

export const coursesApi = createApi({
  reducerPath: 'coursesApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Courses'],
  endpoints: (build) => ({
    findOneCourse: build.query<Course, string>({
      query: (id: string) => ({ url: `/courses/${id}`, method: 'GET' }),
    }),
    findAllCourses: build.query<Course[], void>({
      query: () => ({ url: '/courses', method: 'GET' }),
      providesTags: (result, _error, _arg) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const final: any[] = [
          {
            type: 'Courses',
          },
        ];
        return [
          ...final,
          ...(result?.map((course) => ({ type: 'Courses', id: course.id })) ||
            []),
        ];
      },
    }),
    createCourse: build.mutation<Course, Omit<Course, 'id'>>({
      query: (course: Omit<Course, 'id'>) => ({
        url: '/courses',
        method: 'POST',
        data: course,
      }),
      invalidatesTags: ['Courses'],
    }),
    updateCourse: build.mutation<Course, Course>({
      query: (course: Course) => ({
        url: `/courses/${course.id}`,
        method: 'PATCH',
        data: course,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Courses', id: arg.id },
      ],
    }),
    deleteCourse: build.mutation<Course, number>({
      query: (id: number) => ({
        url: `/courses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Courses', id: arg }],
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
