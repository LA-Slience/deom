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
  Popconfirm,
  Select,
  Descriptions,
  InputNumber,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { pileList, stationList } from '../../mock/data';

const Piles = () => {
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const [data, setData] = useState(pileList);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [currentRecord, setCurrentRecord] = useState(null);
  const [detailVisible, setDetailVisible] = useState(false);

  const statusMap = {
    online: { color: 'blue', text: '在线空闲' },
    charging: { color: 'green', text: '充电中' },
    offline: { color: 'default', text: '离线' },
    fault: { color: 'red', text: '故障' },
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
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: '型号',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: '额定功率',
      dataIndex: 'power',
      key: 'power',
      render: (power) => `${power} kW`,
      sorter: (a, b) => a.power - b.power,
    },
    {
      title: '当前功率',
      dataIndex: 'currentPower',
      key: 'currentPower',
      render: (power) => (
        <span style={{ color: power > 0 ? '#52c41a' : '#999' }}>
          {power > 0 ? `${power} kW` : '-'}
        </span>
      ),
    },
    {
      title: '今日充电量',
      dataIndex: 'todayChargeAmount',
      key: 'todayChargeAmount',
      render: (amount) => `${amount} kWh`,
      sorter: (a, b) => a.todayChargeAmount - b.todayChargeAmount,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={statusMap[status].color}>{statusMap[status].text}</Tag>
      ),
      filters: Object.entries(statusMap).map(([key, value]) => ({
        text: value.text,
        value: key,
      })),
      onFilter: (value, record) => record.status === value,
    },
    {
      title: '投运时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
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
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除该充电桩吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleSearch = (values) => {
    setLoading(true);
    setTimeout(() => {
      const filtered = pileList.filter((item) => {
        if (values.id && !item.id.includes(values.id)) return false;
        if (values.stationId && item.stationId !== values.stationId) return false;
        if (values.status && item.status !== values.status) return false;
        return true;
      });
      setData(filtered);
      setLoading(false);
    }, 500);
  };

  const handleReset = () => {
    form.resetFields();
    setData(pileList);
  };

  const handleAdd = () => {
    setModalType('add');
    setCurrentRecord(null);
    modalForm.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setModalType('edit');
    setCurrentRecord(record);
    modalForm.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleView = (record) => {
    setCurrentRecord(record);
    setDetailVisible(true);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    message.success('删除成功');
  };

  const handleModalOk = () => {
    modalForm.validateFields().then((values) => {
      const station = stationList.find((s) => s.id === values.stationId);
      if (modalType === 'add') {
        const newRecord = {
          ...values,
          id: `CP${String(data.length + 1).padStart(3, '0')}`,
          stationName: station?.name || '',
          currentPower: 0,
          todayChargeAmount: 0,
          status: 'online',
          createTime: new Date().toISOString().split('T')[0],
        };
        setData([newRecord, ...data]);
        message.success('添加成功');
      } else {
        setData(
          data.map((item) =>
            item.id === currentRecord.id
              ? { ...item, ...values, stationName: station?.name || item.stationName }
              : item
          )
        );
        message.success('编辑成功');
      }
      setModalVisible(false);
    });
  };

  return (
    <div>
      <div className="page-header">
        <h1>充电桩管理</h1>
        <p>管理充电桩设备台账，包括品牌、功率、型号、投运时间等</p>
      </div>

      <Card style={{ marginBottom: 16 }}>
        <Form form={form} onFinish={handleSearch}>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item name="id" label="设备编号">
                <Input placeholder="请输入设备编号" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="stationId" label="所属站点">
                <Select placeholder="请选择站点" allowClear>
                  {stationList.map((station) => (
                    <Select.Option key={station.id} value={station.id}>
                      {station.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="status" label="状态">
                <Select placeholder="请选择状态" allowClear>
                  {Object.entries(statusMap).map(([key, value]) => (
                    <Select.Option key={key} value={key}>
                      {value.text}
                    </Select.Option>
                  ))}
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
        title="充电桩列表"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            新增充电桩
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
        title={modalType === 'add' ? '新增充电桩' : '编辑充电桩'}
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
                label="所属站点"
                rules={[{ required: true, message: '请选择所属站点' }]}
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
                name="brand"
                label="品牌"
                rules={[{ required: true, message: '请输入品牌' }]}
              >
                <Input placeholder="请输入品牌" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="model"
                label="型号"
                rules={[{ required: true, message: '请输入型号' }]}
              >
                <Input placeholder="请输入型号" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="power"
                label="额定功率(kW)"
                rules={[{ required: true, message: '请输入额定功率' }]}
              >
                <InputNumber
                  placeholder="请输入额定功率"
                  min={1}
                  max={500}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Modal
        title="充电桩详情"
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={null}
        width={700}
      >
        {currentRecord && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="设备编号">{currentRecord.id}</Descriptions.Item>
            <Descriptions.Item label="所属站点">{currentRecord.stationName}</Descriptions.Item>
            <Descriptions.Item label="品牌">{currentRecord.brand}</Descriptions.Item>
            <Descriptions.Item label="型号">{currentRecord.model}</Descriptions.Item>
            <Descriptions.Item label="额定功率">{currentRecord.power} kW</Descriptions.Item>
            <Descriptions.Item label="当前功率">
              <ThunderboltOutlined style={{ color: '#52c41a', marginRight: 4 }} />
              {currentRecord.currentPower > 0 ? `${currentRecord.currentPower} kW` : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="今日充电量">
              {currentRecord.todayChargeAmount} kWh
            </Descriptions.Item>
            <Descriptions.Item label="状态">
              <Tag color={statusMap[currentRecord.status].color}>
                {statusMap[currentRecord.status].text}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="投运时间">{currentRecord.createTime}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default Piles;
