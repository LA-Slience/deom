import { useState } from 'react';
import { Card, Table, Tag, Row, Col, Statistic, Badge, Space, Button, Modal, Descriptions, Alert } from 'antd';
import {
  AlertOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  FireOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import { safetyMonitor, stationList } from '../../mock/data';

const SafetyMonitorPage = () => {
  const [currentRecord, setCurrentRecord] = useState(null);
  const [detailVisible, setDetailVisible] = useState(false);

  const statusMap = {
    normal: { color: 'green', text: '正常', icon: <CheckCircleOutlined /> },
    warning: { color: 'orange', text: '预警', icon: <WarningOutlined /> },
    alarm: { color: 'red', text: '告警', icon: <AlertOutlined /> },
  };

  const riskLevelMap = {
    low: { color: 'green', text: '低风险' },
    medium: { color: 'orange', text: '中风险' },
    high: { color: 'red', text: '高风险' },
  };

  const columns = [
    {
      title: '站点名称',
      dataIndex: 'stationName',
      key: 'stationName',
    },
    {
      title: '烟感状态',
      dataIndex: 'smokeStatus',
      key: 'smokeStatus',
      render: (status) => (
        <Badge
          status={status === 'normal' ? 'success' : status === 'warning' ? 'warning' : 'error'}
          text={statusMap[status].text}
        />
      ),
    },
    {
      title: '温感状态',
      dataIndex: 'tempStatus',
      key: 'tempStatus',
      render: (status) => (
        <Badge
          status={status === 'normal' ? 'success' : status === 'warning' ? 'warning' : 'error'}
          text={statusMap[status].text}
        />
      ),
    },
    {
      title: '风险等级',
      dataIndex: 'riskLevel',
      key: 'riskLevel',
      render: (level) => (
        <Tag color={riskLevelMap[level].color}>{riskLevelMap[level].text}</Tag>
      ),
    },
    {
      title: '最后检测时间',
      dataIndex: 'lastCheckTime',
      key: 'lastCheckTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            详情
          </Button>
          {record.riskLevel !== 'low' && (
            <Button type="link" size="small" danger>
              处置
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const handleView = (record) => {
    setCurrentRecord(record);
    setDetailVisible(true);
  };

  // 统计数据
  const stats = {
    total: safetyMonitor.length,
    normal: safetyMonitor.filter((item) => item.riskLevel === 'low').length,
    warning: safetyMonitor.filter((item) => item.riskLevel === 'medium').length,
    alarm: safetyMonitor.filter((item) => item.riskLevel === 'high').length,
  };

  // 风险分布饼图
  const riskDistributionOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}个 ({d}%)',
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
          { name: '低风险', value: stats.normal, itemStyle: { color: '#52c41a' } },
          { name: '中风险', value: stats.warning, itemStyle: { color: '#faad14' } },
          { name: '高风险', value: stats.alarm, itemStyle: { color: '#ff4d4f' } },
        ],
        label: {
          formatter: '{b}\n{d}%',
        },
      },
    ],
  };

  // 24小时告警趋势
  const alarmTrendOption = {
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    },
    yAxis: {
      type: 'value',
      name: '告警数',
    },
    series: [
      {
        type: 'line',
        data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 5)),
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(255, 77, 79, 0.3)' },
              { offset: 1, color: 'rgba(255, 77, 79, 0.05)' },
            ],
          },
        },
        lineStyle: { color: '#ff4d4f', width: 2 },
        itemStyle: { color: '#ff4d4f' },
      },
    ],
  };

  return (
    <div>
      <div className="page-header">
        <h1>消防安全监测</h1>
        <p>对接站点周边的烟感、温感设备数据，实时监测消防安全状态</p>
      </div>

      {stats.alarm > 0 && (
        <Alert
          message="安全告警"
          description={`当前有 ${stats.alarm} 个站点存在高风险，请立即处置！`}
          type="error"
          showIcon
          icon={<FireOutlined />}
          style={{ marginBottom: 16 }}
          action={
            <Button size="small" danger>
              立即查看
            </Button>
          }
        />
      )}

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="监测站点"
              value={stats.total}
              suffix="个"
              prefix={<CheckCircleOutlined style={{ color: '#1890ff' }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="正常站点"
              value={stats.normal}
              suffix="个"
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="预警站点"
              value={stats.warning}
              suffix="个"
              valueStyle={{ color: '#faad14' }}
              prefix={<WarningOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="告警站点"
              value={stats.alarm}
              suffix="个"
              valueStyle={{ color: '#ff4d4f' }}
              prefix={<AlertOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Card title="风险等级分布">
            <ReactECharts option={riskDistributionOption} style={{ height: 300 }} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="24小时告警趋势">
            <ReactECharts option={alarmTrendOption} style={{ height: 300 }} />
          </Card>
        </Col>
      </Row>

      <Card title="站点安全状态">
        <Table
          columns={columns}
          dataSource={safetyMonitor}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
        />
      </Card>

      <Modal
        title="站点安全详情"
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={null}
        width={600}
      >
        {currentRecord && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="站点名称">{currentRecord.stationName}</Descriptions.Item>
            <Descriptions.Item label="风险等级">
              <Tag color={riskLevelMap[currentRecord.riskLevel].color}>
                {riskLevelMap[currentRecord.riskLevel].text}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="烟感状态">
              <Badge
                status={currentRecord.smokeStatus === 'normal' ? 'success' : currentRecord.smokeStatus === 'warning' ? 'warning' : 'error'}
                text={statusMap[currentRecord.smokeStatus].text}
              />
            </Descriptions.Item>
            <Descriptions.Item label="温感状态">
              <Badge
                status={currentRecord.tempStatus === 'normal' ? 'success' : currentRecord.tempStatus === 'warning' ? 'warning' : 'error'}
                text={statusMap[currentRecord.tempStatus].text}
              />
            </Descriptions.Item>
            <Descriptions.Item label="最后检测时间" span={2}>
              {currentRecord.lastCheckTime}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default SafetyMonitorPage;
