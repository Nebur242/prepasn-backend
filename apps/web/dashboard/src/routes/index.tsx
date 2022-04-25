import { Route, Routes } from 'react-router-dom';
import AppRoute from '../components/route';
import * as routes from '../config/routes.config';

const AppRoutes = () => {
    return (
        <Routes>
            {
                Object.values(routes).map((key) => {
                    return <Route
                        key={key.path}
                        path={key.path}
                        element={
                            <AppRoute route={key} />
                        }
                    />;
                })
            }
        </Routes>
    )
}

export default AppRoutes;