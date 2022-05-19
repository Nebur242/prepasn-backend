import { Document } from '@prepa-sn/shared/interfaces';
import {
  Button,
  Card,
  Checkbox,
  Image,
  Row,
  message,
  Modal,
  Col,
  Typography,
  Divider,
  Form,
  Input
} from 'antd';
import { FC, useEffect, useState } from 'react';
import { showConfirm } from '../../helpers/functions.helpers';
import { useDeleteDocumentMutation, useUpdateDocumentMutation } from '../../store/features/documents';
import Icon from '../Icon';

const { Meta } = Card;
const { Title, Paragraph } = Typography;

interface DocumentProps {
  document: Document;
  checked?: boolean;
  onDocumentSelect?: (document: Document, checked: boolean) => void;
}

const AppDocument: FC<DocumentProps> = ({
  document,
  checked = false,
  onDocumentSelect,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [form] = Form.useForm<Partial<Document>>();
  const [deleteDocument, { isSuccess, isError, isLoading }] =
    useDeleteDocumentMutation();

  const [updateDocument, { isSuccess: hasUpdated, isError: updateFailed, isLoading: isUpdating }] =
    useUpdateDocumentMutation();

  const onDocumentDelete = (doc: Document) => {
    showConfirm({
      title: 'Supprimer un document',
      icon: <Icon type="ExclamationCircleOutlined" />,
      content: `Voulez-vous supprimer le document ${doc.title} ?`,
      data: doc,
      onCancel: () => {
        console.log('cancel');
      },
      onOk: () => {
        deleteDocument(document);
      },
    });
  };

  const onDocumentEdit = (doc: Document) => {
    setIsVisible(true);
  };

  const onDocumentSetting = (doc: Document) => {
    console.log('setting', doc);
  };


  const edit = (values: Partial<Document>) => {
    if (!form.isFieldsTouched()) return message.warn('Nothing changed');
    updateDocument({
      ...values,
      id: document.id,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      message.success('Document supprimé avec succès');
    }
    if (isError) {
      message.error('Une erreur est survenue');
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (hasUpdated) {
      message.success('Document mis jour avec succès');
    }
    if (updateFailed) {
      message.error('Une erreur est survenue');
    }
  }, [hasUpdated, updateFailed]);

  useEffect(() => {
    if (document) {
      form.setFieldsValue({
        title: document.title,
        description: document.description,
        publicUrl: document.publicUrl,
      });
    }
  }, [form, document]);

  return (
    <>
      <Card
        cover={
          <div
            style={{
              position: 'relative',
            }}
          >
            <Row
              style={{
                padding: '10px',
                position: 'absolute',
                zIndex: 10,
                width: '100%',
              }}
              justify="space-between"
              align="middle"
            >
              <Checkbox
                checked={checked}
                onChange={(e) =>
                  onDocumentSelect && onDocumentSelect(document, e.target.checked)
                }
              />
            </Row>

            <div style={{
              height: '120px',
              overflow: 'hidden',
            }}>
              <AppFileReader document={document} />
            </div>
          </div>
        }
        actions={[
          <Button
            loading={isLoading}
            type="text"
            icon={<Icon type="DeleteOutlined" key="delete" />}
            onClick={() => onDocumentDelete(document)}
          />,
          <Button
            type="text"
            icon={<Icon type="EditOutlined" key="edit" />}
            onClick={() => onDocumentEdit(document)}
          />,
          <Button
            type="text"
            icon={<Icon type="EllipsisOutlined" key="ellipsis" />}
            onClick={() => onDocumentSetting(document)}
          />,
        ]}
      >
        <Meta title={document.title} description={document.description} />
      </Card>
      <Modal
        title={`Editer les informations`}
        width={'60vw'} visible={isVisible}
        onCancel={() => setIsVisible(false)}
        footer={
          <Row justify="space-between">
            <Button loading={isLoading} onClick={() => onDocumentDelete(document)} icon={<Icon type='DeleteOutlined' />} size='large' type='primary' danger ghost>Supprimer le document</Button>
            <Button disabled={isLoading} onClick={() => setIsVisible(false)} icon={<Icon type='CloseCircleOutlined' />} size='large' type='primary' ghost>Fermer le document</Button>
          </Row>
        }
      >
        <Row gutter={20}>
          <Col span={8}>
            <Title style={{ marginBottom: 20 }} level={5}>Preview</Title>
            <div style={{
              aspectRatio: "1 / 1",
              border: "2px solid #ddd",
              borderRadius: 10,
              overflow: 'hidden'
            }}>
              <AppFileReader document={document} />
            </div>
            <Divider />
            <Title level={5}>Autres informations</Title>
            <Paragraph>Filename : {document.filename}</Paragraph>
            <Paragraph>Mimetype : {document.mimetype}</Paragraph>
            <Paragraph>Size : {document.size}</Paragraph>
            {/* <Paragraph>CreatedAt : {`${document.createdAt}`}</Paragraph>
            <Paragraph>UpdateddAt : {`${document.updatedAt}`}</Paragraph> */}

          </Col>
          <Col span={16}>
            <Form onFinish={edit} layout='vertical' form={form} style={{ marginTop: 40 }}>
              <Form.Item name='title' label='Titre'
                rules={[{ required: true, message: 'Veuillez entrer un titre' }]}
              >
                <Input size='large' placeholder='Titre' />
              </Form.Item>
              <Form.Item name="description" label='Descriptiont' >
                <Input.TextArea rows={6} size='large' placeholder='Description' />
              </Form.Item>
              <Form.Item name='publicUrl' label='Lien public' rules={[{ required: true, message: 'Veuillez entrer un titre' }]}>
                <Input disabled size='large' placeholder='Lien public' />
              </Form.Item>
              <Form.Item>
                <Button
                  loading={isUpdating}
                  htmlType='submit'
                  icon={<Icon type='EditOutlined' />}
                  block
                  type='primary'
                  size='large'
                >
                  Mettre à jour
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

const AppFileReader: FC<{ document: Document }> = ({ document }) => {
  const { publicUrl: url, mimetype } = document;
  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const videoMimeType = /video\/(mp4|avi)/i;
  const audioMimeType = /audio\/(mp3|wav)/i;
  const documentMimeType =
    /application\/(pdf|doc|docx|vnd.openxmlformats-officedocument.wordprocessingml.document)/i;

  if (mimetype.match(imageMimeType)) {
    return (
      <Image
        alt="example"
        width="100%"
        height="100%"
        src={url}
        style={{
          objectFit: 'cover',
        }}
      />
    );
  }

  if (mimetype.match(documentMimeType)) {
    return (
      <Row align="middle" justify="center" style={{ height: 100 }}>
        <Icon width={'30px'} height={'30px'} type="FileTextOutlined" />
      </Row>
    );
  }

  if (mimetype.match(videoMimeType))
    return <p style={{ height: 100 }}>video</p>;

  if (mimetype.match(audioMimeType))
    return <p style={{ height: 100 }}>audio</p>;

  return <p style={{ height: 100 }}>unknown</p>;
};

export default AppDocument;
