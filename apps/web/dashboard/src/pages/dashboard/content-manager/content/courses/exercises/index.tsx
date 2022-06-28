/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Exercise } from '@prepa-sn/shared/interfaces';
import { Button, Space, Table, Tag } from 'antd';
import { IConfirmation } from 'apps/web/dashboard/src/common/interfaces/common.interface';
import ContentSectionWrapper from 'apps/web/dashboard/src/components/content-section-wrapper';
import Icon from 'apps/web/dashboard/src/components/Icon';
import { showConfirm } from 'apps/web/dashboard/src/helpers/functions.helpers';
import { useFindOneChapterQuery } from 'apps/web/dashboard/src/store/features/chapters';
import dayjs from 'dayjs';
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

  const { data, isLoading, isFetching } = useFindOneChapterQuery(chapterId);

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
              } as IConfirmation<Exercise>)
            }
          />
        </Space>
      ),
    },
  ];

  return (
    <ContentSectionWrapper
      title={`Chapiter : ${data?.title ? data.title : ''}`}
      description="All exercises"
      createButtonText="Add a new exercise"
      onCreate={() => navigate('create')}
    >
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        loading={isLoading || isFetching}
        columns={columns}
        dataSource={data?.exercises?.map((exercise: Exercise) => ({
          ...exercise,
          key: exercise.id,
        }))}
      />
    </ContentSectionWrapper>
  );
};

export default Exercises;