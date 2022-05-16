import { lazy } from 'react';

const Welcome = lazy(() => import('../pages/app/welcome.page'));
const ContentManager = lazy(() => import('../pages/dashboard/content-manager'));
const ContentManagerHome = lazy(
  () => import('../pages/dashboard/content-manager/home.page')
);

const Home = lazy(() => import('../pages/app/home.page'));
const Login = lazy(() => import('../pages/auth/login.page'));
const Dashboard = lazy(() => import('../pages/dashboard'));
const statistics = lazy(() => import('../pages/dashboard/stats'));

//MEDIA LIBRAY
const MediaLibrary = lazy(() => import('../pages/dashboard/media-library'));

//GRADES
const Grades = lazy(
  () => import('../pages/dashboard/content-manager/content/grades')
);
const CreateGrade = lazy(
  () => import('../pages/dashboard/content-manager/content/grades/create')
);
const UpdateGrade = lazy(
  () => import('../pages/dashboard/content-manager/content/grades/update')
);

//COURSES
const Courses = lazy(
  () => import('../pages/dashboard/content-manager/content/courses')
);

const CreateCourses = lazy(
  () => import('../pages/dashboard/content-manager/content/courses/create')
);

const UpdateCourses = lazy(
  () => import('../pages/dashboard/content-manager/content/courses/update')
);

//COURSES CHAPTERS
const CourseChapters = lazy(
  () => import('../pages/dashboard/content-manager/content/courses/chapters')
);

const CreateChapters = lazy(
  () =>
    import('../pages/dashboard/content-manager/content/courses/chapters/create')
);

const UpdateChapters = lazy(
  () =>
    import('../pages/dashboard/content-manager/content/courses/chapters/update')
);

export interface Route {
  path: string;
  name: string;
  element: React.LazyExoticComponent<() => JSX.Element>;
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
  routes: [],
};

export const LOGIN: Route = {
  path: 'login',
  name: 'login',
  isPublic: true,
  icon: null,
  access: [],
  element: Login,
  routes: [],
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
      access: ['admin'],
      icon: 'HomeOutlined',
      isPublic: false,
      element: Welcome,
      routes: [],
    },
    {
      path: 'stats',
      name: 'stats',
      isPublic: false,
      icon: 'AreaChartOutlined',
      access: [],
      element: statistics,
      routes: [],
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
          routes: [],
        },
        {
          path: 'grades',
          name: 'grades',
          access: ['admin'],
          isPublic: false,
          element: Grades,
          routes: [],
        },
        {
          path: 'grades/create',
          name: 'create-grade',
          access: ['admin'],
          icon: 'DashboardOutlined',
          isPublic: false,
          element: CreateGrade,
          routes: [],
        },
        {
          path: 'grades/update/:id',
          name: 'update-grade',
          access: ['admin'],
          icon: 'DashboardOutlined',
          isPublic: false,
          element: UpdateGrade,
          routes: [],
        },
        {
          path: 'courses',
          name: 'courses',
          access: ['admin'],
          isPublic: false,
          element: Courses,
          routes: [],
        },
        {
          path: 'courses/create',
          name: 'create-course',
          access: ['admin'],
          isPublic: false,
          element: CreateCourses,
          routes: [],
        },
        {
          path: 'courses/update/:id',
          name: 'update-course',
          access: ['admin'],
          isPublic: false,
          element: UpdateCourses,
          routes: [],
        },
        {
          path: 'courses/:courseId/chapters',
          name: 'course-chapters',
          access: ['admin'],
          isPublic: false,
          element: CourseChapters,
          routes: [],
        },
        {
          path: 'courses/:courseId/chapters/create',
          name: 'course-chapters',
          access: ['admin'],
          isPublic: false,
          element: CreateChapters,
          routes: [],
        },
        {
          path: 'courses/:courseId/chapters/update/:id',
          name: 'course-chapters',
          access: ['admin'],
          isPublic: false,
          element: UpdateChapters,
          routes: [],
        },
      ],
    },
    {
      path: 'uploads',
      name: 'media-library',
      access: ['admin'],
      icon: 'FolderOpenOutlined',
      isPublic: false,
      element: MediaLibrary,
      routes: [],
    },
  ],
};

export const NOT_FOUND: Route = {
  path: '*',
  name: 'not-found',
  isPublic: false,
  icon: null,
  access: [],
  element: Dashboard,
  routes: [],
};
