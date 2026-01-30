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
  Timeline,
  Statistic,
} from 'antd';
import {
  SearchOutlined,
  EyeOutlined,
  PhoneOutlined,
  MobileOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import { complaints } from '../../mock/data';

const ComplaintList = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(complaints);
  const [loading, setLoading] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [detailVisible, setDetailVisible] = useState(false);
  const [processVisible, setProcessVisible] = useState(false);

  const sourceMap = {
    '12345热线': { icon: <PhoneOutlined />, color: 'blue' },
    'APP投诉': { icon: <MobileOutlined />, color: 'green' },
    '小程序': { icon: <MessageOutlined />, color: 'purple' },
  };

  const typeMap = {
    '收费问题': 'red',
    '设备故障': 'orange',
    '燃油车占位': 'purple',
    '服务态度': 'blue',
  };

  const statusMap = {
    pending: { color: 'red', text: '待处理' },
    processing: { color: 'blue', text: '处理中' },
    resolved: { color: 'green', text: '已解决' },
  };

  const columns = [
    {
      title: '投诉编号',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '来源',
      dataIndex: 'source',
      key: 'source',
      render: (source) => (
        <Tag icon={sourceMap[source]?.icon} color={sourceMap[source]?.color}>
          {source}
        </Tag>
      ),
    },
    {
      title: '投诉类型',
      dataIndex: 'type',
      key: 'type',
      render: (type) => <Tag color={typeMap[type]}>{type}</Tag>,
    },
    {
      title: '站点名称',
      dataIndex: 'stationName',
      key: 'stationName',
    },
    {
      title: '运营商',
      dataIndex: 'operator',
      key: 'operator',
    },
    {
      title: '投诉内容',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
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
      title: '投诉时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
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
          {record.status !== 'resolved' && (
            <Button
              type="link"
              size="small"
              onClick={() => handleProcess(record)}
            >
              处理
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const handleSearch = (values) => {
    setLoading(true);
    setTimeout(() => {
      const filtered = complaints.filter((item) => {
        if (values.source && item.source !== values.source) return false;
        if (values.type && item.type !== values.type) return false;
        if (values.status && item.status !== values.status) return false;
        return true;
      });
      setData(filtered);
      setLoading(false);
    }, 500);
  };

  const handleReset = () => {
    form.resetFields();
    setData(complaints);
  };

  const handleView = (record) => {
    setCurrentRecord(record);
    setDetailVisible(true);
  };

  const handleProcess = (record) => {
    setCurrentRecord(record);
    setProcessVisible(true);
  };

  const handleProcessConfirm = (action) => {
    const newStatus = action === 'resolve' ? 'resolved' : 'processing';
    setData(
      data.map((item) =>
        item.id === currentRecord.id ? { ...item, status: newStatus } : item
      )
    );
    message.success(action === 'resolve' ? '投诉已解决' : '已转入处理');
    setProcessVisible(false);
  };

  // 统计数据
  const stats = {
    total: data.length,
    pending: data.filter((item) => item.status === 'pending').length,
    processing: data.filter((item) => item.status === 'processing').length,
    resolved: data.filter((item) => item.status === 'resolved').length,
  };

  return (
    <div>
      <div className="page-header">
        <h1>投诉受理</h1>
        <p>汇聚12345热线、APP端、小程序端的投诉数据，进行分类处理</p>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <Statistic title="投诉总数" value={stats.total} suffix="件" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="待处理"
              value={stats.pending}
              suffix="件"
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="处理中"
              value={stats.processing}
              suffix="件"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="已解决"
              value={stats.resolved}
              suffix="件"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginBottom: 16 }}>
        <Form form={form} onFinish={handleSearch}>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item name="source" label="来源">
                <Select placeholder="请选择来源" allowClear>
                  <Select.Option value="12345热线">12345热线</Select.Option>
                  <Select.Option value="APP投诉">APP投诉</Select.Option>
                  <Select.Option value="小程序">小程序</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="type" label="投诉类型">
                <Select placeholder="请选择投诉类型" allowClear>
                  <Select.Option value="收费问题">收费问题</Select.Option>
                  <Select.Option value="设备故障">设备故障</Select.Option>
                  <Select.Option value="燃油车占位">燃油车占位</Select.Option>
                  <Select.Option value="服务态度">服务态度</Select.Option>
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

      <Card title="投诉列表">
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
        title="投诉详情"
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={null}
        width={700}
      >
        {currentRecord && (
          <>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="投诉编号">{currentRecord.id}</Descriptions.Item>
              <Descriptions.Item label="来源">
                <Tag icon={sourceMap[currentRecord.source]?.icon} color={sourceMap[currentRecord.source]?.color}>
                  {currentRecord.source}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="投诉类型">
                <Tag color={typeMap[currentRecord.type]}>{currentRecord.type}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                <Tag color={statusMap[currentRecord.status].color}>
                  {statusMap[currentRecord.status].text}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="站点名称">{currentRecord.stationName}</Descriptions.Item>
              <Descriptions.Item label="运营商">{currentRecord.operator}</Descriptions.Item>
              <Descriptions.Item label="投诉内容" span={2}>
                {currentRecord.content}
              </Descriptions.Item>
              <Descriptions.Item label="投诉时间" span={2}>
                {currentRecord.createTime}
              </Descriptions.Item>
            </Descriptions>
            <div style={{ marginTop: 24 }}>
              <h4>处理记录</h4>
              <Timeline
                items={[
                  {
                    color: 'blue',
                    children: `${currentRecord.createTime} 收到投诉`,
                  },
                  ...(currentRecord.status !== 'pending'
                    ? [
                        {
                          color: 'blue',
                          children: '已转入处理流程',
                        },
                      ]
                    : []),
                  ...(currentRecord.status === 'resolved'
                    ? [
                        {
                          color: 'green',
                          children: '投诉已解决',
                        },
                      ]
                    : []),
                ]}
              />
            </div>
          </>
        )}
      </Modal>

      <Modal
        title="处理投诉"
        open={processVisible}
        onCancel={() => setProcessVisible(false)}
        footer={
          <Space>
            <Button onClick={() => setProcessVisible(false)}>取消</Button>
            <Button type="primary" onClick={() => handleProcessConfirm('process')}>
              转入处理
            </Button>
            <Button type="primary" danger onClick={() => handleProcessConfirm('resolve')}>
              标记解决
            </Button>
          </Space>
        }
      >
        {currentRecord && (
          <div>
            <p><strong>投诉编号：</strong>{currentRecord.id}</p>
            <p><strong>投诉类型：</strong>{currentRecord.type}</p>
            <p><strong>投诉内容：</strong>{currentRecord.content}</p>
            <p style={{ marginTop: 16 }}>请选择处理方式：</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ComplaintList;
