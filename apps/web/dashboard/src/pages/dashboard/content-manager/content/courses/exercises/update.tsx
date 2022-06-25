/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Exercise } from '@prepa-sn/shared/interfaces';
import { Divider, Form, message, Spin } from 'antd';
import ContentSectionWrapper from 'apps/web/dashboard/src/components/content-section-wrapper';
import {
  useFindOneExerciseQuery,
  useUpdateExerciseMutation,
} from 'apps/web/dashboard/src/store/features/exercises';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CreateAndUpdate from './create-update';
import Questions from './questions';

const Update = () => {
  const [form] = Form.useForm();

  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useFindOneExerciseQuery(id);
  const [updateExercise, { isLoading: isUpdating, isSuccess, isError }] =
    useUpdateExerciseMutation();

  const onFinish = async () => {
    try {
      await form.validateFields();
      const values: Exercise = form.getFieldsValue();
      if (data?.id) {
        updateExercise({
          ...values,
          id: data.id,
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
        ...data,
      });
    }
  }, [data, form]);

  useEffect(() => {
    if (isSuccess) {
      message.success("L'exercice a été modifié avec succès");
    }

    if (isError) {
      message.error('Une erreur est survenue');
    }
  }, [isSuccess, isError]);

  if (isLoading) {
    return <Spin />;
  }

  return (
    <ContentSectionWrapper
      title={`Exercise : ${data?.title}`}
      description="Update Chapter"
      createButtonText="Update chapter"
      createButtonProps={{ loading: isUpdating }}
    >
      <CreateAndUpdate
        initialValues={data}
        form={form}
        onFinish={onFinish}
      />
      <Divider />
      <Questions exercise={data} />
    </ContentSectionWrapper>
  );
};

export default Update;
