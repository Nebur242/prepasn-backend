/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Course } from '@prepa-sn/shared/interfaces';
import { Button, Space, Table, Tag, Modal } from 'antd';
import { IConfirmation } from 'apps/web/dashboard/src/common/interfaces/common.interface';
import ContentSectionWrapper from 'apps/web/dashboard/src/components/content-section-wrapper';
import Icon from 'apps/web/dashboard/src/components/Icon';
import { useFindAllCoursesQuery } from 'apps/web/dashboard/src/store/features/courses';
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
      title: 'Created At',
      dataIndex: 'createdAt',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: string, grade: Course) => (
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
                content: 'Voulez-vous vraiment supprimer cette section ?',
                data: grade,
                onCancel: () => console.log('cancel'),
                onOk: () => console.log('ok'),
              } as IConfirmation<Course>)
            }
          />
        </Space>
      ),
    },
  ];

  return (
    <ContentSectionWrapper
      title="Courses"
      description="All courses"
      createButtonText="Create a new course"
    >
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        loading={coursesLoading}
        columns={columns}
        dataSource={courses}
      />
    </ContentSectionWrapper>
  );
};

export default Courses;
