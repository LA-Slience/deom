<template>
  <div>
    <div class="page-header">
      <h1>消防安全监测</h1>
      <p>实时监测充电站消防安全状况</p>
    </div>
    <a-card title="安全监测列表">
      <a-table
        :columns="columns"
        :data-source="safetyMonitor"
        :row-key="(record) => record.id"
      />
    </a-card>
  </div>
</template>

<script setup>
import { safetyMonitor } from '@/mock/data'

const columns = [
  { title: '站点名称', dataIndex: 'stationName', key: 'stationName' },
  { title: '烟雾状态', dataIndex: 'smokeStatus', key: 'smokeStatus' },
  { title: '温度状态', dataIndex: 'tempStatus', key: 'tempStatus' },
  { title: '风险等级', dataIndex: 'riskLevel', key: 'riskLevel' },
  { title: '最后检查时间', dataIndex: 'lastCheckTime', key: 'lastCheckTime' },
]
</script>

