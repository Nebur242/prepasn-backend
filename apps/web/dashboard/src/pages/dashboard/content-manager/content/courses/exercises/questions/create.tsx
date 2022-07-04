import { Exercise } from '@prepa-sn/shared/interfaces';
import { Form, message } from 'antd';
import { useCreateQuestionMutation } from '@prepa-sn/dashboard/store/features/questions';
import { FC, useEffect } from 'react';
import CreateUpdate from './create-update';

type CreateProps = {
  exercise: Exercise;
};

const Create: FC<CreateProps> = ({ exercise }) => {
  const [form] = Form.useForm();
  const [createQuestion, { isLoading, isSuccess, isError }] =
    useCreateQuestionMutation();

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      createQuestion({
        ...values,
        exercise: exercise.id,
      });
    } catch (error) {
      message.warning('Merci de vérifier les champs');
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      message.success('Question a été crée avec succès');
      form.resetFields();
    }
    if (isError) {
      message.error('Une erreur est survenue');
    }
  }, [isSuccess, isError, form]);

  return <CreateUpdate form={form} onFinish={onFinish} isLoading={isLoading} />;
};

export default Create;
