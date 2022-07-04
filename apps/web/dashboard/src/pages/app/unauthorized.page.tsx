import { Button, Card, Result } from 'antd';
import { useNavigate } from 'react-router';

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <Card>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary" onClick={() => navigate('/admin')}>
            Back Home
          </Button>
        }
      />
    </Card>
  );
};

export default Unauthorized;
