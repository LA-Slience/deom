<template>
  <div>
    <div class="page-header">
      <h1>投诉受理</h1>
      <p>统一受理和管理用户投诉</p>
    </div>
    <a-card title="投诉列表">
      <a-table
        :columns="columns"
        :data-source="complaints"
        :row-key="(record) => record.id"
      />
    </a-card>
  </div>
</template>

<script setup>
import { complaints } from '@/mock/data'

const columns = [
  { title: '投诉ID', dataIndex: 'id', key: 'id' },
  { title: '来源', dataIndex: 'source', key: 'source' },
  { title: '类型', dataIndex: 'type', key: 'type' },
  { title: '站点名称', dataIndex: 'stationName', key: 'stationName' },
  { title: '运营商', dataIndex: 'operator', key: 'operator' },
  { title: '内容', dataIndex: 'content', key: 'content' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
]
</script>

