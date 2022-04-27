import React, { useState } from 'react';
import * as routes from '../../config/routes.config';
import { Route } from '../../config/routes.config';
import { Button, Layout, Menu, Image, Row, Col } from 'antd';

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { NavLink, Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const DASHBOARD = routes.DASHBOARD;

interface MenuItem {
    key: string;
    label: React.ReactNode;
    icon: React.ReactNode;
    children?: MenuItem[];
}

const setNestedMenu = (routes: Route[]): MenuItem[] => {
    return routes.map((route: Route, index: number) => {
        // if (route.routes.length > 0) {
        //     return {
        //         key: index.toString(),
        //         icon: <UserOutlined />,
        //         label: (
        //             <NavLink to={route.path}>{route.name}</NavLink>
        //         ),
        //         children: setNestedMenu(route.routes)
        //     }
        // }
        return {
            key: index.toString(),
            icon: <UserOutlined />,
            label: (
                <NavLink to={route.path}>{route.name}</NavLink>
            ),
        }
    })
}

const Dashboard = () => {

    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [theme,] = React.useState<'dark' | 'light' | undefined>(undefined);


    const toggle = () => {
        setCollapsed(
            prev => !prev
        );
    };

    return (
        <Layout style={{ height: "100vh" }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Row gutter={5} className="logo" style={{ minHeight: 64, padding: '0 5px', paddingLeft: 24 }} align='middle'>
                    <Col ><Image height={40} src="https://api-7idkq.strapidemo.com/admin/15026a3d58aeb2828134.png" /></Col>
                </Row>
                <Menu
                    theme={theme}
                    mode="inline"
                    defaultSelectedKeys={['0']}
                    items={setNestedMenu(DASHBOARD.routes)}
                />
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <Button type='text' onClick={toggle} icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} />
                </Header>
                <Content style={{
                    padding: 15,
                }} className="site-layout-background">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}



export default Dashboard;
