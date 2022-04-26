import React, { useState } from 'react';
import { Avatar, Space, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { SmileOutlined } from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-layout';
import ProLayout, {
  PageContainer,
  SettingDrawer,
} from '@ant-design/pro-layout';

const content = (
  <p>hello</p>
  // <Descriptions size="small" column={2}>
  //     <Descriptions.Item label="创建人">张三</Descriptions.Item>
  //     <Descriptions.Item label="联系方式">
  //         <a>421421</a>
  //     </Descriptions.Item>
  //     <Descriptions.Item label="创建时间">2017-01-10</Descriptions.Item>
  //     <Descriptions.Item label="更新时间">2017-10-10</Descriptions.Item>
  //     <Descriptions.Item label="备注">中国浙江省杭州市西湖区古翠路</Descriptions.Item>
  // </Descriptions>
);

const defaultProps = {
  route: {
    path: '/',
    routes: [
      {
        path: '/welcome',
        name: '欢迎',
        icon: <SmileOutlined />,
        component: './Welcome',
      },
    ],
  },
  location: {
    pathname: '/',
  },
};

const Dashboard = () => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
    navTheme: 'dark',
    layout: 'side',
    contentWidth: 'Fluid',
    headerHeight: 48,
    primaryColor: '#722ED1',
    fixedHeader: true,
  });
  const [pathname, setPathname] = useState('/welcome');

  return (
    <div id="test-pro-layout">
      <ProLayout
        {...defaultProps}
        title="PrepaSn"
        location={{
          pathname,
        }}
        waterMarkProps={{
          content: 'Pro Layout',
        }}
        menuFooterRender={(props: any) => {
          return (
            <a
              style={{
                lineHeight: '48rpx',
                display: 'flex',
                height: 48,
                color: 'rgba(255, 255, 255, 0.65)',
                alignItems: 'center',
              }}
              href="https://preview.pro.ant.design/dashboard/analysis"
              target="_blank"
              rel="noreferrer"
            >
              <img
                alt="pro-logo"
                src="https://procomponents.ant.design/favicon.ico"
                style={{
                  width: 16,
                  height: 16,
                  margin: '0 16px',
                  marginRight: 10,
                }}
              />
              {!props?.collapsed && 'Prepasn'}
            </a>
          );
        }}
        onMenuHeaderClick={(e: any) => console.log(e)}
        menuItemRender={(item: any, dom: any) => (
          <a
            onClick={() => {
              setPathname(item.path || '/welcome');
            }}
          >
            {dom}
          </a>
        )}
        rightContentRender={() => (
          <Row align="middle">
            <Space>
              <span>hello</span>
              <Avatar shape="square" size="small" icon={<UserOutlined />} />
            </Space>
          </Row>
        )}
        {...settings}
      >
        <PageContainer content={content}></PageContainer>
      </ProLayout>
      <SettingDrawer
        pathname={pathname}
        enableDarkTheme
        getContainer={() => document.getElementById('test-pro-layout')}
        settings={settings}
        onSettingChange={(changeSetting) => {
          setSetting(changeSetting);
        }}
        disableUrlParams={false}
      />
    </div>
  );
};

export default Dashboard;
