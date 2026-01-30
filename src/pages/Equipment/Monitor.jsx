import { useState } from 'react';
import { Card, Row, Col, Table, Tag, Progress, Select, Input, Space, Statistic, Badge } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import { pileList, stationList, deviceStatusData } from '../../mock/data';

const Monitor = () => {
  const [selectedStation, setSelectedStation] = useState(null);
  const [searchText, setSearchText] = useState('');

  const statusMap = {
    online: { color: 'blue', text: '在线空闲', badge: 'processing' },
    charging: { color: 'green', text: '充电中', badge: 'success' },
    offline: { color: 'default', text: '离线', badge: 'default' },
    fault: { color: 'red', text: '故障', badge: 'error' },
  };

  // 过滤数据
  const filteredData = pileList.filter((item) => {
    if (selectedStation && item.stationId !== selectedStation) return false;
    if (searchText && !item.id.includes(searchText)) return false;
    return true;
  });

  // 设备状态统计
  const statusStats = {
    online: filteredData.filter((item) => item.status === 'online').length,
    charging: filteredData.filter((item) => item.status === 'charging').length,
    offline: filteredData.filter((item) => item.status === 'offline').length,
    fault: filteredData.filter((item) => item.status === 'fault').length,
  };

  // 实时功率曲线配置
  const powerCurveOption = {
    tooltip: {
      trigger: 'axis',
      formatter: '{b}<br/>功率: {c} kW',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: Array.from({ length: 60 }, (_, i) => `${i}分钟前`).reverse(),
      axisLabel: {
        interval: 9,
      },
    },
    yAxis: {
      type: 'value',
      name: '功率(kW)',
    },
    series: [
      {
        type: 'line',
        data: Array.from({ length: 60 }, () => Math.floor(Math.random() * 100) + 50),
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(82, 196, 26, 0.3)' },
              { offset: 1, color: 'rgba(82, 196, 26, 0.05)' },
            ],
          },
        },
        lineStyle: { color: '#52c41a', width: 2 },
        itemStyle: { color: '#52c41a' },
      },
    ],
  };

  // 设备状态分布饼图
  const statusPieOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}台 ({d}%)',
    },
    legend: {
      bottom: 0,
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '45%'],
        data: [
          { name: '在线空闲', value: statusStats.online, itemStyle: { color: '#1890ff' } },
          { name: '充电中', value: statusStats.charging, itemStyle: { color: '#52c41a' } },
          { name: '离线', value: statusStats.offline, itemStyle: { color: '#d9d9d9' } },
          { name: '故障', value: statusStats.fault, itemStyle: { color: '#ff4d4f' } },
        ],
        label: {
          formatter: '{b}\n{d}%',
        },
      },
    ],
  };

  const columns = [
    {
      title: '设备编号',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '所属站点',
      dataIndex: 'stationName',
      key: 'stationName',
    },
    {
      title: '品牌/型号',
      key: 'brandModel',
      render: (_, record) => `${record.brand} ${record.model}`,
    },
    {
      title: '额定功率',
      dataIndex: 'power',
      key: 'power',
      render: (power) => `${power} kW`,
    },
    {
      title: '当前功率',
      dataIndex: 'currentPower',
      key: 'currentPower',
      render: (power, record) => (
        <div>
          <span style={{ color: power > 0 ? '#52c41a' : '#999' }}>
            {power > 0 ? `${power} kW` : '-'}
          </span>
          {power > 0 && (
            <Progress
              percent={Math.round((power / record.power) * 100)}
              size="small"
              showInfo={false}
              strokeColor="#52c41a"
              style={{ width: 60, marginLeft: 8 }}
            />
          )}
        </div>
      ),
    },
    {
      title: '今日充电量',
      dataIndex: 'todayChargeAmount',
      key: 'todayChargeAmount',
      render: (amount) => `${amount} kWh`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge status={statusMap[status].badge} text={statusMap[status].text} />
      ),
    },
  ];

  return (
    <div>
      <div className="page-header">
        <h1>实时状态监控</h1>
        <p>监控充电桩的在线、离线、充电中、故障等状态，实时功率与电流电压曲线监测</p>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic
              title="在线空闲"
              value={statusStats.online}
              suffix="台"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="充电中"
              value={statusStats.charging}
              suffix="台"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="离线"
              value={statusStats.offline}
              suffix="台"
              valueStyle={{ color: '#999' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="故障"
              value={statusStats.fault}
              suffix="台"
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={16}>
          <Card title="实时功率曲线" extra={<ReloadOutlined style={{ cursor: 'pointer' }} />}>
            <ReactECharts option={powerCurveOption} style={{ height: 300 }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="设备状态分布">
            <ReactECharts option={statusPieOption} style={{ height: 300 }} />
          </Card>
        </Col>
      </Row>

      <Card
        title="设备列表"
        style={{ marginTop: 16 }}
        extra={
          <Space>
            <Select
              placeholder="选择站点"
              allowClear
              style={{ width: 200 }}
              onChange={setSelectedStation}
            >
              {stationList.map((station) => (
                <Select.Option key={station.id} value={station.id}>
                  {station.name}
                </Select.Option>
              ))}
            </Select>
            <Input
              placeholder="设备编号"
              prefix={<SearchOutlined />}
              style={{ width: 150 }}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
        />
      </Card>
    </div>
  );
};

export default Monitor;
