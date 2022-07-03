import { Grade } from '@prepa-sn/shared/interfaces';
import { Button, Space, Table, Tag, message } from 'antd';
import ContentSectionWrapper from '@prepa-sn/dashboard/components/content-section-wrapper';
import Icon from '@prepa-sn/dashboard/components/Icon';
import { showConfirm } from '@prepa-sn/dashboard/helpers/functions.helpers';
import {
  useDeleteGradeMutation,
  useFindAllGradesQuery,
} from '@prepa-sn/dashboard/store/features/grades';
import {

  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: Grade[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    );
  },
  getCheckboxProps: (record: Grade) => ({}),
};

const Grades = () => {
  const navigate = useNavigate();

  const [pagination, setPagination] = useState<IPaginationOptions>({
    page: 1,
    limit: 10,
  });

  const {
    data: grades,
    isLoading: gradesLoading,
    isFetching,
  } = useFindAllGradesQuery({
    ...pagination,
  });

  const [deleteGrade, { isSuccess, isError }] = useDeleteGradeMutation();

  useEffect(() => {
    if (isSuccess) {
      message.success('Grade supprimé avec succès');
    }

    if (isError) {
      message.error('Une erreur est survenue');
    }
  }, [isError, isSuccess]);

  const columns = [
    {
      title: 'Titre',
      dataIndex: 'title',
      render: (text: string) => <Button type="link">{text}</Button>,
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
      title: 'Parent',
      dataIndex: 'parent',
      render: (_: string, grade: Grade) => (
        <span>{grade?.parent?.title || '-'}</span>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: string, grade: Grade) => (
        <Space size="middle">
          <Button
            type="primary"
            ghost
            icon={<Icon type="EditOutlined" />}
            onClick={() => navigate(`update/${grade.id}`)}
          />
          <Button
            type="primary"
            ghost
            danger
            icon={<Icon type="DeleteOutlined" />}
            onClick={() =>
              showConfirm({
                title: grade.title,
                icon: <Icon type="ExclamationCircleOutlined" />,
                content: 'Voulez-vous vraiment supprimer cette section ?',
                data: grade,
                onCancel: () => console.log('cancel'),
                onOk: () => deleteGrade(grade.id),
              })
            }
          />
        </Space>
      ),
    },
  ];

  return (
    <ContentSectionWrapper
      title="Grades"
      description="All grades"
      createButtonText="Create a new grade"
      onCreate={() => navigate('create')}
    >
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        loading={gradesLoading || isFetching}
        columns={columns}
        dataSource={grades?.items?.map((grade: Grade) => ({
          ...grade,
          key: grade.id,
        }))}
        pagination={{
          defaultCurrent: 1,
          total: grades?.meta.total,
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

export default Grades;
