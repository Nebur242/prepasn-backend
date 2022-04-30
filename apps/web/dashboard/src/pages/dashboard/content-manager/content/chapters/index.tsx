/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Button, Table } from "antd";
import ContentSectionWrapper from "apps/web/dashboard/src/components/content-section-wrapper";

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: (text: string) => <Button type="link">{text}</Button>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },

];


const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};

const Chapters = () => {
    return (
        <ContentSectionWrapper
            title="Chapters"
            description="All chapters"
            createButtonText="Create a new chapter"
        >
            <Table
                rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
            />
        </ContentSectionWrapper>
    )
}

export default Chapters;