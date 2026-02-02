<template>
  <div>
    <div class="page-header">
      <h1>充电站管理</h1>
      <p>管理全市充电站的基础信息和运行状态</p>
    </div>
    <a-card title="充电站列表">
      <a-table
        :columns="columns"
        :data-source="stationList"
        :row-key="(record) => record.id"
      />
    </a-card>
  </div>
</template>

<script setup>
import { stationList } from '@/mock/data'

const columns = [
  { title: '站点编号', dataIndex: 'id', key: 'id' },
  { title: '站点名称', dataIndex: 'name', key: 'name' },
  { title: '地址', dataIndex: 'address', key: 'address' },
  { title: '运营商', dataIndex: 'operator', key: 'operator' },
  { title: '充电桩数', dataIndex: 'pileCount', key: 'pileCount' },
  { title: '在线数', dataIndex: 'onlineCount', key: 'onlineCount' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
]
</script>

