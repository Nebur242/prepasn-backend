import { lazy } from 'react';

export const Welcome = lazy(() => import('./app/welcome.page'));
export const ContentManager = lazy(() => import('./dashboard/content-manager'));
export const ContentManagerHome = lazy(
  () => import('./dashboard/content-manager/home.page')
);

export const Home = lazy(() => import('./app/home.page'));
export const Login = lazy(() => import('./auth/login.page'));
export const Dashboard = lazy(() => import('./dashboard'));
export const Profile = lazy(() => import('./dashboard/profile'));

//MEDIA LIBRAY
export const MediaLibrary = lazy(() => import('./dashboard/media-library'));

//GRADES
export const Grades = lazy(
  () => import('./dashboard/content-manager/content/grades')
);
export const CreateGrade = lazy(
  () => import('./dashboard/content-manager/content/grades/create')
);
export const UpdateGrade = lazy(
  () => import('./dashboard/content-manager/content/grades/update')
);

//COURSES
export const Courses = lazy(
  () => import('./dashboard/content-manager/content/courses')
);

export const CreateCourses = lazy(
  () => import('./dashboard/content-manager/content/courses/create')
);

export const UpdateCourses = lazy(
  () => import('./dashboard/content-manager/content/courses/update')
);

//COURSES CHAPTERS
export const CourseChapters = lazy(
  () => import('./dashboard/content-manager/content/courses/chapters')
);

export const CreateChapters = lazy(
  () => import('./dashboard/content-manager/content/courses/chapters/create')
);

export const UpdateChapters = lazy(
  () => import('./dashboard/content-manager/content/courses/chapters/update')
);

//CLASSROOMS
export const Classrooms = lazy(
  () => import('./dashboard/content-manager/content/classrooms')
);

export const CreateClassroom = lazy(
  () => import('./dashboard/content-manager/content/classrooms/create')
);

export const UpdateClassroom = lazy(
  () => import('./dashboard/content-manager/content/classrooms/update')
);

// USERS MANAGER
export const UsersManager = lazy(() => import('./dashboard/users-manager'));
export const UsersMangagerHome = lazy(
  () => import('./dashboard/users-manager/home')
);

export const Students = lazy(
  () => import('./dashboard/users-manager/content/students')
);

export const CreateStudent = lazy(
  () => import('./dashboard/users-manager/content/students/create')
);

export const UpdateStudent = lazy(
  () => import('./dashboard/users-manager/content/students/update')
);

export const Instructors = lazy(
  () => import('./dashboard/users-manager/content/instructors')
);

export const CreateInstructor = lazy(
  () => import('./dashboard/users-manager/content/instructors/create')
);

export const UpdateInstructor = lazy(
  () => import('./dashboard/users-manager/content/instructors/update')
);

//STATS
export const Stats = lazy(() => import('./dashboard/stats'));
