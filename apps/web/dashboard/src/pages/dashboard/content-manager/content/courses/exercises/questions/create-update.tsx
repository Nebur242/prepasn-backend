import { Document, Question } from '@prepa-sn/shared/interfaces';
import { Button, Checkbox, Col, Form, FormInstance, Input, Row } from 'antd';
import AppUpload from 'apps/web/dashboard/src/components/upload';
import { FC } from 'react';
import { CKEditor } from 'ckeditor4-react';
import Icon from 'apps/web/dashboard/src/components/Icon';

type ICreateAndUpdateProps = {
  onFinish: () => Promise<void>;
  form: FormInstance;
  initialValues?: Question;
  isLoading?: boolean;
};

const CreateUpdate: FC<ICreateAndUpdateProps> = ({
  form,
  initialValues,
  onFinish,
  isLoading,
}) => {
  return (
    <div>
      <Form
        initialValues={{
          isCorrect: false,
          ...initialValues,
        }}
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          hasFeedback
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
          hasFeedback
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

        <Form.Item name="isCorrect" valuePropName="checked">
          <Checkbox>Réponse juste ?</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            loading={isLoading}
            icon={<Icon type="PlusOutlined" />}
            block
            type="primary"
            htmlType="submit"
          >
            Ajouter
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateUpdate;
