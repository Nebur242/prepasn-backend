import {
  Alert,
  Button,
  Col,
  Divider,
  Modal,
  Pagination,
  Row,
  Space,
  Spin,
} from 'antd';
import { IPaginationOptions } from 'nestjs-typeorm-paginate/dist/interfaces';
import { useState } from 'react';
import ContentSectionWrapper from '../../../components/content-section-wrapper';
import AppDocuments from '../../../components/documents';
import AppUploadDocuments from '../../../components/uploadFiles';
import { useFindAllDocumentsQuery } from '../../../store/features/documents';
import { Document } from '@prepa-sn/shared/interfaces';

interface MediaLibraryProps {
  selectedDocuments?: Document[];
  multiple?: boolean;
  onDocumentsSelect?: (document: Document[]) => void;
  columns?: number;
}

const MediaLibrary = ({
  onDocumentsSelect,
  selectedDocuments = [],
  multiple = true,
  columns = 6,
}: MediaLibraryProps) => {
  const [pagination, setPagination] = useState<IPaginationOptions>({
    page: 1,
    limit: 10,
  });
  const [selected, setSelected] = useState<Document[]>(
    onDocumentsSelect ? selectedDocuments : []
  );

  const {
    isLoading,
    isFetching,
    data = {
      items: [],
      meta: {},
      links: {},
    },
    error,
  } = useFindAllDocumentsQuery(pagination);

  const [isVisible, setIsVisible] = useState(false);

  const openModal = () => setIsVisible(true);

  const onSelected = (documents: Document[]) => {
    if (onDocumentsSelect) {
      onDocumentsSelect(documents);
    }
    setSelected(documents);
  };

  return (
    <ContentSectionWrapper
      title="Media Library"
      description={`${
        (pagination.page as number) * (pagination.limit as number) -
        ((pagination.limit as number) - data.items.length)
      } assets`}
      createButtonText="Add new assets"
      onCreate={openModal}
      style={{
        padding: '2%',
      }}
    >
      <Space>
        <Button>Sort by</Button>
        <Button>Filter by</Button>
      </Space>
      <Divider />
      {selected.length > 0 && (
        <>
          <Row>
            <Col span={10}>
              <Alert
                showIcon
                message="Selected assets"
                description={`${selected.length} assets ready to be deleted !!`}
                type="error"
                action={
                  <Space direction="vertical">
                    <Button size="small" type="primary">
                      Accept
                    </Button>
                    <Button
                      onClick={() => setSelected([])}
                      size="small"
                      danger
                      type="ghost"
                    >
                      Decline
                    </Button>
                  </Space>
                }
              />
            </Col>
          </Row>
          <Divider />
        </>
      )}

      <Spin tip="Loading..." spinning={isFetching}>
        <AppDocuments
          multiple={multiple}
          onDocumentsSelect={onSelected}
          selectedDocuments={onDocumentsSelect ? selectedDocuments : selected}
          documents={data.items}
          loading={isLoading}
          error={error}
          columns={columns}
        />
      </Spin>
      <Divider />
      {data.items.length > 0 && (
        <Row justify="end">
          <Pagination
            defaultPageSize={pagination.limit as number}
            defaultCurrent={data.meta.currentPage}
            total={data.meta.totalItems}
            onChange={(page, pageSize) => {
              setPagination({
                ...pagination,
                page: page,
                limit: pageSize,
              });
            }}
          />
        </Row>
      )}
      <Modal
        width="50vw"
        footer={null}
        visible={isVisible}
        onCancel={() => setIsVisible(false)}
      >
        <AppUploadDocuments />
      </Modal>
    </ContentSectionWrapper>
  );
};

export default MediaLibrary;
