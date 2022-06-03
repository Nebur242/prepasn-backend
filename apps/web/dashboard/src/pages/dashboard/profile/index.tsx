import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Image,
  Input,
  Row,
  Typography,
} from 'antd';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import ContentScroll from '../../../components/content-scroll';
import Icon from '../../../components/Icon';

const { Title, Paragraph } = Typography;

const Profile = () => {
  const [activeTabKey, setActiveTabKey] = useState('informations');
  const user = useSelector((state: RootState) => state.user);
  // console.log(user);

  const tabListNoTitle = [
    {
      key: 'informations',
      tab: 'Informations',
    },
    {
      key: 'notifiations',
      tab: 'Notifiations',
    },
    {
      key: 'settings',
      tab: 'Paramètres',
    },
  ];

  const contentListNoTitle = {
    informations: <UserInfosForm />,
    settings: <p>settings content</p>,
    notifiations: <p>notifiations content</p>,
  };

  return (
    <Row gutter={10}>
      <Col span={8}>
        <ContentScroll>
          <Card>
            <Row justify="center">
              <Image
                style={{
                  borderRadius: '50%',
                }}
                src={`http://gravatar.com/avatar/${user.infos.uid}?d=identicon`}
              />
            </Row>
            <Title style={{ textAlign: 'center', marginTop: 20 }} level={4}>
              {user.infos.email}
            </Title>
            <Paragraph style={{ textAlign: 'center', marginTop: 20 }}>
              User informations
            </Paragraph>
          </Card>
        </ContentScroll>
      </Col>
      <Col span={16}>
        <ContentScroll>
          <Card
            style={{ width: '100%' }}
            tabList={tabListNoTitle}
            activeTabKey={activeTabKey}
            // tabBarExtraContent={<a href="#">More</a>}
            onTabChange={(key) => {
              setActiveTabKey(key);
            }}
          >
            {contentListNoTitle[activeTabKey]}
          </Card>
        </ContentScroll>
      </Col>
    </Row>
  );
};

export const UserInfosForm: FC = () => {
  return (
    <Row>
      <Col span={24}>
        <Card>
          <Title level={4}>Profile</Title>
          <Form layout="vertical">
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="Nom" name="lastname">
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Prénom" name="firstname">
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email" name="email">
                  <Input size="large" />
                </Form.Item>
              </Col>
              {/* <Col span={12}>
                                <Form.Item label="Email" name="email">
                                    <Input size="large" />
                                </Form.Item>
                            </Col> */}
            </Row>
          </Form>
        </Card>
      </Col>
      <Divider />

      <Col span={24}>
        <Card>
          <Title level={4}>Change password</Title>
          <Form layout="vertical">
            <Row gutter={20}>
              <Col span={24}>
                <Form.Item label="Password" name="password">
                  <Input.Password size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="New Password" name="newPassword">
                  <Input.Password size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Confirmation Password" name="confirmPassword">
                  <Input.Password size="large" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
      <Divider />

      <Col span={24}>
        <Row gutter={30}>
          <Col span={12}>
            <Button
              icon={<Icon type="EditOutlined" />}
              type="primary"
              size="large"
              block
            >
              Mettre à jour
            </Button>
          </Col>
          <Col span={12}>
            <Button
              icon={<Icon type="DeleteOutlined" />}
              ghost
              danger
              type="primary"
              size="large"
              block
            >
              Supprimer mon compte
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Profile;
