import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  Typography,
  Card,
  Alert,
  Row,
  Col,
  Form,
  Input,
  Checkbox,
  Button,
} from 'antd';
import { UserOutlined, LoginOutlined, LockOutlined } from '@ant-design/icons';
import Container from '../../components/container';
import { loginUser } from '../../store/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as routes from '../../config/routes.config';

const { Title } = Typography;

const StyledWrapper = styled.div`
  min-height: 100vh;
  padding: 5% 0;
`;

const StyledCard = styled(Card)`
  padding: 5%;
`;

const StyledHead = styled.div`
  margin-bottom: 20px;
`;

export interface LoginDto {
  email: string;
  password: string;
  remember: boolean;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const { login: loginState, ...authState } = useSelector(
    (state: RootState) => state.auth
  );
  const login = (values: LoginDto) => {
    return dispatch(loginUser(values));
  };

  useEffect(() => {
    if (authState.isLoggedIn) return navigate(routes.DASHBOARD.path);
  }, [authState, navigate]);

  return (
    <StyledWrapper>
      <Container>
        <Row justify="center">
          <Col xs={24} md={18} sm={24} lg={14}>
            <StyledCard>
              <StyledHead>
                <Row justify="center">
                  <Title level={2}>{t('auth.login.title')}</Title>
                </Row>
                <Row justify="center">
                  <Title level={4}>{t('auth.login.subtitle')}</Title>
                </Row>
              </StyledHead>
              <Form
                name="login"
                initialValues={{ remember: true }}
                autoComplete="off"
                layout="vertical"
                validateTrigger={['onFinish']}
                onFinish={login}
              >
                <Form.Item
                  label={t('auth.email')}
                  name="email"
                  rules={[
                    { required: true, message: t('auth.error.required') },
                  ]}
                >
                  <Input
                    placeholder="e.g. kai@doe.com"
                    prefix={<UserOutlined />}
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  label={t('auth.password')}
                  name="password"
                  rules={[
                    { required: true, message: t('auth.error.required') },
                  ]}
                >
                  <Input.Password prefix={<LockOutlined />} size="large" />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>{t('auth.rememberMe')}</Checkbox>
                </Form.Item>

                {loginState.error && (
                  <Form.Item>
                    <Alert message={loginState.error} type="error" showIcon />
                  </Form.Item>
                )}

                <Form.Item>
                  <Button
                    loading={loginState.loading}
                    icon={<LoginOutlined />}
                    size="middle"
                    block
                    type="primary"
                    htmlType="submit"
                  >
                    {t('auth.login.submit')}
                  </Button>
                </Form.Item>
              </Form>
            </StyledCard>
          </Col>
        </Row>
      </Container>
    </StyledWrapper>
  );
};

export default Login;
