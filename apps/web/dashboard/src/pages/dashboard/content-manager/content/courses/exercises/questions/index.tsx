/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Exercise, Question } from '@prepa-sn/shared/interfaces';
import { Button, Modal, Row, Space, Table, Tag } from 'antd';
import { IConfirmation } from 'apps/web/dashboard/src/common/interfaces/common.interface';
import Icon from 'apps/web/dashboard/src/components/Icon';
import { showConfirm } from 'apps/web/dashboard/src/helpers/functions.helpers';
import dayjs from 'dayjs';
import { FC, useState } from 'react';
import Create from './create';
import Update from './update';

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
  exercise: Exercise;
};

const Questions: FC<QuestionsProps> = ({ questions, exercise }) => {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question>();

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
          <Button
            onClick={() => {
              setCurrentQuestion(question);
              setUpdateModalVisible(true);
            }}
            type="primary"
            ghost
            icon={<Icon type="EditOutlined" />}
          />
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
        <Button
          onClick={() => setCreateModalVisible(true)}
          icon={<Icon type="PlusOutlined" />}
          type="primary"
        >
          Ajouter une question
        </Button>
      </Row>
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={questions?.map((q: Question) => ({
          ...q,
          key: q.id,
        }))}
      />
      <Modal
        width={`60vw`}
        title="Ajouter une question à l'exercice"
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={null}
      >
        <Create exercise={exercise} />
      </Modal>
      <Modal
        width={`60vw`}
        title="Mettre à jour cette question"
        visible={updateModalVisible}
        onCancel={() => setUpdateModalVisible(false)}
        footer={null}
      >
        <Update exercise={exercise} question={currentQuestion} />
      </Modal>
    </div>
  );
};

export default Questions;
