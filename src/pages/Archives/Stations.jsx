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
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import { stationList, operatorList } from '../../mock/data';

const Stations = () => {
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const [data, setData] = useState(stationList);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [currentRecord, setCurrentRecord] = useState(null);
  const [detailVisible, setDetailVisible] = useState(false);

  const columns = [
    {
      title: '站点编号',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '站点名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '站点地址',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      title: '运营商',
      dataIndex: 'operator',
      key: 'operator',
    },
    {
      title: '充电桩数',
      dataIndex: 'pileCount',
      key: 'pileCount',
      sorter: (a, b) => a.pileCount - b.pileCount,
    },
    {
      title: '在线数',
      dataIndex: 'onlineCount',
      key: 'onlineCount',
      render: (count, record) => (
        <span>
          {count}/{record.pileCount}
          <span style={{ color: '#999', marginLeft: 4 }}>
            ({((count / record.pileCount) * 100).toFixed(0)}%)
          </span>
        </span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusMap = {
          normal: { color: 'green', text: '正常' },
          warning: { color: 'orange', text: '预警' },
          fault: { color: 'red', text: '故障' },
        };
        return <Tag color={statusMap[status].color}>{statusMap[status].text}</Tag>;
      },
    },
    {
      title: '创建时间',
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
            title="确定删除该充电站吗？"
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
      const filtered = stationList.filter((item) => {
        if (values.name && !item.name.includes(values.name)) return false;
        if (values.operator && item.operator !== values.operator) return false;
        if (values.status && item.status !== values.status) return false;
        return true;
      });
      setData(filtered);
      setLoading(false);
    }, 500);
  };

  const handleReset = () => {
    form.resetFields();
    setData(stationList);
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
      if (modalType === 'add') {
        const newRecord = {
          ...values,
          id: `ST${String(data.length + 1).padStart(3, '0')}`,
          pileCount: 0,
          onlineCount: 0,
          status: 'normal',
          createTime: new Date().toISOString().split('T')[0],
        };
        setData([newRecord, ...data]);
        message.success('添加成功');
      } else {
        setData(
          data.map((item) =>
            item.id === currentRecord.id ? { ...item, ...values } : item
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
        <h1>充电站管理</h1>
        <p>管理充电站点信息，包括位置、规模、物业归属等</p>
      </div>

      <Card style={{ marginBottom: 16 }}>
        <Form form={form} onFinish={handleSearch}>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item name="name" label="站点名称">
                <Input placeholder="请输入站点名称" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="operator" label="运营商">
                <Select placeholder="请选择运营商" allowClear>
                  {operatorList.map((op) => (
                    <Select.Option key={op.id} value={op.name}>
                      {op.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="status" label="状态">
                <Select placeholder="请选择状态" allowClear>
                  <Select.Option value="normal">正常</Select.Option>
                  <Select.Option value="warning">预警</Select.Option>
                  <Select.Option value="fault">故障</Select.Option>
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
        title="充电站列表"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            新增充电站
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
        title={modalType === 'add' ? '新增充电站' : '编辑充电站'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={600}
      >
        <Form form={modalForm} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="站点名称"
                rules={[{ required: true, message: '请输入站点名称' }]}
              >
                <Input placeholder="请输入站点名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="operator"
                label="运营商"
                rules={[{ required: true, message: '请选择运营商' }]}
              >
                <Select placeholder="请选择运营商">
                  {operatorList.map((op) => (
                    <Select.Option key={op.id} value={op.name}>
                      {op.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="address"
            label="站点地址"
            rules={[{ required: true, message: '请输入站点地址' }]}
          >
            <Input.TextArea placeholder="请输入站点地址" rows={2} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="充电站详情"
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={null}
        width={700}
      >
        {currentRecord && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="站点编号">{currentRecord.id}</Descriptions.Item>
            <Descriptions.Item label="站点名称">{currentRecord.name}</Descriptions.Item>
            <Descriptions.Item label="运营商">{currentRecord.operator}</Descriptions.Item>
            <Descriptions.Item label="状态">
              <Tag color={currentRecord.status === 'normal' ? 'green' : 'orange'}>
                {currentRecord.status === 'normal' ? '正常' : '预警'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="站点地址" span={2}>
              <EnvironmentOutlined style={{ marginRight: 4 }} />
              {currentRecord.address}
            </Descriptions.Item>
            <Descriptions.Item label="充电桩总数">{currentRecord.pileCount} 台</Descriptions.Item>
            <Descriptions.Item label="在线数量">{currentRecord.onlineCount} 台</Descriptions.Item>
            <Descriptions.Item label="在线率">
              {((currentRecord.onlineCount / currentRecord.pileCount) * 100).toFixed(1)}%
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">{currentRecord.createTime}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default Stations;
