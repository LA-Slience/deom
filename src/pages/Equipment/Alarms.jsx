import { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Input,
  Form,
  Row,
  Col,
  Modal,
  message,
  Select,
  Descriptions,
  Badge,
} from 'antd';
import {
  SearchOutlined,
  EyeOutlined,
  BellOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { faultAlarms } from '../../mock/data';

const Alarms = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(faultAlarms);
  const [loading, setLoading] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [detailVisible, setDetailVisible] = useState(false);
  const [dispatchVisible, setDispatchVisible] = useState(false);

  const levelMap = {
    serious: { color: 'red', text: '严重' },
    normal: { color: 'orange', text: '一般' },
  };

  const statusMap = {
    pending: { color: 'red', text: '待处理' },
    processing: { color: 'blue', text: '处理中' },
    resolved: { color: 'green', text: '已解决' },
  };

  const columns = [
    {
      title: '告警编号',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '设备编号',
      dataIndex: 'pileId',
      key: 'pileId',
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
      render: (type) => (
        <Space>
          <ExclamationCircleOutlined style={{ color: '#faad14' }} />
          {type}
        </Space>
      ),
    },
    {
      title: '告警级别',
      dataIndex: 'level',
      key: 'level',
      render: (level) => (
        <Tag color={levelMap[level].color}>{levelMap[level].text}</Tag>
      ),
      filters: [
        { text: '严重', value: 'serious' },
        { text: '一般', value: 'normal' },
      ],
      onFilter: (value, record) => record.level === value,
    },
    {
      title: '故障描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge
          status={status === 'pending' ? 'error' : status === 'processing' ? 'processing' : 'success'}
          text={statusMap[status].text}
        />
      ),
    },
    {
      title: '告警时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
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
          {record.status === 'pending' && (
            <Button
              type="link"
              size="small"
              onClick={() => handleDispatch(record)}
            >
              派单
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const handleSearch = (values) => {
    setLoading(true);
    setTimeout(() => {
      const filtered = faultAlarms.filter((item) => {
        if (values.pileId && !item.pileId.includes(values.pileId)) return false;
        if (values.faultType && item.faultType !== values.faultType) return false;
        if (values.status && item.status !== values.status) return false;
        return true;
      });
      setData(filtered);
      setLoading(false);
    }, 500);
  };

  const handleReset = () => {
    form.resetFields();
    setData(faultAlarms);
  };

  const handleView = (record) => {
    setCurrentRecord(record);
    setDetailVisible(true);
  };

  const handleDispatch = (record) => {
    setCurrentRecord(record);
    setDispatchVisible(true);
  };

  const handleDispatchConfirm = () => {
    setData(
      data.map((item) =>
        item.id === currentRecord.id ? { ...item, status: 'processing' } : item
      )
    );
    message.success('工单已派发');
    setDispatchVisible(false);
  };

  // 统计数据
  const stats = {
    total: data.length,
    pending: data.filter((item) => item.status === 'pending').length,
    serious: data.filter((item) => item.level === 'serious').length,
    todayNew: data.filter((item) => item.createTime.includes('2024-01-20')).length,
  };

  return (
    <div>
      <div className="page-header">
        <h1>故障报警中心</h1>
        <p>接收设备上报的硬件故障（如过温、短路、急停），进行故障分级处理</p>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <BellOutlined style={{ fontSize: 32, color: '#1890ff', marginBottom: 8 }} />
              <div style={{ color: 'rgba(0,0,0,0.45)', marginBottom: 4 }}>告警总数</div>
              <div style={{ fontSize: 28, fontWeight: 600 }}>{stats.total}</div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <ExclamationCircleOutlined style={{ fontSize: 32, color: '#ff4d4f', marginBottom: 8 }} />
              <div style={{ color: 'rgba(0,0,0,0.45)', marginBottom: 4 }}>待处理</div>
              <div style={{ fontSize: 28, fontWeight: 600, color: '#ff4d4f' }}>{stats.pending}</div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <ExclamationCircleOutlined style={{ fontSize: 32, color: '#faad14', marginBottom: 8 }} />
              <div style={{ color: 'rgba(0,0,0,0.45)', marginBottom: 4 }}>严重故障</div>
              <div style={{ fontSize: 28, fontWeight: 600, color: '#faad14' }}>{stats.serious}</div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <BellOutlined style={{ fontSize: 32, color: '#52c41a', marginBottom: 8 }} />
              <div style={{ color: 'rgba(0,0,0,0.45)', marginBottom: 4 }}>今日新增</div>
              <div style={{ fontSize: 28, fontWeight: 600 }}>{stats.todayNew}</div>
            </div>
          </Card>
        </Col>
      </Row>

      <Card style={{ marginBottom: 16 }}>
        <Form form={form} onFinish={handleSearch}>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item name="pileId" label="设备编号">
                <Input placeholder="请输入设备编号" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="faultType" label="故障类型">
                <Select placeholder="请选择故障类型" allowClear>
                  <Select.Option value="过温保护">过温保护</Select.Option>
                  <Select.Option value="通信中断">通信中断</Select.Option>
                  <Select.Option value="急停触发">急停触发</Select.Option>
                  <Select.Option value="短路保护">短路保护</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="status" label="状态">
                <Select placeholder="请选择状态" allowClear>
                  <Select.Option value="pending">待处理</Select.Option>
                  <Select.Option value="processing">处理中</Select.Option>
                  <Select.Option value="resolved">已解决</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                    搜索
                  </Button>
                  <Button onClick={handleReset}>重置</Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card title="告警列表">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          loading={loading}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
        />
      </Card>

      <Modal
        title="告警详情"
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={null}
        width={600}
      >
        {currentRecord && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="告警编号">{currentRecord.id}</Descriptions.Item>
            <Descriptions.Item label="设备编号">{currentRecord.pileId}</Descriptions.Item>
            <Descriptions.Item label="站点名称">{currentRecord.stationName}</Descriptions.Item>
            <Descriptions.Item label="故障类型">{currentRecord.faultType}</Descriptions.Item>
            <Descriptions.Item label="告警级别">
              <Tag color={levelMap[currentRecord.level].color}>
                {levelMap[currentRecord.level].text}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="状态">
              <Tag color={statusMap[currentRecord.status].color}>
                {statusMap[currentRecord.status].text}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="故障描述" span={2}>
              {currentRecord.description}
            </Descriptions.Item>
            <Descriptions.Item label="告警时间" span={2}>
              {currentRecord.createTime}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      <Modal
        title="派发工单"
        open={dispatchVisible}
        onOk={handleDispatchConfirm}
        onCancel={() => setDispatchVisible(false)}
      >
        {currentRecord && (
          <div>
            <p><strong>告警编号：</strong>{currentRecord.id}</p>
            <p><strong>设备编号：</strong>{currentRecord.pileId}</p>
            <p><strong>故障类型：</strong>{currentRecord.faultType}</p>
            <p><strong>故障描述：</strong>{currentRecord.description}</p>
            <p style={{ marginTop: 16 }}>确认派发工单给对应运营商处理？</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Alarms;
