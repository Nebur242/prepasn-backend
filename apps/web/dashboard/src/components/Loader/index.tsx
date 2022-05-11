import { Spin } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const StyledWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    height: 100vh;
    background-color: rgba(73, 69, 255 , 0.3);
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AppLoader: FC = () => {
  const { t } = useTranslation()
  return (
    <StyledWrapper>
      <Spin size="large" tip={t('general.loading')} />
    </StyledWrapper>
  )
}
export default AppLoader;
