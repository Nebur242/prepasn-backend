import { FC, Suspense } from 'react';
import { Route } from '../../config/routes.config';
import Loader from '../loader';

type Props = {
    route: Route
}

const AppRoute: FC<Props> = (props) => {
    const { element: Component } = props.route;

    return (
        <Suspense fallback={<Loader />}>
            <Component />
        </Suspense>
    )
}

export default AppRoute;