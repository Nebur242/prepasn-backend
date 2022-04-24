// import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Typography, Card, Row, Col, Form, Input, Checkbox, Button } from 'antd';
import { UserOutlined, LoginOutlined, LockOutlined } from '@ant-design/icons'
import Container from '../../components/container';
import { loginUser } from '../../store/features/auth/authSlice';
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store';

const { Title } = Typography

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
    const dispatch: AppDispatch = useDispatch();

    const login = (values: LoginDto) => {
        return dispatch(loginUser(values));
    }

    return (
        <StyledWrapper>
            <Container>
                <Row justify='center'>
                    <Col xs={24} md={18} sm={24} lg={14} >
                        <StyledCard>
                            <StyledHead>
                                <Row justify='center' style={{ marginBottom: 10 }}>
                                    <img width={80} src="https://api-c14a1.strapidemo.com/admin/fde9b1ad0670d29a2516.png" alt="" />
                                </Row>
                                <Row justify='center'>
                                    <Title level={2}>Welcome</Title>
                                </Row>
                                <Row justify='center'>
                                    <Title level={4}>Log in to your admin account</Title>
                                </Row>
                            </StyledHead>
                            <Form
                                name="login"
                                initialValues={{ remember: true }}
                                autoComplete="off"
                                layout='vertical'
                                validateTrigger={['onFinish']}
                                onFinish={login}
                            >
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input placeholder='e.g. kai@doe.com' prefix={<UserOutlined />} size='large' />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password prefix={<LockOutlined />} size='large' />
                                </Form.Item>

                                <Form.Item name="remember" valuePropName="checked" >
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <Form.Item >
                                    <Button icon={<LoginOutlined />} size='middle' block type="primary" htmlType="submit">
                                        Login
                                    </Button>
                                </Form.Item>
                            </Form>
                        </StyledCard>
                    </Col>
                </Row>
            </Container>
        </StyledWrapper>
    )
}

export default Login;

