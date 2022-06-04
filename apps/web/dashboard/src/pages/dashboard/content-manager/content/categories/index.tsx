import { Category } from '@prepa-sn/shared/interfaces';
import { Button, Space, Table, Tag } from 'antd';
import { IConfirmation } from 'apps/web/dashboard/src/common/interfaces/common.interface';
import ContentSectionWrapper from 'apps/web/dashboard/src/components/content-section-wrapper';
import Icon from 'apps/web/dashboard/src/components/Icon';
import { showConfirm } from 'apps/web/dashboard/src/helpers/functions.helpers';
import { useFindAllCategoriesQuery } from 'apps/web/dashboard/src/store/features/categories';
import dayjs from 'dayjs';
import {
  IPaginationLinks,
  IPaginationMeta,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: Category[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    );
  },
  getCheckboxProps: (_record: Category) => ({}),
};

const Categories = () => {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState<IPaginationOptions>({
    page: 1,
    limit: 10,
  });

  const {
    data: classrooms = {
      items: [],
      meta: {} as IPaginationMeta,
      links: {} as IPaginationLinks,
    },
    isLoading,
    isFetching,
  } = useFindAllCategoriesQuery({
    ...pagination,
  });

  const columns = [
    {
      title: 'Titre',
      dataIndex: 'title',
      render: (text: string, classroom: Category) => (
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
      render: (_: string, classroom: Category) => (
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
              } as IConfirmation<Category>)
            }
          />
        </Space>
      ),
    },
  ];

  return (
    <ContentSectionWrapper
      title={`Categories`}
      description="All Categories"
      createButtonText="Add a new category"
      onCreate={() => navigate('create')}
    >
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        loading={isLoading || isFetching}
        columns={columns}
        dataSource={classrooms?.items.map((classroom: Category) => ({
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

export default Categories;
