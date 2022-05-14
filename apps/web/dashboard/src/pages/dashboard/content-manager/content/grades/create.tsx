/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { useEffect } from 'react';
import {
  Button,
  Col,
  Divider,
  Form,
  Row,
  Space,
  Typography,
  message,
} from 'antd';
import Icon from 'apps/web/dashboard/src/components/Icon';
import { useCreateGradeMutation } from 'apps/web/dashboard/src/store/features/grades';
import CreateAndUpdate from './create-update';
import { Grade } from '@prepa-sn/shared/interfaces';

const { Title, Text } = Typography;

const CreateGrade = () => {
  const [form] = Form.useForm();

  const [createGrade, { isLoading, isSuccess, isError }] =
    useCreateGradeMutation();

  const onFinish = async () => {
    try {
      await form.validateFields();
      const values: Grade = form.getFieldsValue();
      createGrade(values);
    } catch (error) {
      message.warning('Merci de vérifier les champs');
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      message.success('La section a été crée avec succès');
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
          <Title level={4}>Create a grade</Title>
          <Text>Grade ID </Text>
        </Col>
        <Col>
          <Space>
            <Button
              loading={isLoading}
              onClick={onFinish}
              type="primary"
              icon={<Icon type="PlusOutlined" />}
            >
              Save the grade
            </Button>
          </Space>
        </Col>
      </Row>
      <Divider />
      <CreateAndUpdate form={form} onFinish={onFinish} />
    </div>
  );
};

export default CreateGrade;
