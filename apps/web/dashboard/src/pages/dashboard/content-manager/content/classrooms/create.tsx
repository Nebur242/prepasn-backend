/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Classroom } from '@prepa-sn/shared/interfaces';
import { Form, message } from 'antd';
import ContentSectionWrapper from 'apps/web/dashboard/src/components/content-section-wrapper';
import { useCreateClassroomMutation } from 'apps/web/dashboard/src/store/features/classrooms';
import { useEffect } from 'react';
import CreateAndUpdate from './create-update';

const CreateClassroom = () => {
  const [form] = Form.useForm();

  const [createClassroom, { isLoading, isSuccess, isError }] =
    useCreateClassroomMutation();

  const onFinish = async () => {
    try {
      await form.validateFields();
      const values: Classroom = form.getFieldsValue();
      console.log(values);
      createClassroom(values);
    } catch (error) {
      message.warning('Merci de vérifier les champs');
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      message.success('Le chapiter a été crée avec succès');
      form.resetFields();
    }
    if (isError) message.error('Une erreur est survenue');
  }, [isSuccess, isError, form]);

  return (
    <ContentSectionWrapper
      title={`Chapters`}
      description="Create Classroom"
      createButtonText="Add a new classroom"
      onCreate={onFinish}
      createButtonProps={{ loading: isLoading }}
    >
      <CreateAndUpdate form={form} onFinish={onFinish} />
    </ContentSectionWrapper>
  );
};

export default CreateClassroom;
