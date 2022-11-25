import ContentSectionWrapper from '@prepa-sn/dashboard/components/content-section-wrapper';
import { useFindOneChapterQuery } from '@prepa-sn/dashboard/store/features/chapters';
import {
  useFindOneSectionQuery,
  useUpdateSectionMutation,
} from '@prepa-sn/dashboard/store/features/sections';
import { Section } from '@prepa-sn/shared/interfaces';
import { Form, message, Row, Spin } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CreateAndUpdate from './create-update';

const Update = () => {
  const [form] = Form.useForm();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useFindOneSectionQuery(id);
  const [updateSection, { isLoading: isUpdating, isSuccess, isError }] =
    useUpdateSectionMutation();

  const onFinish = async () => {
    try {
      await form.validateFields();
      const values: Section = form.getFieldsValue();
      if (data?.id) {
        updateSection({
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
        id: data.id,
      });
    }
  }, [data, form]);

  useEffect(() => {
    if (isSuccess) message.success('Le cours a été crée avec succès');
    if (isError) message.error('Une erreur est survenue');
  }, [isSuccess, isError, form]);

  if (isLoading)
    return (
      <Row justify="center">
        <Spin tip="Loading..." />
      </Row>
    );

  return (
    <ContentSectionWrapper
      title={`Sections`}
      description="Update Section"
      createButtonText="Update section"
      onCreate={onFinish}
      createButtonProps={{ loading: isUpdating }}
    >
      <CreateAndUpdate initialValues={data} form={form} onFinish={onFinish} />
    </ContentSectionWrapper>
  );
};

export default Update;
