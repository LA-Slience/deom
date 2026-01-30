import { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Badge, Space } from 'antd';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  DashboardOutlined,
  BankOutlined,
  DollarOutlined,
  ToolOutlined,
  AlertOutlined,
  SafetyOutlined,
  SettingOutlined,
  UserOutlined,
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ThunderboltOutlined,
  TeamOutlined,
  FileTextOutlined,
  WarningOutlined,
  PhoneOutlined,
  AuditOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const menuItems = [
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: <Link to="/dashboard">领导驾驶舱</Link>,
  },
  {
    key: '/archives',
    icon: <BankOutlined />,
    label: '基础档案管理',
    children: [
      {
        key: '/archives/operators',
        icon: <TeamOutlined />,
        label: <Link to="/archives/operators">运营商管理</Link>,
      },
      {
        key: '/archives/stations',
        icon: <BankOutlined />,
        label: <Link to="/archives/stations">充电站管理</Link>,
      },
      {
        key: '/archives/piles',
        icon: <ThunderboltOutlined />,
        label: <Link to="/archives/piles">充电桩管理</Link>,
      },
    ],
  },
  {
    key: '/charging',
    icon: <DollarOutlined />,
    label: '收费监管',
    children: [
      {
        key: '/charging/policies',
        icon: <FileTextOutlined />,
        label: <Link to="/charging/policies">价格政策管理</Link>,
      },
      {
        key: '/charging/anomalies',
        icon: <WarningOutlined />,
        label: <Link to="/charging/anomalies">收费异常预警</Link>,
      },
      {
        key: '/charging/statistics',
        icon: <DollarOutlined />,
        label: <Link to="/charging/statistics">对账统计分析</Link>,
      },
    ],
  },
  {
    key: '/equipment',
    icon: <ToolOutlined />,
    label: '设备运维',
    children: [
      {
        key: '/equipment/monitor',
        icon: <DashboardOutlined />,
        label: <Link to="/equipment/monitor">实时状态监控</Link>,
      },
      {
        key: '/equipment/alarms',
        icon: <AlertOutlined />,
        label: <Link to="/equipment/alarms">故障报警中心</Link>,
      },
      {
        key: '/equipment/workorders',
        icon: <ToolOutlined />,
        label: <Link to="/equipment/workorders">运维工单管理</Link>,
      },
    ],
  },
  {
    key: '/complaints',
    icon: <PhoneOutlined />,
    label: '投诉执法',
    children: [
      {
        key: '/complaints/list',
        icon: <PhoneOutlined />,
        label: <Link to="/complaints/list">投诉受理</Link>,
      },
      {
        key: '/complaints/credit',
        icon: <AuditOutlined />,
        label: <Link to="/complaints/credit">信用评价</Link>,
      },
    ],
  },
  {
    key: '/safety',
    icon: <SafetyOutlined />,
    label: '安全监管',
    children: [
      {
        key: '/safety/monitor',
        icon: <SafetyOutlined />,
        label: <Link to="/safety/monitor">消防安全监测</Link>,
      },
      {
        key: '/safety/emergency',
        icon: <AlertOutlined />,
        label: <Link to="/safety/emergency">应急管理</Link>,
      },
    ],
  },
  {
    key: '/settings',
    icon: <SettingOutlined />,
    label: <Link to="/settings">系统设置</Link>,
  },
];

const userMenuItems = [
  { key: 'profile', label: '个人中心' },
  { key: 'settings', label: '账户设置' },
  { type: 'divider' },
  { key: 'logout', label: '退出登录' },
];

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const getSelectedKeys = () => {
    const path = location.pathname;
    return [path];
  };

  const getOpenKeys = () => {
    const path = location.pathname;
    const parts = path.split('/').filter(Boolean);
    if (parts.length > 1) {
      return ['/' + parts[0]];
    }
    return [];
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={256}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          background: '#001529',
        }}
      >
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <ThunderboltOutlined style={{ fontSize: 28, color: '#1890ff' }} />
          {!collapsed && (
            <span
              style={{
                color: '#fff',
                fontSize: 16,
                fontWeight: 600,
                marginLeft: 12,
                whiteSpace: 'nowrap',
              }}
            >
              充电设施监管平台
            </span>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={getSelectedKeys()}
          defaultOpenKeys={getOpenKeys()}
          items={menuItems}
          style={{ borderRight: 0 }}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 256, transition: 'all 0.2s' }}>
        <Header
          style={{
            padding: '0 24px',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 4px rgba(0,21,41,.08)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {collapsed ? (
              <MenuUnfoldOutlined
                style={{ fontSize: 18, cursor: 'pointer' }}
                onClick={() => setCollapsed(false)}
              />
            ) : (
              <MenuFoldOutlined
                style={{ fontSize: 18, cursor: 'pointer' }}
                onClick={() => setCollapsed(true)}
              />
            )}
          </div>
          <Space size={24}>
            <Badge count={5} size="small">
              <BellOutlined style={{ fontSize: 18, cursor: 'pointer' }} />
            </Badge>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Space style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} />
                <span>管理员</span>
              </Space>
            </Dropdown>
          </Space>
        </Header>
        <Content
          style={{
            margin: 24,
            minHeight: 'calc(100vh - 64px - 48px)',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
