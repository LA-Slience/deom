import { useState } from 'react';
import { Card, Table, Tag, Row, Col, Progress, Statistic, Space, Button, Modal, Descriptions } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  MinusOutlined,
  TrophyOutlined,
  WarningOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import { creditScores, operatorList } from '../../mock/data';

const Credit = () => {
  const [currentRecord, setCurrentRecord] = useState(null);
  const [detailVisible, setDetailVisible] = useState(false);

  const levelMap = {
    A: { color: '#52c41a', text: 'A级（优秀）' },
    B: { color: '#1890ff', text: 'B级（良好）' },
    C: { color: '#faad14', text: 'C级（一般）' },
    D: { color: '#ff4d4f', text: 'D级（较差）' },
  };

  const trendMap = {
    up: { icon: <ArrowUpOutlined />, color: '#52c41a' },
    down: { icon: <ArrowDownOutlined />, color: '#ff4d4f' },
    stable: { icon: <MinusOutlined />, color: '#999' },
  };

  const columns = [
    {
      title: '排名',
      key: 'rank',
      width: 80,
      render: (_, __, index) => {
        if (index === 0) return <TrophyOutlined style={{ color: '#faad14', fontSize: 20 }} />;
        if (index === 1) return <TrophyOutlined style={{ color: '#c0c0c0', fontSize: 18 }} />;
        if (index === 2) return <TrophyOutlined style={{ color: '#cd7f32', fontSize: 16 }} />;
        return index + 1;
      },
    },
    {
      title: '运营商',
      dataIndex: 'operator',
      key: 'operator',
    },
    {
      title: '信用评分',
      dataIndex: 'score',
      key: 'score',
      render: (score) => (
        <Progress
          type="circle"
          percent={score}
          width={50}
          strokeColor={score >= 80 ? '#52c41a' : score >= 60 ? '#faad14' : '#ff4d4f'}
          format={(percent) => percent}
        />
      ),
      sorter: (a, b) => a.score - b.score,
      defaultSortOrder: 'descend',
    },
    {
      title: '信用等级',
      dataIndex: 'level',
      key: 'level',
      render: (level) => (
        <Tag color={levelMap[level].color}>{levelMap[level].text}</Tag>
      ),
    },
    {
      title: '投诉率',
      dataIndex: 'complaintRate',
      key: 'complaintRate',
      render: (rate) => (
        <span style={{ color: rate > 2 ? '#ff4d4f' : 'inherit' }}>{rate}%</span>
      ),
    },
    {
      title: '整改率',
      dataIndex: 'repairRate',
      key: 'repairRate',
      render: (rate) => (
        <span style={{ color: rate < 90 ? '#faad14' : '#52c41a' }}>{rate}%</span>
      ),
    },
    {
      title: '合规率',
      dataIndex: 'complianceRate',
      key: 'complianceRate',
      render: (rate) => (
        <span style={{ color: rate < 95 ? '#faad14' : '#52c41a' }}>{rate}%</span>
      ),
    },
    {
      title: '趋势',
      dataIndex: 'trend',
      key: 'trend',
      render: (trend) => (
        <span style={{ color: trendMap[trend].color }}>
          {trendMap[trend].icon}
        </span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button
          type="link"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => handleView(record)}
        >
          详情
        </Button>
      ),
    },
  ];

  const handleView = (record) => {
    setCurrentRecord(record);
    setDetailVisible(true);
  };

  // 信用分布饼图
  const creditDistributionOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}家 ({d}%)',
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
          { name: 'A级（优秀）', value: creditScores.filter((c) => c.level === 'A').length, itemStyle: { color: '#52c41a' } },
          { name: 'B级（良好）', value: creditScores.filter((c) => c.level === 'B').length, itemStyle: { color: '#1890ff' } },
          { name: 'C级（一般）', value: creditScores.filter((c) => c.level === 'C').length, itemStyle: { color: '#faad14' } },
          { name: 'D级（较差）', value: creditScores.filter((c) => c.level === 'D').length, itemStyle: { color: '#ff4d4f' } },
        ],
        label: {
          formatter: '{b}\n{d}%',
        },
      },
    ],
  };

  // 信用评分雷达图
  const radarOption = {
    tooltip: {},
    legend: {
      data: creditScores.slice(0, 3).map((c) => c.operator),
      bottom: 0,
    },
    radar: {
      indicator: [
        { name: '投诉率', max: 100 },
        { name: '整改率', max: 100 },
        { name: '合规率', max: 100 },
        { name: '设备完好率', max: 100 },
        { name: '服务满意度', max: 100 },
      ],
    },
    series: [
      {
        type: 'radar',
        data: creditScores.slice(0, 3).map((c, index) => ({
          name: c.operator,
          value: [
            100 - c.complaintRate * 10,
            c.repairRate,
            c.complianceRate,
            Math.floor(Math.random() * 10) + 90,
            Math.floor(Math.random() * 15) + 85,
          ],
          itemStyle: {
            color: ['#1890ff', '#52c41a', '#faad14'][index],
          },
        })),
      },
    ],
  };

  // 统计数据
  const stats = {
    avgScore: Math.round(creditScores.reduce((sum, c) => sum + c.score, 0) / creditScores.length),
    excellentCount: creditScores.filter((c) => c.level === 'A').length,
    warningCount: creditScores.filter((c) => c.level === 'C' || c.level === 'D').length,
  };

  return (
    <div>
      <div className="page-header">
        <h1>信用评价</h1>
        <p>基于投诉率、整改率、合规性自动计算企业信用分，实施信用分级管理</p>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="平均信用分"
              value={stats.avgScore}
              suffix="分"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="优秀企业"
              value={stats.excellentCount}
              suffix="家"
              prefix={<TrophyOutlined style={{ color: '#faad14' }} />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="预警企业"
              value={stats.warningCount}
              suffix="家"
              prefix={<WarningOutlined style={{ color: '#ff4d4f' }} />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="运营商总数"
              value={operatorList.length}
              suffix="家"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Card title="信用等级分布">
            <ReactECharts option={creditDistributionOption} style={{ height: 300 }} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="TOP3运营商能力对比">
            <ReactECharts option={radarOption} style={{ height: 300 }} />
          </Card>
        </Col>
      </Row>

      <Card title="企业信用排行榜">
        <Table
          columns={columns}
          dataSource={creditScores}
          rowKey="id"
          pagination={false}
        />
      </Card>

      <Modal
        title="企业信用详情"
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={null}
        width={700}
      >
        {currentRecord && (
          <>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="运营商">{currentRecord.operator}</Descriptions.Item>
              <Descriptions.Item label="信用评分">
                <Progress
                  type="circle"
                  percent={currentRecord.score}
                  width={60}
                  strokeColor={currentRecord.score >= 80 ? '#52c41a' : currentRecord.score >= 60 ? '#faad14' : '#ff4d4f'}
                  format={(percent) => percent}
                />
              </Descriptions.Item>
              <Descriptions.Item label="信用等级">
                <Tag color={levelMap[currentRecord.level].color}>
                  {levelMap[currentRecord.level].text}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="趋势">
                <span style={{ color: trendMap[currentRecord.trend].color }}>
                  {trendMap[currentRecord.trend].icon}
                  {currentRecord.trend === 'up' ? ' 上升' : currentRecord.trend === 'down' ? ' 下降' : ' 稳定'}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="投诉率">{currentRecord.complaintRate}%</Descriptions.Item>
              <Descriptions.Item label="整改率">{currentRecord.repairRate}%</Descriptions.Item>
              <Descriptions.Item label="合规率">{currentRecord.complianceRate}%</Descriptions.Item>
            </Descriptions>
            <div style={{ marginTop: 24 }}>
              <h4>评分说明</h4>
              <ul style={{ color: 'rgba(0,0,0,0.65)' }}>
                <li>信用评分 = 基础分(60) + 投诉率得分(20) + 整改率得分(10) + 合规率得分(10)</li>
                <li>A级（90-100分）：优秀企业，享受政策优惠</li>
                <li>B级（80-89分）：良好企业，正常监管</li>
                <li>C级（60-79分）：一般企业，重点关注</li>
                <li>D级（60分以下）：较差企业，限制补贴，重点监管</li>
              </ul>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Credit;
