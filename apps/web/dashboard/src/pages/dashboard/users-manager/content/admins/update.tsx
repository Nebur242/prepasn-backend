import { useEffect } from 'react';
import { Admin } from '@prepa-sn/shared/interfaces';
import { Form, message, Row, Spin } from 'antd';
import ContentSectionWrapper from '@prepa-sn/dashboard/components/content-section-wrapper';

import { useParams } from 'react-router-dom';
import CreateAndUpdate from './create-update';
import {
  useFindOneUserQuery,
  useUpdateUserMutation,
} from '@prepa-sn/dashboard/store/features/users';

const UpdateAdmin = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const { data, isLoading } = useFindOneUserQuery({
    id,
  });

  const [
    updateAdmin,
    { isLoading: isUpdating, isSuccess: isUpdated, isError: hasError },
  ] = useUpdateUserMutation();

  const onFinish = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      const updatedInstructor: Partial<Admin> = JSON.parse(
        JSON.stringify({
          ...values,
          id: data?.id,
        })
      );

      if (data?.uid) {
        updateAdmin({
          ...updatedInstructor,
          uid: data?.uid,
        });
      }
    } catch (error) {
      message.warning('Merci de vérifier les champs');
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        firstName: data.firstName,
        lastName: data.lastName,
        // birthDate: dayjs(data.birthDate),
        email: data.email,
        phone: data.phone,
        status: data.status,
      });
    }
  }, [data, form]);

  useEffect(() => {
    if (isUpdated) {
      message.success('Étudiant a été modifié avec succès');
    }
    if (hasError) message.error('Une erreur est survenue');
  }, [isUpdated, hasError]);

  if (isLoading)
    return (
      <Row justify="center">
        <Spin tip="Loading..." />
      </Row>
    );

  return (
    <ContentSectionWrapper
      title={`Update the entry : ${data?.id}`}
      description={`Instructor ID : ${data?.id}`}
      createButtonText="Update the Instructor"
      onCreate={onFinish}
      createButtonProps={{ loading: isUpdating }}
    >
      <CreateAndUpdate
        isUpdate={true}
        initialValues={data}
        form={form}
        onFinish={onFinish}
      />
    </ContentSectionWrapper>
  );
};

export default UpdateAdmin;
