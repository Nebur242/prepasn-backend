import { Course } from '@prepa-sn/shared/interfaces';
import { Button, Space, Table, Tag, message } from 'antd';
import ContentSectionWrapper from '@prepa-sn/dashboard/components/content-section-wrapper';
import Icon from '@prepa-sn/dashboard/components/Icon';
import { showConfirm } from '@prepa-sn/dashboard/helpers/functions.helpers';
import {
  useDeleteCourseMutation,
  useFindAllCoursesQuery,
} from '@prepa-sn/dashboard/store/features/courses';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: Course[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    );
  },
  getCheckboxProps: (_record: Course) => ({}),
};

const Courses = () => {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState<IPaginationOptions>({
    page: 1,
    limit: 10,
  });

  const {
    data: courses,
    isLoading: coursesLoading,
    isFetching,
  } = useFindAllCoursesQuery({
    ...pagination,
  });

  const [deleteCourse, { isSuccess, isError }] = useDeleteCourseMutation();

  const columns = [
    {
      title: 'Titre',
      dataIndex: 'title',
      render: (text: string, course: Course) => (
        <Button onClick={() => navigate(`update/${course.id}`)} type="link">
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
    {
      title: 'Chapters',
      dataIndex: 'createdAt',
      render: (_text: undefined, course: Course) => (
        <Button onClick={() => navigate(`${course.id}/chapters`)} type="link">
          Chapters
        </Button>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: string, course: Course) => (
        <Space size="middle">
          <Button
            type="primary"
            ghost
            icon={<Icon type="EditOutlined" />}
            onClick={() => navigate(`update/${course.id}`)}
          />
          <Button
            type="primary"
            ghost
            danger
            icon={<Icon type="DeleteOutlined" />}
            onClick={() =>
              showConfirm({
                title: course.title,
                icon: <Icon type="ExclamationCircleOutlined" />,
                content: 'Voulez-vous vraiment supprimer cette section ?',
                data: course,
                onCancel: () => console.log('cancel'),
                onOk: () => deleteCourse(course.id),
              })
            }
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (isSuccess) {
      message.success('Grade supprimé avec succès');
    }

    if (isError) {
      message.error('Une erreur est survenue');
    }
  }, [isError, isSuccess]);

  return (
    <ContentSectionWrapper
      title="Courses"
      description="All courses"
      createButtonText="Create a new course"
      onCreate={() => navigate('create')}
    >
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        loading={coursesLoading || isFetching}
        columns={columns}
        dataSource={courses?.items.map((course: Course) => ({
          ...course,
          key: course.id,
        }))}
        pagination={{
          defaultCurrent: 1,
          total: courses?.meta.total,
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

export default Courses;
