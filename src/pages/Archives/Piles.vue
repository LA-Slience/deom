<template>
  <div>
    <div class="page-header">
      <h1>充电桩管理</h1>
      <p>管理充电桩设备信息和实时状态</p>
    </div>
    <a-card title="充电桩列表">
      <a-table
        :columns="columns"
        :data-source="pileList"
        :row-key="(record) => record.id"
      />
    </a-card>
  </div>
</template>

<script setup>
import { pileList } from '@/mock/data'

const columns = [
  { title: '桩编号', dataIndex: 'id', key: 'id' },
  { title: '所属站点', dataIndex: 'stationName', key: 'stationName' },
  { title: '品牌', dataIndex: 'brand', key: 'brand' },
  { title: '型号', dataIndex: 'model', key: 'model' },
  { title: '功率(kW)', dataIndex: 'power', key: 'power' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '当前功率(kW)', dataIndex: 'currentPower', key: 'currentPower' },
  { title: '今日充电量(kWh)', dataIndex: 'todayChargeAmount', key: 'todayChargeAmount' },
]
</script>

