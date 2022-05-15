/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Chapter } from "@prepa-sn/shared/interfaces";
import { Form, message, Row, Spin } from "antd";
import ContentSectionWrapper from "apps/web/dashboard/src/components/content-section-wrapper";
import { useFindOneChapterQuery, useUpdateChapterMutation } from "apps/web/dashboard/src/store/features/chapters";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateAndUpdate from "./create-update";

const UpdateChapter = () => {
    const [form] = Form.useForm();

    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useFindOneChapterQuery(id as string);

    const [updateChapter, { isLoading: isUpdating, isSuccess, isError }] =
        useUpdateChapterMutation();

    const onFinish = async () => {
        try {
            await form.validateFields();
            const values: Chapter = form.getFieldsValue();
            if (data?.id) {
                updateChapter({
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
                course: data.course?.id,
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
            title={`Chapters`}
            description="Update Chapter"
            createButtonText="Update chapter"
            onCreate={onFinish}
            createButtonProps={{ loading: isUpdating }}
        >
            <CreateAndUpdate initialValues={data} form={form} onFinish={onFinish} />
        </ContentSectionWrapper>
    )
}

export default UpdateChapter;