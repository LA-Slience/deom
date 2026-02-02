<template>
  <div>
    <div class="page-header">
      <h1>实时状态监控</h1>
      <p>实时监控充电设备运行状态</p>
    </div>
    <a-card title="设备监控">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-statistic title="在线设备" :value="6679" suffix="台" :value-style="{ color: '#52c41a' }" />
        </a-col>
        <a-col :span="8">
          <a-statistic title="充电中" :value="2156" suffix="台" :value-style="{ color: '#1890ff' }" />
        </a-col>
        <a-col :span="8">
          <a-statistic title="故障设备" :value="897" suffix="台" :value-style="{ color: '#ff4d4f' }" />
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script setup>
</script>

