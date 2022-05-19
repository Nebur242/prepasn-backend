import { FC, useState } from 'react';
import styled from 'styled-components';
import Icon from '../Icon';
import { Button, Modal, Row, Tabs, Upload, Divider, Col, Result } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import AppUploadDocuments from '../uploadFiles';
import { Document } from '@prepa-sn/shared/interfaces';
import MediaLibrary from '../../pages/dashboard/media-library';
import AppDocument from '../document';

const { TabPane } = Tabs;

const ButtonWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100%;
  padding: 20px 5px;
`;

type DocumentsContentProps = {
  onSelect?: (documents: Document[]) => void;
  multiple?: boolean;
  selectedDocuments?: Document[];
};

const UploadComponent: FC<DocumentsContentProps> = ({
  onSelect,
  multiple = false,
  selectedDocuments: initalDocuments = [],
}) => {
  const [showDocumentsMoal, setShowDocumentsMoal] = useState<boolean>(false);
  const [showUploadMoal, setShowUploadsMoal] = useState<boolean>(false);
  const [selectedDocuments, setSelectedDocuments] =
    useState<Document[]>(initalDocuments);
  const [hasSelected, setHasSelected] = useState<boolean>(
    initalDocuments?.length > 0 || false
  );

  console.log('selectedDocuments', selectedDocuments);

  const openDocumentsMoal = () => setShowDocumentsMoal(true);
  const closeDocumentsMoal = () => setShowDocumentsMoal(false);

  const closeUploadMoal = () => setShowUploadsMoal(false);

  return (
    <>
      <ButtonWrapper
        onClick={openDocumentsMoal}
        className="ant-upload ant-upload-drag"
      >
        <p className="ant-upload-drag-icon">
          <Icon type="InboxOutlined" />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </ButtonWrapper>
      {selectedDocuments.length > 0 && hasSelected && (
        <div>
          {
            <Upload
              listType="picture"
              onRemove={(file: UploadFile<Document>) => {
                const newSelectedDocuments = selectedDocuments.filter(
                  (d) => `${d.id}` !== `${file.uid}`
                );
                setSelectedDocuments(newSelectedDocuments);
                onSelect && onSelect(newSelectedDocuments);
              }}
              defaultFileList={selectedDocuments.map(
                (document: Document) =>
                  ({
                    url: document.publicUrl,
                    uid: document.id,
                    name: document.title,
                    status: 'done',
                  } as unknown as UploadFile<Document>)
              )}
            />
          }
        </div>
      )}
      <Modal
        width="60vw"
        centered
        visible={showDocumentsMoal}
        title="Select your media"
        onCancel={closeDocumentsMoal}
        bodyStyle={{
          maxHeight: '80vh',
          overflowY: 'scroll',
        }}
        footer={
          <Row justify="space-between">
            <Button onClick={closeDocumentsMoal} type="primary" ghost danger>
              Cancel
            </Button>
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
        }
      >
        <DocumentsContent
          multiple={multiple}
          onSelect={(documents: Document[]) => setSelectedDocuments(documents)}
          selectedDocuments={selectedDocuments}
        />
      </Modal>
      <Modal
        footer={null}
        width="40vw"
        centered
        title="Add new assets"
        visible={showUploadMoal}
        onCancel={closeUploadMoal}
      >
        <AppUploadDocuments />
      </Modal>
    </>
  );
};

const DocumentsContent: FC<DocumentsContentProps> = ({
  multiple,
  onSelect,
  selectedDocuments,
}) => {
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Browse" key="1">
          <MediaLibrary
            multiple={multiple}
            onDocumentsSelect={onSelect}
            selectedDocuments={selectedDocuments}
          />
        </TabPane>
        <TabPane tab="Selected files" key="2">
          {selectedDocuments.length < 1 && (
            <Result
              status="404"
              title="404"
              subTitle="Sorry, Nothing selected"
            />
          )}
          {selectedDocuments.length > 0 && (
            <Row gutter={[10, 10]}>
              {selectedDocuments.map((document: Document) => {
                return (
                  <Col span={6} key={document.id}>
                    <AppDocument document={document} checked={true} />
                  </Col>
                );
              })}
            </Row>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UploadComponent;
