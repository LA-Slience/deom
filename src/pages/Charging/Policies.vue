<template>
  <div>
    <div class="page-header">
      <h1>价格政策管理</h1>
      <p>管理充电服务价格政策和收费标准</p>
    </div>
    <a-card title="价格政策列表">
      <a-table
        :columns="columns"
        :data-source="pricePolicies"
        :row-key="(record) => record.id"
      />
    </a-card>
  </div>
</template>

<script setup>
import { pricePolicies } from '@/mock/data'

const columns = [
  { title: '政策名称', dataIndex: 'name', key: 'name' },
  { title: '峰时电价(元/kWh)', dataIndex: 'peakPrice', key: 'peakPrice' },
  { title: '平时电价(元/kWh)', dataIndex: 'flatPrice', key: 'flatPrice' },
  { title: '谷时电价(元/kWh)', dataIndex: 'valleyPrice', key: 'valleyPrice' },
  { title: '服务费上限(元/kWh)', dataIndex: 'serviceFeeLimit', key: 'serviceFeeLimit' },
  { title: '生效日期', dataIndex: 'effectiveDate', key: 'effectiveDate' },
  { title: '状态', dataIndex: 'status', key: 'status' },
]
</script>

