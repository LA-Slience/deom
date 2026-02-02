<template>
  <div>
    <div class="page-header">
      <h1>系统设置</h1>
      <p>管理个人信息、系统配置和安全设置</p>
    </div>
    <a-card>
      <a-tabs :items="tabItems" tab-position="left" />
    </a-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  UserOutlined,
  LockOutlined,
  BellOutlined,
  SettingOutlined,
  SafetyOutlined,
  TeamOutlined,
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const profileForm = ref({
  username: 'admin',
  name: '系统管理员',
  email: 'admin@example.com',
  phone: '13800138000',
  department: '信息中心',
})

const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const notificationForm = ref({
  emailNotification: true,
  smsNotification: true,
  alarmNotification: true,
  complaintNotification: true,
  reportNotification: false,
})

const users = ref([
  { id: 1, username: 'admin', name: '系统管理员', role: 'admin', status: 'active', lastLogin: '2024-01-20 10:30:00' },
  { id: 2, username: 'operator1', name: '运营人员1', role: 'operator', status: 'active', lastLogin: '2024-01-19 15:20:00' },
  { id: 3, username: 'viewer1', name: '查看人员1', role: 'viewer', status: 'inactive', lastLogin: '2024-01-18 09:00:00' },
])

const roleMap = {
  admin: { color: 'red', text: '管理员' },
  operator: { color: 'blue', text: '运营人员' },
  viewer: { color: 'green', text: '查看人员' },
}

const userColumns = [
  { title: '用户名', dataIndex: 'username', key: 'username' },
  { title: '姓名', dataIndex: 'name', key: 'name' },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
    customRender: ({ text }) => {
      return h('a-tag', { color: roleMap[text].color }, roleMap[text].text)
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    customRender: ({ text }) => {
      return h('a-tag', { color: text === 'active' ? 'green' : 'default' }, text === 'active' ? '启用' : '禁用')
    },
  },
  { title: '最后登录', dataIndex: 'lastLogin', key: 'lastLogin' },
  {
    title: '操作',
    key: 'action',
    customRender: () => {
      return h('a-space', [
        h('a-button', { type: 'link', size: 'small' }, '编辑'),
        h('a-button', { type: 'link', size: 'small', danger: true }, '删除'),
      ])
    },
  },
]

const handleProfileSubmit = () => {
  message.success('个人信息已更新')
}

const handlePasswordSubmit = () => {
  message.success('密码已修改')
  passwordForm.value = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  }
}

const handleNotificationSubmit = () => {
  message.success('通知设置已保存')
}

