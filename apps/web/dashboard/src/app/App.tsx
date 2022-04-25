import { Suspense, FC } from 'react';
import styled from 'styled-components';
import { ConfigProvider } from "antd"
import Routes from '../routes';
import 'moment/locale/fr';
import locale from 'antd/lib/locale/fr_FR';
import '../translations';
import "../config/firebase.config"
import Auth from '../components/auth';
import Loader from '../components/loader';

const StyledApp = styled.div`
  background-color: rgb(246, 246, 249);
`;

export const App: FC = () => {
  return (
    <Auth>
      <StyledApp>
        <Suspense fallback={<Loader />}>
          <ConfigProvider locale={locale}>
            <Routes />
          </ConfigProvider>
        </Suspense>
      </StyledApp>
    </Auth>
  );
}

export default App;
