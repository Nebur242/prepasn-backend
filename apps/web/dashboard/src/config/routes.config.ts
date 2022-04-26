import { lazy } from 'react';
const Login = lazy(() => import('../pages/auth/login.page'));
const Dashboard = lazy(() => import('../pages/dashboard/dashboard.page'));

export interface Route {
  path: string;
  name: string;
  element: React.LazyExoticComponent<() => JSX.Element>;
  isPublic: boolean;
  access: string[];
  routes: Route[];
}

export const HOME: Route = {
  path: '/',
  name: 'home',
  isPublic: false,
  access: [],
  element: Dashboard,
  routes: [],
};

export const LOGIN: Route = {
  path: '/login',
  name: 'login',
  isPublic: true,
  access: [],
  element: Login,
  routes: [],
};

export const DASHBOARD: Route = {
  path: '/dashboard',
  name: 'dashboard',
  access: ['admin'],
  isPublic: false,
  element: Dashboard,
  routes: [],
};
