/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Button, Space, Table, Tag, Modal, message } from "antd";
import { IConfirmation } from "apps/web/dashboard/src/common/interfaces/common.interface";
import { Grade } from "apps/web/dashboard/src/common/interfaces/grade.interface";
import ContentSectionWrapper from "apps/web/dashboard/src/components/content-section-wrapper";
import Icon from "apps/web/dashboard/src/components/Icon";
import { useDeleteGradeMutation, useFindAllGradesQuery } from "apps/web/dashboard/src/store/features/grades";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const { confirm } = Modal;


const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Grade[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: Grade) => ({}),
};

const Grades = () => {
    const navigate = useNavigate();

    const {
        data: grades = [],
        isLoading: gradesLoading,
        refetch,
    } = useFindAllGradesQuery();

    const [
        deleteGrade,
        {
            isSuccess,
            isError,
        }
    ] = useDeleteGradeMutation();


    useEffect(() => {
        if (isSuccess) {
            message.success("Grade supprimé avec succès");
            refetch();
        }

        if (isError) {
            message.error("Une erreur est survenue");
        }
    }, [isError, isSuccess, refetch]);


    const showConfirm = (confirmation: IConfirmation<Grade>) => {
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
    }

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
            render: (_: string, grade: Grade) => <span>{grade?.parent?.title || '-'}</span>
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: string, grade: Grade) => (
                <Space size="middle">
                    <Button type="primary" ghost icon={<Icon type="EditOutlined" />} onClick={() => navigate(`update/${grade.id}`)} />
                    <Button type="primary" ghost danger icon={<Icon type="DeleteOutlined" />}
                        onClick={() => showConfirm({
                            title: grade.title,
                            content: 'Voulez-vous vraiment supprimer cette section ?',
                            data: grade,
                            onCancel: () => console.log('cancel'),
                            onOk: () => deleteGrade(grade.id),
                        } as IConfirmation<Grade>)}
                    />
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
                loading={gradesLoading}
                columns={columns}
                dataSource={
                    grades.map((grade: Grade) => ({
                        ...grade,
                        key: grade.id,
                    }))
                }
            />
        </ContentSectionWrapper>
    )
}

export default Grades;