import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/pages/Dashboard/index.vue'),
      },
      {
        path: 'archives',
        children: [
          {
            path: 'operators',
            name: 'Operators',
            component: () => import('@/pages/Archives/Operators.vue'),
          },
          {
            path: 'stations',
            name: 'Stations',
            component: () => import('@/pages/Archives/Stations.vue'),
          },
          {
            path: 'piles',
            name: 'Piles',
            component: () => import('@/pages/Archives/Piles.vue'),
          },
        ],
      },
      {
        path: 'charging',
        children: [
          {
            path: 'policies',
            name: 'Policies',
            component: () => import('@/pages/Charging/Policies.vue'),
          },
          {
            path: 'anomalies',
            name: 'Anomalies',
            component: () => import('@/pages/Charging/Anomalies.vue'),
          },
          {
            path: 'statistics',
            name: 'Statistics',
            component: () => import('@/pages/Charging/Statistics.vue'),
          },
        ],
      },
      {
        path: 'equipment',
        children: [
          {
            path: 'monitor',
            name: 'Monitor',
            component: () => import('@/pages/Equipment/Monitor.vue'),
          },
          {
            path: 'alarms',
            name: 'Alarms',
            component: () => import('@/pages/Equipment/Alarms.vue'),
          },
          {
            path: 'workorders',
            name: 'WorkOrders',
            component: () => import('@/pages/Equipment/WorkOrders.vue'),
          },
        ],
      },
      {
        path: 'complaints',
        children: [
          {
            path: 'list',
            name: 'ComplaintList',
            component: () => import('@/pages/Complaints/List.vue'),
          },
          {
            path: 'credit',
            name: 'Credit',
            component: () => import('@/pages/Complaints/Credit.vue'),
          },
        ],
      },
      {
        path: 'safety',
        children: [
          {
            path: 'monitor',
            name: 'SafetyMonitor',
            component: () => import('@/pages/Safety/Monitor.vue'),
          },
          {
            path: 'emergency',
            name: 'Emergency',
            component: () => import('@/pages/Safety/Emergency.vue'),
          },
        ],
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/pages/Settings/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

