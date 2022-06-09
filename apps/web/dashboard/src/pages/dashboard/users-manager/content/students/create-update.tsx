/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { FC } from 'react';
import { Student } from '@prepa-sn/shared/interfaces';
import { Col, Form, FormInstance, Row, Input } from 'antd';
import ContentWithSider from 'apps/web/dashboard/src/components/content-with-sider';
import dayjs from 'dayjs';
import DatePicker from 'apps/web/dashboard/src/components/DatePicker';

interface ICreateAndUpdateProps {
  onFinish: () => Promise<void>;
  form: FormInstance;
  initialValues?: Student;
  isUpdate?: boolean;
}

const CreateAndUpdate: FC<ICreateAndUpdateProps> = ({
  onFinish,
  form,
  initialValues,
  isUpdate = false,
}) => {
  return (
    <ContentWithSider
      form={form}
      onFinish={onFinish}
      createdAt={dayjs(initialValues?.createdAt).format('DD/MM/YYYY:HH:mm:ss')}
      updatedAt={dayjs(initialValues?.updatedAt).format('DD/MM/YYYY:HH:mm:ss')}
      hasLanguage={false}
    >
      <Row gutter={10}>
        <Col span={12}>
          <Form.Item label="Prénom" name="firstName">
            <Input size="middle" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Nom" name="lastName">
            <Input size="middle" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Date de naissance" name="birthDate">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="téléphone" name="phone">
            <Input size="middle" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: !isUpdate,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input type="email" size="middle" />
          </Form.Item>
        </Col>

        {!isUpdate && (
          <>
            <Col span={12}>
              <Form.Item
                label="mot de passe"
                name="password"
                rules={[
                  { required: !isUpdate, message: 'mot de passe est requis' },
                ]}
              >
                <Input.Password size="middle" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Confirmer mot de passe"
                name="confirm_password"
                rules={[
                  { required: !isUpdate },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('Les mots de passe ne correspondent :(')
                      );
                    },
                  }),
                ]}
              >
                <Input.Password size="middle" />
              </Form.Item>
            </Col>
          </>
        )}

        {/* <Col span={24}>
                    <Button icon={
                        <Icon type="PlusOutlined" />
                    } type="primary" block htmlType="submit" onClick={onFinish}>Ajouter un étudiant</Button>
                </Col> */}
      </Row>
    </ContentWithSider>
  );
};

export default CreateAndUpdate;
