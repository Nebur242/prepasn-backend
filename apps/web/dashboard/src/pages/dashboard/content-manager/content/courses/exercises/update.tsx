import { Exercise } from "@prepa-sn/shared/interfaces";
import { Divider, Form, message, Spin } from "antd";
import ContentSectionWrapper from "apps/web/dashboard/src/components/content-section-wrapper";
import { useFindOneExerciseQuery, useUpdateExerciseMutation } from "apps/web/dashboard/src/store/features/exercises";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateAndUpdate from "./create-update";
import Questions from "./questions";

const Update = () => {
    const [form] = Form.useForm();

    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useFindOneExerciseQuery(id);
    const [updateExercise, { isLoading: isUpdating, isSuccess, isError }] =
        useUpdateExerciseMutation();


    const onFinish = async () => {
        try {
            await form.validateFields();
            const values: Exercise = form.getFieldsValue();
            if (data?.id) {
                updateExercise({
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
            });
        }
    }, [data, form]);

    return (
        <ContentSectionWrapper
            title={`Exercise : ${data?.title}`}
            description="Update Chapter"
            createButtonText="Update chapter"
            createButtonProps={{ loading: false }}
        >
            {
                isLoading && <Spin />
            }

            {
                !isLoading && (
                    <>
                        <CreateAndUpdate initialValues={data} form={form} onFinish={onFinish} />
                        <Divider />
                        <Questions questions={data?.questions || []} />
                    </>
                )
            }

        </ContentSectionWrapper>
    )
}

export default Update;