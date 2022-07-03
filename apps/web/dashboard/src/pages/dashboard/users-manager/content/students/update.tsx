import { Student } from '@prepa-sn/shared/interfaces';
import { Form, message, Row, Spin } from 'antd';
import { useEffect } from 'react';
import ContentSectionWrapper from '@prepa-sn/dashboard/components/content-section-wrapper';
import { useParams } from 'react-router-dom';
import CreateAndUpdate from './create-update';
import { useFindOneUserQuery, useUpdateUserMutation } from '@prepa-sn/dashboard/store/features/users';

const UpdateStudent = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const { data, isLoading } = useFindOneUserQuery({
    id,
  });

  const [
    updateStudent,
    { isLoading: isUpdating, isSuccess: isUpdated, isError: hasError },
  ] = useUpdateUserMutation();

  const onFinish = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      const updatedStudent: Partial<Student> = JSON.parse(
        JSON.stringify({
          ...values,
          id: data?.id,
        })
      );

      if (data?.uid) {
        updateStudent({
          ...updatedStudent,
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
      // console.log(typeof dayjs(data.birthDate).format());
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
      description={`Classroom ID : ${data?.id}`}
      createButtonText="Update the grade"
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

export default UpdateStudent;
