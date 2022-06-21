import React, { useState } from 'react';
import * as routes from '../../config/routes.config';
import { Route } from '../../config/routes.config';
import {
  Button,
  Layout,
  Menu,
  Image,
  Row,
  Col,
  Avatar,
  Space,
  Popover,
  Popconfirm,
  Badge,
  Dropdown,
} from 'antd';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon';
import logo from '../../../public/images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { logoutUser } from '../../store/features/auth';
import { User } from '../../store/features/user';

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
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const toggle = () => setCollapsed((prev) => !prev);

  const setNestedMenu = (_routes: Route[]): MenuItem[] => {
    return _routes.map((route: Route, index: number) => {
      return {
        key: index.toString(),
        icon: <Icon type={route?.icon} />,
        label: <NavLink to={route.path}>{t(`menu.${route.name}`)}</NavLink>,
      };
    });
  };

  const filterRouteAccess = (_routes: Route[], _user: User): Route[] => {
    return _routes.filter((route: Route) => {
      return route.access.length < 1 ? true : route.access.some((access: string) =>
        _user.roles.includes(access)
      );
    });
  };

  const filterUnusedRoutes = (_routes: Route[]): Route[] => {
    return _routes.filter((route: Route) => {
      return route.name !== 'unauthorized';
    });
  };

  const content = (
    <div>
      <Button
        onClick={() => navigate('/admin/profile')}
        icon={<Icon type="UserOutlined" />}
        style={{
          marginBottom: '10px',
        }}
        ghost
        block
        type="primary"
      >
        Profile
      </Button>

      <Popconfirm
        placement="bottomRight"
        title="Are you sure to log out ?"
        onConfirm={() => dispatch(logoutUser())}
        onCancel={() => console.log('cancel')}
        okText="Yes"
        cancelText="No"
      >
        <Button
          icon={<Icon type="LogoutOutlined" />}
          ghost
          danger
          block
          type="primary"
        >
          Déconnexion
        </Button>
      </Popconfirm>
    </div>
  );

  const menu = (
    <Menu
      items={[
        {
          label: <a href="https://www.antgroup.com">1st menu item</a>,
          key: '0',
        },
        {
          label: <a href="https://www.aliyun.com">2nd menu item</a>,
          key: '1',
        },

        {
          label: '3rd menu item',
          key: '3',
        },
      ]}
    />
  );

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Row
          gutter={5}
          style={{
            minHeight: 64,
            marginBottom: 20,
            padding: '0 5px',
            paddingLeft: 24,
            borderBottom: '1px solid #f3f0ff',
          }}
          align="middle"
        >
          <Col>
            <Image height={35} src={logo} />
          </Col>
        </Row>
        <Menu
          theme={theme}
          mode="inline"
          defaultSelectedKeys={['0']}
          items={setNestedMenu(
            filterRouteAccess(filterUnusedRoutes(DASHBOARD.routes), user.infos)
          )}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: '0 10px' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Button
                type="text"
                onClick={toggle}
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              />
            </Col>
            <Col>
              <Space>
                <Button type="text">
                  <div style={{ paddingTop: 20 }}>
                    <Dropdown
                      placement="bottom"
                      overlay={menu}
                      trigger={['click']}
                    >
                      <Badge count={5}>
                        <BellOutlined style={{ fontSize: 25 }} />
                      </Badge>
                    </Dropdown>
                  </div>
                </Button>
                <Popover
                  placement="bottomRight"
                  content={content}
                  title="Paramètre"
                >
                  <Button
                    type="text"
                    icon={
                      <Avatar
                        style={{ marginRight: 10 }}
                        src={`http://gravatar.com/avatar/${user?.infos?.uid}?d=identicon`}
                      />
                    }
                  >
                    {user?.infos?.email}
                  </Button>
                </Popover>
                <Button
                  shape="circle"
                  type="primary"
                  icon={<Icon type="TranslationOutlined" />}
                />
              </Space>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            padding: 15,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
