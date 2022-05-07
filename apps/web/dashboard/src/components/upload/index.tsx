import { FC, useState } from "react"
import styled from "styled-components";
import Icon from "../Icon";
import { Button, Modal, Row, Tabs, Upload, Divider } from "antd";
import { Document } from "../../common/interfaces/documents.interface";
import { UploadFile } from "antd/lib/upload/interface";
import { useFindAllDocumentsQuery } from "../../store/features/documents";
import AppDocuments from "../documents";
import AppUploadDocuments from "../uploadFiles";

const { TabPane } = Tabs;

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

const UploadComponent: FC<DocumentsContentProps> = ({
    onSelect,
    multiple = false,
    selectedDocuments: initalDocuments = []
}) => {
    const [showDocumentsMoal, setShowDocumentsMoal] = useState<boolean>(false);
    const [showUploadMoal, setShowUploadsMoal] = useState<boolean>(false);
    const [selectedDocuments, setSelectedDocuments] = useState<Document[]>(initalDocuments);
    const [hasSelected, setHasSelected] = useState<boolean>(initalDocuments?.length > 0 || false);

    console.log('selectedDocuments', selectedDocuments);

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
                <AppUploadDocuments />
            </Modal>
        </>

    )
}


const DocumentsContent: FC<DocumentsContentProps> = ({ multiple, onSelect, selectedDocuments }) => {
    const {
        data = [],
        isLoading,
        error
    } = useFindAllDocumentsQuery();


    return (
        <div>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="Browse" key="1">
                    <AppDocuments
                        multiple={multiple}
                        error={error}
                        documents={data}
                        loading={isLoading}
                        onDocumentsSelect={onSelect}
                        selectedDocuments={selectedDocuments}
                    />
                </TabPane>
                <TabPane tab="Selected files" key="2">
                    Content of Tab Pane 2
                </TabPane>
            </Tabs>
        </div>
    )
}







export default UploadComponent;