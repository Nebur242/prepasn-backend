import { LANGUAGE, Status } from '@prepa-sn/shared/enums';
import {
  Alert,
  Card,
  Col,
  Form,
  FormInstance,
  Row,
  Typography,
  Select,
  Divider,
} from 'antd';
import { Store } from 'antd/lib/form/interface';
import { FC } from 'react';
import { useSelector } from 'react-redux';

const { Title, Text } = Typography;
const { Option } = Select;

interface IContentWithSiderProps {
  children: React.ReactNode;
  form?: FormInstance;
  onFinish?: (values: unknown) => void;
  sidebarExtra?: React.ReactNode;
  initialValues?: Store;
  createdAt: string;
  updatedAt: string;
  hasLanguage?: boolean;
}

const ContentWithSider: FC<IContentWithSiderProps> = ({
  children,
  onFinish,
  form,
  sidebarExtra,
  initialValues = {},
  createdAt,
  updatedAt,
  hasLanguage = true,
}) => {
  const { infos: user } = useSelector((state: RootState) => state.user);

  return (
    <Form
      validateTrigger={['onChange']}
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        status: Status.ACTIVE,
        language: LANGUAGE.FR,
        ...initialValues,
      }}
    >
      <Row gutter={10}>
        <Col span={17}>
          <Card>{children}</Card>
        </Col>
        <Col span={7}>
          <Alert
            showIcon
            style={{ marginBottom: 10 }}
            message="Editing draft version"
            type="info"
          />
          <Card style={{ marginBottom: 10 }}>
            <Title style={{ margin: 0 }} level={4}>
              Information
            </Title>
            <Divider />
            <Row justify="space-between">
              <Title level={5}>Created </Title>
              <Text>{createdAt}</Text>
            </Row>

            <Row justify="space-between">
              <Title level={5}>By </Title>
              <Text>{user.email} </Text>
            </Row>

            <Row justify="space-between">
              <Title level={5}>Last updated </Title>
              <Text>{updatedAt}</Text>
            </Row>

            <Row justify="space-between">
              <Title level={5}>By </Title>
              <Text>{user.email}</Text>
            </Row>

            <Divider />
            {hasLanguage && (
              <Form.Item
                label="Langue"
                name="language"
                rules={[{ required: true, message: 'Language is required' }]}
              >
                <Select placeholder="Langues">
                  {Object.values(LANGUAGE).map((lang: LANGUAGE) => (
                    <Option key={lang} value={lang}>
                      {lang}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}
            <Form.Item name="status" label="Status">
              <Select placeholder="Status">
                <Option value={Status.ACTIVE}>Active</Option>
                <Option value={Status.DRAFT}>Draft</Option>
                <Option value={Status.INACTIVE}>Inactive</Option>
              </Select>
            </Form.Item>
          </Card>
          {sidebarExtra}
        </Col>
      </Row>
    </Form>
  );
};

export default ContentWithSider;
