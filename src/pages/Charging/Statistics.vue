<template>
  <div>
    <div class="page-header">
      <h1>对账统计分析</h1>
      <p>充电服务费用对账和统计分析</p>
    </div>
    <a-card title="统计数据">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-statistic title="总交易金额" :value="1256800" prefix="¥" />
        </a-col>
        <a-col :span="8">
          <a-statistic title="总交易次数" :value="4523" suffix="次" />
        </a-col>
        <a-col :span="8">
          <a-statistic title="平均单价" :value="2.78" prefix="¥" suffix="/kWh" />
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script setup>
</script>

