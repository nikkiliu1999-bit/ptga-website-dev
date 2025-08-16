<template>
  <div class="grading-services">
    <div class="grading-header">
      <h1>PTGA 专业评级服务</h1>
      <p>全球领先的藏品评级标准，为您的珍贵藏品提供专业认证和保护</p>
    </div>
    
    <div class="grading-tabs">
      <router-link 
        :to="{ name: 'GradingProcess' }" 
        :class="{ active: $route.name === 'GradingProcess' }"
      >
        <i class="fas fa-list-ol"></i> 评级流程
      </router-link>
      <router-link 
        :to="{ name: 'GradingScale' }" 
        :class="{ active: $route.name === 'GradingScale' }"
      >
        <i class="fas fa-star"></i> 评级标准
      </router-link>
      
      <router-link 
        :to="{ name: 'GradingPricing' }" 
        :class="{ active: $route.name === 'GradingPricing' }"
      >
        <i class="fas fa-tag"></i> 服务价格
      </router-link>
    </div>
    
    <div class="grading-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GradingServices',
}
</script>

<style scoped>
/* 原有样式保持不变，只需添加新标签的样式 */
.grading-tabs a {
  display: flex;
  align-items: center;
  padding: 15px 30px;
  margin: 0 10px;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 1.1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.grading-tabs a i {
  margin-right: 10px;
  font-size: 1.2rem;
}

.grading-tabs a:hover {
  background: #f0f5ff;
  color: #1a56db;
}

.grading-tabs a.active {
  background: #1a56db;
  color: white;
  box-shadow: 0 4px 12px rgba(26, 86, 219, 0.3);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .grading-tabs {
    flex-direction: column;
    align-items: center;
  }
  
  .grading-tabs a {
    width: 100%;
    max-width: 300px;
    margin: 5px 0;
    justify-content: center;
  }
}
</style>