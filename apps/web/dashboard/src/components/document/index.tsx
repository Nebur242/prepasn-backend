import { Document } from '@prepa-sn/shared/interfaces';
import { Button, Card, Checkbox, Image, Row } from 'antd'
import { FC } from 'react';
import Icon from '../Icon'

const { Meta } = Card

interface DocumentProps {
    document: Document;
    checked?: boolean;
    onDocumentSelect?: (document: Document, checked: boolean) => void;
    onDocumentDelete?: (document: Document) => void;
    onDocumentEdit?: (document: Document) => void;
    onDocumentSetting?: (document: Document) => void;
}

const AppDocument: FC<DocumentProps> = ({
    document,
    checked = false,
    onDocumentSelect,
    onDocumentDelete,
    onDocumentEdit,
    onDocumentSetting,
}) => {
    return (
        <Card
            cover={
                <div style={{
                    position: "relative",
                }}>
                    <Row style={{
                        padding: '10px',
                        position: 'absolute',
                        zIndex: 10,
                        width: '100%',

                    }} justify="space-between" align="middle">
                        <Checkbox
                            checked={checked}
                            onChange={(e) => onDocumentSelect && onDocumentSelect(document, e.target.checked)}
                        />
                        <Button icon={<Icon type="EditOutlined" />} />
                    </Row>

                    <AppFileReader document={document} />
                </div>
            }
            actions={[
                <Button type="text" icon={<Icon type="DeleteOutlined" key="delete" />} onClick={() => onDocumentDelete && onDocumentDelete(document)} />,
                <Button type="text" icon={<Icon type="EditOutlined" key="edit" />} onClick={() => onDocumentEdit && onDocumentEdit(document)} />,
                <Button type="text" icon={<Icon type="EllipsisOutlined" key="ellipsis" />} onClick={() => onDocumentSetting && onDocumentSetting(document)} />,
            ]}
        >
            <Meta
                title={document.title}
                description={document.description}
            />
        </Card>
    )
}

const AppFileReader: FC<{ document: Document }> = ({ document }) => {
    const { publicUrl: url, mimetype } = document
    const imageMimeType = /image\/(png|jpg|jpeg)/i;
    const videoMimeType = /video\/(mp4|avi)/i;
    const audioMimeType = /audio\/(mp3|wav)/i;
    const documentMimeType = /application\/(pdf|doc|docx|vnd.openxmlformats-officedocument.wordprocessingml.document)/i;

    if (mimetype.match(imageMimeType)) {
        return <Image alt="example" src={url} height={100} />
    }

    if (mimetype.match(documentMimeType)) {
        return <Row align="middle" justify="center" style={{ height: 100 }}>
            <Icon width={'30px'} height={"30px"} type="FileTextOutlined" />
        </Row>
    }

    if (mimetype.match(videoMimeType)) {
        return <p style={{ height: 100 }} >video</p>
    }

    if (mimetype.match(audioMimeType)) {
        return <p style={{ height: 100 }} >audio</p>
    }

    return <p style={{ height: 100 }} >unknown</p>

}

export default AppDocument