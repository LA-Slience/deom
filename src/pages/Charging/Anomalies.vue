<template>
  <div>
    <div class="page-header">
      <h1>收费异常预警</h1>
      <p>监控和预警充电服务收费异常情况</p>
    </div>
    <a-card title="异常记录列表">
      <a-table
        :columns="columns"
        :data-source="chargeAnomalies"
        :row-key="(record) => record.id"
      />
    </a-card>
  </div>
</template>

<script setup>
import { chargeAnomalies } from '@/mock/data'

const columns = [
  { title: '订单号', dataIndex: 'orderId', key: 'orderId' },
  { title: '站点名称', dataIndex: 'stationName', key: 'stationName' },
  { title: '运营商', dataIndex: 'operator', key: 'operator' },
  { title: '异常类型', dataIndex: 'anomalyType', key: 'anomalyType' },
  { title: '标准价格', dataIndex: 'standardPrice', key: 'standardPrice' },
  { title: '实际价格', dataIndex: 'actualPrice', key: 'actualPrice' },
  { title: '金额', dataIndex: 'amount', key: 'amount' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
]
</script>

