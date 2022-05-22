/* eslint-disable jsx-a11y/accessible-emoji */
import { Button, Col, Divider, Row, Tag, Typography, Menu } from 'antd';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Icon from '../../../components/Icon';
const { Title, Paragraph } = Typography;

const ContentManager = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const MENU_ITEMS = [
    {
      key: '1',
      icon: null,
      label: <NavLink to="grades">Grades</NavLink>,
    },
    {
      key: '2',
      icon: null,
      label: <NavLink to="courses">Courses</NavLink>,
    },
    {
      key: '3',
      icon: null,
      label: <NavLink to="classrooms">Classes</NavLink>,
    },
  ];
  return (
    <Row>
      <Col span={4} style={{ borderRight: '1px solid rgb(220, 220, 228)' }}>
        <Row justify="space-between" style={{ padding: '0 5px' }}>
          <Title level={4}>Content 👋</Title>
          <Button icon={<Icon type="SearchOutlined" />} />
        </Row>
        <Divider />
        <Row style={{ marginBottom: 20 }} justify="space-between">
          <Paragraph style={{ margin: 0 }}>Collection type</Paragraph>
          <Tag>{MENU_ITEMS.length}</Tag>
        </Row>
        <Menu
          style={{ backgroundColor: 'transparent' }}
          defaultSelectedKeys={['1']}
          mode="inline"
          items={MENU_ITEMS}
        />
      </Col>
      <Col
        span={20}
        style={{
          padding: '0 2%',
          maxHeight: 'calc( 100vh - 94px )',
          overflowY: 'hidden',
        }}
      >
        <Button
          onClick={goBack}
          style={{ paddingLeft: 0, marginBottom: 20 }}
          type="link"
          icon={<Icon type="ArrowLeftOutlined" />}
        >
          Back
        </Button>
        <Outlet />
      </Col>
    </Row>
  );
};

export default ContentManager;
