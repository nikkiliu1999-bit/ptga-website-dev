<template>
  <div class="info-section">
    <!-- 证书头部 -->
    <div class="cert-header">
      <div class="cert-id">Certificate ID：{{ certId }}</div>
      <div class="cert-date">Grading Date：{{ gradeDate }}</div>
    </div>
    
    <!-- 总分展示 -->
    <div class="total-score">
      <div class="score-label">Total Score</div>
      <!-- 只修改总分的class名称，方便单独调整样式 -->
      <div class="total-score-value">{{ totalScore }}</div>
      <div class="score-grade">{{ gradeLevel }}</div>
    </div>
    
    <!-- 详细评分 -->
    <div class="detail-scores">
      <div class="score-row">
        <div class="score-category">Color</div>
        <div class="score-bar-container">
          <div 
            class="score-bar" 
            :style="{ width: `${colorScore * 10}%` }"
          ></div>
        </div>
        <div class="detail-score-value">{{ colorScore }}</div>
      </div>
      
      <div class="score-row">
        <div class="score-category">Material</div>
        <div class="score-bar-container">
          <div 
            class="score-bar" 
            :style="{ width: `${materialScore * 10}%` }"
          ></div>
        </div>
        <div class="detail-score-value">{{ materialScore }}</div>
      </div>
      
      <div class="score-row">
        <div class="score-category">Proportion</div>
        <div class="score-bar-container">
          <div 
            class="score-bar" 
            :style="{ width: `${proportionScore * 10}%` }"
          ></div>
        </div>
        <div class="detail-score-value">{{ proportionScore }}</div>
      </div>
      
      <div class="score-row">
        <div class="score-category">Accessory</div>
        <div class="score-bar-container">
          <div 
            class="score-bar" 
            :style="{ width: `${accessoryScore * 10}%` }"
          ></div>
        </div>
        <div class="detail-score-value">{{ accessoryScore }}</div>
      </div>

      <!-- 新增Tag评分项 -->
      <div class="score-row">
        <div class="score-category">Tag</div>
        <div class="score-bar-container">
          <div 
            class="score-bar" 
            :style="{ width: `${tagScore * 10}%` }"
          ></div>
        </div>
        <div class="detail-score-value">{{ tagScore }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  certId: String,
  gradeDate: String,
  totalScore: Number,
  scores: Object // 包含五个分数
})

// 计算属性
const colorScore = computed(() => props.scores?.color_score || 0)
const materialScore = computed(() => props.scores?.material_score || 0)
const proportionScore = computed(() => props.scores?.proportion_score || 0)
const accessoryScore = computed(() => props.scores?.accessory_score || 0)
const tagScore = computed(() => props.scores?.tag_score || 0)

// 获取等级标签
const gradeLevel = computed(() => {
  const score = props.totalScore
  if (score >= 9.5) return 'GEM MINT'
  if (score >= 9.0) return 'MINT'
  if (score >= 8.5) return 'NEAR MINT'
  if (score >= 8.0) return 'EXCELLENT'
  return 'VERY GOOD'
})
</script>

<style scoped>
.info-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.cert-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  font-size: 0.9rem;
  font-family: 'Arial', sans-serif;
}

.cert-id, .cert-date {
  color: #7f8c8d;
}

.total-score {
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa, #eef2f7);
  border-radius: 10px;
  margin-bottom: 25px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
}

.score-label {
  font-size: 1.1rem;
  color: #7f8c8d;
  margin-bottom: 8px;
  font-family: 'Arial', sans-serif;
}

/* 单独设置总分的样式，不影响其他分数 */
.total-score-value {
  font-size: 4.5rem; /* 只增大总分字体 */
  font-weight: bold;
  color: #e74c3c;
  line-height: 1;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  font-family: 'Arial', sans-serif;
}

.score-grade {
  display: inline-block;
  background: linear-gradient(to right, #f1c40f, #e67e22); /* 恢复等级背景渐变 */
  color: white;
  padding: 6px 20px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  font-family: 'Arial', sans-serif;
}

.detail-scores {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #eee;
}

.score-row {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-family: 'Arial', sans-serif;
}

.score-category {
  width: 100px;
  font-weight: 600;
  color: #2c3e50;
  font-size: 1rem;
}

.score-bar-container {
  flex: 1;
  height: 20px;
  background: #e0e6ed;
  border-radius: 10px;
  overflow: hidden;
  margin: 0 15px;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
}

.score-bar {
  height: 100%;
  background: #3498db; /* 恢复分数条背景色 */
  border-radius: 10px;
  transition: width 0.8s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* 小分的样式保持原有大小 */
.detail-score-value {
  width: 50px;
  text-align: right;
  font-weight: bold;
  color: #2c3e50;
  font-size: 1rem; /* 小分字体保持不变 */
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .total-score-value {
    font-size: 4rem; /* 只调整总分响应式大小 */
  }
}

@media (max-width: 768px) {
  .info-section {
    padding: 15px;
  }
  
  .total-score {
    padding: 15px;
    margin-bottom: 20px;
  }
  
  .total-score-value {
    font-size: 3.5rem; /* 只调整总分响应式大小 */
  }
  
  .score-grade {
    font-size: 1.1rem;
  }
  
  .detail-scores {
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .cert-header {
    flex-direction: column;
    gap: 10px;
  }
  
  .total-score .total-score-value {
    font-size: 3rem; /* 只调整总分响应式大小 */
  }
  
  .score-grade {
    font-size: 1rem;
    padding: 5px 15px;
  }
  
  .score-category {
    width: 80px;
    font-size: 0.9rem;
  }
  
  .score-bar-container {
    margin: 0 10px;
  }
  
  .detail-scores .detail-score-value {
    font-size: 0.9rem;
    width: 40px;
  }
}
</style>