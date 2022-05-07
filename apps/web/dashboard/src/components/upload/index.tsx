import { FC, useEffect, useState } from "react"
import styled from "styled-components";
import Icon from "../Icon";
import { Button, Modal, Row, Col, Card, Space, Tabs, Upload, Input, Form, Typography, Divider, Spin, Image, Checkbox, message } from "antd";
import { Document } from "../../common/interfaces/documents.interface";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import { useFindAllDocumentsQuery, useUploadDocumentsMutation, useUploadsMutation } from "../../store/features/documents";

const { TabPane } = Tabs;
const { Meta } = Card;
const { Dragger } = Upload;
const { Title, Text, Paragraph } = Typography;

const ButtonWrapper = styled.div`
    width: 100%;
    max-width: 100%;
    height : 100%;
    padding : 20px 5px;

`;

type DocumentsContentProps = {
    onSelect?: (documents: Document[]) => void;
    multiple?: boolean;
    selectedDocuments?: Document[];
}

const UploadComponent: FC<DocumentsContentProps> = ({ onSelect, multiple = false }) => {

    const [showDocumentsMoal, setShowDocumentsMoal] = useState<boolean>(false);
    const [showUploadMoal, setShowUploadsMoal] = useState<boolean>(false);
    const [selectedDocuments, setSelectedDocuments] = useState<Document[]>([]);
    const [hasSelected, setHasSelected] = useState<boolean>(false);

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
            {selectedDocuments.length > 0 && hasSelected && <div>
                {
                    <Upload
                        onRemove={(file: UploadFile<Document>) => {
                            const newSelectedDocuments = selectedDocuments.filter(d => `${d.id}` !== `${file.uid}`);
                            setSelectedDocuments(newSelectedDocuments);
                            onSelect && onSelect(newSelectedDocuments);
                        }}
                        defaultFileList={
                            selectedDocuments.map((document: Document) => ({
                                url: document.publicUrl,
                                uid: document.id,
                                name: document.title,
                                status: 'done',
                            }) as unknown as UploadFile<Document>)
                        } />
                }
            </div>
            }
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
                <DocumentsContent
                    multiple={multiple}
                    onSelect={
                        (documents: Document[]) => setSelectedDocuments(documents)
                    }
                    selectedDocuments={selectedDocuments}
                />
                <Divider />
                <Row justify="space-between">
                    <Button onClick={closeDocumentsMoal} type="primary" ghost danger>Cancel</Button>
                    <Button
                        onClick={() => {
                            closeDocumentsMoal();
                            setHasSelected(true);
                            onSelect && onSelect(selectedDocuments);
                        }}
                        type="primary"
                        icon={<Icon type="PlusOutlined" />}
                    >
                        Select
                    </Button>
                </Row>
            </Modal>
            <Modal footer={null} width="40vw" centered title="Add new assets" visible={showUploadMoal} onCancel={closeUploadMoal}>
                <UploadDocuments />
            </Modal>
        </>

    )
}


const DocumentsContent: FC<DocumentsContentProps> = ({ multiple = false, onSelect, selectedDocuments }) => {
    const {
        data: documents = [],
        isLoading: documentsLoading,
    } = useFindAllDocumentsQuery();

    const handleSelect = (document: Document, checked: boolean) => {
        if (checked) {
            if (multiple) {
                const selected: Document[] = [...(selectedDocuments || []), document];
                onSelect && onSelect(selected);
            } else {
                onSelect && onSelect([document]);
            }
        }

        if (!checked && multiple) {
            const selected: Document[] = selectedDocuments?.filter(d => d.id !== document.id) || [];
            onSelect && onSelect(selected);
        }

        if (!checked && !multiple) {
            onSelect && onSelect([]);
        }

    }

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
                        <Row gutter={[10, 10]} style={{ marginTop: 20 }}>
                            {
                                documents.map((item: Document) => {
                                    return (
                                        <Col span={6} key={item.id}>
                                            <Card
                                                cover={
                                                    <div style={{
                                                        position: "relative",
                                                    }}>
                                                        <Row style={{
                                                            padding: '10px',
                                                            position: 'absolute',
                                                            zIndex: 10,
                                                            width: '100%',

                                                        }} justify="space-between" align="middle">
                                                            <Checkbox
                                                                checked={
                                                                    selectedDocuments?.some(
                                                                        d => d.id === item.id
                                                                    )
                                                                }
                                                                onChange={e => handleSelect(item, e.target.checked)}
                                                            />
                                                            <Button icon={<Icon type="EditOutlined" />} />
                                                        </Row>
                                                        <Image
                                                            height={100}
                                                            alt="example"
                                                            src={item.publicUrl}
                                                        />
                                                    </div>
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
        if (fileList.length < 1) {
            return;
        }
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
                                <UploadFiles
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

type UploadFilesProps = {
    files: UploadFile[];
    onAddClick?: () => void;
    onRemoveClick: (file: UploadFile) => void;
}

const UploadFiles: FC<UploadFilesProps> = ({ files, onAddClick, onRemoveClick }) => {
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
                            <UploadFileComponent onDeleteClick={(file) => onRemoveClick(file)} file={item} />
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}


type UploadFileProps = {
    file: UploadFile;
    onDeleteClick: (file: UploadFile) => void;
}

export const UploadFileComponent: FC<UploadFileProps> = ({ file, onDeleteClick }) => {
    const imageMimeType = /image\/(png|jpg|jpeg)/i;
    const videoMimeType = /video\/(mp4|avi)/i;
    const audioMimeType = /audio\/(mp3|wav)/i;
    const documentMimeType = /application\/(pdf|doc|docx|vnd.openxmlformats-officedocument.wordprocessingml.document)/i;
    const [url, setUrl] = useState<string>('');


    useEffect(() => {
        const fileReader: FileReader = new FileReader();
        let isCancel = false;
        if (file) {
            fileReader.readAsDataURL(file.originFileObj as File);
            fileReader.onload = () => {
                if (fileReader.result && !isCancel) {
                    setUrl(fileReader.result as string);
                }
            }
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }
    }, [file]);

    return <Card
        cover={
            file?.type?.match(imageMimeType) ?
                <Image
                    alt={file.name}
                    src={url}
                    height={100}
                /> :
                file?.type?.match(documentMimeType) ?
                    <Row align="middle" justify="center" style={{ height: 100 }}>
                        <Icon width={'30px'} height={"30px"} type="FileTextOutlined" />
                    </Row> :
                    file?.type?.match(videoMimeType) ?
                        <p style={{ height: 100 }} >video</p> :
                        file?.type?.match(audioMimeType) ?
                            <p style={{ height: 100 }} >audio</p> :
                            <p style={{ height: 100 }} >unknown</p>
        }
        actions={[
            <Button type="text" onClick={() => onDeleteClick(file)}>
                <Icon type="DeleteOutlined" key="delete" />
            </Button>,
            <Icon type="EditOutlined" key="edit" />,
            <Icon type="EllipsisOutlined" key="ellipsis" />,
        ]}
    >
        <Meta description={
            <Paragraph ellipsis={{
                rows: 1,
            }}> {file.name} </Paragraph>
        } />
    </Card>

}

export default UploadComponent;