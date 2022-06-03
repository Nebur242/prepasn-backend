import {
  Button,
  Card,
  Col,
  Radio,
  Row,
  Space,
  Typography,
  Table,
  Divider,
  Statistic,
} from 'antd';
import { FC, useState } from 'react';
import {
  Column,
  Pie,
  Line,
  TinyArea,
  TinyColumn,
  RingProgress,
} from '@ant-design/plots';
import ContentScroll from '../../../components/content-scroll';
import DatePicker from '../../../components/DatePicker';
import Icon from '../../../components/Icon';

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

export interface ColumData {
  type: string;
  sales: number;
}

export interface ColumnType {
  data: ColumData[];
}

const columnData1 = [
  {
    type: '家具家电',
    sales: 38,
  },
  {
    type: '粮油副食',
    sales: 52,
  },
  {
    type: '生鲜水果',
    sales: 61,
  },
  {
    type: '美容洗护',
    sales: 145,
  },
  {
    type: '母婴用品',
    sales: 48,
  },
  {
    type: '进口食品',
    sales: 38,
  },
  {
    type: '食品饮料',
    sales: 38,
  },
  {
    type: '家庭清洁',
    sales: 38,
  },
];

const columnData2 = [
  {
    type: '家具家电',
    sales: 20,
  },
  {
    type: '粮油副食',
    sales: 60,
  },
  {
    type: '生鲜水果',
    sales: 10,
  },
  {
    type: '美容洗护',
    sales: 156,
  },
  {
    type: '母婴用品',
    sales: 30,
  },
  {
    type: '进口食品',
    sales: 78,
  },
  {
    type: '食品饮料',
    sales: 34,
  },
  {
    type: '家庭清洁',
    sales: 97,
  },
];

export const ColumnStats: FC<ColumnType> = ({ data }) => {
  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '类别',
      },
      sales: {
        alias: '销售额',
      },
    },
  };
  return <Column {...config} />;
};

export const PieStats = () => {
  const data = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.75,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
};

export const LineStats = () => {
  const data = [
    {
      date: '2018/8/1',
      type: 'download',
      value: 4623,
    },
    {
      date: '2018/8/1',
      type: 'register',
      value: 2208,
    },
    {
      date: '2018/8/1',
      type: 'bill',
      value: 182,
    },
    {
      date: '2018/8/2',
      type: 'download',
      value: 6145,
    },
    {
      date: '2018/8/2',
      type: 'register',
      value: 2016,
    },
    {
      date: '2018/8/2',
      type: 'bill',
      value: 257,
    },
    {
      date: '2018/8/3',
      type: 'download',
      value: 508,
    },
    {
      date: '2018/8/3',
      type: 'register',
      value: 2916,
    },
    {
      date: '2018/8/3',
      type: 'bill',
      value: 289,
    },
    {
      date: '2018/8/4',
      type: 'download',
      value: 6268,
    },
    {
      date: '2018/8/4',
      type: 'register',
      value: 4512,
    },
    {
      date: '2018/8/4',
      type: 'bill',
      value: 428,
    },
    {
      date: '2018/8/5',
      type: 'download',
      value: 6411,
    },
    {
      date: '2018/8/5',
      type: 'register',
      value: 8281,
    },
    {
      date: '2018/8/5',
      type: 'bill',
      value: 619,
    },
    {
      date: '2018/8/6',
      type: 'download',
      value: 1890,
    },
    {
      date: '2018/8/6',
      type: 'register',
      value: 2008,
    },
    {
      date: '2018/8/6',
      type: 'bill',
      value: 87,
    },
    {
      date: '2018/8/7',
      type: 'download',
      value: 4251,
    },
    {
      date: '2018/8/7',
      type: 'register',
      value: 1963,
    },
    {
      date: '2018/8/7',
      type: 'bill',
      value: 706,
    },
    {
      date: '2018/8/8',
      type: 'download',
      value: 2978,
    },
    {
      date: '2018/8/8',
      type: 'register',
      value: 2367,
    },
    {
      date: '2018/8/8',
      type: 'bill',
      value: 387,
    },
    {
      date: '2018/8/9',
      type: 'download',
      value: 3880,
    },
    {
      date: '2018/8/9',
      type: 'register',
      value: 2956,
    },
    {
      date: '2018/8/9',
      type: 'bill',
      value: 488,
    },
    {
      date: '2018/8/10',
      type: 'download',
      value: 3606,
    },
    {
      date: '2018/8/10',
      type: 'register',
      value: 678,
    },
    {
      date: '2018/8/10',
      type: 'bill',
      value: 507,
    },
    {
      date: '2018/8/11',
      type: 'download',
      value: 4311,
    },
    {
      date: '2018/8/11',
      type: 'register',
      value: 3188,
    },
    {
      date: '2018/8/11',
      type: 'bill',
      value: 548,
    },
    {
      date: '2018/8/12',
      type: 'download',
      value: 4116,
    },
    {
      date: '2018/8/12',
      type: 'register',
      value: 3491,
    },
    {
      date: '2018/8/12',
      type: 'bill',
      value: 456,
    },
    {
      date: '2018/8/13',
      type: 'download',
      value: 6419,
    },
    {
      date: '2018/8/13',
      type: 'register',
      value: 2852,
    },
    {
      date: '2018/8/13',
      type: 'bill',
      value: 689,
    },
    {
      date: '2018/8/14',
      type: 'download',
      value: 1643,
    },
    {
      date: '2018/8/14',
      type: 'register',
      value: 4788,
    },
    {
      date: '2018/8/14',
      type: 'bill',
      value: 280,
    },
    {
      date: '2018/8/15',
      type: 'download',
      value: 445,
    },
    {
      date: '2018/8/15',
      type: 'register',
      value: 4319,
    },
    {
      date: '2018/8/15',
      type: 'bill',
      value: 176,
    },
  ];

  const config = {
    data,
    xField: 'date',
    yField: 'value',
    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    seriesField: 'type',
    color: ({ type }) => {
      return type === 'register'
        ? '#F4664A'
        : type === 'download'
        ? '#30BF78'
        : '#FAAD14';
    },
    lineStyle: ({ type }) => {
      if (type === 'register') {
        return {
          lineDash: [4, 4],
          opacity: 1,
        };
      }

      return {
        opacity: 0.5,
      };
    },
  };

  return <Line {...config} />;
};

