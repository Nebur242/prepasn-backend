import { Role } from '@prepa-sn/shared/enums';
import {
  Welcome,
  Home,
  Login,
  Dashboard,
  Profile,
  MediaLibrary,
  Grades,
  CreateGrade,
  UpdateGrade,
  Courses,
  CreateCourses,
  UpdateCourses,
  CourseChapters,
  CreateChapters,
  UpdateChapters,
  Classrooms,
  CreateClassroom,
  UpdateClassroom,
  ContentManager,
  ContentManagerHome,
  UsersManager,
  UsersMangagerHome,
  Students,
  CreateStudent,
  UpdateStudent,
  Instructors,
  CreateInstructor,
  UpdateInstructor,
  CreateAdmin,
  UpdateAdmin,
  Admins,
  Stats,
  Unauthorized,
  Categories,
  CreateCategory,
  UpdateCategory,
  Exercises,
  CreateExercise,
  UpdateExercise,
  Sections,
  CreateSection,
  UpdateSection
} from '../pages';
export interface Route {
  path: string;
  name: string;
  element: React.LazyExoticComponent<(T: unknown) => JSX.Element>;
  isPublic: boolean;
  icon?: string | null;
  access: string[];
  routes: Route[];
}

export const HOME: Route = {
  path: '/',
  name: 'home',
  isPublic: false,
  icon: 'HomeOutlined',
  access: [],
  element: Home,
  routes: []
};

export const LOGIN: Route = {
  path: 'login',
  name: 'login',
  isPublic: true,
  icon: null,
  access: [],
  element: Login,
  routes: []
};

