import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoute from '../components/route';
import * as routes from '../config/routes.config';
import { Route as RouteConfig } from '../config/routes.config';

const setNestedRoutes = (appRoutes: RouteConfig[]): React.ReactNode => {
  return appRoutes.map((route) => {
    if (route.routes.length > 0) {
      return (
        <Route
          key={route.path}
          path={route.path}
          children={setNestedRoutes(route.routes)}
          element={<AppRoute route={route} />}
        />
      );
    }
    return (
      <Route
        key={route.path}
        path={route.path}
        element={<AppRoute route={route} />}
      />
    );
  });
};

const AppRoutes: FC = () => {
  return <Routes>{setNestedRoutes(Object.values(routes))}</Routes>;
};

export default AppRoutes;
