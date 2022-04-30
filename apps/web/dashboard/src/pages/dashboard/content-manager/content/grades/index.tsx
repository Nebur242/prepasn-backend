/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Button, Space, Table, Tag } from "antd";
import { Grade } from "apps/web/dashboard/src/common/interfaces/grade.interface";
import ContentSectionWrapper from "apps/web/dashboard/src/components/content-section-wrapper";
import Icon from "apps/web/dashboard/src/components/Icon";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";




const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Grade[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: Grade) => ({}),
};

const Grades = () => {
    const navigate = useNavigate();

    const { items: grades, loading } = useSelector((state: RootState) => state.grades);

    const columns = [
        {
            title: 'Titre',
            dataIndex: 'title',
            render: (text: string) => <Button type="link">{text}</Button>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (tag: string) => <Tag color="green" key={tag}>{tag}</Tag>,
        },
        {
            title: 'Parent',
            dataIndex: 'parent',
            render: (grade: Grade) => <span>{grade?.parent?.title || '-'}</span>
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, grade: Grade) => (
                <Space size="middle">
                    <Button type="primary" ghost icon={<Icon type="EditOutlined" />} onClick={() => navigate(`update/${grade.id}`)} />
                    <Button type="primary" ghost danger icon={<Icon type="DeleteOutlined" />} />
                </Space>
            ),
        }
    ];

    return (
        <ContentSectionWrapper
            title="Grades"
            description="All grades"
            createButtonText="Create a new grade"
            onCreate={() => navigate("create")}
        >
            <Table
                rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                }}
                loading={loading}
                columns={columns}
                dataSource={grades}
            />
        </ContentSectionWrapper>
    )
}

export default Grades;