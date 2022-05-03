import { FC, useState } from "react"
import styled from "styled-components";
import Icon from "../Icon";
import { Button, Modal, Row, Col, Card, Space, Tabs, Upload, Input, Form, Typography, Divider, Spin } from "antd";
import { Document } from "../../common/interfaces/documents.interface";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import { useFindAllDocumentsQuery } from "../../store/features/documents";

const { TabPane } = Tabs;
const { Meta } = Card;
const { Dragger } = Upload;
const { Title, Text } = Typography


const ButtonWrapper = styled.div`
    width: 100%;
    max-width: 100%;
    height : 100%;
    padding : 20px 5px;

`;

const UploadComponent: FC = () => {
    const [showDocumentsMoal, setShowDocumentsMoal] = useState<boolean>(false);
    const [showUploadMoal, setShowUploadsMoal] = useState<boolean>(false);

    const openDocumentsMoal = () => setShowDocumentsMoal(true);
    const closeDocumentsMoal = () => setShowDocumentsMoal(false);

    const openUploadMoal = () => setShowUploadsMoal(true);
    const closeUploadMoal = () => setShowUploadsMoal(false);

    return (
        <>
            <ButtonWrapper onClick={openDocumentsMoal} className="ant-upload ant-upload-drag">
                <p className="ant-upload-drag-icon">
                    <Icon type="InboxOutlined" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files
                </p>
            </ButtonWrapper>
            <Modal
                width="60vw"
                centered
                visible={showDocumentsMoal}
                title='Add new assets'
                onCancel={closeDocumentsMoal}
                footer={null}
            >
                <Row justify="end">
                    <Button onClick={openUploadMoal} type="primary" icon={<Icon type="PlusOutlined" />}>Add more assets</Button>
                </Row>
                <DocumentsContent />
                <Divider />
                <Row justify="space-between">
                    <Button onClick={closeDocumentsMoal} type="primary" ghost danger>Cancel</Button>
                    <Button onClick={closeDocumentsMoal} type="primary" icon={<Icon type="PlusOutlined" />}>Select</Button>
                </Row>
            </Modal>
            <Modal footer={null} width="40vw" centered title="Add new assets" visible={showUploadMoal} onCancel={closeUploadMoal}>
                <UploadDocuments />
            </Modal>
        </>

    )
}


const DocumentsContent: FC = () => {
    const {
        data: documents = [],
        isLoading: documentsLoading,
    } = useFindAllDocumentsQuery();

    return (
        <div>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="Browse" key="1">
                    <Space>
                        <Button>Sort by</Button>
                        <Button>Filter by</Button>
                    </Space>
                    {documentsLoading && <Spin />}
                    {!documentsLoading &&
                        <Row style={{ marginTop: 20 }}>
                            {
                                documents.map((item: Document) => {
                                    return (
                                        <Col span={6} key={item.id}>
                                            <Card
                                                cover={
                                                    <img
                                                        alt="example"
                                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                                    />
                                                }
                                                actions={[
                                                    <Icon type="DeleteOutlined" key="delete" />,
                                                    <Icon type="EditOutlined" key="edit" />,
                                                    <Icon type="EllipsisOutlined" key="ellipsis" />,
                                                ]}
                                            >
                                                <Meta
                                                    title={item.title}
                                                    description="This is the description"
                                                />
                                            </Card>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    }
                </TabPane>
                <TabPane tab="Selected files" key="2">
                    Content of Tab Pane 2
                </TabPane>
            </Tabs>
        </div>
    )
}

const UploadDocuments: FC = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [showUpload, setShowUpload] = useState<boolean>(true);

    const handleUploadChange = (uploadChangeParam: UploadChangeParam) => {
        setShowUpload(false);
        setFileList(prev => [...prev, ...uploadChangeParam.fileList]);
    }

    return (
        <div>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="From computer" key="1">
                    <Row>
                        {showUpload &&
                            <Col span={24}>
                                <Dragger onChange={handleUploadChange}>
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
                                <UploadFiles
                                    files={fileList}
                                    onAddClick={() => setShowUpload(true)}
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
            <Divider />
            <Row justify="space-between">
                <Button>Cancel</Button>
                {fileList.length > 0 && <Button type="primary">Upload {fileList.length} assets to the library</Button>}
            </Row>
        </div>
    )
}

type UploadFilesProps = {
    files: UploadFile[];
    onAddClick?: () => void;
}

const UploadFiles: FC<UploadFilesProps> = ({ files, onAddClick }) => {
    // console.log('files', files);
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
        </div>
    )
}

export default UploadComponent;