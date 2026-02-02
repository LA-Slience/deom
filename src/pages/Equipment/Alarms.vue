<template>
  <div>
    <div class="page-header">
      <h1>故障报警中心</h1>
      <p>设备故障报警和处理跟踪</p>
    </div>
    <a-card title="故障报警列表">
      <a-table
        :columns="columns"
        :data-source="faultAlarms"
        :row-key="(record) => record.id"
      />
    </a-card>
  </div>
</template>

<script setup>
import { faultAlarms } from '@/mock/data'

const columns = [
  { title: '报警ID', dataIndex: 'id', key: 'id' },
  { title: '桩编号', dataIndex: 'pileId', key: 'pileId' },
  { title: '站点名称', dataIndex: 'stationName', key: 'stationName' },
  { title: '故障类型', dataIndex: 'faultType', key: 'faultType' },
  { title: '级别', dataIndex: 'level', key: 'level' },
  { title: '描述', dataIndex: 'description', key: 'description' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
]
</script>

