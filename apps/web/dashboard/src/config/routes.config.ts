import { lazy } from 'react';
const Login = lazy(() => import('../pages/auth/login.page'));

export const HOME = {
  path: '/',
  name: 'home',
  access: ['private'],
};

export const LOGIN = {
  path: '/login',
  name: 'login',
  access: ['public'],
  element: Login,
};
