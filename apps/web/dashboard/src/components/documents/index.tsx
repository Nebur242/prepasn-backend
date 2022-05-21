import { Document } from '@prepa-sn/shared/interfaces';
import { Alert, Card, Col, Row } from 'antd';
import { FC } from 'react';
import AppDocument from '../document';

interface DocumentsProps {
  documents: Document[];
  loading: boolean;
  error: unknown;
  selectedDocuments?: Document[];
  multiple?: boolean;
  onDocumentsSelect?: (document: Document[]) => void;
  columns?: number;
}
const Documents: FC<DocumentsProps> = ({
  documents,
  loading,
  error,
  selectedDocuments = [],
  multiple = false,
  onDocumentsSelect,
  columns = 4,
}) => {
  if (loading)
    return (
      <Row gutter={[10, 10]}>
        {[...new Array(10)].map((_, index) => (
          <Col key={index} span={24 / columns}>
            <Card loading />
          </Col>
        ))}
      </Row>
    );

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
            <Col span={24 / columns} key={document.id}>
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
