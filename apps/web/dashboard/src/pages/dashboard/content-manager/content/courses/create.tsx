/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Course } from '@prepa-sn/shared/interfaces';
import { Form, message } from 'antd';
import ContentSectionWrapper from 'apps/web/dashboard/src/components/content-section-wrapper';
import { useCreateCourseMutation } from 'apps/web/dashboard/src/store/features/courses';
import { useEffect } from 'react';
import CreateAndUpdate from './create-update';

const CreateCourse = () => {
  const [form] = Form.useForm();

  const [creteCourse, { isLoading, isSuccess, isError }] =
    useCreateCourseMutation();

  const onFinish = async () => {
    try {
      await form.validateFields();
      const values: Course = form.getFieldsValue();
      creteCourse(values);
    } catch (error) {
      message.warning('Merci de vérifier les champs');
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      message.success('Le cours a été crée avec succès');
      form.resetFields();
    }

    if (isError) {
      message.error('Une erreur est survenue');
    }
  }, [isSuccess, isError, form]);

  return (
    <div>
      <ContentSectionWrapper
        title={`Create a course`}
        description="Course ID"
        createButtonText="Save the course"
        onCreate={onFinish}
        createButtonProps={{ loading: isLoading }}
      >
        <CreateAndUpdate form={form} onFinish={onFinish} />
      </ContentSectionWrapper>
    </div>
  );
};

export default CreateCourse;
