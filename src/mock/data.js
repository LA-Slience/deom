// 模拟数据

// 统计概览数据
export const overviewStats = {
  totalStations: 1256,
  totalPiles: 8432,
  onlineRate: 96.8,
  todayChargeAmount: 125680,
  todayChargeCount: 4523,
  carbonReduction: 2345.6,
  totalOperators: 45,
  complaintCount: 23,
};

// 充电站列表
export const stationList = [
  {
    id: 'ST001',
    name: '市政府充电站',
    address: '市政府地下停车场B2层',
    operator: '国家电网',
    pileCount: 20,
    onlineCount: 18,
    status: 'normal',
    createTime: '2024-01-15',
  },
  {
    id: 'ST002',
    name: '万达广场充电站',
    address: '万达广场地下停车场',
    operator: '特来电',
    pileCount: 30,
    onlineCount: 28,
    status: 'normal',
    createTime: '2024-02-20',
  },
  {
    id: 'ST003',
    name: '火车站充电站',
    address: '火车站南广场停车场',
    operator: '星星充电',
    pileCount: 50,
    onlineCount: 45,
    status: 'warning',
    createTime: '2024-03-10',
  },
  {
    id: 'ST004',
    name: '科技园充电站',
    address: '高新区科技园A区',
    operator: '云快充',
    pileCount: 40,
    onlineCount: 38,
    status: 'normal',
    createTime: '2024-04-05',
  },
  {
    id: 'ST005',
    name: '体育中心充电站',
    address: '体育中心东门停车场',
    operator: '国家电网',
    pileCount: 25,
    onlineCount: 20,
    status: 'fault',
    createTime: '2024-05-12',
  },
];

// 充电桩列表
export const pileList = [
  {
    id: 'CP001',
    stationId: 'ST001',
    stationName: '市政府充电站',
    brand: '国电南瑞',
    model: 'NR-DC120',
    power: 120,
    status: 'online',
    currentPower: 0,
    todayChargeAmount: 156.8,
    createTime: '2024-01-15',
  },
  {
    id: 'CP002',
    stationId: 'ST001',
    stationName: '市政府充电站',
    brand: '国电南瑞',
    model: 'NR-DC120',
    power: 120,
    status: 'charging',
    currentPower: 98.5,
    todayChargeAmount: 234.2,
    createTime: '2024-01-15',
  },
  {
    id: 'CP003',
    stationId: 'ST002',
    stationName: '万达广场充电站',
    brand: '特来电',
    model: 'TLD-DC60',
    power: 60,
    status: 'offline',
    currentPower: 0,
    todayChargeAmount: 0,
    createTime: '2024-02-20',
  },
  {
    id: 'CP004',
    stationId: 'ST003',
    stationName: '火车站充电站',
    brand: '星星充电',
    model: 'XX-DC180',
    power: 180,
    status: 'fault',
    currentPower: 0,
    todayChargeAmount: 89.5,
    createTime: '2024-03-10',
  },
];

// 运营商列表
export const operatorList = [
  {
    id: 'OP001',
    name: '国家电网',
    contact: '张经理',
    phone: '13800138001',
    stationCount: 156,
    pileCount: 1234,
    creditScore: 95,
    status: 'normal',
    createTime: '2023-01-01',
  },
  {
    id: 'OP002',
    name: '特来电',
    contact: '李经理',
    phone: '13800138002',
    stationCount: 89,
    pileCount: 756,
    creditScore: 88,
    status: 'normal',
    createTime: '2023-03-15',
  },
  {
    id: 'OP003',
    name: '星星充电',
    contact: '王经理',
    phone: '13800138003',
    stationCount: 67,
    pileCount: 534,
    creditScore: 72,
    status: 'warning',
    createTime: '2023-05-20',
  },
  {
    id: 'OP004',
    name: '云快充',
    contact: '赵经理',
    phone: '13800138004',
    stationCount: 45,
    pileCount: 356,
    creditScore: 85,
    status: 'normal',
    createTime: '2023-07-10',
  },
];

