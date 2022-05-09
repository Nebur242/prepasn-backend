import { Document } from "@prepa-sn/shared/interfaces";
import { Alert, Button, Col, Divider, Pagination, Row, Space, Spin } from "antd";
import { FC } from "react";
import AppDocument from "../document";


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

    if (error) return <Alert message='Error' type="error" />;

    const handleSelect = (document: Document, checked: boolean) => {
        if (checked) {
            if (multiple) {
                const selected: Document[] = [...(selectedDocuments || []), document];
                onDocumentsSelect && onDocumentsSelect(selected);
            } else {
                onDocumentsSelect && onDocumentsSelect([document]);
            }
        }

        if (!checked && multiple) {
            const selected: Document[] = selectedDocuments?.filter(d => d.id !== document.id) || [];
            onDocumentsSelect && onDocumentsSelect(selected);
        }

        if (!checked && !multiple) {
            onDocumentsSelect && onDocumentsSelect([]);
        }

    }

    return (
        <div>
            <Space>
                <Button>Sort by</Button>
                <Button>Filter by</Button>
            </Space>
            <Divider />
            <Row gutter={[10, 10]}>
                {
                    documents.map((document: Document) => {
                        return (
                            <Col span={6} key={document.id}>
                                <AppDocument
                                    document={document}
                                    checked={selectedDocuments?.some(d => d.id === document.id)}
                                    onDocumentSelect={handleSelect}
                                />
                            </Col>
                        )
                    })
                }
            </Row>
            <Divider />
            <Row justify="end">
                <Pagination defaultCurrent={1} total={documents.length} />
            </Row>
        </div>
    )
}

export default Documents;