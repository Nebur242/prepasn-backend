/* eslint-disable jsx-a11y/accessible-emoji */
import { Card, Col, Row, Typography } from 'antd';
import styled from 'styled-components';
import { SelectOutlined } from '@ant-design/icons';
import ContentScroll from '../../components/content-scroll';

const { Title, Paragraph, Link } = Typography;

const StyledWrapper = styled.div`
  padding: 2%;
`;

const StyledRow = styled(Row)`
  padding-top: 40px;
`;

const Welcome = () => {
  return (
    <ContentScroll>
      <StyledWrapper>
        <Title level={2}>Welcome 👋</Title>
        <Paragraph>
          We hope you are making progress on your project! Feel free to read the
          latest news about Strapi. We are giving our best to improve the
          product based on your feedback.
        </Paragraph>
        <Link href="https://ant.design" target="_blank">
          See more on the blog <SelectOutlined />
        </Link>
        <StyledRow gutter={20}>
          <Col span={16}>
            <Card>
              <Title level={4}>What is Strapi?</Title>
              <Paragraph>
                Strapi is a free and open-source content management system (CMS)
                for building web applications.
              </Paragraph>
            </Card>
            <Card style={{ marginTop: 20 }}>
              <Title level={4}>What is Strapi?</Title>
              <Paragraph>
                Strapi is a free and open-source content management system (CMS)
                for building web applications.
              </Paragraph>
            </Card>
            <Card style={{ marginTop: 20 }}>
              <Title level={4}>What is Strapi?</Title>
              <Paragraph>
                Strapi is a free and open-source content management system (CMS)
                for building web applications.
              </Paragraph>
            </Card>
            <Card style={{ marginTop: 20 }}>
              <Title level={4}>What is Strapi?</Title>
              <Paragraph>
                Strapi is a free and open-source content management system (CMS)
                for building web applications.
              </Paragraph>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Title level={4}>What is Strapi?</Title>
              <Paragraph>
                Strapi is a free and open-source content management system (CMS)
                for building web applications.
              </Paragraph>
              <Link href="https://ant.design" target="_blank">
                See more on the blog <SelectOutlined />
              </Link>
            </Card>
          </Col>
        </StyledRow>
      </StyledWrapper>
    </ContentScroll>
  );
};

export default Welcome;
