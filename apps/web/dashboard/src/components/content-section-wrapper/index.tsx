import { Button, Col, Divider, Row, Typography } from "antd";
import { FC } from "react";
import Icon from "../Icon";

type Props = {
  children?: React.ReactNode;
  title: string;
  description?: string;
  createButtonText?: string;
  onCreate?: () => void;
}

const { Title, Text } = Typography;

const ContentSectionWrapper: FC<Props> = ({
  children,
  title,
  description,
  createButtonText,
  onCreate
}) => {
  return (
    <div>
      <Row justify="space-between">
        <Col >
          <Title level={4}>{title}</Title>
          {description && <Text>{description}</Text>}
        </Col>
        <Col>
          <Button onClick={onCreate} type="primary" icon={<Icon type="PlusOutlined" />} > {createButtonText || 'Create a new entry'}</Button>
        </Col>
      </Row>
      <Divider />
      <div>
        {children}
      </div>
    </div>
  )
}

export default ContentSectionWrapper;