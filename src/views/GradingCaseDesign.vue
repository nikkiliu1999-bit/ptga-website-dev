<!-- src/views/GradingCaseDesign.vue -->
<template>
  <div class="grading-case-design">
    <div class="container">
      <h1>评级盒与标设计</h1>
      <p>精心设计的保护盒与标签，完美展示您的珍贵藏品</p>
      
      <div class="design-features">
        <div class="feature">
          <div class="feature-icon">🔒</div>
          <h2>全方位保护</h2>
          <p>高透光亚克力材质，有效防止紫外线伤害</p>
        </div>
        
        <div class="feature">
          <div class="feature-icon">🧩</div>
          <h2>模块化设计</h2>
          <p>可堆叠设计，便于展示您的收藏系列</p>
        </div>
        
        <div class="feature">
          <div class="feature-icon">🔄</div>
          <h2>可开合结构</h2>
          <p>半封闭设计，保留藏品可玩性</p>
        </div>
        
        <div class="feature">
          <div class="feature-icon">🏷️</div>
          <h2>防伪标签</h2>
          <p>内置NFC芯片，确保评级真实性</p>
        </div>
      </div>
      
      <div class="case-gallery">
        <div class="gallery-item">
          <div class="image-placeholder">标准尺寸评级盒</div>
        </div>
        <div class="gallery-item">
          <div class="image-placeholder">大型藏品评级盒</div>
        </div>
        <div class="gallery-item">
          <div class="image-placeholder">堆叠展示效果</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.case-design {
  padding: 100px 0;
  background: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  font-size: 2.8rem;
  text-align: center;
  margin-bottom: 15px;
  color: #2c3e50;
}

p {
  text-align: center;
  color: #7f8c8d;
  max-width: 700px;
  margin: 0 auto 60px;
  font-size: 1.2rem;
}

.design-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.feature {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 40px 30px;
  text-align: center;
  transition: all 0.3s ease;
}

.feature:hover {
  transform: translateY(-10px);
  background: white;
  box-shadow: 0 15px 40px rgba(0,0,0,0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.feature h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #2c3e50;
}

.feature p {
  margin: 0;
  font-size: 1rem;
  color: #7f8c8d;
}

.case-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.gallery-item {
  background: #f0f7ff;
  border-radius: 15px;
  padding: 100px 20px;
  text-align: center;
  color: #7f8c8d;
  font-weight: 500;
}

@media (max-width: 768px) {
  .case-design {
    padding: 80px 0;
  }
  
  h1 {
    font-size: 2.3rem;
  }
  
  p {
    font-size: 1.1rem;
  }
}
</style>