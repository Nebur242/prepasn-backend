/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Grade } from '@prepa-sn/shared/interfaces';
import { Form, message, Row, Spin } from 'antd';
import ContentSectionWrapper from 'apps/web/dashboard/src/components/content-section-wrapper';
import {
  useFindOneGradeQuery,
  useUpdateGradeMutation,
} from 'apps/web/dashboard/src/store/features/grades';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CreateAndUpdate from './create-update';

const UpdateGrade = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const { data, isLoading } = useFindOneGradeQuery(id);

  const [
    updateGrade,
    { isLoading: isUpdating, isSuccess: isUpdated, isError: hasError },
  ] = useUpdateGradeMutation();

  const onFinish = async () => {
    try {
      await form.validateFields();
      const values: Grade = form.getFieldsValue();
      if (data?.id) {
        updateGrade({
          ...values,
          id: data?.id,
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
        image: data.image ? data.image?.id : null,
        video: data.video ? data.video?.id : null,
        parent: data.parent ? data.parent?.id : null,
      });
    }
  }, [data, form]);

  useEffect(() => {
    if (isUpdated) {
      message.success('La section a été crée avec succès');
    }

    if (hasError) {
      message.error('Une erreur est survenue');
    }
  }, [isUpdated, hasError, form]);

  if (isLoading)
    return (
      <Row justify="center">
        <Spin tip="Loading..." />
      </Row>
    );

  return (
    <ContentSectionWrapper
      title={`Update the entry : ${data?.title}`}
      description={`Grade ID : ${data?.id}`}
      createButtonText="Update the grade"
      onCreate={onFinish}
      createButtonProps={{ loading: isUpdating }}
    >
      <CreateAndUpdate initialValues={data} form={form} onFinish={onFinish} />
    </ContentSectionWrapper>
  );
};

export default UpdateGrade;
