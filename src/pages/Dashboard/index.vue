<template>
  <div>
    <div class="page-header">
      <h1>领导驾驶舱</h1>
      <p>全市电动车公共充电设施运行态势总览</p>
    </div>

    <!-- 核心指标卡片 -->
    <a-row :gutter="[16, 16]">
      <a-col :xs="24" :sm="12" :lg="6">
        <a-card hoverable>
          <div style="display: flex; justify-content: space-between; align-items: flex-start">
            <div>
              <div style="color: rgba(0,0,0,0.45); font-size: 14px; margin-bottom: 8px">充电站总数</div>
              <div style="font-size: 28px; font-weight: 600; color: rgba(0,0,0,0.85)">
                {{ overviewStats.totalStations.toLocaleString() }}<span style="font-size: 14px; margin-left: 4px">座</span>
              </div>
              <div style="margin-top: 8px; font-size: 12px">
                <span style="color: #52c41a"><ArrowUpOutlined /> 2.5%</span>
                <span style="color: rgba(0,0,0,0.45); margin-left: 8px">较昨日</span>
              </div>
            </div>
            <div style="width: 56px; height: 56px; border-radius: 8px; background: #1890ff15; display: flex; align-items: center; justify-content: center">
              <BankOutlined :style="{ fontSize: 28, color: '#1890ff' }" />
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :lg="6">
        <a-card hoverable>
          <div style="display: flex; justify-content: space-between; align-items: flex-start">
            <div>
              <div style="color: rgba(0,0,0,0.45); font-size: 14px; margin-bottom: 8px">充电桩总数</div>
              <div style="font-size: 28px; font-weight: 600; color: rgba(0,0,0,0.85)">
                {{ overviewStats.totalPiles.toLocaleString() }}<span style="font-size: 14px; margin-left: 4px">台</span>
              </div>
              <div style="margin-top: 8px; font-size: 12px">
                <span style="color: #52c41a"><ArrowUpOutlined /> 3.2%</span>
                <span style="color: rgba(0,0,0,0.45); margin-left: 8px">较昨日</span>
              </div>
            </div>
            <div style="width: 56px; height: 56px; border-radius: 8px; background: #52c41a15; display: flex; align-items: center; justify-content: center">
              <ThunderboltOutlined :style="{ fontSize: 28, color: '#52c41a' }" />
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :lg="6">
        <a-card hoverable>
          <div style="display: flex; justify-content: space-between; align-items: flex-start">
            <div>
              <div style="color: rgba(0,0,0,0.45); font-size: 14px; margin-bottom: 8px">今日充电量</div>
              <div style="font-size: 28px; font-weight: 600; color: rgba(0,0,0,0.85)">
                {{ overviewStats.todayChargeAmount.toLocaleString() }}<span style="font-size: 14px; margin-left: 4px">kWh</span>
              </div>
              <div style="margin-top: 8px; font-size: 12px">
                <span style="color: #52c41a"><ArrowUpOutlined /> 5.8%</span>
                <span style="color: rgba(0,0,0,0.45); margin-left: 8px">较昨日</span>
              </div>
            </div>
            <div style="width: 56px; height: 56px; border-radius: 8px; background: #faad1415; display: flex; align-items: center; justify-content: center">
              <ThunderboltOutlined :style="{ fontSize: 28, color: '#faad14' }" />
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :lg="6">
        <a-card hoverable>
          <div style="display: flex; justify-content: space-between; align-items: flex-start">
            <div>
              <div style="color: rgba(0,0,0,0.45); font-size: 14px; margin-bottom: 8px">碳减排量</div>
              <div style="font-size: 28px; font-weight: 600; color: rgba(0,0,0,0.85)">
                {{ overviewStats.carbonReduction.toLocaleString() }}<span style="font-size: 14px; margin-left: 4px">吨</span>
              </div>
              <div style="margin-top: 8px; font-size: 12px">
                <span style="color: #52c41a"><ArrowUpOutlined /> 4.1%</span>
                <span style="color: rgba(0,0,0,0.45); margin-left: 8px">较昨日</span>
              </div>
            </div>
            <div style="width: 56px; height: 56px; border-radius: 8px; background: #722ed115; display: flex; align-items: center; justify-content: center">
              <CheckCircleOutlined :style="{ fontSize: 28, color: '#722ed1' }" />
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <!-- 第二行指标 -->
    <a-row :gutter="[16, 16]" style="margin-top: 16px">
      <a-col :xs="24" :sm="12" :lg="6">
        <a-card>
          <a-statistic
            title="设备在线率"
            :value="overviewStats.onlineRate"
            suffix="%"
            :value-style="{ color: '#52c41a' }"
          />
          <a-progress :percent="overviewStats.onlineRate" :show-info="false" stroke-color="#52c41a" />
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :lg="6">
        <a-card>
          <a-statistic
            title="今日充电次数"
            :value="overviewStats.todayChargeCount"
            suffix="次"
            :value-style="{ color: '#1890ff' }"
          />
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :lg="6">
        <a-card>
          <a-statistic
            title="运营商数量"
            :value="overviewStats.totalOperators"
            suffix="家"
          >
            <template #prefix>
              <TeamOutlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :lg="6">
        <a-card>
          <a-statistic
            title="待处理投诉"
            :value="overviewStats.complaintCount"
            suffix="件"
            :value-style="{ color: '#ff4d4f' }"
          >
            <template #prefix>
              <AlertOutlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>

    <!-- 图表区域 -->
    <a-row :gutter="[16, 16]" style="margin-top: 16px">
      <a-col :xs="24" :lg="16">
        <a-card title="充电量趋势">
          <template #extra><a href="#">查看详情</a></template>
          <div ref="chargeTrendChart" style="height: 300px"></div>
        </a-card>
      </a-col>
      <a-col :xs="24" :lg="8">
        <a-card title="运营商占比">
          <div ref="operatorPieChart" style="height: 300px"></div>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[16, 16]" style="margin-top: 16px">
      <a-col :xs="24" :lg="12">
        <a-card title="设备状态分布">
          <div ref="deviceStatusChart" style="height: 300px"></div>
        </a-card>
      </a-col>
      <a-col :xs="24" :lg="12">
        <a-card title="区域分布统计">
          <div ref="regionBarChart" style="height: 300px"></div>
        </a-card>
      </a-col>
    </a-row>

    <!-- 告警列表 -->
    <a-row :gutter="[16, 16]" style="margin-top: 16px">
      <a-col :span="24">
        <a-card>
          <template #title>
            <a-space>
              <WarningOutlined style="color: #ff4d4f" />
              实时告警
            </a-space>
          </template>
          <template #extra><a href="#">查看全部</a></template>
          <a-table
            :columns="alarmColumns"
            :data-source="faultAlarms"
            :row-key="(record) => record.id"
            :pagination="false"
            size="small"
          />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref, onMounted, h } from 'vue'
