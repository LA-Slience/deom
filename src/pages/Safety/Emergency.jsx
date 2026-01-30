import { useState } from 'react';
import { Card, Table, Tag, Row, Col, Statistic, Button, Modal, Form, Input, Select, message, Timeline, Descriptions } from 'antd';
import {
  PlusOutlined,
  AlertOutlined,
  PhoneOutlined,
  TeamOutlined,
  FileTextOutlined,
  EyeOutlined,
} from '@ant-design/icons';

const Emergency = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

  // 模拟应急预案数据
  const [emergencyPlans] = useState([
    {
      id: 'EP001',
      name: '充电站火灾应急预案',
      type: '消防安全',
      level: 'high',
      contact: '消防大队',
      phone: '119',
      status: 'active',
      updateTime: '2024-01-15',
    },
    {
      id: 'EP002',
      name: '设备漏电应急预案',
      type: '电气安全',
      level: 'high',
      contact: '电力抢修',
      phone: '95598',
      status: 'active',
      updateTime: '2024-01-10',
    },
    {
      id: 'EP003',
      name: '人员触电应急预案',
      type: '人身安全',
      level: 'high',
      contact: '急救中心',
      phone: '120',
      status: 'active',
      updateTime: '2024-01-08',
    },
    {
      id: 'EP004',
      name: '自然灾害应急预案',
      type: '自然灾害',
      level: 'medium',
      contact: '应急管理局',
      phone: '12350',
      status: 'active',
      updateTime: '2024-01-05',
    },
  ]);

  // 模拟应急事件数据
  const [emergencyEvents, setEmergencyEvents] = useState([
    {
      id: 'EE001',
      title: '万达广场充电站烟感报警',
      type: '消防安全',
      level: 'high',
      station: '万达广场充电站',
      status: 'processing',
      createTime: '2024-01-20 10:30:00',
      handler: '张三',
    },
    {
      id: 'EE002',
      title: '科技园充电站设备过温',
      type: '电气安全',
      level: 'medium',
      station: '科技园充电站',
      status: 'resolved',
      createTime: '2024-01-19 15:20:00',
      handler: '李四',
    },
  ]);

  const levelMap = {
    high: { color: 'red', text: '高级' },
    medium: { color: 'orange', text: '中级' },
    low: { color: 'blue', text: '低级' },
  };

  const statusMap = {
    active: { color: 'green', text: '生效中' },
    inactive: { color: 'default', text: '已停用' },
    processing: { color: 'blue', text: '处理中' },
    resolved: { color: 'green', text: '已解决' },
  };

  const planColumns = [
    {
      title: '预案编号',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '预案名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type) => <Tag>{type}</Tag>,
    },
    {
      title: '级别',
      dataIndex: 'level',
      key: 'level',
      render: (level) => (
        <Tag color={levelMap[level].color}>{levelMap[level].text}</Tag>
      ),
    },
    {
      title: '联系单位',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone) => (
        <span>
          <PhoneOutlined style={{ marginRight: 4 }} />
          {phone}
        </span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={statusMap[status].color}>{statusMap[status].text}</Tag>
      ),
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button type="link" size="small" icon={<EyeOutlined />}>
          查看
        </Button>
      ),
    },
  ];

  const eventColumns = [
    {
      title: '事件编号',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '事件标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type) => <Tag>{type}</Tag>,
    },
    {
      title: '级别',
      dataIndex: 'level',
      key: 'level',
      render: (level) => (
        <Tag color={levelMap[level].color}>{levelMap[level].text}</Tag>
      ),
    },
    {
      title: '涉及站点',
      dataIndex: 'station',
      key: 'station',
    },
    {
      title: '处理人',
      dataIndex: 'handler',
      key: 'handler',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={statusMap[status].color}>{statusMap[status].text}</Tag>
      ),
    },
    {
      title: '发生时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button
          type="link"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => handleViewEvent(record)}
        >
          详情
        </Button>
      ),
    },
  ];

  const handleViewEvent = (record) => {
    setCurrentRecord(record);
    setDetailVisible(true);
  };

  const handleAddEvent = () => {
    form.resetFields();
    setModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      const newEvent = {
        ...values,
        id: `EE${String(emergencyEvents.length + 1).padStart(3, '0')}`,
        status: 'processing',
        createTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
        handler: '当前用户',
      };
      setEmergencyEvents([newEvent, ...emergencyEvents]);
      message.success('应急事件已上报');
      setModalVisible(false);
    });
  };

  // 统计数据
  const stats = {
    planCount: emergencyPlans.length,
    eventCount: emergencyEvents.length,
    processingCount: emergencyEvents.filter((e) => e.status === 'processing').length,
    resolvedCount: emergencyEvents.filter((e) => e.status === 'resolved').length,
  };

  return (
    <div>
      <div className="page-header">
        <h1>应急管理</h1>
        <p>管理应急预案、处置应急事件，保障充电设施安全运行</p>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="应急预案"
              value={stats.planCount}
              suffix="个"
              prefix={<FileTextOutlined style={{ color: '#1890ff' }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="应急事件"
              value={stats.eventCount}
              suffix="件"
              prefix={<AlertOutlined style={{ color: '#faad14' }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="处理中"
              value={stats.processingCount}
              suffix="件"
              valueStyle={{ color: '#1890ff' }}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="已解决"
              value={stats.resolvedCount}
              suffix="件"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      <Card title="应急预案" style={{ marginBottom: 16 }}>
        <Table
          columns={planColumns}
          dataSource={emergencyPlans}
          rowKey="id"
          pagination={false}
        />
      </Card>

      <Card
        title="应急事件"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddEvent}>
            上报事件
          </Button>
        }
      >
        <Table
          columns={eventColumns}
          dataSource={emergencyEvents}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
        />
      </Card>

      <Modal
        title="上报应急事件"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="事件标题"
            rules={[{ required: true, message: '请输入事件标题' }]}
          >
            <Input placeholder="请输入事件标题" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="事件类型"
                rules={[{ required: true, message: '请选择事件类型' }]}
              >
                <Select placeholder="请选择事件类型">
                  <Select.Option value="消防安全">消防安全</Select.Option>
                  <Select.Option value="电气安全">电气安全</Select.Option>
                  <Select.Option value="人身安全">人身安全</Select.Option>
                  <Select.Option value="自然灾害">自然灾害</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="level"
                label="事件级别"
                rules={[{ required: true, message: '请选择事件级别' }]}
              >
                <Select placeholder="请选择事件级别">
                  <Select.Option value="high">高级</Select.Option>
                  <Select.Option value="medium">中级</Select.Option>
                  <Select.Option value="low">低级</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="station"
            label="涉及站点"
            rules={[{ required: true, message: '请输入涉及站点' }]}
          >
            <Input placeholder="请输入涉及站点" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="事件详情"
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={null}
        width={700}
      >
        {currentRecord && (
          <>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="事件编号">{currentRecord.id}</Descriptions.Item>
              <Descriptions.Item label="事件标题">{currentRecord.title}</Descriptions.Item>
              <Descriptions.Item label="事件类型">
                <Tag>{currentRecord.type}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="事件级别">
                <Tag color={levelMap[currentRecord.level].color}>
                  {levelMap[currentRecord.level].text}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="涉及站点">{currentRecord.station}</Descriptions.Item>
              <Descriptions.Item label="处理人">{currentRecord.handler}</Descriptions.Item>
              <Descriptions.Item label="状态">
                <Tag color={statusMap[currentRecord.status].color}>
                  {statusMap[currentRecord.status].text}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="发生时间">{currentRecord.createTime}</Descriptions.Item>
            </Descriptions>
            <div style={{ marginTop: 24 }}>
              <h4>处置记录</h4>
              <Timeline
                items={[
                  {
                    color: 'red',
                    children: `${currentRecord.createTime} 事件上报`,
                  },
                  {
                    color: 'blue',
                    children: `${currentRecord.handler} 开始处置`,
                  },
                  ...(currentRecord.status === 'resolved'
                    ? [
                        {
                          color: 'green',
                          children: '事件已解决',
                        },
                      ]
                    : []),
                ]}
              />
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Emergency;
