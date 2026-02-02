<template>
  <div>
    <div class="page-header">
      <h1>信用评价</h1>
      <p>运营商信用评分和评价管理</p>
    </div>
    <a-card title="信用评分列表">
      <a-table
        :columns="columns"
        :data-source="creditScores"
        :row-key="(record) => record.id"
      />
    </a-card>
  </div>
</template>

<script setup>
import { creditScores } from '@/mock/data'

const columns = [
  { title: '运营商', dataIndex: 'operator', key: 'operator' },
  { title: '信用评分', dataIndex: 'score', key: 'score' },
  { title: '等级', dataIndex: 'level', key: 'level' },
  { title: '投诉率(%)', dataIndex: 'complaintRate', key: 'complaintRate' },
  { title: '修复率(%)', dataIndex: 'repairRate', key: 'repairRate' },
  { title: '合规率(%)', dataIndex: 'complianceRate', key: 'complianceRate' },
  { title: '趋势', dataIndex: 'trend', key: 'trend' },
]
</script>

