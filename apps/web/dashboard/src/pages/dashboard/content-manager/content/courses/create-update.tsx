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

import { IPaginationOptions } from 'nestjs-typeorm-paginate';

import ContentWithSider from '@prepa-sn/dashboard/components/content-with-sider';
import AppUpload from '@prepa-sn/dashboard/components/upload';
import { Course, Document } from '@prepa-sn/shared/interfaces';
import { CKEditor } from 'ckeditor4-react';
import { FC, useState } from 'react';
import { useFindAllGradesQuery } from '@prepa-sn/dashboard/store/features/grades';
import dayjs from 'dayjs';
import { useFindAllCategoriesQuery } from '@prepa-sn/dashboard/store/features/categories';

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
  const [pagination] = useState<IPaginationOptions>({
    page: 1,
    limit: 10,
  });

  const [gradePagination] = useState<IPaginationOptions>({
    page: 1,
    limit: 10,
  });

  const {
    data: grades,
    isLoading: gradesLoading,
    isFetching: gradesFetching,
  } = useFindAllGradesQuery({
    ...gradePagination,
  });

  const { data: categories, isLoading: categoriesLoading } =
    useFindAllCategoriesQuery({
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
          <Form.Item
            rules={[{ required: true, message: 'Please select a grade' }]}
            label="Grades"
            name="grades"
          >
            <Select
              mode="multiple"
              allowClear
              placeholder="Grades"
              loading={gradesLoading || gradesFetching}
            >
              {grades?.items?.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Please select a grade' }]}
            label="Catgories"
            name="categories"
          >
            <Select
              mode="multiple"
              allowClear
              placeholder="Categories"
              loading={categoriesLoading}
            >
              {categories?.items?.map((item) => (
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
