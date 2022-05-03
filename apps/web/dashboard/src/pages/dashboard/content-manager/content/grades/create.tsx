/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { useEffect } from 'react'
import {
    Button,
    Card,
    Col,
    Select,
    Divider,
    Form,
    Alert,
    Input,
    Row,
    Space,
    Typography,
    message,
} from "antd";
import Icon from "apps/web/dashboard/src/components/Icon";
import AppUpload from "apps/web/dashboard/src/components/upload";
import { CKEditor } from 'ckeditor4-react';
import { LANGUAGE, Status } from '@prepa-sn/shared/enums';
import { useCreateGradeMutation, useFindAllGradesQuery } from "apps/web/dashboard/src/store/features/grades";
import { Grade } from "apps/web/dashboard/src/common/interfaces/grade.interface";


const { Title, Text } = Typography;
const { Option } = Select;


const CreateGrade = () => {
    const [form] = Form.useForm();

    const {
        data: grades = [],
        isLoading: gradesloading,
        refetch
    } = useFindAllGradesQuery();

    const [
        createGrade,
        {
            isLoading,
            isSuccess,
            isError,
        }
    ] = useCreateGradeMutation();


    const onFinish = async () => {
        try {
            await form.validateFields();
            const values: Grade = form.getFieldsValue()
            createGrade(values);
        } catch (error) {
            message.warning("Merci de vérifier les champs");
            console.log(error);
        }
    }

    useEffect(() => {
        if (isSuccess) {
            message.success("La section a été crée avec succès");
            form.resetFields();
            refetch();
        }

        if (isError) {
            message.error("Une erreur est survenue");
        }
    }, [isSuccess, isError, form, refetch]);


    return (
        <div>
            <Row justify="space-between">
                <Col >
                    <Title level={4}>Create an entry</Title>
                    <Text>API ID : article</Text>
                </Col>
                <Col>
                    <Space>
                        <Button disabled={isLoading} type="primary" ghost icon={<Icon type="CheckOutlined" />} >
                            Publish
                        </Button>
                        <Button loading={isLoading} onClick={onFinish} type="primary" icon={<Icon type="PlusOutlined" />} >
                            Save
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Divider />
            <Form
                validateTrigger={['onFinish']}
                form={form}
                layout="vertical"
                onFinish={createGrade}
            >
                <Row gutter={10}>
                    <Col span={17}>
                        <Card>
                            <Form.Item
                                label="Title"
                                rules={[{ required: true, message: 'Title is required' }]}
                                name="title"
                            >
                                <Input size="middle" />
                            </Form.Item>
                            <Row gutter={10}>
                                <Col span={12}>
                                    <Form.Item label="Image" name="featuredImage">
                                        <AppUpload />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Video"
                                        name="videoUrl"
                                    >
                                        <AppUpload />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[{ required: true, message: 'Description is required' }]}
                            >
                                <CKEditor
                                    onChange={(evt) => {
                                        form.setFieldsValue({
                                            description: evt.editor.getData()
                                        });
                                    }}
                                />
                            </Form.Item>

                        </Card>
                    </Col>
                    <Col span={7}>
                        <Alert showIcon style={{ marginBottom: 10 }} message="Editing draft version" type="info" />
                        <Card style={{ marginBottom: 10 }}>
                            <Title style={{ margin: 0 }} level={4}>Information</Title>
                            <Divider />
                            <Row justify="space-between">
                                <Title level={5}>Created </Title>
                                <Text>Now </Text>
                            </Row>

                            <Row justify="space-between">
                                <Title level={5}>By </Title>
                                <Text>Now </Text>
                            </Row>

                            <Row justify="space-between">
                                <Title level={5}>Last updated </Title>
                                <Text>Now </Text>
                            </Row>

                            <Row justify="space-between">
                                <Title level={5}>By </Title>
                                <Text>Now </Text>
                            </Row>

                            <Title style={{ margin: 0, marginTop: 20 }} level={4}>Internationalization</Title>
                            <Divider />
                            <Form.Item
                                label="Langue"
                                name="language"
                                rules={[{ required: true, message: 'Language is required' }]}
                                initialValue={LANGUAGE.FR}

                            >
                                <Select placeholder="Langues" defaultValue={LANGUAGE.FR}>
                                    {
                                        Object.values(LANGUAGE).map((lang: LANGUAGE) => (
                                            <Option key={lang} value={lang}>{lang}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>

                        </Card>
                        <Card>
                            <Title style={{ margin: 0 }} level={4}>Relations</Title>
                            <Divider />
                            <Form.Item label="Grades" name="parent" >
                                <Select placeholder="Grades" loading={gradesloading} >
                                    {
                                        grades.map((item) => (
                                            <Option key={item.id} value={item.id}>{item.title}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item name="status" label="Status" initialValue={Status.ACTIVE}>
                                <Select placeholder="Status" defaultValue={Status.ACTIVE}>
                                    <Option value={Status.ACTIVE}>Active</Option>
                                    <Option value={Status.DRAFT}>Draft</Option>
                                    <Option value={Status.INACTIVE}>Inactive</Option>
                                </Select>
                            </Form.Item>
                        </Card>
                    </Col>
                </Row>
            </Form>

        </div>
    )
}

export default CreateGrade