/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { useEffect } from 'react';
import { Form, message } from 'antd';
import { useCreateGradeMutation } from 'apps/web/dashboard/src/store/features/grades';
import CreateAndUpdate from './create-update';
import { Grade } from '@prepa-sn/shared/interfaces';
import ContentSectionWrapper from 'apps/web/dashboard/src/components/content-section-wrapper';

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
    <ContentSectionWrapper
      title="Create a grade"
      description="Grade ID"
      createButtonText="Save the grade"
      onCreate={onFinish}
      createButtonProps={{ loading: isLoading }}
    >
      <CreateAndUpdate form={form} onFinish={onFinish} />
    </ContentSectionWrapper>
  );
};

export default CreateGrade;
