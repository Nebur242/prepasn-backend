import { Exercise, Question } from '@prepa-sn/shared/interfaces';
import { Form, message } from 'antd';
import { useFindOneQuestionQuery } from 'apps/web/dashboard/src/store/features/questions';
import { FC, useEffect } from 'react';
import CreateUpdate from './create-update';

type UpdateProps = {
  exercise: Exercise;
  question: Question;
};

const Update: FC<UpdateProps> = ({ exercise, question }) => {
  const [form] = Form.useForm();
  const { data } = useFindOneQuestionQuery(question.id);
  console.log(data);

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
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

  return (
    <CreateUpdate
      form={form}
      onFinish={onFinish}
      isLoading={false}
      initialValues={data}
    />
  );
};

export default Update;