// 价格政策
export const pricePolicies = [
  {
    id: 'PP001',
    name: '2024年度电价政策',
    peakPrice: 1.2,
    flatPrice: 0.8,
    valleyPrice: 0.4,
    serviceFeeLimit: 0.8,
    effectiveDate: '2024-01-01',
    status: 'active',
  },
  {
    id: 'PP002',
    name: '2023年度电价政策',
    peakPrice: 1.1,
    flatPrice: 0.75,
    valleyPrice: 0.35,
    serviceFeeLimit: 0.75,
    effectiveDate: '2023-01-01',
    status: 'expired',
  },
];

// 收费异常记录
export const chargeAnomalies = [
  {
    id: 'CA001',
    orderId: 'ORD20240115001',
    stationName: '万达广场充电站',
    operator: '特来电',
    anomalyType: '价格超标',
    standardPrice: 1.2,
    actualPrice: 1.5,
    amount: 45.6,
    status: 'pending',
    createTime: '2024-01-15 14:30:00',
  },
  {
    id: 'CA002',
    orderId: 'ORD20240116002',
    stationName: '火车站充电站',
    operator: '星星充电',
    anomalyType: '未明码标价',
    standardPrice: 0.8,
    actualPrice: 1.0,
    amount: 32.4,
    status: 'processing',
    createTime: '2024-01-16 09:15:00',
  },
  {
    id: 'CA003',
    orderId: 'ORD20240117003',
    stationName: '科技园充电站',
    operator: '云快充',
    anomalyType: '违规收取停车费',
    standardPrice: 0,
    actualPrice: 5,
    amount: 5,
    status: 'resolved',
    createTime: '2024-01-17 16:45:00',
  },
];

// 故障报警
export const faultAlarms = [
  {
    id: 'FA001',
    pileId: 'CP004',
    stationName: '火车站充电站',
    faultType: '过温保护',
    level: 'serious',
    description: '充电模块温度超过85℃',
    status: 'pending',
    createTime: '2024-01-20 10:30:00',
  },
  {
    id: 'FA002',
    pileId: 'CP003',
    stationName: '万达广场充电站',
    faultType: '通信中断',
    level: 'normal',
    description: '设备离线超过30分钟',
    status: 'processing',
    createTime: '2024-01-20 11:15:00',
  },
  {
    id: 'FA003',
    pileId: 'CP005',
    stationName: '体育中心充电站',
    faultType: '急停触发',
    level: 'serious',
    description: '用户触发急停按钮',
    status: 'resolved',
    createTime: '2024-01-19 15:20:00',
  },
];

// 运维工单
export const workOrders = [
  {
    id: 'WO001',
    faultId: 'FA001',
    stationName: '火车站充电站',
    pileId: 'CP004',
    type: '故障维修',
    assignee: '张师傅',
    operator: '星星充电',
    status: 'pending',
    createTime: '2024-01-20 10:35:00',
    deadline: '2024-01-21 10:35:00',
  },
  {
    id: 'WO002',
    faultId: 'FA002',
    stationName: '万达广场充电站',
    pileId: 'CP003',
    type: '故障维修',
    assignee: '李师傅',
    operator: '特来电',
    status: 'processing',
    createTime: '2024-01-20 11:20:00',
    deadline: '2024-01-21 11:20:00',
  },
  {
    id: 'WO003',
    faultId: null,
    stationName: '市政府充电站',
    pileId: null,
    type: '定期巡检',
    assignee: '王师傅',
    operator: '国家电网',
    status: 'completed',
    createTime: '2024-01-18 09:00:00',
    deadline: '2024-01-18 18:00:00',
  },
];

