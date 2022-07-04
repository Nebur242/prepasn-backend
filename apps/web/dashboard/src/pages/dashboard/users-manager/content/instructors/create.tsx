import { Status } from '@prepa-sn/shared/enums';
import { Form, message } from 'antd';
import ContentSectionWrapper from '@prepa-sn/dashboard/components/content-section-wrapper';
import { useEffect } from 'react';
import CreateAndUpdate from './create-update';
import { useCreateInstructorMutation } from '@prepa-sn/dashboard/store/features/users';

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
