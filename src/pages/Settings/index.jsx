import { useState } from 'react';
import { Card, Form, Input, Button, Switch, Select, message, Tabs, Row, Col, Divider, Table, Tag, Space } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  BellOutlined,
  SettingOutlined,
  SafetyOutlined,
  TeamOutlined,
} from '@ant-design/icons';

const Settings = () => {
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [notificationForm] = Form.useForm();

  // 模拟用户数据
  const [users] = useState([
    { id: 1, username: 'admin', name: '系统管理员', role: 'admin', status: 'active', lastLogin: '2024-01-20 10:30:00' },
    { id: 2, username: 'operator1', name: '运营人员1', role: 'operator', status: 'active', lastLogin: '2024-01-19 15:20:00' },
    { id: 3, username: 'viewer1', name: '查看人员1', role: 'viewer', status: 'inactive', lastLogin: '2024-01-18 09:00:00' },
  ]);

  const roleMap = {
    admin: { color: 'red', text: '管理员' },
    operator: { color: 'blue', text: '运营人员' },
    viewer: { color: 'green', text: '查看人员' },
  };

  const userColumns = [
    { title: '用户名', dataIndex: 'username', key: 'username' },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role) => <Tag color={roleMap[role].color}>{roleMap[role].text}</Tag>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'default'}>
          {status === 'active' ? '启用' : '禁用'}
        </Tag>
      ),
    },
    { title: '最后登录', dataIndex: 'lastLogin', key: 'lastLogin' },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space>
          <Button type="link" size="small">编辑</Button>
          <Button type="link" size="small" danger>删除</Button>
        </Space>
      ),
    },
  ];

  const handleProfileSubmit = (values) => {
    console.log('Profile:', values);
    message.success('个人信息已更新');
  };

  const handlePasswordSubmit = (values) => {
    console.log('Password:', values);
    message.success('密码已修改');
    passwordForm.resetFields();
  };

  const handleNotificationSubmit = (values) => {
    console.log('Notification:', values);
    message.success('通知设置已保存');
  };

  const tabItems = [
    {
      key: 'profile',
      label: (
        <span>
          <UserOutlined />
          个人信息
        </span>
      ),
      children: (
        <Card>
          <Form
            form={profileForm}
            layout="vertical"
            initialValues={{
              username: 'admin',
              name: '系统管理员',
              email: 'admin@example.com',
              phone: '13800138000',
              department: '信息中心',
            }}
            onFinish={handleProfileSubmit}
            style={{ maxWidth: 500 }}
          >
            <Form.Item name="username" label="用户名">
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="name"
              label="姓名"
              rules={[{ required: true, message: '请输入姓名' }]}
            >
              <Input placeholder="请输入姓名" />
            </Form.Item>
            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                { required: true, message: '请输入邮箱' },
                { type: 'email', message: '请输入有效的邮箱地址' },
              ]}
            >
              <Input placeholder="请输入邮箱" />
            </Form.Item>
            <Form.Item
              name="phone"
              label="手机号"
              rules={[{ required: true, message: '请输入手机号' }]}
            >
              <Input placeholder="请输入手机号" />
            </Form.Item>
            <Form.Item name="department" label="部门">
              <Input placeholder="请输入部门" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                保存修改
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: 'password',
      label: (
        <span>
          <LockOutlined />
          修改密码
        </span>
      ),
      children: (
        <Card>
          <Form
            form={passwordForm}
            layout="vertical"
            onFinish={handlePasswordSubmit}
            style={{ maxWidth: 500 }}
          >
            <Form.Item
              name="oldPassword"
              label="当前密码"
              rules={[{ required: true, message: '请输入当前密码' }]}
            >
              <Input.Password placeholder="请输入当前密码" />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label="新密码"
              rules={[
                { required: true, message: '请输入新密码' },
                { min: 6, message: '密码至少6位' },
              ]}
            >
              <Input.Password placeholder="请输入新密码" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="确认新密码"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: '请确认新密码' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次输入的密码不一致'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="请再次输入新密码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                修改密码
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: 'notification',
      label: (
        <span>
          <BellOutlined />
          通知设置
        </span>
      ),
      children: (
        <Card>
          <Form
            form={notificationForm}
            layout="vertical"
            initialValues={{
              emailNotification: true,
              smsNotification: true,
              alarmNotification: true,
              complaintNotification: true,
              reportNotification: false,
            }}
            onFinish={handleNotificationSubmit}
            style={{ maxWidth: 500 }}
          >
            <Divider orientation="left">通知方式</Divider>
            <Form.Item name="emailNotification" label="邮件通知" valuePropName="checked">
              <Switch checkedChildren="开启" unCheckedChildren="关闭" />
            </Form.Item>
            <Form.Item name="smsNotification" label="短信通知" valuePropName="checked">
              <Switch checkedChildren="开启" unCheckedChildren="关闭" />
            </Form.Item>
            <Divider orientation="left">通知类型</Divider>
            <Form.Item name="alarmNotification" label="告警通知" valuePropName="checked">
              <Switch checkedChildren="开启" unCheckedChildren="关闭" />
            </Form.Item>
            <Form.Item name="complaintNotification" label="投诉通知" valuePropName="checked">
              <Switch checkedChildren="开启" unCheckedChildren="关闭" />
            </Form.Item>
            <Form.Item name="reportNotification" label="报表通知" valuePropName="checked">
              <Switch checkedChildren="开启" unCheckedChildren="关闭" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                保存设置
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: 'users',
      label: (
        <span>
          <TeamOutlined />
          用户管理
        </span>
      ),
      children: (
        <Card
          title="用户列表"
          extra={<Button type="primary">新增用户</Button>}
        >
          <Table
            columns={userColumns}
            dataSource={users}
            rowKey="id"
            pagination={false}
          />
        </Card>
      ),
    },
    {
      key: 'system',
      label: (
        <span>
          <SettingOutlined />
          系统设置
        </span>
      ),
      children: (
        <Card>
          <Form layout="vertical" style={{ maxWidth: 500 }}>
            <Form.Item label="系统名称">
              <Input defaultValue="电动车公共充电设施监管平台" />
            </Form.Item>
            <Form.Item label="数据刷新间隔">
              <Select defaultValue="30">
                <Select.Option value="10">10秒</Select.Option>
                <Select.Option value="30">30秒</Select.Option>
                <Select.Option value="60">1分钟</Select.Option>
                <Select.Option value="300">5分钟</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="数据保留时间">
              <Select defaultValue="365">
                <Select.Option value="90">3个月</Select.Option>
                <Select.Option value="180">6个月</Select.Option>
                <Select.Option value="365">1年</Select.Option>
                <Select.Option value="730">2年</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="自动备份" valuePropName="checked">
              <Switch defaultChecked checkedChildren="开启" unCheckedChildren="关闭" />
            </Form.Item>
            <Form.Item>
              <Button type="primary">保存设置</Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: 'security',
      label: (
        <span>
          <SafetyOutlined />
          安全设置
        </span>
      ),
      children: (
        <Card>
          <Form layout="vertical" style={{ maxWidth: 500 }}>
            <Form.Item label="登录失败锁定次数">
              <Select defaultValue="5">
                <Select.Option value="3">3次</Select.Option>
                <Select.Option value="5">5次</Select.Option>
                <Select.Option value="10">10次</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="会话超时时间">
              <Select defaultValue="30">
                <Select.Option value="15">15分钟</Select.Option>
                <Select.Option value="30">30分钟</Select.Option>
                <Select.Option value="60">1小时</Select.Option>
                <Select.Option value="120">2小时</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="密码有效期">
              <Select defaultValue="90">
                <Select.Option value="30">30天</Select.Option>
                <Select.Option value="60">60天</Select.Option>
                <Select.Option value="90">90天</Select.Option>
                <Select.Option value="0">永不过期</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="强制双因素认证" valuePropName="checked">
              <Switch checkedChildren="开启" unCheckedChildren="关闭" />
            </Form.Item>
            <Form.Item label="IP白名单" valuePropName="checked">
              <Switch checkedChildren="开启" unCheckedChildren="关闭" />
            </Form.Item>
            <Form.Item>
              <Button type="primary">保存设置</Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
  ];

  return (
    <div>
      <div className="page-header">
        <h1>系统设置</h1>
        <p>管理个人信息、系统配置和安全设置</p>
      </div>

      <Card>
        <Tabs items={tabItems} tabPosition="left" />
      </Card>
    </div>
  );
};

export default Settings;
