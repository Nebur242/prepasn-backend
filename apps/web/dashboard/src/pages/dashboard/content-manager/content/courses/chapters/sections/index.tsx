import { Button, Space, Table, Tag } from 'antd';
import dayjs from 'dayjs';

import { useFindOneChapterQuery } from '@prepa-sn/dashboard/store/features/chapters';
import { useFindAllSectionsQuery } from '@prepa-sn/dashboard/store/features/sections';
import { Section } from '@prepa-sn/shared/interfaces';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '@prepa-sn/dashboard/components/Icon';
import { showConfirm } from '@prepa-sn/dashboard/helpers/functions.helpers';
import ContentSectionWrapper from '@prepa-sn/dashboard/components/content-section-wrapper';

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: Section[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    );
  },
  getCheckboxProps: (_record: Section) => ({}),
};

const Sections = () => {
  const navigate = useNavigate();

  const { chapterId } = useParams<{
    courseId: string;
    chapterId: string;
  }>();

  const [pagination, setPagination] = useState<IPaginationOptions>({
    page: 1,
    limit: 10,
  });

  const { data, isLoading } = useFindOneChapterQuery(chapterId);

  const {
    data: sections,
    isLoading: sectionsLoading,
    isFetching: sectionsFetching,
  } = useFindAllSectionsQuery({
    ...pagination,
    chapter: chapterId,
  });

  const columns = [
    {
      title: 'Titre',
      dataIndex: 'title',
      render: (text: string, Section: Section) => (
        <Button onClick={() => navigate(`update/${Section.id}`)} type="link">
          {text}
        </Button>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (tag: string) => (
        <Tag color="green" key={tag}>
          {tag}
        </Tag>
      ),
    },

    {
      title: 'Chapitre',
      render: () => <span>{data?.title}</span>,
    },

    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (text: string) => <span>{dayjs(text).format('DD/MM/YYYY')}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: string, section: Section) => (
        <Space size="middle">
          <Button
            type="primary"
            ghost
            icon={<Icon type="EditOutlined" />}
            onClick={() => navigate(`update/${section.id}`)}
          />
          <Button
            type="primary"
            ghost
            danger
            icon={<Icon type="DeleteOutlined" />}
            onClick={() =>
              showConfirm({
                title: section.title,
                icon: <Icon type="ExclamationCircleOutlined" />,
                content: 'Voulez-vous vraiment supprimer cette section ?',
                data: section,
                onCancel: () => console.log('cancel'),
                onOk: () => console.log('ok'),
              })
            }
          />
        </Space>
      ),
    },
  ];

  return (
    <ContentSectionWrapper
      title={
        isLoading ? 'Loading...' : `Chapiter : ${data?.title ? data.title : ''}`
      }
      description="All sections"
      createButtonText="Add a new section"
      onCreate={() => navigate('create')}
    >
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        loading={sectionsLoading || sectionsFetching}
        columns={columns}
        dataSource={sections?.items?.map((section: Section) => ({
          ...section,
          key: section.id,
        }))}
        pagination={{
          defaultCurrent: 1,
          total: sections?.meta.total,
          showSizeChanger: true,
          showQuickJumper: true,
          onChange: (page: number, pageSize: number) => {
            setPagination({ ...pagination, page, limit: pageSize });
          },
        }}
      />
    </ContentSectionWrapper>
  );
};

export default Sections;
