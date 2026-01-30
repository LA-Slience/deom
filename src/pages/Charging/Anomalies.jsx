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
} from 'antd';
import {
  SearchOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { chargeAnomalies } from '../../mock/data';

const Anomalies = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(chargeAnomalies);
  const [loading, setLoading] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [detailVisible, setDetailVisible] = useState(false);
  const [processVisible, setProcessVisible] = useState(false);

  const statusMap = {
    pending: { color: 'red', text: '待处理', icon: <ExclamationCircleOutlined /> },
    processing: { color: 'blue', text: '处理中', icon: <ClockCircleOutlined /> },
    resolved: { color: 'green', text: '已解决', icon: <CheckCircleOutlined /> },
  };

  const anomalyTypeMap = {
    '价格超标': 'red',
    '未明码标价': 'orange',
    '违规收取停车费': 'purple',
  };

  const columns = [
    {
      title: '异常编号',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '订单号',
      dataIndex: 'orderId',
      key: 'orderId',
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
      title: '异常类型',
      dataIndex: 'anomalyType',
      key: 'anomalyType',
      render: (type) => <Tag color={anomalyTypeMap[type]}>{type}</Tag>,
    },
    {
      title: '标准价格',
      dataIndex: 'standardPrice',
      key: 'standardPrice',
      render: (price) => `¥${price}`,
    },
    {
      title: '实际价格',
      dataIndex: 'actualPrice',
      key: 'actualPrice',
      render: (price, record) => (
        <span style={{ color: price > record.standardPrice ? '#ff4d4f' : 'inherit' }}>
          ¥{price}
        </span>
      ),
    },
    {
      title: '涉及金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `¥${amount}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={statusMap[status].color} icon={statusMap[status].icon}>
          {statusMap[status].text}
        </Tag>
      ),
    },
    {
      title: '发现时间',
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
      const filtered = chargeAnomalies.filter((item) => {
        if (values.orderId && !item.orderId.includes(values.orderId)) return false;
        if (values.operator && item.operator !== values.operator) return false;
        if (values.status && item.status !== values.status) return false;
        if (values.anomalyType && item.anomalyType !== values.anomalyType) return false;
        return true;
      });
      setData(filtered);
      setLoading(false);
    }, 500);
  };

  const handleReset = () => {
    form.resetFields();
    setData(chargeAnomalies);
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
    message.success(action === 'resolve' ? '已标记为已解决' : '已转入处理中');
    setProcessVisible(false);
  };

  return (
    <div>
      <div className="page-header">
        <h1>收费异常预警</h1>
        <p>自动识别"价格超标"、"未明码标价"、"违规收取停车费"等异常收费行为</p>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: 'rgba(0,0,0,0.45)', marginBottom: 8 }}>待处理异常</div>
              <div style={{ fontSize: 28, fontWeight: 600, color: '#ff4d4f' }}>
                {data.filter((item) => item.status === 'pending').length}
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: 'rgba(0,0,0,0.45)', marginBottom: 8 }}>处理中</div>
              <div style={{ fontSize: 28, fontWeight: 600, color: '#1890ff' }}>
                {data.filter((item) => item.status === 'processing').length}
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: 'rgba(0,0,0,0.45)', marginBottom: 8 }}>已解决</div>
              <div style={{ fontSize: 28, fontWeight: 600, color: '#52c41a' }}>
                {data.filter((item) => item.status === 'resolved').length}
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: 'rgba(0,0,0,0.45)', marginBottom: 8 }}>涉及总金额</div>
              <div style={{ fontSize: 28, fontWeight: 600, color: '#722ed1' }}>
                ¥{data.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Card style={{ marginBottom: 16 }}>
        <Form form={form} onFinish={handleSearch}>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item name="orderId" label="订单号">
                <Input placeholder="请输入订单号" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="anomalyType" label="异常类型">
                <Select placeholder="请选择异常类型" allowClear>
                  <Select.Option value="价格超标">价格超标</Select.Option>
                  <Select.Option value="未明码标价">未明码标价</Select.Option>
                  <Select.Option value="违规收取停车费">违规收取停车费</Select.Option>
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

      <Card title="异常记录列表">
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
        title="异常详情"
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={null}
        width={700}
      >
        {currentRecord && (
          <>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="异常编号">{currentRecord.id}</Descriptions.Item>
              <Descriptions.Item label="订单号">{currentRecord.orderId}</Descriptions.Item>
              <Descriptions.Item label="站点名称">{currentRecord.stationName}</Descriptions.Item>
              <Descriptions.Item label="运营商">{currentRecord.operator}</Descriptions.Item>
              <Descriptions.Item label="异常类型">
                <Tag color={anomalyTypeMap[currentRecord.anomalyType]}>
                  {currentRecord.anomalyType}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                <Tag color={statusMap[currentRecord.status].color}>
                  {statusMap[currentRecord.status].text}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="标准价格">¥{currentRecord.standardPrice}</Descriptions.Item>
              <Descriptions.Item label="实际价格">
                <span style={{ color: '#ff4d4f' }}>¥{currentRecord.actualPrice}</span>
              </Descriptions.Item>
              <Descriptions.Item label="涉及金额">¥{currentRecord.amount}</Descriptions.Item>
              <Descriptions.Item label="发现时间">{currentRecord.createTime}</Descriptions.Item>
            </Descriptions>
            <div style={{ marginTop: 24 }}>
              <h4>处理记录</h4>
              <Timeline
                items={[
                  {
                    color: 'red',
                    children: `${currentRecord.createTime} 系统自动发现异常`,
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
                          children: '问题已解决',
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
        title="处理异常"
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
            <p>
              <strong>异常编号：</strong>
              {currentRecord.id}
            </p>
            <p>
              <strong>异常类型：</strong>
              {currentRecord.anomalyType}
            </p>
            <p>
              <strong>涉及金额：</strong>¥{currentRecord.amount}
            </p>
            <p>请选择处理方式：</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Anomalies;
