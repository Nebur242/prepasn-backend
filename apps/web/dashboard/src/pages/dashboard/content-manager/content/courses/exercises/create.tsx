import { Exercise } from '@prepa-sn/shared/interfaces';
import { Form, message } from 'antd';
import ContentSectionWrapper from 'apps/web/dashboard/src/components/content-section-wrapper';
import { useFindOneChapterQuery } from 'apps/web/dashboard/src/store/features/chapters';
import { useCreateExerciseMutation } from 'apps/web/dashboard/src/store/features/exercises';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CreateAndUpdate from './create-update';

const Create = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { chapterId, courseId } = useParams<{
    courseId: string;
    chapterId: string;
  }>();
  const { data: chapter, isLoading: chapterIsLoading } =
    useFindOneChapterQuery(chapterId);
  const [
    createExercise,
    {
      isLoading: exerciseIsLoading,
      isSuccess: exerciseIsSuccess,
      isError: exerciseIsError,
      data: exercise,
    },
  ] = useCreateExerciseMutation();

  const onFinish = async () => {
    try {
      await form.validateFields();
      const values: Exercise = form.getFieldsValue();
      console.log(values);
      createExercise({
        ...values,
        chapter: Number(chapterId),
      });
    } catch (error) {
      message.warning('Merci de vérifier les champs');
      console.log(error);
    }
  };

  useEffect(() => {
    if (exerciseIsSuccess) {
      message.success('Exercice a été crée avec succès');
      navigate(
        `/admin/content-manager/courses/${courseId}/chapters/${chapterId}/exercises/update/${exercise.id}`
      );
    }
    if (exerciseIsError) message.error('Une erreur est survenue');
  }, [
    exerciseIsSuccess,
    exerciseIsError,
    form,
    courseId,
    chapterId,
    navigate,
    exercise?.id,
  ]);

  return (
    <ContentSectionWrapper
      title={`Ajouter un exercice`}
      description={`Chapitre : ${
        chapterIsLoading ? 'Loading...' : chapter.title
      }`}
      createButtonText="Ajouter cet exercice"
      onCreate={onFinish}
      createButtonProps={{ loading: exerciseIsLoading }}
    >
      <CreateAndUpdate form={form} onFinish={onFinish} />
    </ContentSectionWrapper>
  );
};

export default Create;
