import {
  useFindAllUsersQuery,
  useUpdateUserMutation,
} from '@prepa-sn/dashboard/store/features/users';
import { Role } from '@prepa-sn/shared/enums';
import { Student } from '@prepa-sn/shared/interfaces';
import { Button, message, Space, Table, Tag } from 'antd';
import ContentSectionWrapper from '@prepa-sn/dashboard/components/content-section-wrapper';
import Icon from '@prepa-sn/dashboard/components/Icon';
import { showConfirm } from '@prepa-sn/dashboard/helpers/functions.helpers';
import dayjs from 'dayjs';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Students = () => {
  const navigate = useNavigate();

  const [pagination, setPagination] = useState<IPaginationOptions>({
    page: 1,
    limit: 10,
  });

  const {
    data: students,
    isLoading,
    isFetching,
  } = useFindAllUsersQuery({
    pagination,
    filter: {
      roles: [Role.STUDENT],
    },
  });

  const [deleteStudent, { isSuccess: isDeleted, isError: hasError }] =
    useUpdateUserMutation();

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      render: (text: string, classroom: Student) => (
        <Button onClick={() => navigate(`update/${classroom.id}`)} type="link">
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
      render: (text: string) => <span>{dayjs(text).format('DD/MM/YYYY')}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: string, student: Student) => (
        <Space size="middle">
          <Button
            type="primary"
            ghost
            icon={<Icon type="EditOutlined" />}
            onClick={() => navigate(`update/${student.uid}`)}
          />
          <Button
            type="primary"
            ghost
            danger
            icon={<Icon type="DeleteOutlined" />}
            onClick={() =>
              showConfirm({
                title: student.email,
                icon: <Icon type="ExclamationCircleOutlined" />,
                content: 'Voulez-vous vraiment supprimer cette section ?',
                data: student,
                onCancel: () => console.log('cancel'),
                onOk: () => deleteStudent({ uid: student.uid }),
              })
            }
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (isDeleted) {
      message.success("L'étudiant a été supprimé avec succès");
    }
    if (hasError) {
      message.error('Une erreur est survenue lors de la suppression');
    }
  }, [isDeleted, hasError]);

  return (
    <ContentSectionWrapper
      title="Students"
      description="All students"
      createButtonText="Create a new student"
      onCreate={() => navigate('create')}
    >
      <Table
        rowSelection={{
          type: 'checkbox',
        }}
        loading={isLoading || isFetching}
        columns={columns}
        dataSource={students?.items.map((student: Student) => ({
          ...student,
          key: student.id,
        }))}
        pagination={{
          defaultCurrent: 1,
          total: students?.meta.total,
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

export default Students;
