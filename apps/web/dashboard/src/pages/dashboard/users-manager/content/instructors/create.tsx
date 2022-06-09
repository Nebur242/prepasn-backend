/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Status } from '@prepa-sn/shared/enums';
import { Form, message } from 'antd';
import ContentSectionWrapper from 'apps/web/dashboard/src/components/content-section-wrapper';
import { useCreateInstructorMutation } from 'apps/web/dashboard/src/store/features/instructors';
import { useEffect } from 'react';
import CreateAndUpdate from './create-update';

const CreateInstructor = () => {
  const [form] = Form.useForm();

  const [createInstructor, { isLoading, isSuccess, isError }] =
    useCreateInstructorMutation();

  const onFinish = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      const { birthDate, language, confirm_password, ...rest } = values;
      createInstructor({
        ...rest,
        status: Status.PENDING,
        birthDate: birthDate.format(),
      });
    } catch (error) {
      message.warning('Merci de vérifier les champs');
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      message.success('Professeur a été crée avec succès');
      form.resetFields();
    }
    if (isError) message.error('Une erreur est survenue');
  }, [isSuccess, isError, form]);

  return (
    <ContentSectionWrapper
      title={`Professeurs`}
      description="Tous les professeurs"
      createButtonText="Ajouter un professeur"
      createButtonProps={{ loading: isLoading }}
      onCreate={onFinish}
    >
      <CreateAndUpdate form={form} onFinish={onFinish} />
    </ContentSectionWrapper>
  );
};

export default CreateInstructor;
