import { Button, Card, Image, Row, Typography } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import { FC, useEffect, useState } from 'react';
import Icon from '../Icon';

const { Meta } = Card;
const { Paragraph } = Typography;

interface IUploadFileProps {
  file: UploadFile;
  onDeleteClick?: (file: UploadFile) => void;
}

const AppUploadFile: FC<IUploadFileProps> = ({ file, onDeleteClick }) => {
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    const fileReader: FileReader = new FileReader();
    let isCancel = false;
    if (file) {
      fileReader.readAsDataURL(file.originFileObj);
      fileReader.onload = () => {
        if (fileReader.result && !isCancel) {
          setUrl(fileReader.result as string);
        }
      };
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  return (
    <Card
      cover={<AppFileReader type={file.type || 'unknown'} url={url} />}
      actions={[
        <Button
          type="text"
          onClick={() => onDeleteClick && onDeleteClick(file)}
        >
          <Icon type="DeleteOutlined" key="delete" />
        </Button>,
        <Icon type="EditOutlined" key="edit" />,
        <Icon type="EllipsisOutlined" key="ellipsis" />,
      ]}
    >
      <Meta
        description={
          <Paragraph
            ellipsis={{
              rows: 1,
            }}
          >
            {file.name}
          </Paragraph>
        }
      />
    </Card>
  );
};

interface IUploadFileReaderProps {
  type: string;
  url: string;
}

const AppFileReader: FC<IUploadFileReaderProps> = ({ type, url }) => {
  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const videoMimeType = /video\/(mp4|avi)/i;
  const audioMimeType = /audio\/(mp3|wav|mpeg)/i;
  const documentMimeType =
    /application\/(pdf|doc|docx|vnd.openxmlformats-officedocument.wordprocessingml.document)/i;

  if (type.match(imageMimeType)) {
    return <Image alt="example" src={url} height={100} />;
  }

  if (type.match(documentMimeType)) {
    return (
      <Row align="middle" justify="center" style={{ height: 100 }}>
        <Icon width={'30px'} height={'30px'} type="FileTextOutlined" />
      </Row>
    );
  }

  if (type.match(videoMimeType)) {
    return <p style={{ height: 100 }}>video</p>;
  }

  if (type.match(audioMimeType)) {
    return <p style={{ height: 100 }}>audio</p>;
  }

  return <p style={{ height: 100 }}>unknown</p>;
};

export default AppUploadFile;