import * as echarts from 'echarts'
import {
  ThunderboltOutlined,
  BankOutlined,
  TeamOutlined,
  AlertOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CheckCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons-vue'
import {
  overviewStats,
  chargeTrendData,
  operatorShareData,
  deviceStatusData,
  regionDistribution,
  faultAlarms,
} from '@/mock/data'


const chargeTrendChart = ref(null)
const operatorPieChart = ref(null)
const deviceStatusChart = ref(null)
const regionBarChart = ref(null)

const alarmColumns = [
  {
    title: '告警时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 160,
  },
  {
    title: '站点名称',
    dataIndex: 'stationName',
    key: 'stationName',
  },
  {
    title: '故障类型',
    dataIndex: 'faultType',
    key: 'faultType',
  },
  {
    title: '级别',
    dataIndex: 'level',
    key: 'level',
    customRender: ({ text }) => {
      const levelMap = { serious: { color: 'red', text: '严重' }, normal: { color: 'orange', text: '一般' } }
      return h('a-tag', { color: levelMap[text]?.color || 'default' }, levelMap[text]?.text || text)
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    customRender: ({ text }) => {
      const statusMap = {
        pending: { color: 'red', text: '待处理' },
        processing: { color: 'blue', text: '处理中' },
        resolved: { color: 'green', text: '已解决' },
      }
      return h('a-tag', { color: statusMap[text].color }, statusMap[text].text)
    },
  },
]

onMounted(() => {
  // 充电量趋势图
  if (chargeTrendChart.value) {
    const chart = echarts.init(chargeTrendChart.value)
    chart.setOption({
      tooltip: {
        trigger: 'axis',
        formatter: '{b}<br/>充电量: {c} kWh',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: chargeTrendData.dates,
        axisLine: { lineStyle: { color: '#d9d9d9' } },
        axisLabel: { color: '#666' },
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#f0f0f0' } },
        axisLabel: { color: '#666', formatter: '{value}' },
      },
      series: [
        {
          data: chargeTrendData.values,
          type: 'line',
          smooth: true,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(24, 144, 255, 0.3)' },
                { offset: 1, color: 'rgba(24, 144, 255, 0.05)' },
              ],
            },
          },
          lineStyle: { color: '#1890ff', width: 2 },
          itemStyle: { color: '#1890ff' },
        },
      ],
    })
  }

  // 运营商占比饼图
  if (operatorPieChart.value) {
    const chart = echarts.init(operatorPieChart.value)
    chart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}%',
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
      },
      series: [
        {
          type: 'pie',
          radius: ['45%', '70%'],
          center: ['35%', '50%'],
          avoidLabelOverlap: false,
          label: { show: false },
          emphasis: {
            label: { show: true, fontSize: 14, fontWeight: 'bold' },
          },
          data: operatorShareData.map((item, index) => ({
            ...item,
            itemStyle: {
              color: ['#1890ff', '#52c41a', '#faad14', '#722ed1', '#eb2f96'][index],
            },
          })),
        },
      ],
    })
  }

  // 设备状态分布图
  if (deviceStatusChart.value) {
    const chart = echarts.init(deviceStatusChart.value)
    chart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}台',
      },
      legend: {
        bottom: 0,
      },
      series: [
        {
          type: 'pie',
          radius: '65%',
          center: ['50%', '45%'],
          data: deviceStatusData.map((item, index) => ({
            ...item,
            itemStyle: {
              color: ['#52c41a', '#1890ff', '#d9d9d9', '#ff4d4f'][index],
            },
          })),
          label: {
            formatter: '{b}\n{d}%',
          },
        },
      ],
    })
  }

  // 区域分布柱状图
  if (regionBarChart.value) {
    const chart = echarts.init(regionBarChart.value)
    chart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      legend: {
        data: ['充电站', '充电桩'],
        bottom: 0,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: regionDistribution.map((item) => item.region),
        axisLabel: { rotate: 30 },
      },
      yAxis: [
        {
          type: 'value',
          name: '充电站',
          position: 'left',
        },
        {
          type: 'value',
          name: '充电桩',
          position: 'right',
        },
      ],
      series: [
        {
          name: '充电站',
          type: 'bar',
          data: regionDistribution.map((item) => item.stations),
          itemStyle: { color: '#1890ff' },
        },
        {
          name: '充电桩',
          type: 'bar',
          yAxisIndex: 1,
          data: regionDistribution.map((item) => item.piles),
          itemStyle: { color: '#52c41a' },
        },
      ],
    })
  }
})
</script>

