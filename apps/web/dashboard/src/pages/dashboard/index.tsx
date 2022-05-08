import React, { useState } from 'react';
import * as routes from '../../config/routes.config';
import { Route } from '../../config/routes.config';
import { Button, Layout, Menu, Image, Row, Col, Avatar, Space, Popover, Popconfirm } from 'antd';

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon';
import logo from "../../assets/images/logo.png";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { logoutUser } from '../../store/features/auth';

const { Header, Sider, Content } = Layout;

const { DASHBOARD } = routes;

export interface MenuItem {
    key: string;
    label: React.ReactNode;
    icon: React.ReactNode;
    children?: MenuItem[];
}

const Dashboard = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [theme] = React.useState<'dark' | 'light' | undefined>(undefined);
    const { t } = useTranslation();
    const dispatch: AppDispatch = useDispatch()

    const toggle = () => setCollapsed(prev => !prev);

    const setNestedMenu = (routes: Route[]): MenuItem[] => {
        return routes.map((route: Route, index: number) => {
            return {
                key: index.toString(),
                icon: <Icon type={route?.icon} />,
                label: (
                    <NavLink to={route.path}>{t(`menu.${route.name}`)}</NavLink>
                ),
            }
        })
    }


    const content = (
        <div>
            <Popconfirm
                placement="bottomRight"
                title="Are you sure to log out ?"
                onConfirm={() => dispatch(logoutUser())}
                onCancel={() => console.log('cancel')}
                okText="Yes"
                cancelText="No"
            >
                <Button icon={<Icon type="LogoutOutlined" />} ghost danger block type="primary">Déconnexion</Button>
            </Popconfirm>
        </div>
    );

    return (
        <Layout style={{ height: "100vh" }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Row gutter={5}
                    style={{ minHeight: 64, marginBottom: 20, padding: '0 5px', paddingLeft: 24, borderBottom: '1px solid #f3f0ff' }} align='middle'>
                    <Col ><Image height={35} src={logo} /></Col>
                </Row>
                <Menu
                    theme={theme}
                    mode="inline"
                    defaultSelectedKeys={['0']}
                    items={setNestedMenu(DASHBOARD.routes)}
                />
            </Sider>
            <Layout >
                <Header style={{ padding: "0 10px" }}>
                    <Row justify='space-between' align='middle'>
                        <Col>
                            <Button type='text' onClick={toggle} icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} />
                        </Col>
                        <Col>
                            <Space>
                                <Popover placement="bottomRight" content={content} title="Paramètre">
                                    <Avatar icon={<Icon type="UserOutlined" />} />
                                </Popover>
                                <Button shape="circle" type='primary' icon={<Icon type="TranslationOutlined" />} />
                            </Space>
                        </Col>
                    </Row>
                </Header>
                <Content style={{
                    padding: 15,
                }} >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default Dashboard;
