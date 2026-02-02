<template>
  <div>
    <div class="page-header">
      <h1>运营商管理</h1>
      <p>管理充电设施运营企业的资质、备案信息及信用档案</p>
    </div>

    <a-card style="margin-bottom: 16px">
      <a-form :model="searchForm" @finish="handleSearch">
        <a-row :gutter="16">
          <a-col :span="6">
            <a-form-item name="name" label="企业名称">
              <a-input v-model:value="searchForm.name" placeholder="请输入企业名称" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item name="contact" label="联系人">
              <a-input v-model:value="searchForm.contact" placeholder="请输入联系人" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item>
              <a-space>
                <a-button type="primary" html-type="submit">
                  <template #icon><SearchOutlined /></template>
                  搜索
                </a-button>
                <a-button @click="handleReset">重置</a-button>
              </a-space>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>

    <a-card title="运营商列表">
      <template #extra>
        <a-button type="primary" @click="handleAdd">
          <template #icon><PlusOutlined /></template>
          新增运营商
        </a-button>
      </template>
      <a-table
        :columns="columns"
        :data-source="data"
        :row-key="(record) => record.id"
        :loading="loading"
        :pagination="{
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条记录`,
        }"
      />
    </a-card>

    <a-modal
      :title="modalType === 'add' ? '新增运营商' : '编辑运营商'"
      v-model:open="modalVisible"
      @ok="handleModalOk"
      @cancel="modalVisible = false"
      :width="600"
    >
      <a-form :model="modalForm" layout="vertical">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item name="name" label="企业名称" :rules="[{ required: true, message: '请输入企业名称' }]">
              <a-input v-model:value="modalForm.name" placeholder="请输入企业名称" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item name="contact" label="联系人" :rules="[{ required: true, message: '请输入联系人' }]">
              <a-input v-model:value="modalForm.contact" placeholder="请输入联系人" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item name="phone" label="联系电话" :rules="[{ required: true, message: '请输入联系电话' }]">
              <a-input v-model:value="modalForm.phone" placeholder="请输入联系电话" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>

    <a-modal
      title="运营商详情"
      v-model:open="detailVisible"
      :footer="null"
      :width="700"
    >
      <div v-if="currentRecord">
        <a-row :gutter="[16, 16]">
          <a-col :span="12">
            <p><strong>运营商编号：</strong>{{ currentRecord.id }}</p>
          </a-col>
          <a-col :span="12">
            <p><strong>企业名称：</strong>{{ currentRecord.name }}</p>
          </a-col>
          <a-col :span="12">
            <p><strong>联系人：</strong>{{ currentRecord.contact }}</p>
          </a-col>
          <a-col :span="12">
            <p><strong>联系电话：</strong>{{ currentRecord.phone }}</p>
          </a-col>
          <a-col :span="12">
            <p><strong>充电站数量：</strong>{{ currentRecord.stationCount }} 座</p>
          </a-col>
          <a-col :span="12">
            <p><strong>充电桩数量：</strong>{{ currentRecord.pileCount }} 台</p>
          </a-col>
          <a-col :span="12">
            <p><strong>信用评分：</strong>{{ currentRecord.creditScore }} 分</p>
          </a-col>
          <a-col :span="12">
            <p><strong>入驻时间：</strong>{{ currentRecord.createTime }}</p>
          </a-col>
        </a-row>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, h } from 'vue'
import { message } from 'ant-design-vue'
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons-vue'
import { operatorList } from '@/mock/data'

const searchForm = reactive({
  name: '',
  contact: '',
})

const modalForm = reactive({
  name: '',
  contact: '',
  phone: '',
})

const data = ref([...operatorList])
const loading = ref(false)
const modalVisible = ref(false)
const modalType = ref('add')
const currentRecord = ref(null)
const detailVisible = ref(false)

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
    customRender: ({ text }) => {
      let color = '#52c41a'
      if (text < 60) color = '#ff4d4f'
      else if (text < 80) color = '#faad14'
      return h('a-progress', {
        type: 'circle',
        percent: text,
        width: 40,
        strokeColor: color,
        format: (percent) => percent,
      })
    },
    sorter: (a, b) => a.creditScore - b.creditScore,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    customRender: ({ text }) => {
      const statusMap = {
        normal: { color: 'green', text: '正常' },
        warning: { color: 'orange', text: '预警' },
        disabled: { color: 'red', text: '停用' },
      }
      return h('a-tag', { color: statusMap[text].color }, statusMap[text].text)
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
    customRender: ({ record }) => {
      return h('a-space', [
        h('a-button', {
          type: 'link',
          size: 'small',
          onClick: () => handleView(record),
        }, [
          h(EyeOutlined),
          ' 详情'
        ]),
        h('a-button', {
          type: 'link',
          size: 'small',
          onClick: () => handleEdit(record),
        }, [
          h(EditOutlined),
          ' 编辑'
        ]),
        h('a-popconfirm', {
          title: '确定删除该运营商吗？',
          onConfirm: () => handleDelete(record.id),
          okText: '确定',
          cancelText: '取消',
        }, {
          default: () => h('a-button', {
            type: 'link',
            size: 'small',
            danger: true,
          }, [
            h(DeleteOutlined),
            ' 删除'
          ])
        }),
      ])
    },
  },
]

const handleSearch = () => {
  loading.value = true
  setTimeout(() => {
    const filtered = operatorList.filter((item) => {
      if (searchForm.name && !item.name.includes(searchForm.name)) return false
      if (searchForm.contact && !item.contact.includes(searchForm.contact)) return false
      return true
    })
    data.value = filtered
    loading.value = false
  }, 500)
}

const handleReset = () => {
  searchForm.name = ''
  searchForm.contact = ''
  data.value = [...operatorList]
}

const handleAdd = () => {
  modalType.value = 'add'
  currentRecord.value = null
  modalForm.name = ''
  modalForm.contact = ''
  modalForm.phone = ''
  modalVisible.value = true
}

const handleEdit = (record) => {
  modalType.value = 'edit'
  currentRecord.value = record
  modalForm.name = record.name
  modalForm.contact = record.contact
  modalForm.phone = record.phone
  modalVisible.value = true
}

const handleView = (record) => {
  currentRecord.value = record
  detailVisible.value = true
}

const handleDelete = (id) => {
  data.value = data.value.filter((item) => item.id !== id)
  message.success('删除成功')
}

const handleModalOk = () => {
  if (!modalForm.name || !modalForm.contact || !modalForm.phone) {
    message.error('请填写完整信息')
    return
  }
  if (modalType.value === 'add') {
    const newRecord = {
      ...modalForm,
      id: `OP${String(data.value.length + 1).padStart(3, '0')}`,
      stationCount: 0,
      pileCount: 0,
      creditScore: 80,
      status: 'normal',
      createTime: new Date().toISOString().split('T')[0],
    }
    data.value = [newRecord, ...data.value]
    message.success('添加成功')
  } else {
    data.value = data.value.map((item) =>
      item.id === currentRecord.value.id ? { ...item, ...modalForm } : item
    )
    message.success('编辑成功')
  }
  modalVisible.value = false
}
</script>

