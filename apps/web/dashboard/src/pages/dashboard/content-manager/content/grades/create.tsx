/* eslint-disable @nrwl/nx/enforce-module-boundaries */
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
    Upload,
} from "antd";
import Icon from "apps/web/dashboard/src/components/Icon";
import { CKEditor } from 'ckeditor4-react';
import { useSelector } from "react-redux";

import { LANGUAGE, Status } from '@prepa-sn/shared/enums';


const { Title, Text } = Typography;
const { Dragger } = Upload;
const { Option } = Select;


const CreateGrade = () => {
    const [form] = Form.useForm();

    const gradesState = useSelector((state: RootState) => state.grades);

    return (
        <div>
            <Row justify="space-between">
                <Col >
                    <Title level={4}>Create an entry</Title>
                    <Text>API ID : article</Text>
                </Col>
                <Col>
                    <Space>
                        <Button type="primary" ghost icon={<Icon type="CheckOutlined" />} >
                            Publish
                        </Button>
                        <Button type="primary" icon={<Icon type="PlusOutlined" />} >
                            Save
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Divider />
            <Form form={form} layout="vertical">
                <Row gutter={10}>
                    <Col span={17}>
                        <Card>

                            <Row gutter={10}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Title"
                                        rules={[{ required: true, message: 'Title is required' }]}
                                        name="title"
                                    >
                                        <Input size="middle" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Slug"
                                        name="slug"
                                    >
                                        <Input size="middle" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item label="Image" name="featuredImage">
                                <Dragger >
                                    <p className="ant-upload-drag-icon">
                                        <Icon type="InboxOutlined" />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">
                                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                                        band files
                                    </p>
                                </Dragger>
                            </Form.Item>
                            <Form.Item label="Content" name="description">
                                <CKEditor
                                    initData={<p>Hello from CKEditor 4!</p>}
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

                            <Title style={{ margin: 0, marginTop: 20 }} level={4}>INTERNATIONALIZATION</Title>
                            <Divider />
                            <Form.Item label="Langue">
                                <Select placeholder="Langues">
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
                            <Form.Item label="Grades">
                                <Select placeholder="Grades" loading={gradesState.loading} >
                                    {
                                        gradesState.items.map((item) => (
                                            <Option key={item.id} value={item.id}>{item.title}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item label="Status">
                                <Select placeholder="Status" >
                                    {
                                        Object.values(Status).map((item) => (
                                            <Option key={item} value={item}>{item}</Option>
                                        ))
                                    }
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