import { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Form,
  Row,
  Col,
  Modal,
  message,
  InputNumber,
  Input,
  DatePicker,
  Descriptions,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { pricePolicies } from '../../mock/data';

const Policies = () => {
  const [modalForm] = Form.useForm();
  const [data, setData] = useState(pricePolicies);
  const [loading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [currentRecord, setCurrentRecord] = useState(null);
  const [detailVisible, setDetailVisible] = useState(false);

  const columns = [
    {
      title: '政策编号',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '政策名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '峰时电价',
      dataIndex: 'peakPrice',
      key: 'peakPrice',
      render: (price) => `¥${price}/kWh`,
    },
    {
      title: '平时电价',
      dataIndex: 'flatPrice',
      key: 'flatPrice',
      render: (price) => `¥${price}/kWh`,
    },
    {
      title: '谷时电价',
      dataIndex: 'valleyPrice',
      key: 'valleyPrice',
      render: (price) => `¥${price}/kWh`,
    },
    {
      title: '服务费上限',
      dataIndex: 'serviceFeeLimit',
      key: 'serviceFeeLimit',
      render: (fee) => `¥${fee}/kWh`,
    },
    {
      title: '生效日期',
      dataIndex: 'effectiveDate',
      key: 'effectiveDate',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'default'}>
          {status === 'active' ? '生效中' : '已过期'}
        </Tag>
      ),
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
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            disabled={record.status === 'expired'}
          >
            编辑
          </Button>
        </Space>
      ),
    },
  ];

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

  const handleModalOk = () => {
    modalForm.validateFields().then((values) => {
      const formattedValues = {
        ...values,
        effectiveDate: values.effectiveDate?.format('YYYY-MM-DD'),
      };
      
      if (modalType === 'add') {
        const newRecord = {
          ...formattedValues,
          id: `PP${String(data.length + 1).padStart(3, '0')}`,
          status: 'active',
        };
        // 将之前的政策设为过期
        const updatedData = data.map((item) => ({
          ...item,
          status: 'expired',
        }));
        setData([newRecord, ...updatedData]);
        message.success('添加成功');
      } else {
        setData(
          data.map((item) =>
            item.id === currentRecord.id ? { ...item, ...formattedValues } : item
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
        <h1>价格政策管理</h1>
        <p>管理政府指导电价（峰谷平尖电价模板）和服务费上限标准</p>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: 'rgba(0,0,0,0.45)', marginBottom: 8 }}>当前峰时电价</div>
              <div style={{ fontSize: 28, fontWeight: 600, color: '#ff4d4f' }}>
                ¥{pricePolicies[0].peakPrice}
                <span style={{ fontSize: 14, fontWeight: 400 }}>/kWh</span>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: 'rgba(0,0,0,0.45)', marginBottom: 8 }}>当前平时电价</div>
              <div style={{ fontSize: 28, fontWeight: 600, color: '#1890ff' }}>
                ¥{pricePolicies[0].flatPrice}
                <span style={{ fontSize: 14, fontWeight: 400 }}>/kWh</span>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: 'rgba(0,0,0,0.45)', marginBottom: 8 }}>当前谷时电价</div>
              <div style={{ fontSize: 28, fontWeight: 600, color: '#52c41a' }}>
                ¥{pricePolicies[0].valleyPrice}
                <span style={{ fontSize: 14, fontWeight: 400 }}>/kWh</span>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: 'rgba(0,0,0,0.45)', marginBottom: 8 }}>服务费上限</div>
              <div style={{ fontSize: 28, fontWeight: 600, color: '#722ed1' }}>
                ¥{pricePolicies[0].serviceFeeLimit}
                <span style={{ fontSize: 14, fontWeight: 400 }}>/kWh</span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Card
        title="价格政策列表"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            新增政策
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
        title={modalType === 'add' ? '新增价格政策' : '编辑价格政策'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={600}
      >
        <Form form={modalForm} layout="vertical">
          <Form.Item
            name="name"
            label="政策名称"
            rules={[{ required: true, message: '请输入政策名称' }]}
          >
            <Input placeholder="请输入政策名称" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="peakPrice"
                label="峰时电价(元/kWh)"
                rules={[{ required: true, message: '请输入峰时电价' }]}
              >
                <InputNumber
                  placeholder="峰时电价"
                  min={0}
                  step={0.01}
                  precision={2}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="flatPrice"
                label="平时电价(元/kWh)"
                rules={[{ required: true, message: '请输入平时电价' }]}
              >
                <InputNumber
                  placeholder="平时电价"
                  min={0}
                  step={0.01}
                  precision={2}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="valleyPrice"
                label="谷时电价(元/kWh)"
                rules={[{ required: true, message: '请输入谷时电价' }]}
              >
                <InputNumber
                  placeholder="谷时电价"
                  min={0}
                  step={0.01}
                  precision={2}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="serviceFeeLimit"
                label="服务费上限(元/kWh)"
                rules={[{ required: true, message: '请输入服务费上限' }]}
              >
                <InputNumber
                  placeholder="服务费上限"
                  min={0}
                  step={0.01}
                  precision={2}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="effectiveDate"
                label="生效日期"
                rules={[{ required: true, message: '请选择生效日期' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Modal
        title="价格政策详情"
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={null}
        width={600}
      >
        {currentRecord && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="政策编号">{currentRecord.id}</Descriptions.Item>
            <Descriptions.Item label="政策名称">{currentRecord.name}</Descriptions.Item>
            <Descriptions.Item label="峰时电价">¥{currentRecord.peakPrice}/kWh</Descriptions.Item>
            <Descriptions.Item label="平时电价">¥{currentRecord.flatPrice}/kWh</Descriptions.Item>
            <Descriptions.Item label="谷时电价">¥{currentRecord.valleyPrice}/kWh</Descriptions.Item>
            <Descriptions.Item label="服务费上限">¥{currentRecord.serviceFeeLimit}/kWh</Descriptions.Item>
            <Descriptions.Item label="生效日期">{currentRecord.effectiveDate}</Descriptions.Item>
            <Descriptions.Item label="状态">
              <Tag color={currentRecord.status === 'active' ? 'green' : 'default'}>
                {currentRecord.status === 'active' ? '生效中' : '已过期'}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default Policies;
