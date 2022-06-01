/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Status } from "@prepa-sn/shared/enums";
import { Form, message } from "antd";
import ContentSectionWrapper from "apps/web/dashboard/src/components/content-section-wrapper";
import { useCreateStudentMutation } from "apps/web/dashboard/src/store/features/students";
import { useEffect } from "react";
import CreateAndUpdate from './create-update';

const CreateStudent = () => {
    const [form] = Form.useForm();

    const [createStudent, { isLoading, isSuccess, isError }] =
        useCreateStudentMutation();

    const onFinish = async () => {
        try {
            await form.validateFields();
            const values = form.getFieldsValue();
            const { birthDate, language, confirm_password, ...rest } = values;
            createStudent({
                ...rest,
                status: Status.PENDING,
                birthDate: birthDate.format(),
            });
        } catch (error) {
            message.warning('Merci de vérifier les champs');
            console.log(error);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            message.success('Étudiant a été crée avec succès');
            form.resetFields();
        }
        if (isError) message.error('Une erreur est survenue');
    }, [isSuccess, isError, form]);

    return (
        <ContentSectionWrapper
            title={`Étudiants`}
            description="Tous les étudiants"
            createButtonText="Ajouter un étudiant"
            createButtonProps={{ loading: isLoading }}
            onCreate={onFinish}
        >
            <CreateAndUpdate form={form} onFinish={onFinish} />
        </ContentSectionWrapper>
    )
}

export default CreateStudent;