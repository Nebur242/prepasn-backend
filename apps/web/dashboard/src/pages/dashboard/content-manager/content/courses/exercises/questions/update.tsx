import { Question } from '@prepa-sn/shared/interfaces';
import { Form, message, Spin } from 'antd';
import {
  useFindOneQuestionQuery,
  useUpdateQuestionMutation,
} from '@prepa-sn/dashboard/store/features/questions';
import { FC, useEffect } from 'react';
import CreateUpdate from './create-update';

type UpdateProps = {
  question: Question;
};

const Update: FC<UpdateProps> = ({ question }) => {
  const [form] = Form.useForm();
  const { data, isLoading } = useFindOneQuestionQuery(question.id);

  const [
    updateQuestion,
    { isLoading: isUpdating, isSuccess: isUpdated, isError },
  ] = useUpdateQuestionMutation();

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      updateQuestion({
        ...values,
        id: question.id,
        exercise: data.exercise.id,
      });
    } catch (error) {
      message.warning('Merci de vérifier les champs');
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
      });
    }
  }, [data, form]);

  useEffect(() => {
    if (isUpdated) {
      message.success('Question a été modifiée avec succès');
    }
    if (isError) {
      message.error('Une erreur est survenue');
    }
  }, [isUpdated, isError]);

  if (isLoading) {
    return <Spin />;
  }

  return (
    <CreateUpdate
      form={form}
      onFinish={onFinish}
      isLoading={isUpdating}
      initialValues={data}
    />
  );
};

export default Update;
