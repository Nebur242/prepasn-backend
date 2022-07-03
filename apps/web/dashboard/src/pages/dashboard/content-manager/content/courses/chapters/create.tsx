import { Chapter } from '@prepa-sn/shared/interfaces';
import { Form, message } from 'antd';
import ContentSectionWrapper from '@prepa-sn/dashboard/components/content-section-wrapper';
import { useCreateChapterMutation } from '@prepa-sn/dashboard/store/features/chapters';
import { useFindOneCourseQuery } from '@prepa-sn/dashboard/store/features/courses';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CreateAndUpdate from './create-update';

const CreateChapter = () => {
  const [form] = Form.useForm();
  const [creteCourse, { isLoading, isSuccess, isError }] =
    useCreateChapterMutation();

  const { courseId } = useParams<{ courseId: string }>();
  const { data: course } = useFindOneCourseQuery(courseId);

  const onFinish = async () => {
    try {
      await form.validateFields();
      const values: Chapter = form.getFieldsValue();
      creteCourse(values);
    } catch (error) {
      message.warning('Merci de vérifier les champs');
      console.log(error);
    }
  };

  useEffect(() => {
    if (course) {
      form.setFieldsValue({
        course: course.id,
      });
    }
  }, [course, form]);

  useEffect(() => {
    if (isSuccess) {
      message.success('Le chapiter a été crée avec succès');
      form.resetFields();
    }
    if (isError) message.error('Une erreur est survenue');
  }, [isSuccess, isError, form]);

  return (
    <ContentSectionWrapper
      title={`Chapters`}
      description="Create Chapter"
      createButtonText="Add a new chapter"
      onCreate={onFinish}
      createButtonProps={{ loading: isLoading }}
    >
      <CreateAndUpdate form={form} onFinish={onFinish} />
    </ContentSectionWrapper>
  );
};

export default CreateChapter;
