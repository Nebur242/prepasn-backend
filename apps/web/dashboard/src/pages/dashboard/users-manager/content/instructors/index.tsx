/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Instructor, Student } from '@prepa-sn/shared/interfaces';
import { Button, message, Space, Table, Tag } from 'antd';
import { IConfirmation } from 'apps/web/dashboard/src/common/interfaces/common.interface';
import ContentSectionWrapper from 'apps/web/dashboard/src/components/content-section-wrapper';
import Icon from 'apps/web/dashboard/src/components/Icon';
import { showConfirm } from 'apps/web/dashboard/src/helpers/functions.helpers';
import {
  useDeleteInstructorMutation,
  useFindAllInstructorsQuery,
} from 'apps/web/dashboard/src/store/features/instructors';
import dayjs from 'dayjs';
import {
  IPaginationLinks,
  IPaginationMeta,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Instructors = () => {
  const navigate = useNavigate();

  const [pagination, setPagination] = useState<IPaginationOptions>({
    page: 1,
    limit: 10,
  });

  const {
    data: instructors = {
      items: [],
      meta: {} as IPaginationMeta,
      links: {} as IPaginationLinks,
    },
    isLoading,
    isFetching,
  } = useFindAllInstructorsQuery({
    ...pagination,
  });

  const [deleteInstructor, { isSuccess: isDeleted, isError: hasError }] =
    useDeleteInstructorMutation();

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
      render: (_: string, instructor: Instructor) => (
        <Space size="middle">
          <Button
            type="primary"
            ghost
            icon={<Icon type="EditOutlined" />}
            onClick={() => navigate(`update/${instructor.uid}`)}
          />
          <Button
            type="primary"
            ghost
            danger
            icon={<Icon type="DeleteOutlined" />}
            onClick={() =>
              showConfirm({
                title: instructor.email,
                icon: <Icon type="ExclamationCircleOutlined" />,
                content: 'Voulez-vous vraiment supprimer cette section ?',
                data: instructor,
                onCancel: () => console.log('cancel'),
                onOk: () => deleteInstructor({ uid: instructor.uid }),
              } as IConfirmation<Instructor>)
            }
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (isDeleted) {
      message.success('Professeur a été supprimé avec succès');
    }
    if (hasError) {
      message.error('Une erreur est survenue lors de la suppression');
    }
  }, [isDeleted, hasError]);

  return (
    <ContentSectionWrapper
      title="Instructors"
      description="All instructors"
      createButtonText="Create a new instructor"
      onCreate={() => navigate('create')}
    >
      <Table
        rowSelection={{
          type: 'checkbox',
        }}
        loading={isLoading || isFetching}
        columns={columns}
        dataSource={instructors?.items.map((instructor: Instructor) => ({
          ...instructor,
          key: instructor.id,
        }))}
        pagination={{
          defaultCurrent: 1,
          total: instructors?.meta.total,
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

export default Instructors;
