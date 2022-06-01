/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import ContentSectionWrapper from "apps/web/dashboard/src/components/content-section-wrapper";
import { useCreateInstructorMutation } from "apps/web/dashboard/src/store/features/instructors";

const CreateInstructor = () => {

    const [createClassroom, { isLoading, isSuccess, isError }] =
        useCreateInstructorMutation();

    return (
        <ContentSectionWrapper
            title={`Professeurs`}
            description="Tous les professeurs"
            createButtonText="Ajouter un professeur"
            createButtonProps={{ loading: isLoading }}
        >
            Create
        </ContentSectionWrapper>
    )
}

export default CreateInstructor;