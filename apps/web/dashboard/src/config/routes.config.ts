import React, { lazy } from 'react';
const ContentManager = lazy(() => import('../pages/dashboard/content-manager'));

const Home = lazy(() => import('../pages/app/home.page'));
const Login = lazy(() => import('../pages/auth/login.page'));
const Dashboard = lazy(() => import('../pages/dashboard'));
const Grades = lazy(
  () => import('../pages/dashboard/content-manager/content/grades.page')
);
export interface Route {
  path: string;
  name: string;
  element: React.LazyExoticComponent<() => JSX.Element>;
  isPublic: boolean;
  access: string[];
  routes: Route[];
}

export const HOME: Route = {
  path: '',
  name: 'home',
  isPublic: false,
  access: [],
  element: Dashboard,

  routes: [],
};

export const LOGIN: Route = {
  path: 'login',
  name: 'login',
  isPublic: true,
  access: [],
  element: Login,
  routes: [],
};

export const DASHBOARD: Route = {
  path: 'admin',
  name: 'admin',
  access: ['admin'],
  isPublic: false,
  element: Dashboard,
  routes: [
    {
      path: '',
      name: 'home',
      access: ['admin'],
      isPublic: false,
      element: Home,
      routes: [],
    },
    {
      path: 'content-manager',
      name: 'content-manager',
      access: ['admin'],
      isPublic: false,
      element: ContentManager,
      routes: [
        {
          path: '',
          name: 'grades',
          access: ['admin'],
          isPublic: false,
          element: Grades,
          routes: [],
        },
      ],
    },
  ],
};
