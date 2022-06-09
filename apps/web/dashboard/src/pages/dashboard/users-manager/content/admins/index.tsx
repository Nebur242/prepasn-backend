/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Admin, Student } from '@prepa-sn/shared/interfaces';
import { Button, message, Space, Table, Tag } from 'antd';
import { IConfirmation } from 'apps/web/dashboard/src/common/interfaces/common.interface';
import ContentSectionWrapper from 'apps/web/dashboard/src/components/content-section-wrapper';
import Icon from 'apps/web/dashboard/src/components/Icon';
import { showConfirm } from 'apps/web/dashboard/src/helpers/functions.helpers';
import {
  useDeleteAdminMutation,
  useFindAllAdminsQuery,
} from 'apps/web/dashboard/src/store/features/admin';

import dayjs from 'dayjs';
import {
  IPaginationLinks,
  IPaginationMeta,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admins = () => {
  const navigate = useNavigate();

  const [pagination, setPagination] = useState<IPaginationOptions>({
    page: 1,
    limit: 10,
  });

  const {
    data: admins = {
      items: [],
      meta: {} as IPaginationMeta,
      links: {} as IPaginationLinks,
    },
    isLoading,
    isFetching,
  } = useFindAllAdminsQuery({
    ...pagination,
  });

  const [deleteAdmin, { isSuccess: isDeleted, isError: hasError }] =
    useDeleteAdminMutation();

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
      render: (_: string, admin: Admin) => (
        <Space size="middle">
          <Button
            type="primary"
            ghost
            icon={<Icon type="EditOutlined" />}
            onClick={() => navigate(`update/${admin.uid}`)}
          />
          <Button
            type="primary"
            ghost
            danger
            icon={<Icon type="DeleteOutlined" />}
            onClick={() =>
              showConfirm({
                title: admin.email,
                icon: <Icon type="ExclamationCircleOutlined" />,
                content: 'Voulez-vous vraiment supprimer cette section ?',
                data: admin,
                onCancel: () => console.log('cancel'),
                onOk: () => deleteAdmin({ uid: admin.uid }),
              } as IConfirmation<Admin>)
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
        dataSource={admins?.items.map((admin: Admin) => ({
          ...admin,
          key: admin.id,
        }))}
        pagination={{
          defaultCurrent: 1,
          total: admins?.meta.total,
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

export default Admins;
