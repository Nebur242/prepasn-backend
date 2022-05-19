import { Document } from '@prepa-sn/shared/interfaces';
import { Alert, Button, Col, Divider, Row, Space, Spin } from 'antd';
import { FC } from 'react';
import AppDocument from '../document';

interface DocumentsProps {
  documents: Document[];
  loading: boolean;
  error: unknown;
  selectedDocuments?: Document[];
  multiple?: boolean;
  onDocumentsSelect?: (document: Document[]) => void;
}
const Documents: FC<DocumentsProps> = ({
  documents,
  loading,
  error,
  selectedDocuments = [],
  multiple = false,
  onDocumentsSelect,
}) => {
  if (loading) return <Spin />;

  if (error) return <Alert message="Error" type="error" />;

  const handleSelect = (document: Document, checked: boolean) => {
    if (checked) {
      if (multiple) {
        const selected: Document[] = [...(selectedDocuments || []), document];
        return onDocumentsSelect?.(selected);
      } else {
        return onDocumentsSelect?.([document]);
      }
    }

    if (multiple) {
      const selected: Document[] =
        selectedDocuments?.filter((d) => d.id !== document.id) || [];
      return onDocumentsSelect?.(selected);
    }

    return onDocumentsSelect?.([]);
  };

  return (
    <div>
      <Row gutter={[10, 10]}>
        {documents.map((document: Document) => {
          return (
            <Col span={6} key={document.id}>
              <AppDocument
                document={document}
                checked={selectedDocuments?.some((d) => d.id === document.id)}
                onDocumentSelect={handleSelect}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Documents;
