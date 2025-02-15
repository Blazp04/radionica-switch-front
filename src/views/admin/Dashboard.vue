<script setup lang="ts">
import { ref } from 'vue'
import { Line } from 'vue-chartjs'
import type { ChartData, ChartOptions } from 'chart.js'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const pageViews: ChartData<'line'> = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'Page Views',
    data: [1200, 1900, 1500, 2100, 2400, 1800, 2000],
    borderColor: '#64748b',
    backgroundColor: '#64748b',
    tension: 0.4
  }]
}

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  color: '#9ca3af',
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(255, 255, 255, 0.05)'
      },
      ticks: {
        color: '#9ca3af'
      }
    },
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.05)'
      },
      ticks: {
        color: '#9ca3af'
      }
    }
  },
  plugins: {
    legend: {
      labels: {
        color: '#9ca3af',
        font: {
          family: 'system-ui'
        }
      }
    }
  }
}

const stats = ref([
  { label: 'Total Views', value: '12.5k', change: '+12%' },
  { label: 'Unique Visitors', value: '3.2k', change: '+8%' },
  { label: 'Avg. Time', value: '4:32', change: '+15%' },
  { label: 'Bounce Rate', value: '28%', change: '-5%' }
])
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-8">Dashboard</h1>
    
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div v-for="stat in stats" 
           :key="stat.label"
           class="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
        <h3 class="text-gray-400 text-sm mb-2">{{ stat.label }}</h3>
        <div class="flex items-end justify-between">
          <span class="text-2xl font-bold">{{ stat.value }}</span>
          <span :class="[
            'text-sm px-2 py-1 rounded',
            stat.change.startsWith('+') ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'
          ]">
            {{ stat.change }}
          </span>
        </div>
      </div>
    </div>

    <!-- Chart -->
    <div class="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
      <h2 class="text-lg font-medium mb-4">Weekly Traffic</h2>
      <div class="h-80">
        <Line :data="pageViews" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>