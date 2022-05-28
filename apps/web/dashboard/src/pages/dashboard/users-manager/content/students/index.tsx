import { Student } from '@prepa-sn/shared/interfaces';
import { Button, Space, Table, Tag } from 'antd';
import { IConfirmation } from 'apps/web/dashboard/src/common/interfaces/common.interface';
import ContentSectionWrapper from 'apps/web/dashboard/src/components/content-section-wrapper'
import Icon from 'apps/web/dashboard/src/components/Icon';
import { showConfirm } from 'apps/web/dashboard/src/helpers/functions.helpers';
import { useFindAllStudentsQuery } from 'apps/web/dashboard/src/store/features/students';
import dayjs from 'dayjs';
import { IPaginationLinks, IPaginationMeta, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Students = () => {
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
    } = useFindAllStudentsQuery({
        ...pagination,
    });

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
                        onClick={() => navigate(`update/${student.id}`)}
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
                                onOk: () => console.log('ok'),
                            } as IConfirmation<Student>)
                        }
                    />
                </Space>
            ),
        },
    ];

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
                dataSource={classrooms?.items.map((student: Student) => ({
                    ...student,
                    key: student.id,
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
    )
}

export default Students