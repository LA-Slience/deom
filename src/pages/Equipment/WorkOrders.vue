<template>
  <div>
    <div class="page-header">
      <h1>运维工单管理</h1>
      <p>设备运维工单的创建、分配和跟踪</p>
    </div>
    <a-card title="工单列表">
      <a-table
        :columns="columns"
        :data-source="workOrders"
        :row-key="(record) => record.id"
      />
    </a-card>
  </div>
</template>

<script setup>
import { workOrders } from '@/mock/data'

const columns = [
  { title: '工单ID', dataIndex: 'id', key: 'id' },
  { title: '站点名称', dataIndex: 'stationName', key: 'stationName' },
  { title: '桩编号', dataIndex: 'pileId', key: 'pileId' },
  { title: '工单类型', dataIndex: 'type', key: 'type' },
  { title: '负责人', dataIndex: 'assignee', key: 'assignee' },
  { title: '运营商', dataIndex: 'operator', key: 'operator' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
  { title: '截止时间', dataIndex: 'deadline', key: 'deadline' },
]
</script>

