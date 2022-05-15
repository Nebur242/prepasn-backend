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

const { Title, Text } = Typography;
const { Option } = Select;

interface IContentWithSiderProps {
  children: React.ReactNode;
  form?: FormInstance;
  onFinish?: (values: unknown) => void;
  sidebarExtra?: React.ReactNode;
  initialValues?: Store;
}
const ContentWithSider: FC<IContentWithSiderProps> = ({
  children,
  onFinish,
  form,
  sidebarExtra,
  initialValues,
}) => {
  return (
    <Form
      validateTrigger={['onChange']}
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        ...(initialValues || {}),
        status: Status.ACTIVE,
        language: LANGUAGE.FR,
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
              <Text>Now </Text>
            </Row>

            <Row justify="space-between">
              <Title level={5}>By </Title>
              <Text>Now </Text>
            </Row>

            <Row justify="space-between">
              <Title level={5}>Last updated </Title>
              <Text>Now </Text>
            </Row>

            <Row justify="space-between">
              <Title level={5}>By </Title>
              <Text>Now </Text>
            </Row>

            <Divider />
            <Form.Item
              label="Langue"
              name="language"
              rules={[{ required: true, message: 'Language is required' }]}
            >
              <Select placeholder="Langues" >
                {Object.values(LANGUAGE).map((lang: LANGUAGE) => (
                  <Option key={lang} value={lang}>
                    {lang}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
            >
              <Select placeholder="Status" >
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
