/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {
  Card,
  Col,
  Form,
  Input,
  Row,
  Typography,
  Select,
  Divider,
  FormInstance,
} from 'antd';
import ContentWithSider from 'apps/web/dashboard/src/components/content-with-sider';
import { useFindAllGradesQuery } from 'apps/web/dashboard/src/store/features/grades';
import AppUpload from 'apps/web/dashboard/src/components/upload';
import { Document, Grade } from '@prepa-sn/shared/interfaces';
import { CKEditor } from 'ckeditor4-react';
import { FC, useState } from 'react';
import dayjs from 'dayjs';
import { IPaginationLinks, IPaginationMeta, IPaginationOptions } from 'nestjs-typeorm-paginate';

const { Title } = Typography;
const { Option } = Select;

interface ICreateAndUpdateProps {
  onFinish: () => Promise<void>;
  form: FormInstance;
  initialValues?: Grade;
}

const CreateAndUpdate: FC<ICreateAndUpdateProps> = ({
  onFinish,
  form,
  initialValues,
}) => {
  const [pagination, setPagination] = useState<IPaginationOptions>({
    page: 1,
    limit: 10,
  });
  const {
    data: grades = {
      items: [],
      meta: {} as IPaginationMeta,
      links: {} as IPaginationLinks,
    },
    isLoading: gradesLoading,
    isFetching,
  } = useFindAllGradesQuery({
    ...pagination,
  });

  return (
    <ContentWithSider
      form={form}
      onFinish={onFinish}
      createdAt={dayjs(initialValues?.createdAt).format('DD/MM/YYYY:HH:mm:ss')}
      updatedAt={dayjs(initialValues?.updatedAt).format('DD/MM/YYYY:HH:mm:ss')}
      sidebarExtra={
        <Card>
          <Title style={{ margin: 0 }} level={4}>
            Relations
          </Title>
          <Divider />
          <Form.Item label="Grades" name="parent">
            <Select placeholder="Grades" loading={gradesLoading || isFetching}>
              {grades.items.map((item) => (
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
    </ContentWithSider>
  );
};

export default CreateAndUpdate;
