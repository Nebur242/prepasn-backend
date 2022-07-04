import { Classroom } from '@prepa-sn/shared/interfaces';
import { Form, message, Row, Spin } from 'antd';
import ContentSectionWrapper from '@prepa-sn/dashboard/components/content-section-wrapper';
import {
  useFindOneCategoryQuery,
  useUpdateCategoryMutation,
} from '@prepa-sn/dashboard/store/features/categories';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CreateAndUpdate from './create-update';

const UpdateCategory = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const { data, isLoading } = useFindOneCategoryQuery(id);

  const [
    updateGrade,
    { isLoading: isUpdating, isSuccess: isUpdated, isError: hasError },
  ] = useUpdateCategoryMutation();

  const onFinish = async () => {
    try {
      await form.validateFields();
      const values: Classroom = form.getFieldsValue();
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
      description={`Category ID : ${data?.id}`}
      createButtonText="Update the category"
      onCreate={onFinish}
      createButtonProps={{ loading: isUpdating }}
    >
      <CreateAndUpdate initialValues={data} form={form} onFinish={onFinish} />
    </ContentSectionWrapper>
  );
};

export default UpdateCategory;
