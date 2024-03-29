import { lazy } from 'react';

export const Welcome = lazy(() => import('./app/welcome.page'));
export const Unauthorized = lazy(() => import('./app/unauthorized.page'));

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

export const Admins = lazy(
  () => import('./dashboard/users-manager/content/admins')
);

export const CreateAdmin = lazy(
  () => import('./dashboard/users-manager/content/admins/create')
);

export const UpdateAdmin = lazy(
  () => import('./dashboard/users-manager/content/admins/update')
);

//STATS
export const Stats = lazy(() => import('./dashboard/stats'));

//CATEGORIES
export const Categories = lazy(
  () => import('./dashboard/content-manager/content/categories')
);

export const CreateCategory = lazy(
  () => import('./dashboard/content-manager/content/categories/create')
);

export const UpdateCategory = lazy(
  () => import('./dashboard/content-manager/content/categories/update')
);

//EXERCISES
export const Exercises = lazy(
  () => import('./dashboard/content-manager/content/courses/exercises')
);

export const CreateExercise = lazy(
  () => import('./dashboard/content-manager/content/courses/exercises/create')
);

export const UpdateExercise = lazy(
  () => import('./dashboard/content-manager/content/courses/exercises/update')
);

//SECTIONS

export const Sections = lazy(
  () => import('./dashboard/content-manager/content/courses/chapters/sections')
);

export const CreateSection = lazy(
  () =>
    import(
      './dashboard/content-manager/content/courses/chapters/sections/create'
    )
);

export const UpdateSection = lazy(
  () =>
    import(
      './dashboard/content-manager/content/courses/chapters/sections/update'
    )
);