export const DASHBOARD: Route = {
  path: 'admin',
  name: 'admin',
  access: ['admin'],
  isPublic: false,
  icon: 'DashboardOutlined',
  element: Dashboard,
  routes: [
    {
      path: '',
      name: 'home',
      access: [],
      icon: 'HomeOutlined',
      isPublic: false,
      element: Welcome,
      routes: []
    },
    {
      path: 'stats',
      name: 'stats',
      isPublic: false,
      icon: 'AreaChartOutlined',
      access: [Role.ADMIN],
      element: Stats,
      routes: []
    },
    {
      path: 'content-manager',
      name: 'content-manager',
      access: ['admin'],
      isPublic: false,
      icon: 'InboxOutlined',
      element: ContentManager,
      routes: [
        {
          path: '',
          name: 'content-manager-home',
          access: ['admin'],
          isPublic: false,
          element: ContentManagerHome,
          routes: []
        },
        {
          path: 'grades',
          name: 'grades',
          access: ['admin'],
          isPublic: false,
          element: Grades,
          routes: []
        },
        {
          path: 'grades/create',
          name: 'create-grade',
          access: ['admin'],
          icon: 'DashboardOutlined',
          isPublic: false,
          element: CreateGrade,
          routes: []
        },
        {
          path: 'grades/update/:id',
          name: 'update-grade',
          access: ['admin'],
          icon: 'DashboardOutlined',
          isPublic: false,
          element: UpdateGrade,
          routes: []
        },
        {
          path: 'courses',
          name: 'courses',
          access: ['admin'],
          isPublic: false,
          element: Courses,
          routes: []
        },
        {
          path: 'classrooms',
          name: 'classrooms',
          access: ['admin'],
          isPublic: false,
          element: Classrooms,
          routes: []
        },
        {
          path: 'classrooms/create',
          name: 'create-classroom',
          access: ['admin'],
          icon: 'DashboardOutlined',
          isPublic: false,
          element: CreateClassroom,
          routes: []
        },
        {
          path: 'classrooms/update/:id',
          name: 'update-classroom',
          access: ['admin'],
          icon: 'DashboardOutlined',
          isPublic: false,
          element: UpdateClassroom,
          routes: []
        },
        {
          path: 'courses/create',
          name: 'create-course',
          access: ['admin'],
          isPublic: false,
          element: CreateCourses,
          routes: []
        },
        {
          path: 'courses/update/:id',
          name: 'update-course',
          access: ['admin'],
          isPublic: false,
          element: UpdateCourses,
          routes: []
        },
        {
          path: 'courses/:courseId/chapters',
          name: 'course-chapters',
          access: ['admin'],
          isPublic: false,
          element: CourseChapters,
          routes: []
        },
        {
          path: 'courses/:courseId/chapters/create',
          name: 'course-chapters',
          access: ['admin'],
          isPublic: false,
          element: CreateChapters,
          routes: []
        },
        {
          path: 'courses/:courseId/chapters/update/:id',
          name: 'course-chapters',
          access: ['admin'],
          isPublic: false,
          element: UpdateChapters,
          routes: []
        },
        {
          path: 'courses/:courseId/chapters/:chapterId/exercises',
          name: 'course-chapters',
          access: ['admin'],
          isPublic: false,
          element: Exercises,
          routes: []
        },
        {
          path: 'courses/:courseId/chapters/:chapterId/exercises/create',
          name: 'course-chapters',
          access: ['admin'],
          isPublic: false,
          element: CreateExercise,
          routes: []
        },
        {
          path: 'courses/:courseId/chapters/:chapterId/exercises/update/:id',
          name: 'course-chapters',
          access: ['admin'],
          isPublic: false,
          element: UpdateExercise,
          routes: []
        },
        {
          path: 'courses/:courseId/chapters/:chapterId/sections',
          name: 'course-chapters',
          access: ['admin'],
          isPublic: false,
          element: Sections,
          routes: []
        },
        {
          path: 'courses/:courseId/chapters/:chapterId/sections/create',
          name: 'course-chapters',
          access: ['admin'],
          isPublic: false,
          element: CreateSection,
          routes: []
        },
        {
          path: 'courses/:courseId/chapters/:chapterId/sections/update/:id',
          name: 'course-chapters',
          access: ['admin'],
          isPublic: false,
          element: UpdateSection,
          routes: []
        },
        {
          path: 'categories',
          name: 'categories',
          access: ['admin'],
          isPublic: false,
          element: Categories,
          routes: []
        },
        {
          path: 'categories/create',
          name: 'create-category',
          access: ['admin'],
          isPublic: false,
          element: CreateCategory,
          routes: []
        },
        {
          path: 'categories/update/:id',
          name: 'update-category',
          access: ['admin'],
          isPublic: false,
          element: UpdateCategory,
          routes: []
        }
      ]
    },
    {
      path: 'users-manager',
      name: 'users-manager',
      access: ['admin'],
      isPublic: false,
      icon: 'InboxOutlined',
      element: UsersManager,
      routes: [
        {
          path: '',
          name: 'users-manager-home',
          access: ['admin'],
          isPublic: false,
          element: UsersMangagerHome,
          routes: []
        },
        {
          path: 'students',
          name: 'students',
          access: ['admin'],
          isPublic: false,
          element: Students,
          routes: []
        },
        {
          path: 'students/create',
          name: 'create-student',
          access: ['admin'],
          isPublic: false,
          element: CreateStudent,
          routes: []
        },
        {
          path: 'students/update/:id',
          name: 'update-student',
          access: ['admin'],
          isPublic: false,
          element: UpdateStudent,
          routes: []
        },
        {
          path: 'instructors',
          name: 'instructors',
          access: ['admin'],
          isPublic: false,
          element: Instructors,
          routes: []
        },
        {
          path: 'instructors/create',
          name: 'create-instructor',
          access: ['admin'],
          isPublic: false,
          element: CreateInstructor,
          routes: []
        },
        {
          path: 'instructors/update/:id',
          name: 'create-instructor',
          access: ['admin'],
          isPublic: false,
          element: UpdateInstructor,
          routes: []
        },
        {
          path: 'admins',
          name: 'admins',
          access: ['admin'],
          isPublic: false,
          element: Admins,
          routes: []
        },
        {
          path: 'admins/create',
          name: 'create-admin',
          access: ['admin'],
          isPublic: false,
          element: CreateAdmin,
          routes: []
        },
        {
          path: 'admins/update/:id',
          name: 'create-admin',
          access: ['admin'],
          isPublic: false,
          element: UpdateAdmin,
          routes: []
        }
      ]
    },
    {
      path: 'uploads',
      name: 'media-library',
      access: ['admin'],
      icon: 'FolderOpenOutlined',
      isPublic: false,
      element: MediaLibrary,
      routes: []
    },
    {
      path: 'profile',
      name: 'profile',
      access: ['admin'],
      icon: 'UserOutlined',
      isPublic: false,
      element: Profile,
      routes: []
    },
    {
      path: 'unauthorized',
      name: 'unauthorized',
      isPublic: false,
      icon: 'HomeOutlined',
      access: [],
      element: Unauthorized,
      routes: []
    }
  ]
};

export const NOT_FOUND: Route = {
  path: '*',
  name: 'not-found',
  isPublic: false,
  icon: null,
  access: [],
  element: Dashboard,
  routes: []
};
