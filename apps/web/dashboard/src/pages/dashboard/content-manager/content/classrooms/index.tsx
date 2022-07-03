/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Classroom } from '@prepa-sn/shared/interfaces';
import { Button, Space, Table, Tag } from 'antd';
import ContentSectionWrapper from 'apps/web/dashboard/src/components/content-section-wrapper';
import Icon from 'apps/web/dashboard/src/components/Icon';
import { showConfirm } from 'apps/web/dashboard/src/helpers/functions.helpers';
import { useFindAllClassroomsQuery } from 'apps/web/dashboard/src/store/features/classrooms';
import {
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: Classroom[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    );
  },
  getCheckboxProps: (_record: Classroom) => ({}),
};

const Classrooms = () => {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState<IPaginationOptions>({
    page: 1,
    limit: 10,
  });

  const {
    data: classrooms,
    isLoading,
    isFetching,
  } = useFindAllClassroomsQuery({
    ...pagination,
  });

  const columns = [
    {
      title: 'Titre',
      dataIndex: 'title',
      render: (text: string, classroom: Classroom) => (
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
      render: (_: string, classroom: Classroom) => (
        <Space size="middle">
          <Button
            type="primary"
            ghost
            icon={<Icon type="EditOutlined" />}
            onClick={() => navigate(`update/${classroom.id}`)}
          />
          <Button
            type="primary"
            ghost
            danger
            icon={<Icon type="DeleteOutlined" />}
            onClick={() =>
              showConfirm({
                title: classroom.title,
                icon: <Icon type="ExclamationCircleOutlined" />,
                content: 'Voulez-vous vraiment supprimer cette section ?',
                data: classroom,
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
      title={`Classes `}
      description="All Classes"
      createButtonText="Add a new class"
      onCreate={() => navigate('create')}
    >
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        loading={isLoading || isFetching}
        columns={columns}
        dataSource={classrooms?.items.map((classroom: Classroom) => ({
          ...classroom,
          key: classroom.id,
        }))}
        pagination={{
          defaultCurrent: 1,
          total: classrooms?.meta.total,
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

export default Classrooms;