// 投诉记录
export const complaints = [
  {
    id: 'CM001',
    source: '12345热线',
    type: '收费问题',
    stationName: '万达广场充电站',
    operator: '特来电',
    content: '充电费用比标价高出20%',
    status: 'pending',
    createTime: '2024-01-20 09:30:00',
  },
  {
    id: 'CM002',
    source: 'APP投诉',
    type: '设备故障',
    stationName: '火车站充电站',
    operator: '星星充电',
    content: '充电桩无法启动充电',
    status: 'processing',
    createTime: '2024-01-19 14:20:00',
  },
  {
    id: 'CM003',
    source: '小程序',
    type: '燃油车占位',
    stationName: '科技园充电站',
    operator: '云快充',
    content: '多个充电车位被燃油车占用',
    status: 'resolved',
    createTime: '2024-01-18 16:45:00',
  },
];

// 企业信用评分
export const creditScores = [
  {
    id: 'CS001',
    operator: '国家电网',
    score: 95,
    level: 'A',
    complaintRate: 0.5,
    repairRate: 98,
    complianceRate: 100,
    trend: 'up',
  },
  {
    id: 'CS002',
    operator: '特来电',
    score: 88,
    level: 'B',
    complaintRate: 1.2,
    repairRate: 95,
    complianceRate: 96,
    trend: 'stable',
  },
  {
    id: 'CS003',
    operator: '星星充电',
    score: 72,
    level: 'C',
    complaintRate: 2.5,
    repairRate: 85,
    complianceRate: 88,
    trend: 'down',
  },
];

// 安全监测数据
export const safetyMonitor = [
  {
    id: 'SM001',
    stationName: '市政府充电站',
    smokeStatus: 'normal',
    tempStatus: 'normal',
    lastCheckTime: '2024-01-20 08:00:00',
    riskLevel: 'low',
  },
  {
    id: 'SM002',
    stationName: '万达广场充电站',
    smokeStatus: 'normal',
    tempStatus: 'warning',
    lastCheckTime: '2024-01-20 08:00:00',
    riskLevel: 'medium',
  },
  {
    id: 'SM003',
    stationName: '火车站充电站',
    smokeStatus: 'alarm',
    tempStatus: 'normal',
    lastCheckTime: '2024-01-20 08:00:00',
    riskLevel: 'high',
  },
];

// 图表数据 - 充电量趋势
export const chargeTrendData = {
  dates: ['01-14', '01-15', '01-16', '01-17', '01-18', '01-19', '01-20'],
  values: [98500, 102300, 115600, 108900, 125680, 118900, 125680],
};

// 图表数据 - 运营商占比
export const operatorShareData = [
  { name: '国家电网', value: 35 },
  { name: '特来电', value: 25 },
  { name: '星星充电', value: 20 },
  { name: '云快充', value: 12 },
  { name: '其他', value: 8 },
];

// 图表数据 - 设备状态分布
export const deviceStatusData = [
  { name: '在线空闲', value: 4523 },
  { name: '充电中', value: 2156 },
  { name: '离线', value: 856 },
  { name: '故障', value: 897 },
];

// 图表数据 - 区域分布
export const regionDistribution = [
  { region: '市中心', stations: 156, piles: 1234 },
  { region: '高新区', stations: 89, piles: 756 },
  { region: '经开区', stations: 67, piles: 534 },
  { region: '城东区', stations: 45, piles: 356 },
  { region: '城西区', stations: 38, piles: 298 },
  { region: '城南区', stations: 42, piles: 312 },
  { region: '城北区', stations: 35, piles: 267 },
];

// 地图标记点数据
export const mapMarkers = [
  { id: 'ST001', name: '市政府充电站', lng: 116.397428, lat: 39.90923, status: 'normal' },
  { id: 'ST002', name: '万达广场充电站', lng: 116.407526, lat: 39.904030, status: 'normal' },
  { id: 'ST003', name: '火车站充电站', lng: 116.427171, lat: 39.893469, status: 'warning' },
  { id: 'ST004', name: '科技园充电站', lng: 116.381337, lat: 39.916527, status: 'normal' },
  { id: 'ST005', name: '体育中心充电站', lng: 116.391305, lat: 39.907524, status: 'fault' },
];
