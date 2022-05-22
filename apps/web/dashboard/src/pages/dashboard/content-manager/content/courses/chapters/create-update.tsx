/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Chapter, Document } from '@prepa-sn/shared/interfaces';
import {
  Card,
  FormInstance,
  Typography,
  Select,
  Divider,
  Form,
  Col,
  Row,
  Input,
} from 'antd';
import ContentWithSider from 'apps/web/dashboard/src/components/content-with-sider';
import { useFindOneCourseQuery } from 'apps/web/dashboard/src/store/features/courses';
import { FC } from 'react';
import { CKEditor } from 'ckeditor4-react';
import AppUpload from 'apps/web/dashboard/src/components/upload';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;

interface ICreateAndUpdateProps {
  onFinish: () => Promise<void>;
  form: FormInstance;
  initialValues?: Chapter;
}

const CreateUpdate: FC<ICreateAndUpdateProps> = ({
  onFinish,
  form,
  initialValues,
}) => {
  const { courseId } = useParams<{ courseId: string }>();
  const { isLoading: courseLoading, data: course } =
    useFindOneCourseQuery(courseId);

  return (
    <ContentWithSider
      form={form}
      onFinish={onFinish}
      createdAt={dayjs(initialValues?.createdAt).format('DD/MM/YYYY:HH:mm:ss')}
      updatedAt={dayjs(initialValues?.updatedAt).format('DD/MM/YYYY:HH:mm:ss')}
      initialValues={initialValues}
      sidebarExtra={
        <Card>
          <Title style={{ margin: 0 }} level={4}>
            Relations
          </Title>
          <Divider />
          <Form.Item
            rules={[{ required: true, message: 'Course is required' }]}
            label="Course"
            name="course"
          >
            <Select placeholder="Courses" loading={courseLoading} allowClear>
              {course && (
                <Option key={course.id} value={course.id}>
                  {course.title}
                </Option>
              )}
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

export default CreateUpdate;
