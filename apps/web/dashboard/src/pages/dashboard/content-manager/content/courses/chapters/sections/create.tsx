import ContentSectionWrapper from '@prepa-sn/dashboard/components/content-section-wrapper';
import { useFindOneChapterQuery } from '@prepa-sn/dashboard/store/features/chapters';
import { useCreateSectionMutation } from '@prepa-sn/dashboard/store/features/sections';
import { Section } from '@prepa-sn/shared/interfaces';
import { Form, message } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CreateAndUpdate from './create-update';

const Create = () => {
  const [form] = Form.useForm();
  const { chapterId, courseId } = useParams<{
    courseId: string;
    chapterId: string;
  }>();
  const { data: chapter, isLoading: chapterIsLoading } =
    useFindOneChapterQuery(chapterId);

  const [
    createSection,
    {
      isLoading: sectionIsLoading,
      isSuccess: sectionIsSuccess,
      isError: sectionIsError,
    },
  ] = useCreateSectionMutation();

  const onFinish = async () => {
    try {
      await form.validateFields();
      const values: Section = form.getFieldsValue();
      console.log(values);
      createSection({
        ...values,
        chapter: Number(chapterId),
      });
    } catch (error) {
      message.warning('Merci de vérifier les champs');
      console.log(error);
    }
  };

  useEffect(() => {
    if (sectionIsSuccess) {
      message.success('Section a été crée avec succès');
    }
    if (sectionIsError) message.error('Une erreur est survenue');
  }, [sectionIsSuccess, sectionIsError, form, courseId, chapterId]);

  return (
    <ContentSectionWrapper
      title={`Ajouter une section`}
      description={`Chapitre : ${
        chapterIsLoading ? 'Loading...' : chapter.title
      }`}
      createButtonText="Ajouter cette section"
      onCreate={onFinish}
      createButtonProps={{ loading: sectionIsLoading }}
    >
      <CreateAndUpdate form={form} onFinish={onFinish} />
    </ContentSectionWrapper>
  );
};

export default Create;