const tabItems = [
  {
    key: 'profile',
    label: h('span', [h(UserOutlined), ' 个人信息']),
    children: h('a-card', [
      h('a-form', { model: profileForm, layout: 'vertical', style: { maxWidth: '500px' }, onFinish: handleProfileSubmit }, [
        h('a-form-item', { name: 'username', label: '用户名' }, [
          h('a-input', { value: profileForm.value.username, disabled: true }),
        ]),
        h('a-form-item', { name: 'name', label: '姓名', rules: [{ required: true, message: '请输入姓名' }] }, [
          h('a-input', { value: profileForm.value.name, 'onUpdate:value': (val) => (profileForm.value.name = val), placeholder: '请输入姓名' }),
        ]),
        h('a-form-item', { name: 'email', label: '邮箱', rules: [{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入有效的邮箱地址' }] }, [
          h('a-input', { value: profileForm.value.email, 'onUpdate:value': (val) => (profileForm.value.email = val), placeholder: '请输入邮箱' }),
        ]),
        h('a-form-item', { name: 'phone', label: '手机号', rules: [{ required: true, message: '请输入手机号' }] }, [
          h('a-input', { value: profileForm.value.phone, 'onUpdate:value': (val) => (profileForm.value.phone = val), placeholder: '请输入手机号' }),
        ]),
        h('a-form-item', { name: 'department', label: '部门' }, [
          h('a-input', { value: profileForm.value.department, 'onUpdate:value': (val) => (profileForm.value.department = val), placeholder: '请输入部门' }),
        ]),
        h('a-form-item', [
          h('a-button', { type: 'primary', htmlType: 'submit' }, '保存修改'),
        ]),
      ]),
    ]),
  },
  {
    key: 'password',
    label: h('span', [h(LockOutlined), ' 修改密码']),
    children: h('a-card', [
      h('a-form', { model: passwordForm, layout: 'vertical', style: { maxWidth: '500px' }, onFinish: handlePasswordSubmit }, [
        h('a-form-item', { name: 'oldPassword', label: '当前密码', rules: [{ required: true, message: '请输入当前密码' }] }, [
          h('a-input-password', { value: passwordForm.value.oldPassword, 'onUpdate:value': (val) => (passwordForm.value.oldPassword = val), placeholder: '请输入当前密码' }),
        ]),
        h('a-form-item', { name: 'newPassword', label: '新密码', rules: [{ required: true, message: '请输入新密码' }, { min: 6, message: '密码至少6位' }] }, [
          h('a-input-password', { value: passwordForm.value.newPassword, 'onUpdate:value': (val) => (passwordForm.value.newPassword = val), placeholder: '请输入新密码' }),
        ]),
        h('a-form-item', { name: 'confirmPassword', label: '确认新密码', rules: [{ required: true, message: '请确认新密码' }] }, [
          h('a-input-password', { value: passwordForm.value.confirmPassword, 'onUpdate:value': (val) => (passwordForm.value.confirmPassword = val), placeholder: '请再次输入新密码' }),
        ]),
        h('a-form-item', [
          h('a-button', { type: 'primary', htmlType: 'submit' }, '修改密码'),
        ]),
      ]),
    ]),
  },
  {
    key: 'notification',
    label: h('span', [h(BellOutlined), ' 通知设置']),
    children: h('a-card', [
      h('a-form', { model: notificationForm, layout: 'vertical', style: { maxWidth: '500px' }, onFinish: handleNotificationSubmit }, [
        h('a-divider', { orientation: 'left' }, '通知方式'),
        h('a-form-item', { name: 'emailNotification', label: '邮件通知', valuePropName: 'checked' }, [
          h('a-switch', { checked: notificationForm.value.emailNotification, 'onUpdate:checked': (val) => (notificationForm.value.emailNotification = val), checkedChildren: '开启', unCheckedChildren: '关闭' }),
        ]),
        h('a-form-item', { name: 'smsNotification', label: '短信通知', valuePropName: 'checked' }, [
          h('a-switch', { checked: notificationForm.value.smsNotification, 'onUpdate:checked': (val) => (notificationForm.value.smsNotification = val), checkedChildren: '开启', unCheckedChildren: '关闭' }),
        ]),
        h('a-divider', { orientation: 'left' }, '通知类型'),
        h('a-form-item', { name: 'alarmNotification', label: '告警通知', valuePropName: 'checked' }, [
          h('a-switch', { checked: notificationForm.value.alarmNotification, 'onUpdate:checked': (val) => (notificationForm.value.alarmNotification = val), checkedChildren: '开启', unCheckedChildren: '关闭' }),
        ]),
        h('a-form-item', { name: 'complaintNotification', label: '投诉通知', valuePropName: 'checked' }, [
          h('a-switch', { checked: notificationForm.value.complaintNotification, 'onUpdate:checked': (val) => (notificationForm.value.complaintNotification = val), checkedChildren: '开启', unCheckedChildren: '关闭' }),
        ]),
        h('a-form-item', { name: 'reportNotification', label: '报表通知', valuePropName: 'checked' }, [
          h('a-switch', { checked: notificationForm.value.reportNotification, 'onUpdate:checked': (val) => (notificationForm.value.reportNotification = val), checkedChildren: '开启', unCheckedChildren: '关闭' }),
        ]),
        h('a-form-item', [
          h('a-button', { type: 'primary', htmlType: 'submit' }, '保存设置'),
        ]),
      ]),
    ]),
  },
  {
    key: 'users',
    label: h('span', [h(TeamOutlined), ' 用户管理']),
    children: h('a-card', {
      title: '用户列表',
      extra: h('a-button', { type: 'primary' }, '新增用户'),
    }, [
      h('a-table', {
        columns: userColumns,
        dataSource: users.value,
        rowKey: 'id',
        pagination: false,
      }),
    ]),
  },
  {
    key: 'system',
    label: h('span', [h(SettingOutlined), ' 系统设置']),
    children: h('a-card', [
      h('a-form', { layout: 'vertical', style: { maxWidth: '500px' } }, [
        h('a-form-item', { label: '系统名称' }, [
          h('a-input', { defaultValue: '电动车公共充电设施监管平台' }),
        ]),
        h('a-form-item', { label: '数据刷新间隔' }, [
          h('a-select', { defaultValue: '30' }, [
            h('a-select-option', { value: '10' }, '10秒'),
            h('a-select-option', { value: '30' }, '30秒'),
            h('a-select-option', { value: '60' }, '1分钟'),
            h('a-select-option', { value: '300' }, '5分钟'),
          ]),
        ]),
        h('a-form-item', [
          h('a-button', { type: 'primary' }, '保存设置'),
        ]),
      ]),
    ]),
  },
  {
    key: 'security',
    label: h('span', [h(SafetyOutlined), ' 安全设置']),
    children: h('a-card', [
      h('a-form', { layout: 'vertical', style: { maxWidth: '500px' } }, [
        h('a-form-item', { label: '登录失败锁定次数' }, [
          h('a-select', { defaultValue: '5' }, [
            h('a-select-option', { value: '3' }, '3次'),
            h('a-select-option', { value: '5' }, '5次'),
            h('a-select-option', { value: '10' }, '10次'),
          ]),
        ]),
        h('a-form-item', [
          h('a-button', { type: 'primary' }, '保存设置'),
        ]),
      ]),
    ]),
  },
]
</script>

<script>
import { h } from 'vue'
</script>

