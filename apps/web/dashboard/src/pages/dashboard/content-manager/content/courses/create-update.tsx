/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {
  Col,
  Form,
  Input,
  Row,
  FormInstance,
  Card,
  Typography,
  Select,
  Divider,
} from 'antd';
import ContentWithSider from 'apps/web/dashboard/src/components/content-with-sider';
import AppUpload from 'apps/web/dashboard/src/components/upload';
import { Course, Document } from '@prepa-sn/shared/interfaces';
import { CKEditor } from 'ckeditor4-react';
import { FC } from 'react';
import { useFindAllGradesQuery } from 'apps/web/dashboard/src/store/features/grades';

const { Title } = Typography;
const { Option } = Select;

interface ICreateAndUpdateProps {
  onFinish: () => Promise<void>;
  form: FormInstance;
  initialValues?: Course;
}

const CreateAndUpdate: FC<ICreateAndUpdateProps> = ({
  onFinish,
  form,
  initialValues,
}) => {
  const { data: grades = [], isLoading: gradesloading } =
    useFindAllGradesQuery();

  return (
    <ContentWithSider
      form={form}
      onFinish={onFinish}
      sidebarExtra={
        <Card>
          <Title style={{ margin: 0 }} level={4}>
            Relations
          </Title>
          <Divider />
          <Form.Item
            rules={[{ required: true, message: 'Please select a grade' }]}
            label="Grades"
            name="grades"
          >
            <Select
              mode="multiple"
              allowClear
              placeholder="Grades"
              loading={gradesloading}
            >
              {grades.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Card>
      }
    >
      <Form.Item
        label="Title"
        rules={[{ required: true, message: 'Title is required' }]}
        name="title"
      >
        <Input size="middle" />
      </Form.Item>
      <Row gutter={10}>
        <Col span={12}>
          <Form.Item label="Image" name="image">
            <AppUpload
              multiple={false}
              selectedDocuments={
                initialValues?.image ? [initialValues?.image] : []
              }
              onSelect={(documents: Document[]) => {
                form.setFieldsValue({
                  image: documents[0] || null,
                });
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Video" name="video">
            <AppUpload
              multiple={false}
              selectedDocuments={
                initialValues?.video ? [initialValues?.video] : []
              }
              onSelect={(documents: Document[]) => {
                form.setFieldsValue({
                  video: documents[0] || null,
                });
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Description is required' }]}
      >
        <CKEditor
          initData={initialValues?.description}
          onChange={(evt) => {
            form.setFieldsValue({
              description: evt.editor.getData(),
            });
          }}
        />
      </Form.Item>

      <Form.Item label="Documents" name="documents">
        <AppUpload
          multiple={true}
          selectedDocuments={
            initialValues?.documents ? initialValues?.documents : []
          }
          onSelect={(documents: Document[]) => {
            form.setFieldsValue({
              documents,
            });
          }}
        />
      </Form.Item>
    </ContentWithSider>
  );
};

export default CreateAndUpdate;
