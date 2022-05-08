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

export const initialState: CoursesInitialState = {
  loading: false,
  error: '',
  status: Status.PENDING,
  courses: [],
};

export const coursesApi = createApi({
  reducerPath: 'coursesApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    findOneCourse: build.query<Course, string>({
      query: (id: string) => ({ url: `/courses/${id}`, method: 'GET' }),
    }),
    findAllCourses: build.query<Course[], void>({
      query: () => ({ url: '/courses', method: 'GET' }),
    }),
    createCourse: build.mutation<Course, Omit<Course, 'id'>>({
      query: (course: Omit<Course, 'id'>) => ({
        url: '/courses',
        method: 'POST',
        data: course,
      }),
    }),
    updateCourse: build.mutation<Course, Course>({
      query: (course: Course) => ({
        url: `/courses/${course.id}`,
        method: 'PUT',
        data: course,
      }),
    }),
    deleteCourse: build.mutation<Course, Course>({
      query: (course: Course) => ({
        url: `/courses/${course.id}`,
        method: 'DELETE',
        data: course,
      }),
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
