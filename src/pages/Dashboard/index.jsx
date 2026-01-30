import { Row, Col, Card, Statistic, Progress, Table, Tag, Space } from 'antd';
import {
  ThunderboltOutlined,
  BankOutlined,
  TeamOutlined,
  AlertOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CheckCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import {
  overviewStats,
  chargeTrendData,
  operatorShareData,
  deviceStatusData,
  regionDistribution,
  faultAlarms,
} from '../../mock/data';

const StatCard = ({ title, value, suffix, icon, color, trend, trendValue }) => (
  <Card hoverable>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <div style={{ color: 'rgba(0,0,0,0.45)', fontSize: 14, marginBottom: 8 }}>{title}</div>
        <div style={{ fontSize: 28, fontWeight: 600, color: 'rgba(0,0,0,0.85)' }}>
          {value?.toLocaleString()}
          {suffix && <span style={{ fontSize: 14, marginLeft: 4 }}>{suffix}</span>}
        </div>
        {trend && (
          <div style={{ marginTop: 8, fontSize: 12 }}>
            {trend === 'up' ? (
              <span style={{ color: '#52c41a' }}>
                <ArrowUpOutlined /> {trendValue}%
              </span>
            ) : (
              <span style={{ color: '#ff4d4f' }}>
                <ArrowDownOutlined /> {trendValue}%
              </span>
            )}
            <span style={{ color: 'rgba(0,0,0,0.45)', marginLeft: 8 }}>较昨日</span>
          </div>
        )}
      </div>
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 8,
          background: `${color}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </div>
    </div>
  </Card>
);

const Dashboard = () => {
  // 充电量趋势图配置
  const chargeTrendOption = {
    tooltip: {
      trigger: 'axis',
      formatter: '{b}<br/>充电量: {c} kWh',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: chargeTrendData.dates,
      axisLine: { lineStyle: { color: '#d9d9d9' } },
      axisLabel: { color: '#666' },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#f0f0f0' } },
      axisLabel: { color: '#666', formatter: '{value}' },
    },
    series: [
      {
        data: chargeTrendData.values,
        type: 'line',
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(24, 144, 255, 0.3)' },
              { offset: 1, color: 'rgba(24, 144, 255, 0.05)' },
            ],
          },
        },
        lineStyle: { color: '#1890ff', width: 2 },
        itemStyle: { color: '#1890ff' },
      },
    ],
  };

  // 运营商占比饼图配置
  const operatorPieOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%',
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
    },
    series: [
      {
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        label: { show: false },
        emphasis: {
          label: { show: true, fontSize: 14, fontWeight: 'bold' },
        },
        data: operatorShareData.map((item, index) => ({
          ...item,
          itemStyle: {
            color: ['#1890ff', '#52c41a', '#faad14', '#722ed1', '#eb2f96'][index],
          },
        })),
      },
    ],
  };

  // 设备状态分布图配置
  const deviceStatusOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}台',
    },
    legend: {
      bottom: 0,
    },
    series: [
      {
        type: 'pie',
        radius: '65%',
        center: ['50%', '45%'],
        data: deviceStatusData.map((item, index) => ({
          ...item,
          itemStyle: {
            color: ['#52c41a', '#1890ff', '#d9d9d9', '#ff4d4f'][index],
          },
        })),
        label: {
          formatter: '{b}\n{d}%',
        },
      },
    ],
  };

  // 区域分布柱状图配置
  const regionBarOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    legend: {
      data: ['充电站', '充电桩'],
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
      data: regionDistribution.map((item) => item.region),
      axisLabel: { rotate: 30 },
    },
    yAxis: [
      {
        type: 'value',
        name: '充电站',
        position: 'left',
      },
      {
        type: 'value',
        name: '充电桩',
        position: 'right',
      },
    ],
    series: [
      {
        name: '充电站',
        type: 'bar',
        data: regionDistribution.map((item) => item.stations),
        itemStyle: { color: '#1890ff' },
      },
      {
        name: '充电桩',
        type: 'bar',
        yAxisIndex: 1,
        data: regionDistribution.map((item) => item.piles),
        itemStyle: { color: '#52c41a' },
      },
    ],
  };

  // 告警表格列配置
  const alarmColumns = [
    {
      title: '告警时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 160,
    },
    {
      title: '站点名称',
      dataIndex: 'stationName',
      key: 'stationName',
    },
    {
      title: '故障类型',
      dataIndex: 'faultType',
      key: 'faultType',
    },
    {
      title: '级别',
      dataIndex: 'level',
      key: 'level',
      render: (level) => (
        <Tag color={level === 'serious' ? 'red' : 'orange'}>
          {level === 'serious' ? '严重' : '一般'}
        </Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusMap = {
          pending: { color: 'red', text: '待处理' },
          processing: { color: 'blue', text: '处理中' },
          resolved: { color: 'green', text: '已解决' },
        };
        return <Tag color={statusMap[status].color}>{statusMap[status].text}</Tag>;
      },
    },
  ];

  return (
    <div>
      <div className="page-header">
        <h1>领导驾驶舱</h1>
        <p>全市电动车公共充电设施运行态势总览</p>
      </div>

      {/* 核心指标卡片 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="充电站总数"
            value={overviewStats.totalStations}
            suffix="座"
            icon={<BankOutlined style={{ fontSize: 28, color: '#1890ff' }} />}
            color="#1890ff"
            trend="up"
            trendValue={2.5}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="充电桩总数"
            value={overviewStats.totalPiles}
            suffix="台"
            icon={<ThunderboltOutlined style={{ fontSize: 28, color: '#52c41a' }} />}
            color="#52c41a"
            trend="up"
            trendValue={3.2}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="今日充电量"
            value={overviewStats.todayChargeAmount}
            suffix="kWh"
            icon={<ThunderboltOutlined style={{ fontSize: 28, color: '#faad14' }} />}
            color="#faad14"
            trend="up"
            trendValue={5.8}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="碳减排量"
            value={overviewStats.carbonReduction}
            suffix="吨"
            icon={<CheckCircleOutlined style={{ fontSize: 28, color: '#722ed1' }} />}
            color="#722ed1"
            trend="up"
            trendValue={4.1}
          />
        </Col>
      </Row>

      {/* 第二行指标 */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="设备在线率"
              value={overviewStats.onlineRate}
              suffix="%"
              valueStyle={{ color: '#52c41a' }}
            />
            <Progress percent={overviewStats.onlineRate} showInfo={false} strokeColor="#52c41a" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="今日充电次数"
              value={overviewStats.todayChargeCount}
              suffix="次"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="运营商数量"
              value={overviewStats.totalOperators}
              suffix="家"
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="待处理投诉"
              value={overviewStats.complaintCount}
              suffix="件"
              valueStyle={{ color: '#ff4d4f' }}
              prefix={<AlertOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* 图表区域 */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={16}>
          <Card title="充电量趋势" extra={<a href="#">查看详情</a>}>
            <ReactECharts option={chargeTrendOption} style={{ height: 300 }} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="运营商占比">
            <ReactECharts option={operatorPieOption} style={{ height: 300 }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card title="设备状态分布">
            <ReactECharts option={deviceStatusOption} style={{ height: 300 }} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="区域分布统计">
            <ReactECharts option={regionBarOption} style={{ height: 300 }} />
          </Card>
        </Col>
      </Row>

      {/* 告警列表 */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card
            title={
              <Space>
                <WarningOutlined style={{ color: '#ff4d4f' }} />
                实时告警
              </Space>
            }
            extra={<a href="#">查看全部</a>}
          >
            <Table
              columns={alarmColumns}
              dataSource={faultAlarms}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
