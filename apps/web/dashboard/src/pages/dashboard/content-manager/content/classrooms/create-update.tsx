/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Classroom, Document } from "@prepa-sn/shared/interfaces";
import { FC } from 'react';
import { Col, Form, FormInstance, Input, Row } from "antd";
import ContentWithSider from "apps/web/dashboard/src/components/content-with-sider";
import { CKEditor } from 'ckeditor4-react';
import AppUpload from 'apps/web/dashboard/src/components/upload';
import dayjs from 'dayjs';

interface ICreateAndUpdateProps {
    onFinish: () => Promise<void>;
    form: FormInstance;
    initialValues?: Classroom;
}

const CreateAndUpdate: FC<ICreateAndUpdateProps> = ({
    onFinish,
    form,
    initialValues,
}) => {
    return (
        <ContentWithSider
            form={form}
            onFinish={onFinish}
            createdAt={dayjs(initialValues?.createdAt).format('DD/MM/YYYY:HH:mm:ss')}
            updatedAt={dayjs(initialValues?.updatedAt).format('DD/MM/YYYY:HH:mm:ss')}
        >
            <Form.Item
                label="Title"
                rules={[{ required: true, message: 'Title is required' }]}
                name="title"
            >
                <Input size="middle" />
            </Form.Item>
            <Row gutter={10}>
                <Col span={12}>
                    <Form.Item label="Image" name="image">
                        <AppUpload
                            multiple={false}
                            selectedDocuments={
                                initialValues?.image ? [initialValues?.image] : []
                            }
                            onSelect={(documents: Document[]) => {
                                form.setFieldsValue({
                                    image: documents[0] || null,
                                });
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Video" name="video">
                        <AppUpload
                            multiple={false}
                            selectedDocuments={
                                initialValues?.video ? [initialValues?.video] : []
                            }
                            onSelect={(documents: Document[]) => {
                                form.setFieldsValue({
                                    video: documents[0] || null,
                                });
                            }}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Description is required' }]}
            >
                <CKEditor
                    initData={initialValues?.description}
                    onChange={(evt) => {
                        form.setFieldsValue({
                            description: evt.editor.getData(),
                        });
                    }}
                />
            </Form.Item>
        </ContentWithSider>
    )
}

export default CreateAndUpdate