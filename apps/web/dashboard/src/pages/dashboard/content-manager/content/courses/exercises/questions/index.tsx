import { Question } from '@prepa-sn/shared/interfaces';
import { Button, Row, Space, Table, Tag } from 'antd';
import { IConfirmation } from 'apps/web/dashboard/src/common/interfaces/common.interface';
import Icon from 'apps/web/dashboard/src/components/Icon';
import { showConfirm } from 'apps/web/dashboard/src/helpers/functions.helpers';
import dayjs from 'dayjs';
import { FC } from 'react';

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: Question[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    );
  },
  getCheckboxProps: (_record: Question) => ({}),
};

type QuestionsProps = {
  questions: Question[];
};

const Questions: FC<QuestionsProps> = ({ questions }) => {
  console.log('questions', questions);

  const columns = [
    {
      title: 'Titre',
      dataIndex: 'title',
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
      render: (_: string, question: Question) => (
        <Space size="middle">
          <Button type="primary" ghost icon={<Icon type="EditOutlined" />} />
          <Button
            type="primary"
            ghost
            danger
            icon={<Icon type="DeleteOutlined" />}
            onClick={() =>
              showConfirm({
                title: question.title,
                icon: <Icon type="ExclamationCircleOutlined" />,
                content: 'Voulez-vous vraiment supprimer cette section ?',
                data: question,
                onCancel: () => console.log('cancel'),
                onOk: () => console.log('ok'),
              } as IConfirmation<Question>)
            }
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Row style={{ marginBottom: 20 }} justify="end">
        <Button icon={<Icon type="PlusOutlined" />} type="primary">
          Ajouter une question
        </Button>
      </Row>
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={questions?.map((question: Question) => ({
          ...question,
          key: question.id,
        }))}
      />
    </div>
  );
};

export default Questions;
