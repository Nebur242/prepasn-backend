/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Category } from '@prepa-sn/shared/interfaces';
import { Form, message } from 'antd';
import ContentSectionWrapper from 'apps/web/dashboard/src/components/content-section-wrapper';
import { useCreateCategoryMutation } from 'apps/web/dashboard/src/store/features/categories';
import { useEffect } from 'react';
import CreateAndUpdate from './create-update';

const CreateCategy = () => {
  const [form] = Form.useForm();

  const [createcategery, { isLoading, isSuccess, isError }] =
    useCreateCategoryMutation();

  const onFinish = async () => {
    try {
      await form.validateFields();
      const values: Category = form.getFieldsValue();
      console.log(values);
      createcategery(values);
    } catch (error) {
      message.warning('Merci de vérifier les champs');
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      message.success('Le chapiter a été crée avec succès');
      form.resetFields();
    }
    if (isError) message.error('Une erreur est survenue');
  }, [isSuccess, isError, form]);

  return (
    <ContentSectionWrapper
      title={`categories`}
      description="Create Category"
      createButtonText="Add a new category"
      onCreate={onFinish}
      createButtonProps={{ loading: isLoading }}
    >
      <CreateAndUpdate form={form} onFinish={onFinish} />
    </ContentSectionWrapper>
  );
};

export default CreateCategy;
