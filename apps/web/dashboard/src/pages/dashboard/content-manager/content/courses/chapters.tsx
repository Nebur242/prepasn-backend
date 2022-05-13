/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Chapter } from '@prepa-sn/shared/interfaces';
import { Button, Table, Tag } from 'antd';
import ContentSectionWrapper from 'apps/web/dashboard/src/components/content-section-wrapper';
import { useFindOneCourseQuery } from 'apps/web/dashboard/src/store/features/courses';
import { useNavigate, useParams } from 'react-router-dom';

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: Chapter[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    );
  },
  getCheckboxProps: (_record: Chapter) => ({}),
};

const CourseChapters = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useFindOneCourseQuery(id as string);

  const columns = [
    {
      title: 'Titre',
      dataIndex: 'title',
      render: (text: string, chapter: Chapter) => (
        <Button onClick={() => navigate(`update/${chapter.id}`)} type="link">
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
      title: 'Created At',
      dataIndex: 'createdAt',
    },
  ];

  return (
    <ContentSectionWrapper
      title={`Chapters : Course ${data?.title ? data.title : ''}`}
      description="All Chapters"
      createButtonText="Add a new chapter"
      onCreate={() => navigate('create')}
    >
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        loading={isLoading}
        columns={columns}
        dataSource={data?.chapters?.map((chapter: Chapter) => ({
          ...chapter,
          key: chapter.id,
        }))}
      />
    </ContentSectionWrapper>
  );
};

export default CourseChapters;
