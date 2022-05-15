import { FC, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Route } from '../../config/routes.config';
import * as routes from '../../config/routes.config';
import Loader from '../Loader';

type Props = {
  route: Route;
};

const AppRoute: FC<Props> = ({ route }) => {
  const auth = useSelector((state: RootState) => state.auth);
  const { element: Component, isPublic } = route;

  if (!isPublic && !auth.isLoggedIn && !auth.loading)
    return <Navigate to={routes.LOGIN.path} />;

  return (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  );
};

export default AppRoute;
