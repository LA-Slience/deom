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
  Progress,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { operatorList } from '../../mock/data';

const Operators = () => {
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const [data, setData] = useState(operatorList);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [currentRecord, setCurrentRecord] = useState(null);
  const [detailVisible, setDetailVisible] = useState(false);

  const columns = [
    {
      title: '运营商编号',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '企业名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '联系人',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '充电站数',
      dataIndex: 'stationCount',
      key: 'stationCount',
      sorter: (a, b) => a.stationCount - b.stationCount,
    },
    {
      title: '充电桩数',
      dataIndex: 'pileCount',
      key: 'pileCount',
      sorter: (a, b) => a.pileCount - b.pileCount,
    },
    {
      title: '信用评分',
      dataIndex: 'creditScore',
      key: 'creditScore',
      render: (score) => {
        let color = '#52c41a';
        if (score < 60) color = '#ff4d4f';
        else if (score < 80) color = '#faad14';
        return (
          <Space>
            <Progress
              type="circle"
              percent={score}
              width={40}
              strokeColor={color}
              format={(percent) => percent}
            />
          </Space>
        );
      },
      sorter: (a, b) => a.creditScore - b.creditScore,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusMap = {
          normal: { color: 'green', text: '正常' },
          warning: { color: 'orange', text: '预警' },
          disabled: { color: 'red', text: '停用' },
        };
        return <Tag color={statusMap[status].color}>{statusMap[status].text}</Tag>;
      },
    },
    {
      title: '入驻时间',
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
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除该运营商吗？"
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
      const filtered = operatorList.filter((item) => {
        if (values.name && !item.name.includes(values.name)) return false;
        if (values.contact && !item.contact.includes(values.contact)) return false;
        return true;
      });
      setData(filtered);
      setLoading(false);
    }, 500);
  };

  const handleReset = () => {
    form.resetFields();
    setData(operatorList);
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
          id: `OP${String(data.length + 1).padStart(3, '0')}`,
          stationCount: 0,
          pileCount: 0,
          creditScore: 80,
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
        <h1>运营商管理</h1>
        <p>管理充电设施运营企业的资质、备案信息及信用档案</p>
      </div>

      <Card style={{ marginBottom: 16 }}>
        <Form form={form} onFinish={handleSearch}>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item name="name" label="企业名称">
                <Input placeholder="请输入企业名称" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="contact" label="联系人">
                <Input placeholder="请输入联系人" />
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
        title="运营商列表"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            新增运营商
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
        title={modalType === 'add' ? '新增运营商' : '编辑运营商'}
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
                label="企业名称"
                rules={[{ required: true, message: '请输入企业名称' }]}
              >
                <Input placeholder="请输入企业名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="contact"
                label="联系人"
                rules={[{ required: true, message: '请输入联系人' }]}
              >
                <Input placeholder="请输入联系人" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="联系电话"
                rules={[{ required: true, message: '请输入联系电话' }]}
              >
                <Input placeholder="请输入联系电话" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Modal
        title="运营商详情"
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={null}
        width={700}
      >
        {currentRecord && (
          <div>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <p><strong>运营商编号：</strong>{currentRecord.id}</p>
              </Col>
              <Col span={12}>
                <p><strong>企业名称：</strong>{currentRecord.name}</p>
              </Col>
              <Col span={12}>
                <p><strong>联系人：</strong>{currentRecord.contact}</p>
              </Col>
              <Col span={12}>
                <p><strong>联系电话：</strong>{currentRecord.phone}</p>
              </Col>
              <Col span={12}>
                <p><strong>充电站数量：</strong>{currentRecord.stationCount} 座</p>
              </Col>
              <Col span={12}>
                <p><strong>充电桩数量：</strong>{currentRecord.pileCount} 台</p>
              </Col>
              <Col span={12}>
                <p><strong>信用评分：</strong>{currentRecord.creditScore} 分</p>
              </Col>
              <Col span={12}>
                <p><strong>入驻时间：</strong>{currentRecord.createTime}</p>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Operators;
