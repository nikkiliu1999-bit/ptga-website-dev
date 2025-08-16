<template>
  <div class="radar-section">
    <h3>Radar Chart</h3>
    <div class="radar-chart-container">
      <canvas ref="radarChart"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const props = defineProps({
  scores: Object // 包含四个分数：color_score, material_score, proportion_score, accessory_score
})

const radarChart = ref(null)
let chartInstance = null

// 初始化雷达图
const initRadarChart = () => {
  // 确保canvas元素已渲染
  if (!radarChart.value) {
    console.warn('canvas元素未准备好');
    return;
  }

  const ctx = radarChart.value.getContext('2d');
  
  // 销毁旧图表实例
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }

  // 确保数据存在
  if (!props.scores) {
    console.warn('评分数据未准备好');
    return;
  }

  // 创建新图表
  chartInstance = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Color', 'Material', 'Proportion', 'Accessory', 'Tag'],
      datasets: [{
        label: '维度评分',
        data: [
          props.scores.color_score,
          props.scores.material_score,
          props.scores.proportion_score,
          props.scores.accessory_score,
          props.scores.tag_score
        ],
        backgroundColor: 'rgba(52, 152, 219, 0.2)',
        borderColor: 'rgba(52, 152, 219, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(52, 152, 219, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(52, 152, 219, 1)',
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: { color: 'rgba(200, 200, 200, 0.3)' },
          grid: { color: 'rgba(200, 200, 200, 0.3)' },
          pointLabels: {
            font: {
              size: 14,
              weight: 'bold',
              family: "'Arial', sans-serif"
            },
            color: '#2c3e50'
          },
          ticks: {
            stepSize: 1,
            backdropColor: 'transparent',
            color: '#7f8c8d',
            showLabelBackdrop: false
          },
          min: 0,
          max: 10
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          displayColors: false,
          callbacks: {
            label: (context) => `${context.label}: ${context.raw}分`
          }
        }
      }
    }
  });
}

// 当传入的分数变化时，更新图表
watch(() => props.scores, (newScores) => {
  if (newScores) {
    nextTick(() => {
      initRadarChart();
    });
  }
}, { deep: true });

onMounted(() => {
  // 初始渲染图表
  nextTick(() => {
    initRadarChart();
  });
});

onUnmounted(() => {
  // 组件卸载时销毁图表
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>

<style scoped>
.radar-section {
  margin: 25px 0;
}

.radar-section h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #2c3e50;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.radar-chart-container {
  position: relative;
  height: 300px;
  width: 100%;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  border: 1px solid #eee;
}

/* 确保canvas正确填充容器 */
.radar-chart-container canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
}
</style>


<!-- RadarChartSection.vue -->
<style scoped>
.radar-section {
  margin: 15px 0;
}

.radar-section h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #2c3e50;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  font-size: 1.4rem;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.radar-chart-container {
  position: relative;
  height: 300px;
  width: 100%;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  border: 1px solid #eee;
}

/* 确保canvas正确填充容器 */
.radar-chart-container canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .radar-chart-container {
    height: 280px;
  }
}

@media (max-width: 768px) {
  .radar-section h3 {
    font-size: 1.3rem;
  }
  
  .radar-chart-container {
    height: 260px;
    padding: 12px;
  }
}

@media (max-width: 480px) {
  .radar-section h3 {
    font-size: 1.2rem;
  }
  
  .radar-chart-container {
    height: 240px;
    padding: 10px;
  }
}
</style>