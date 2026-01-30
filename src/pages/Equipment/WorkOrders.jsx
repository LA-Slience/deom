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
  Progress,
  Statistic,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { workOrders, stationList, operatorList } from '../../mock/data';

const WorkOrders = () => {
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const [data, setData] = useState(workOrders);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [detailVisible, setDetailVisible] = useState(false);

  const statusMap = {
    pending: { color: 'red', text: '待接单', icon: <ClockCircleOutlined /> },
    processing: { color: 'blue', text: '处理中', icon: <SyncOutlined spin /> },
    completed: { color: 'green', text: '已完成', icon: <CheckCircleOutlined /> },
  };

  const typeMap = {
    '故障维修': 'red',
    '定期巡检': 'blue',
    '设备更换': 'orange',
  };

  const columns = [
    {
      title: '工单编号',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '站点名称',
      dataIndex: 'stationName',
      key: 'stationName',
    },
    {
      title: '设备编号',
      dataIndex: 'pileId',
      key: 'pileId',
      render: (id) => id || '-',
    },
    {
      title: '工单类型',
      dataIndex: 'type',
      key: 'type',
      render: (type) => <Tag color={typeMap[type]}>{type}</Tag>,
    },
    {
      title: '运营商',
      dataIndex: 'operator',
      key: 'operator',
    },
    {
      title: '处理人',
      dataIndex: 'assignee',
      key: 'assignee',
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
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '截止时间',
      dataIndex: 'deadline',
      key: 'deadline',
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
          {record.status !== 'completed' && (
            <Button
              type="link"
              size="small"
              onClick={() => handleComplete(record)}
            >
              完成
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const handleSearch = (values) => {
    setLoading(true);
    setTimeout(() => {
      const filtered = workOrders.filter((item) => {
        if (values.id && !item.id.includes(values.id)) return false;
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
    setData(workOrders);
  };

  const handleAdd = () => {
    modalForm.resetFields();
    setModalVisible(true);
  };

  const handleView = (record) => {
    setCurrentRecord(record);
    setDetailVisible(true);
  };

  const handleComplete = (record) => {
    Modal.confirm({
      title: '确认完成',
      content: `确定将工单 ${record.id} 标记为已完成吗？`,
      onOk: () => {
        setData(
          data.map((item) =>
            item.id === record.id ? { ...item, status: 'completed' } : item
          )
        );
        message.success('工单已完成');
      },
    });
  };

  const handleModalOk = () => {
    modalForm.validateFields().then((values) => {
      const station = stationList.find((s) => s.id === values.stationId);
      const operator = operatorList.find((o) => o.id === values.operatorId);
      const newRecord = {
        ...values,
        id: `WO${String(data.length + 1).padStart(3, '0')}`,
        stationName: station?.name || '',
        operator: operator?.name || '',
        status: 'pending',
        createTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
        deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().replace('T', ' ').slice(0, 19),
      };
      setData([newRecord, ...data]);
      message.success('工单创建成功');
      setModalVisible(false);
    });
  };

  // 统计数据
  const stats = {
    total: data.length,
    pending: data.filter((item) => item.status === 'pending').length,
    processing: data.filter((item) => item.status === 'processing').length,
    completed: data.filter((item) => item.status === 'completed').length,
  };

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div>
      <div className="page-header">
        <h1>运维工单管理</h1>
        <p>将故障或巡检任务自动/手动派发给对应运营商，记录接单、维修、办结全过程</p>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <Statistic title="工单总数" value={stats.total} suffix="单" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="待接单"
              value={stats.pending}
              suffix="单"
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="处理中"
              value={stats.processing}
              suffix="单"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: 'rgba(0,0,0,0.45)', marginBottom: 8 }}>完成率</div>
              <Progress
                type="circle"
                percent={completionRate}
                width={80}
                strokeColor="#52c41a"
              />
            </div>
          </Card>
        </Col>
      </Row>

      <Card style={{ marginBottom: 16 }}>
        <Form form={form} onFinish={handleSearch}>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item name="id" label="工单编号">
                <Input placeholder="请输入工单编号" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="type" label="工单类型">
                <Select placeholder="请选择工单类型" allowClear>
                  <Select.Option value="故障维修">故障维修</Select.Option>
                  <Select.Option value="定期巡检">定期巡检</Select.Option>
                  <Select.Option value="设备更换">设备更换</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="status" label="状态">
                <Select placeholder="请选择状态" allowClear>
                  <Select.Option value="pending">待接单</Select.Option>
                  <Select.Option value="processing">处理中</Select.Option>
                  <Select.Option value="completed">已完成</Select.Option>
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

      <Card
        title="工单列表"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            新建工单
          </Button>
        }
      >
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
        title="新建工单"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={600}
      >
        <Form form={modalForm} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="stationId"
                label="站点"
                rules={[{ required: true, message: '请选择站点' }]}
              >
                <Select placeholder="请选择站点">
                  {stationList.map((station) => (
                    <Select.Option key={station.id} value={station.id}>
                      {station.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="工单类型"
                rules={[{ required: true, message: '请选择工单类型' }]}
              >
                <Select placeholder="请选择工单类型">
                  <Select.Option value="故障维修">故障维修</Select.Option>
                  <Select.Option value="定期巡检">定期巡检</Select.Option>
                  <Select.Option value="设备更换">设备更换</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="operatorId"
                label="运营商"
                rules={[{ required: true, message: '请选择运营商' }]}
              >
                <Select placeholder="请选择运营商">
                  {operatorList.map((op) => (
                    <Select.Option key={op.id} value={op.id}>
                      {op.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="assignee"
                label="处理人"
                rules={[{ required: true, message: '请输入处理人' }]}
              >
                <Input placeholder="请输入处理人" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="pileId" label="设备编号">
            <Input placeholder="请输入设备编号（可选）" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="工单详情"
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={null}
        width={700}
      >
        {currentRecord && (
          <>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="工单编号">{currentRecord.id}</Descriptions.Item>
              <Descriptions.Item label="工单类型">
                <Tag color={typeMap[currentRecord.type]}>{currentRecord.type}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="站点名称">{currentRecord.stationName}</Descriptions.Item>
              <Descriptions.Item label="设备编号">{currentRecord.pileId || '-'}</Descriptions.Item>
              <Descriptions.Item label="运营商">{currentRecord.operator}</Descriptions.Item>
              <Descriptions.Item label="处理人">{currentRecord.assignee}</Descriptions.Item>
              <Descriptions.Item label="状态">
                <Tag color={statusMap[currentRecord.status].color}>
                  {statusMap[currentRecord.status].text}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="关联告警">{currentRecord.faultId || '-'}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{currentRecord.createTime}</Descriptions.Item>
              <Descriptions.Item label="截止时间">{currentRecord.deadline}</Descriptions.Item>
            </Descriptions>
            <div style={{ marginTop: 24 }}>
              <h4>处理流程</h4>
              <Timeline
                items={[
                  {
                    color: 'green',
                    children: `${currentRecord.createTime} 工单创建`,
                  },
                  ...(currentRecord.status !== 'pending'
                    ? [
                        {
                          color: 'blue',
                          children: `${currentRecord.assignee} 已接单`,
                        },
                      ]
                    : []),
                  ...(currentRecord.status === 'completed'
                    ? [
                        {
                          color: 'green',
                          children: '工单已完成',
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

export default WorkOrders;
