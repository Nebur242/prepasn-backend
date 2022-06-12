import { Admin } from '@prepa-sn/shared/interfaces';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Image,
  Input,
  message,
  Row,
  Typography,
} from 'antd';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ContentScroll from '../../../components/content-scroll';
import Icon from '../../../components/Icon';
import {
  useFindOneAdminQuery,
  useUpdateAdminMutation,
} from '../../../store/features/admin';

const { Title, Paragraph } = Typography;

const Profile = () => {
  const [activeTabKey, setActiveTabKey] = useState('informations');
  const user = useSelector((state: RootState) => state.user);

  const { isLoading } = useFindOneAdminQuery({ id: user.infos.uid });

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

  if (isLoading) return <p>Loading...</p>;

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
                src={`http://gravatar.com/avatar/${user?.infos?.uid}?d=identicon`}
              />
            </Row>
            <Title style={{ textAlign: 'center', marginTop: 20 }} level={4}>
              {user?.infos?.email}
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
  const user = useSelector((state: RootState) => state.user);
  const { data } = useFindOneAdminQuery({ id: user.infos.uid });
  const [form] = Form.useForm();

  const [
    updateAdmin,
    { isLoading: isUpdating, isSuccess: isUpdated, isError: hasError },
  ] = useUpdateAdminMutation();

  const onFinish = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      const updatedInstructor: Partial<Admin> = JSON.parse(
        JSON.stringify({
          ...values,
          id: data?.id,
        })
      );

      if (data?.uid) {
        updateAdmin({
          ...updatedInstructor,
          uid: data?.uid,
        });
      }
    } catch (error) {
      message.warning('Merci de vérifier les champs');
      console.log(error);
    }
  };

  useEffect(() => {
    if (isUpdated) {
      message.success('Étudiant a été modifié avec succès');
    }
    if (hasError) message.error('Une erreur est survenue');
  }, [isUpdated, hasError]);

  return (
    <Row>
      <Col span={24}>
        <Card>
          <Title level={4}>Profile</Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              phone: data.phone,
            }}
          >
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="Prénom" name="lastName">
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Nom" name="firstName">
                  <Input size="large" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Téléphone" name="phone">
                  <Input size="large" />
                </Form.Item>
              </Col>
              {/* <Col span={12}>
                <Form.Item label="Email" name="email">
                  <Input size="large" />
                </Form.Item>
              </Col> */}
              {/* <Col span={12}>
                                <Form.Item label="Email" name="email">
                                    <Input size="large" />
                                </Form.Item>
                            </Col> */}

              <Col span={24}>
                <Button
                  icon={<Icon type="EditOutlined" />}
                  type="primary"
                  size="large"
                  htmlType="submit"
                  block
                  loading={isUpdating}
                >
                  Mettre à jour les informations
                </Button>
              </Col>
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
              <Col span={24}>
                <Row gutter={30}>
                  <Col span={12}>
                    <Button
                      icon={<Icon type="EditOutlined" />}
                      type="primary"
                      size="large"
                      block
                    >
                      Mettre à jour le mot de passe
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
          </Form>
        </Card>
      </Col>
      <Divider />
    </Row>
  );
};

export default Profile;
