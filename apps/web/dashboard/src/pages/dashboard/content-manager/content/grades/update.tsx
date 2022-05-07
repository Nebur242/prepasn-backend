/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Button, Col, Divider, Form, message, Row, Space, Spin, Typography } from "antd";
import { Grade } from "apps/web/dashboard/src/common/interfaces/grade.interface";
import Icon from "apps/web/dashboard/src/components/Icon";
import { useFindOneGradeQuery, useUpdateGradeMutation } from "apps/web/dashboard/src/store/features/grades";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateAndUpdate from "./create-update";

const { Title, Text } = Typography;


const UpdateGrade = () => {
    const { id } = useParams<{ id: string }>();
    const [form] = Form.useForm();

    const { data, isLoading } = useFindOneGradeQuery(id!);


    const [
        updateGrade,
        {
            isLoading: isUpdating,
            isSuccess: isUpdated,
            isError: hasError,

        }
    ] = useUpdateGradeMutation();


    const onFinish = async () => {
        try {
            await form.validateFields();
            const values: Grade = form.getFieldsValue();
            if (data?.id) {
                updateGrade({
                    ...values,
                    id: data?.id,
                });
            }

        } catch (error) {
            message.warning("Merci de vérifier les champs");
            console.log(error);
        }
    }

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                ...data,
                image: data.image ? data.image?.id : null,
                video: data.video ? data.video?.id : null,
            });
        }
    }, [data, form])

    useEffect(() => {
        if (isUpdated) {
            message.success("La section a été crée avec succès");
        }

        if (hasError) {
            message.error("Une erreur est survenue");
        }
    }, [isUpdated, hasError, form]);

    if (isLoading) return <Row>
        <Spin />
    </Row>


    return (
        <div>
            <Row justify="space-between">
                <Col >
                    <Title level={4}>Update the entry : {data?.title}</Title>
                    <Text>Grade ID : {data?.id}</Text>
                </Col>
                <Col>
                    <Space>
                        <Button loading={isUpdating} onClick={onFinish} type="primary" icon={<Icon type="PlusOutlined" />} >
                            Update the grade
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Divider />
            <CreateAndUpdate initialValues={data} form={form} onFinish={onFinish} />
        </div>
    )
}

export default UpdateGrade