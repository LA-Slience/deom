import { useState } from 'react';
import { Card, Row, Col, DatePicker, Select, Table, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import { operatorList, chargeTrendData } from '../../mock/data';

const { RangePicker } = DatePicker;

const Statistics = () => {
  const [dateRange, setDateRange] = useState(null);
  const [selectedOperator, setSelectedOperator] = useState(null);

  // 运营商营收数据
  const operatorRevenueData = operatorList.map((op) => ({
    key: op.id,
    name: op.name,
    chargeAmount: Math.floor(Math.random() * 100000) + 50000,
    revenue: Math.floor(Math.random() * 50000) + 20000,
    orderCount: Math.floor(Math.random() * 5000) + 1000,
    avgPrice: (Math.random() * 0.5 + 1.0).toFixed(2),
    trend: Math.random() > 0.5 ? 'up' : 'down',
    trendValue: (Math.random() * 10).toFixed(1),
  }));

  // 营收趋势图配置
  const revenueTrendOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
    },
    legend: {
      data: ['充电量(kWh)', '营收(元)'],
      bottom: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: chargeTrendData.dates,
    },
    yAxis: [
      {
        type: 'value',
        name: '充电量(kWh)',
        position: 'left',
      },
      {
        type: 'value',
        name: '营收(元)',
        position: 'right',
      },
    ],
    series: [
      {
        name: '充电量(kWh)',
        type: 'bar',
        data: chargeTrendData.values,
        itemStyle: { color: '#1890ff' },
      },
      {
        name: '营收(元)',
        type: 'line',
        yAxisIndex: 1,
        data: chargeTrendData.values.map((v) => Math.floor(v * 1.2)),
        itemStyle: { color: '#52c41a' },
        smooth: true,
      },
    ],
  };

  // 运营商营收占比
  const operatorRevenuePieOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: ¥{c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        label: { show: false },
        emphasis: {
          label: { show: true, fontSize: 14, fontWeight: 'bold' },
        },
        data: operatorRevenueData.map((item, index) => ({
          name: item.name,
          value: item.revenue,
          itemStyle: {
            color: ['#1890ff', '#52c41a', '#faad14', '#722ed1'][index % 4],
          },
        })),
      },
    ],
  };

  // 时段分布图
  const timeDistributionOption = {
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    },
    yAxis: {
      type: 'value',
      name: '充电量(kWh)',
    },
    series: [
      {
        type: 'bar',
        data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 5000) + 1000),
        itemStyle: {
          color: (params) => {
            // 峰时(10-12, 18-21)红色，谷时(0-7)绿色，其他蓝色
            const hour = params.dataIndex;
            if ((hour >= 10 && hour <= 12) || (hour >= 18 && hour <= 21)) {
              return '#ff4d4f';
            } else if (hour >= 0 && hour <= 7) {
              return '#52c41a';
            }
            return '#1890ff';
          },
        },
      },
    ],
  };

  const columns = [
    {
      title: '运营商',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '充电量(kWh)',
      dataIndex: 'chargeAmount',
      key: 'chargeAmount',
      render: (value) => value.toLocaleString(),
      sorter: (a, b) => a.chargeAmount - b.chargeAmount,
    },
    {
      title: '营收(元)',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (value) => `¥${value.toLocaleString()}`,
      sorter: (a, b) => a.revenue - b.revenue,
    },
    {
      title: '订单数',
      dataIndex: 'orderCount',
      key: 'orderCount',
      render: (value) => value.toLocaleString(),
      sorter: (a, b) => a.orderCount - b.orderCount,
    },
    {
      title: '平均单价(元/kWh)',
      dataIndex: 'avgPrice',
      key: 'avgPrice',
      render: (value) => `¥${value}`,
    },
    {
      title: '环比变化',
      dataIndex: 'trend',
      key: 'trend',
      render: (trend, record) => (
        <span style={{ color: trend === 'up' ? '#52c41a' : '#ff4d4f' }}>
          {trend === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          {record.trendValue}%
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="page-header">
        <h1>对账统计分析</h1>
        <p>各运营商营收统计、政府补贴核算与清算辅助</p>
      </div>

      <Card style={{ marginBottom: 16 }}>
        <Row gutter={16} align="middle">
          <Col>
            <span style={{ marginRight: 8 }}>时间范围：</span>
            <RangePicker onChange={setDateRange} />
          </Col>
          <Col>
            <span style={{ marginRight: 8 }}>运营商：</span>
            <Select
              placeholder="全部运营商"
              allowClear
              style={{ width: 200 }}
              onChange={setSelectedOperator}
            >
              {operatorList.map((op) => (
                <Select.Option key={op.id} value={op.id}>
                  {op.name}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总充电量"
              value={operatorRevenueData.reduce((sum, item) => sum + item.chargeAmount, 0)}
              suffix="kWh"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="总营收"
              value={operatorRevenueData.reduce((sum, item) => sum + item.revenue, 0)}
              prefix="¥"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="总订单数"
              value={operatorRevenueData.reduce((sum, item) => sum + item.orderCount, 0)}
              suffix="笔"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="平均单价"
              value={1.15}
              prefix="¥"
              suffix="/kWh"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={16}>
          <Card title="营收趋势">
            <ReactECharts option={revenueTrendOption} style={{ height: 350 }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="运营商营收占比">
            <ReactECharts option={operatorRevenuePieOption} style={{ height: 350 }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card
            title="时段充电分布"
            extra={
              <div style={{ fontSize: 12 }}>
                <span style={{ color: '#ff4d4f', marginRight: 16 }}>■ 峰时</span>
                <span style={{ color: '#1890ff', marginRight: 16 }}>■ 平时</span>
                <span style={{ color: '#52c41a' }}>■ 谷时</span>
              </div>
            }
          >
            <ReactECharts option={timeDistributionOption} style={{ height: 300 }} />
          </Card>
        </Col>
      </Row>

      <Card title="运营商营收明细" style={{ marginTop: 16 }}>
        <Table
          columns={columns}
          dataSource={operatorRevenueData}
          pagination={false}
          summary={(pageData) => {
            const totalCharge = pageData.reduce((sum, item) => sum + item.chargeAmount, 0);
            const totalRevenue = pageData.reduce((sum, item) => sum + item.revenue, 0);
            const totalOrders = pageData.reduce((sum, item) => sum + item.orderCount, 0);
            return (
              <Table.Summary.Row style={{ background: '#fafafa', fontWeight: 600 }}>
                <Table.Summary.Cell>合计</Table.Summary.Cell>
                <Table.Summary.Cell>{totalCharge.toLocaleString()}</Table.Summary.Cell>
                <Table.Summary.Cell>¥{totalRevenue.toLocaleString()}</Table.Summary.Cell>
                <Table.Summary.Cell>{totalOrders.toLocaleString()}</Table.Summary.Cell>
                <Table.Summary.Cell>-</Table.Summary.Cell>
                <Table.Summary.Cell>-</Table.Summary.Cell>
              </Table.Summary.Row>
            );
          }}
        />
      </Card>
    </div>
  );
};

export default Statistics;
