/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Course } from '@prepa-sn/shared/interfaces';
import { Button, Space, Table, Tag, Modal, message } from 'antd';
import { IConfirmation } from 'apps/web/dashboard/src/common/interfaces/common.interface';
import ContentSectionWrapper from 'apps/web/dashboard/src/components/content-section-wrapper';
import Icon from 'apps/web/dashboard/src/components/Icon';
import { useDeleteCourseMutation, useFindAllCoursesQuery } from 'apps/web/dashboard/src/store/features/courses';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const { confirm } = Modal;

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

  const { data: courses = [], isLoading: coursesLoading } =
    useFindAllCoursesQuery();

  const [
    deleteCourse,
    {
      isSuccess,
      isError,
    }
  ] = useDeleteCourseMutation();

  const showConfirm = (confirmation: IConfirmation<Course>) => {
    const { title, content, onCancel, onOk } = confirmation;
    confirm({
      title,
      icon: <Icon type="ExclamationCircleOutlined" />,
      content,
      okButtonProps: {
        danger: true,
      },
      onCancel,
      onOk,
    });
  };

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
                content: 'Voulez-vous vraiment supprimer cette section ?',
                data: course,
                onCancel: () => console.log('cancel'),
                onOk: () => deleteCourse(course.id),
              } as IConfirmation<Course>)
            }
          />
        </Space>
      ),
    },
  ];


  useEffect(() => {
    if (isSuccess) {
      message.success("Grade supprimé avec succès");
    }

    if (isError) {
      message.error("Une erreur est survenue");
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
        loading={coursesLoading}
        columns={columns}
        dataSource={courses.map((course: Course) => ({
          ...course,
          key: course.id,
        }))}
      />
    </ContentSectionWrapper>
  );
};

export default Courses;
