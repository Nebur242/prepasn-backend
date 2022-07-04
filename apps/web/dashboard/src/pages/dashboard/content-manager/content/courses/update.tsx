import { Course } from '@prepa-sn/shared/interfaces';
import { Form, message, Row, Spin } from 'antd';
import ContentSectionWrapper from '@prepa-sn/dashboard/components/content-section-wrapper';
import {
  useFindOneCourseQuery,
  useUpdateCourseMutation,
} from '@prepa-sn/dashboard/store/features/courses';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CreateAndUpdate from './create-update';

const UpdateCourse = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const { data, isLoading } = useFindOneCourseQuery(id);

  const [
    updateCourse,
    { isLoading: isUpdating, isSuccess: isUpdated, isError: hasError },
  ] = useUpdateCourseMutation();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        image: data.image ? data.image?.id : null,
        video: data.video ? data.video?.id : null,
        grades: data.grades.map((grade) => grade.id),
        categories: data.categories.map((category) => category.id),
      });
    }
  }, [data, form]);

  useEffect(() => {
    if (isUpdated) {
      message.success('Le cours a été modifié avec succès');
    }

    if (hasError) {
      message.error('Une erreur est survenue');
    }
  }, [isUpdated, hasError, form]);

  const onFinish = async () => {
    try {
      await form.validateFields();
      const values: Course = form.getFieldsValue();
      if (data?.id) {
        updateCourse({
          ...values,
          id: data?.id,
        });
      }
    } catch (error) {
      message.warning('Merci de vérifier les champs');
      console.log(error);
    }
  };

  if (isLoading)
    return (
      <Row justify="center">
        <Spin tip="Loading..." />
      </Row>
    );

  return (
    <ContentSectionWrapper
      title={`Update the entry : ${data?.title}`}
      description={`Course ID : ${data?.id}`}
      createButtonText="Update the grade"
      onCreate={onFinish}
      createButtonProps={{ loading: isUpdating }}
    >
      <CreateAndUpdate initialValues={data} form={form} onFinish={onFinish} />
    </ContentSectionWrapper>
  );
};

export default UpdateCourse;
