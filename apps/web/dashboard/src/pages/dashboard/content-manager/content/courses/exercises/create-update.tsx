/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Classroom, Document } from '@prepa-sn/shared/interfaces';
import { FC } from 'react';
import { Card, Form, FormInstance, Input, Select } from 'antd';
import ContentWithSider from 'apps/web/dashboard/src/components/content-with-sider';
import AppUpload from 'apps/web/dashboard/src/components/upload';
import { displayType, exerciseType, level } from '@prepa-sn/shared/enums';
import { CKEditor } from 'ckeditor4-react';

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

    const display = Form.useWatch('display', form);

    return (
        <ContentWithSider
            form={form}
            onFinish={onFinish}
            createdAt={dayjs(initialValues?.createdAt).format('DD/MM/YYYY:HH:mm:ss')}
            updatedAt={dayjs(initialValues?.updatedAt).format('DD/MM/YYYY:HH:mm:ss')}
            initialValues={{
                display: displayType.TEXT,
                level: level.EASY,
                ...initialValues,
            }}
        >
            <p>{display}</p>
            <Form.Item
                label="Type d'affichage"
                rules={[{ required: true, message: 'Display is required' }]}
                name="display"
            >
                <Select>
                    {
                        Object.keys(displayType).map(key => (
                            <Select.Option key={key} value={displayType[key]}>
                                {displayType[key]}
                            </Select.Option>
                        ))
                    }
                </Select>
            </Form.Item>
            {
                display === displayType.TEXT && <> <Form.Item
                    label="Title"
                    rules={[{ required: true, message: 'Title is required' }]}
                    name="title"
                >
                    <Input size="middle" />
                </Form.Item>

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

                </>
            }
            {
                display === displayType.IMAGE && <Form.Item label="Image" name="image">
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
            }

            {
                display === displayType.VIDEO &&
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
            }

            <Form.Item
                label="Niveau"
                rules={[{ required: true, message: 'Display is required' }]}
                name="level"
            >
                <Select>
                    {
                        Object.keys(level).map(key => (
                            <Select.Option key={key} value={level[key]}>
                                {level[key]}
                            </Select.Option>
                        ))
                    }
                </Select>
            </Form.Item>

            <Form.Item
                label="Type d'exercice"
                rules={[{ required: true, message: 'Display is required' }]}
                name="type"
            >
                <Select>
                    {
                        Object.keys(exerciseType).map(key => (
                            <Select.Option key={key} value={exerciseType[key]}>
                                {exerciseType[key]}
                            </Select.Option>
                        ))
                    }
                </Select>
            </Form.Item>


        </ContentWithSider>
    );
};

export default CreateAndUpdate;
