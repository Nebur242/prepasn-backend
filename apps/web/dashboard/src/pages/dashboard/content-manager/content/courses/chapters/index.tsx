/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Chapter } from '@prepa-sn/shared/interfaces';
import { Button, Space, Table, Tag, Modal, message } from 'antd';
import { IConfirmation } from 'apps/web/dashboard/src/common/interfaces/common.interface';
import ContentSectionWrapper from 'apps/web/dashboard/src/components/content-section-wrapper';
import Icon from 'apps/web/dashboard/src/components/Icon';
import { showConfirm } from 'apps/web/dashboard/src/helpers/functions.helpers';
import { useDeleteChapterMutation } from 'apps/web/dashboard/src/store/features/chapters';
import { useFindOneCourseQuery } from 'apps/web/dashboard/src/store/features/courses';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const { confirm } = Modal;

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

const Chapters = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useFindOneCourseQuery(
    courseId as string
  );

  const [deleteChapter, { isSuccess, isError }] = useDeleteChapterMutation();

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
      title: 'Course',
      render: () => <span>{data?.title}</span>,
    },

    {
      title: 'Created At',
      dataIndex: 'createdAt',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: string, chapter: Chapter) => (
        <Space size="middle">
          <Button
            type="primary"
            ghost
            icon={<Icon type="EditOutlined" />}
            onClick={() => navigate(`update/${chapter.id}`)}
          />
          <Button
            type="primary"
            ghost
            danger
            icon={<Icon type="DeleteOutlined" />}
            onClick={() =>
              showConfirm({
                title: chapter.title,
                icon: <Icon type="ExclamationCircleOutlined" />,
                content: 'Voulez-vous vraiment supprimer cette section ?',
                data: chapter,
                onCancel: () => console.log('cancel'),
                onOk: () => deleteChapter(chapter.id),
              } as IConfirmation<Chapter>)
            }
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (isSuccess) {
      message.success('Chapitre supprimé avec succès');
    }

    if (isError) {
      message.error('Une erreur est survenue');
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    refetch();
  }, [refetch]);

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

export default Chapters;
