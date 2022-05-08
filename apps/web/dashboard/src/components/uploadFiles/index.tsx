import { Button, Col, Divider, Form, Input, message, Row, Tabs, Typography, Upload } from "antd";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { FC, useEffect, useState } from "react";
import { useFindAllDocumentsQuery, useUploadsMutation } from "../../store/features/documents";
import Icon from "../Icon";
import AppUploadFile from "../uploadFile";

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Dragger } = Upload;

interface IUploadFilesProps {
    files: UploadFile[];
    onAddClick?: () => void;
    onRemoveClick: (file: UploadFile) => void;
}


const AppUploadDocuments: FC = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [showUpload, setShowUpload] = useState<boolean>(true);
    const [uploads, {
        isLoading,
        isSuccess,
    }] = useUploadsMutation();

    const { refetch } = useFindAllDocumentsQuery();

    const handleUploadChange = (uploadChangeParam: UploadChangeParam) => {
        console.log(uploadChangeParam);
        const seen = new Set();
        const cuurentFileList = [...fileList, ...uploadChangeParam.fileList];
        const newFileList = cuurentFileList.filter(el => {
            const duplicate = seen.has(el.uid);
            seen.add(el);
            return !duplicate;
        });
        setFileList(newFileList);
        setShowUpload(false);
    }

    const handleRemove = (file: UploadFile) => {
        setFileList(prev => prev.filter(item => item.uid !== file.uid));
    }

    const handleRequest = () => {
        console.log('handleRequest');
    }


    const uploadFiles = () => {
        if (fileList.length < 1) return;
        const documents = new FormData();
        fileList.forEach(file => {
            documents.append('documents', file?.originFileObj as File);
        });
        const files = fileList.map(file => file.originFileObj as File);
        uploads(files);
    }

    useEffect(() => {
        if (fileList.length < 1) {
            setShowUpload(true);
        }
    }, [fileList]);

    useEffect(() => {
        if (isSuccess) {
            setFileList([]);
            refetch();
            message.success('Uploaded successfully');
        }
    }, [isSuccess, refetch]);

    return (
        <div>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="From computer" key="1">
                    <Row>
                        {showUpload &&
                            <Col span={24}>
                                <Dragger customRequest={handleRequest} multiple onChange={handleUploadChange}>
                                    <p className="ant-upload-drag-icon">
                                        <Icon type="InboxOutlined" />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">
                                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                                        band files
                                    </p>
                                </Dragger>
                            </Col>
                        }
                        {
                            !showUpload && <Col span={24}>
                                <AppUploadFiles
                                    files={fileList}
                                    onAddClick={() => setShowUpload(true)}
                                    onRemoveClick={handleRemove}
                                />
                            </Col>
                        }
                    </Row>
                </TabPane>
                <TabPane tab="From Url" key="2">
                    <Form layout="vertical">
                        <Form.Item label="Url">
                            <Input.TextArea rows={4} />
                            <small>Separate your URL links by a carriage return.</small>
                        </Form.Item>
                    </Form>
                </TabPane>
            </Tabs>
            {
                fileList.length > 0 && <>
                    <Divider />
                    <Row justify="space-between">
                        <Button disabled={isLoading} onClick={() => setShowUpload(false)}>Cancel</Button>
                        <Button onClick={uploadFiles} loading={isLoading} icon={<Icon type="CloudUploadOutlined" />} type="primary">Upload {fileList.length} assets to the library</Button>
                    </Row>
                </>
            }

        </div>
    )

}

const AppUploadFiles: FC<IUploadFilesProps> = ({ files, onRemoveClick, onAddClick }) => {

    return (
        <div>
            <Row justify="space-between">
                <Col span={14}>
                    <Title level={5}> {files.length} assets ready to upload</Title>
                    <Text>Manage the assets before uploading them to the Media Library</Text>
                </Col>

                {onAddClick &&
                    <Col>
                        <Button
                            type="primary"
                            onClick={onAddClick}
                            icon={<Icon type="PlusOutlined" />}
                        >
                            Add new assets
                        </Button>
                    </Col>
                }
            </Row>
            <Row gutter={[10, 10]} style={{ marginTop: 20 }}>
                {files.map((item: UploadFile) => {
                    return (
                        <Col span={8} key={item.uid}>
                            <AppUploadFile onDeleteClick={(file) => onRemoveClick(file)} file={item} />
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default AppUploadDocuments