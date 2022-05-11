import { Suspense, FC } from 'react';
import styled from 'styled-components';
import { ConfigProvider } from "antd"
import Routes from '../routes';
import 'moment/locale/fr';
import locale from 'antd/lib/locale/fr_FR';
import '../translations';
import "../config/firebase.config"
import Auth from '../components/Auth';
import Loader from '../components/Loader';

const StyledApp = styled.div`
  background-color: rgb(246, 246, 249);
  height: 100vh
`;

export const App: FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ConfigProvider locale={locale}>
        <Auth>
          <StyledApp>
            <Routes />
          </StyledApp>
        </Auth>
      </ConfigProvider>
    </Suspense>
  );
}

export default App;
