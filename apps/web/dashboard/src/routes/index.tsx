import { Route, Routes } from 'react-router-dom';
import { LOGIN, HOME } from '../config/routes.config';
import Login from '../pages/auth/login.page';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={HOME.path} element={<Login />} />
            <Route
                path={LOGIN.path}
                element={
                    // eslint-disable-next-line react/jsx-pascal-case
                    <LOGIN.element />
                }
            />

        </Routes>
    )
}

export default AppRoutes;