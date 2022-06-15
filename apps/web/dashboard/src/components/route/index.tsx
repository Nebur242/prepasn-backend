import { FC, lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Route } from '../../config/routes.config';
import * as routes from '../../config/routes.config';
import Loader from '../Loader';

const Unauthorized = lazy(() => import('../../pages/app/unauthorized.page'));

type Props = {
  route: Route;
};

const AppRoute: FC<Props> = ({ route }) => {
  const { element: Component, isPublic } = route;
  const auth = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.user);

  if (!isPublic && !auth.isLoggedIn && !auth.loading)
    return <Navigate to={routes.LOGIN.path} />;

  const hasAccess =
    route.access.length > 0
      ? route.access.some((access) => user.infos.roles.includes(access))
      : true;

  return (
    <Suspense fallback={<Loader />}>
      {hasAccess ? <Component /> : <Unauthorized />}
    </Suspense>
  );
};

export default AppRoute;
