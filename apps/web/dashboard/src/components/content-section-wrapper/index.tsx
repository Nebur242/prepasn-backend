import { Button, ButtonProps, Col, Divider, Row, Typography } from 'antd';
import { FC } from 'react';
import Icon from '../Icon';

type Props = {
  children?: React.ReactNode;
  title: string;
  description?: string;
  createButtonText?: string;
  onCreate?: () => void;
  createButtonProps?: ButtonProps;
  className?: string;
  bodyClassName?: string;
  bodyStyle?: React.CSSProperties;
  style?: React.CSSProperties;
};

const { Title, Text } = Typography;

const ContentSectionWrapper: FC<Props> = ({
  children,
  title,
  description,
  createButtonText,
  style = {},
  className,
  bodyClassName,
  bodyStyle = {},
  onCreate,
  createButtonProps = {},
}) => {
  return (
    <div
      style={{
        maxHeight: 'calc( 100vh - 94px )',
        overflowY: 'scroll',
        paddingBottom: '100px',
        ...style,
      }}
      className={className}
    >
      <Row justify="space-between">
        <Col>
          <Title level={4}>{title}</Title>
          {description && <Text>{description}</Text>}
        </Col>
        <Col>
          <Button
            {...createButtonProps}
            onClick={onCreate}
            type="primary"
            icon={<Icon type="PlusOutlined" />}
          >
            {' '}
            {createButtonText || 'Create a new entry'}
          </Button>
        </Col>
      </Row>
      <Divider />
      <div
        className={bodyClassName}
        style={{
          ...bodyStyle,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ContentSectionWrapper;