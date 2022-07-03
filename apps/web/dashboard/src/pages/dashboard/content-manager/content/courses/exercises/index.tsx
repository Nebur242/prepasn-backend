import { Exercise } from '@prepa-sn/shared/interfaces';
import { Button, Space, Table, Tag } from 'antd';
import ContentSectionWrapper from '@prepa-sn/dashboard/components/content-section-wrapper';
import Icon from '@prepa-sn/dashboard/components/Icon';
import { showConfirm } from '@prepa-sn/dashboard/helpers/functions.helpers';
import { useFindOneChapterQuery } from '@prepa-sn/dashboard/store/features/chapters';
import { useFindAllExercisesQuery } from '@prepa-sn/dashboard/store/features/exercises';
import dayjs from 'dayjs';
import {
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: Exercise[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    );
  },
  getCheckboxProps: (_record: Exercise) => ({}),
};

const Exercises = () => {
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
    data: exercises,
    isLoading: exercisesLoading,
    isFetching: exercisesFetching,
  } = useFindAllExercisesQuery({
    ...pagination,
    chapter: chapterId,
  });

  const navigate = useNavigate();

  const columns = [
    {
      title: 'Titre',
      dataIndex: 'title',
      render: (text: string, exercise: Exercise) => (
        <Button onClick={() => navigate(`update/${exercise.id}`)} type="link">
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
      render: (text: string, exercise: Exercise) => (
        <span>{exercise.title}</span>
      ),
    },

    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (text: string) => <span>{dayjs(text).format('DD/MM/YYYY')}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: string, exercise: Exercise) => (
        <Space size="middle">
          <Button
            type="primary"
            ghost
            icon={<Icon type="EditOutlined" />}
            onClick={() => navigate(`update/${exercise.id}`)}
          />
          <Button
            type="primary"
            ghost
            danger
            icon={<Icon type="DeleteOutlined" />}
            onClick={() =>
              showConfirm({
                title: exercise.title,
                icon: <Icon type="ExclamationCircleOutlined" />,
                content: 'Voulez-vous vraiment supprimer cette section ?',
                data: exercise,
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
      description="All exercises"
      createButtonText="Add a new exercise"
      onCreate={() => navigate('create')}
    >
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        loading={exercisesLoading || exercisesFetching}
        columns={columns}
        dataSource={exercises?.items?.map((exercise: Exercise) => ({
          ...exercise,
          key: exercise.id,
        }))}
        pagination={{
          defaultCurrent: 1,
          total: exercises?.meta.total,
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

export default Exercises;
