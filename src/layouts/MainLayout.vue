<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider
      :trigger="null"
      collapsible
      v-model:collapsed="collapsed"
      :width="256"
      :collapsed-width="80"
      :style="{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        background: '#001529',
        zIndex: 1000,
      }"
    >
      <div
        :style="{
          height: '64px',
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center',
          'border-bottom': '1px solid rgba(255,255,255,0.1)',
        }"
      >
        <ThunderboltOutlined :style="{ fontSize: 28, color: '#1890ff' }" />
        <span
          v-if="!collapsed"
          :style="{
            color: '#fff',
            fontSize: 16,
            fontWeight: 600,
            marginLeft: 12,
            whiteSpace: 'nowrap',
          }"
        >
          充电设施监管平台
        </span>
      </div>
      <a-menu
        theme="dark"
        mode="inline"
        :selectedKeys="selectedKeys"
        :defaultOpenKeys="openKeys"
        :items="menuItems"
        :style="{ borderRight: 0 }"
        @click="handleMenuClick"
      />
    </a-layout-sider>
    <a-layout :style="{ marginLeft: collapsed ? '80px' : '256px', transition: 'all 0.2s', minHeight: '100vh' }">
      <a-layout-header
        :style="{
          padding: '0 24px',
          background: '#fff',
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'space-between',
          'box-shadow': '0 1px 4px rgba(0,21,41,.08)',
          position: 'sticky',
          top: 0,
          'z-index': 999,
        }"
      >
        <div style="display: flex; align-items: center">
          <MenuUnfoldOutlined
            v-if="collapsed"
            :style="{ fontSize: 18, cursor: 'pointer' }"
            @click="collapsed = false"
          />
          <MenuFoldOutlined
            v-else
            :style="{ fontSize: 18, cursor: 'pointer' }"
            @click="collapsed = true"
          />
        </div>
        <a-space :size="24">
          <a-badge :count="5" :size="'small'">
            <BellOutlined :style="{ fontSize: 18, cursor: 'pointer' }" />
          </a-badge>
          <a-dropdown :menu="{ items: userMenuItems }" placement="bottomRight">
            <a-space style="cursor: pointer">
              <a-avatar>
                <template #icon><UserOutlined /></template>
              </a-avatar>
              <span>管理员</span>
            </a-space>
          </a-dropdown>
        </a-space>
      </a-layout-header>
      <a-layout-content
        :style="{
          padding: '24px',
          minHeight: 'calc(100vh - 64px - 48px)',
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref, computed, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
} from '@ant-design/icons-vue'

const route = useRoute()
const router = useRouter()
const collapsed = ref(false)

// 创建菜单项，使用 h() 函数渲染图标
const menuItems = [
  {
    key: '/dashboard',
    icon: () => h(DashboardOutlined),
    label: '领导驾驶舱',
  },
  {
    key: '/archives',
    icon: () => h(BankOutlined),
    label: '基础档案管理',
    children: [
      {
        key: '/archives/operators',
        icon: () => h(TeamOutlined),
        label: '运营商管理',
      },
      {
        key: '/archives/stations',
        icon: () => h(BankOutlined),
        label: '充电站管理',
      },
      {
        key: '/archives/piles',
        icon: () => h(ThunderboltOutlined),
        label: '充电桩管理',
      },
    ],
  },
  {
    key: '/charging',
    icon: () => h(DollarOutlined),
    label: '收费监管',
    children: [
      {
        key: '/charging/policies',
        icon: () => h(FileTextOutlined),
        label: '价格政策管理',
      },
      {
        key: '/charging/anomalies',
        icon: () => h(WarningOutlined),
        label: '收费异常预警',
      },
      {
        key: '/charging/statistics',
        icon: () => h(DollarOutlined),
        label: '对账统计分析',
      },
    ],
  },
  {
    key: '/equipment',
    icon: () => h(ToolOutlined),
    label: '设备运维',
    children: [
      {
        key: '/equipment/monitor',
        icon: () => h(DashboardOutlined),
        label: '实时状态监控',
      },
      {
        key: '/equipment/alarms',
        icon: () => h(AlertOutlined),
        label: '故障报警中心',
      },
      {
        key: '/equipment/workorders',
        icon: () => h(ToolOutlined),
        label: '运维工单管理',
      },
    ],
  },
  {
    key: '/complaints',
    icon: () => h(PhoneOutlined),
    label: '投诉执法',
    children: [
      {
        key: '/complaints/list',
        icon: () => h(PhoneOutlined),
        label: '投诉受理',
      },
      {
        key: '/complaints/credit',
        icon: () => h(AuditOutlined),
        label: '信用评价',
      },
    ],
  },
  {
    key: '/safety',
    icon: () => h(SafetyOutlined),
    label: '安全监管',
    children: [
      {
        key: '/safety/monitor',
        icon: () => h(SafetyOutlined),
        label: '消防安全监测',
      },
      {
        key: '/safety/emergency',
        icon: () => h(AlertOutlined),
        label: '应急管理',
      },
    ],
  },
  {
    key: '/settings',
    icon: () => h(SettingOutlined),
    label: '系统设置',
  },
]

const userMenuItems = [
  { key: 'profile', label: '个人中心' },
  { key: 'settings', label: '账户设置' },
  { type: 'divider' },
  { key: 'logout', label: '退出登录' },
]

const selectedKeys = computed(() => {
  return [route.path]
})

const openKeys = computed(() => {
  const path = route.path
  const parts = path.split('/').filter(Boolean)
  if (parts.length > 1) {
    return ['/' + parts[0]]
  }
  return []
})

const handleMenuClick = ({ key }) => {
  router.push(key)
}
</script>

