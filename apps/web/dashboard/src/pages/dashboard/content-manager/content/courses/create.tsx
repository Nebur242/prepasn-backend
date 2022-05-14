/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Course } from '@prepa-sn/shared/interfaces';
import {
  Button,
  Col,
  Divider,
  Form,
  message,
  Row,
  Space,
  Typography,
} from 'antd';
import Icon from 'apps/web/dashboard/src/components/Icon';
import { useCreateCourseMutation } from 'apps/web/dashboard/src/store/features/courses';
import { useEffect } from 'react';
import CreateAndUpdate from './create-update';

const { Title, Text } = Typography;

const CreateCourse = () => {
  const [form] = Form.useForm();

  const [creteCourse, { isLoading, isSuccess, isError }] =
    useCreateCourseMutation();

  const onFinish = async () => {
    try {
      await form.validateFields();
      const values: Course = form.getFieldsValue();
      creteCourse(values);
    } catch (error) {
      message.warning('Merci de vérifier les champs');
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      message.success('Le cours a été crée avec succès');
      form.resetFields();
    }

    if (isError) {
      message.error('Une erreur est survenue');
    }
  }, [isSuccess, isError, form]);

  return (
    <div>
      <Row justify="space-between">
        <Col>
          <Title level={4}>Create a course</Title>
          <Text>Course ID </Text>
        </Col>
        <Col>
          <Space>
            <Button
              loading={isLoading}
              onClick={onFinish}
              type="primary"
              icon={<Icon type="PlusOutlined" />}
            >
              Save the course
            </Button>
          </Space>
        </Col>
      </Row>
      <Divider />
      <CreateAndUpdate form={form} onFinish={onFinish} />
    </div>
  );
};

export default CreateCourse;