export const TableStats = () => {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
    {
      key: '3',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
    {
      key: '4',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
};

const TinyColumnStats = () => {
  const data = [274, 337, 81, 497, 666, 219, 269];
  const config = {
    height: 64,
    autoFit: false,
    data,
    tooltip: {
      customContent: function (x, data) {
        return `NO.${x}: ${data[0]?.data?.y.toFixed(2)}`;
      },
    },
  };
  return <TinyColumn {...config} />;
};

export const TinyAreaStats = () => {
  const data = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492,
  ];
  const config = {
    height: 60,
    autoFit: true,
    data,
    smooth: true,
  };
  return <TinyArea {...config} />;
};

const RingProgressStats = () => {
  const config = {
    height: 50,
    width: 50,
    autoFit: false,
    percent: 0.7,
    color: ['#5B8FF9', '#E8EDF3'],
  };
  return <RingProgress {...config} />;
};

const columnStatsTabList = [
  {
    key: 'tab1',
    tab: 'Colums Stat 1',
  },
  {
    key: 'tab2',
    tab: 'Colums Stat 2',
  },
];

const contentList: Record<string, React.ReactNode> = {
  tab1: <ColumnStats data={columnData1} />,
  tab2: <ColumnStats data={columnData2} />,
};

const Statistics = () => {
  const [activeColumnTabKey, setActiveColumnTabKey] = useState<string>('tab1');

  return (
    <ContentScroll>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Row gutter={[10, 10]}>
            {[...new Array(4)].map((_, index) => (
              <Col key={index} span={6}>
                <Card>
                  <Statistic title="Active Users" value={112893} />
                  {index === 3 && <TinyColumnStats />}
                  {index === 0 && <TinyAreaStats />}
                  {index === 1 && <TinyAreaStats />}
                  {index === 2 && <TinyAreaStats />}
                  <Divider />
                  <Text> 日销售额￥12,423</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
        <Col span={24}>
          <Card
            style={{ width: '100%' }}
            tabList={columnStatsTabList}
            activeTabKey={activeColumnTabKey}
            tabBarExtraContent={
              <Space>
                <Button type="link">Link 1</Button>
                <Button type="link">Link 2</Button>
                <Button type="link">Link 3</Button>
                <RangePicker />
              </Space>
            }
            onTabChange={(key) => setActiveColumnTabKey(key)}
          >
            <Row gutter={[30, 10]}>
              <Col span={18}>{contentList[activeColumnTabKey]}</Col>
              <Col span={6}>
                <Title level={4}>门店销售额排名</Title>
                <div style={{ marginTop: 30 }}>
                  {[...new Array(7)].map((_, index) => (
                    <Row
                      key={index}
                      style={{ marginTop: 15 }}
                      align="middle"
                      justify="space-between"
                    >
                      <Space>
                        <Button
                          type={index < 3 ? 'primary' : 'text'}
                          shape="circle"
                        >
                          {index + 1}
                        </Button>
                        <Text>工专路 0 号店</Text>
                      </Space>
                      <Text>323,234</Text>
                    </Row>
                  ))}
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="线上热门搜索"
            extra={
              <Space>
                <Button type="text" icon={<Icon type="EllipsisOutlined" />} />
              </Space>
            }
          >
            <Row gutter={20}>
              <Col span={12}>
                <Space>
                  <Text>搜索用户数</Text>
                  <Icon type="InfoCircleOutlined" />
                </Space>
                <TinyAreaStats />
              </Col>
              <Col span={12}>
                <Space>
                  <Text>搜索用户数</Text>
                  <Icon type="InfoCircleOutlined" />
                </Space>
                <TinyAreaStats />
              </Col>
            </Row>
            <TableStats />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="销售额类别占比"
            extra={
              <Space>
                <Radio.Group>
                  <Radio.Button value="large">Large</Radio.Button>
                  <Radio.Button value="default">Default</Radio.Button>
                  <Radio.Button value="small">Small</Radio.Button>
                </Radio.Group>
                <Button type="text" icon={<Icon type="EllipsisOutlined" />} />
              </Space>
            }
          >
            <PieStats />
          </Card>
        </Col>

        <Col span={24}>
          <Card>
            <LineStats />
          </Card>
        </Col>
      </Row>
    </ContentScroll>
  );
};

export default Statistics;
