import { LANGUAGE } from "@prepa-sn/shared/enums";
import { Alert, Card, Col, Form, FormInstance, Row, Typography, Select, Divider } from "antd";
import { FC } from "react";

const { Title, Text } = Typography;
const { Option } = Select;

interface IContentWithSiderProps {
    children: React.ReactNode;
    form?: FormInstance;
    onFinish?: (values: unknown) => void;
    sidebarExtra?: React.ReactNode;
}
const ContentWithSider: FC<IContentWithSiderProps> = ({ children, onFinish, form, sidebarExtra }) => {
    return (
        <Form
            validateTrigger={['onFinish']}
            form={form}
            layout="vertical"
            onFinish={onFinish}
        >
            <Row gutter={10}>
                <Col span={17}>
                    <Card>
                        {children}
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
                    {sidebarExtra}
                </Col>
            </Row>
        </Form>
    )
}

export default ContentWithSider