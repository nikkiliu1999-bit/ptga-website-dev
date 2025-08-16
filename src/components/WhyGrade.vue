<template>
  <!-- 为什么要评级 -->
  <section class="why-grade">
    <div class="container">
      <div class="section-title">
        <h2>为什么要进行潮玩评级？</h2>
        <p>专业的评级服务为您的收藏品带来全方位的保障与增值</p>
      </div>
      
      <div class="benefits-grid">
        <div class="benefit-card">
          <div class="benefit-icon"><i class="fas fa-shield-alt"></i></div>
          <h3>提供全面保护</h3>
          <p>专业封装保护您的藏品免受环境损害，延长收藏寿命</p>
        </div>
        
        <div class="benefit-card">
          <div class="benefit-icon"><i class="fas fa-star"></i></div>
          <h3>产生差异优势</h3>
          <p>专业认证使您的藏品在众多同类中脱颖而出</p>
        </div>
        
        <div class="benefit-card">
          <div class="benefit-icon"><i class="fas fa-chart-line"></i></div>
          <h3>实现价值增长</h3>
          <p>认证评级可显著提升藏品市场价值与交易潜力</p>
        </div>
        
        <div class="benefit-card">
          <div class="benefit-icon"><i class="fas fa-balance-scale"></i></div>
          <h3>减少主观争端</h3>
          <p>标准化评级体系提供客观依据，减少交易争议</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'WhyGrade'
}
</script>

<style scoped>
.why-grade {
  background: white;
  padding: 80px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  text-align: center;
  margin-bottom: 60px;
  position: relative;
}

.section-title h2 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 15px;
}

.section-title p {
  color: #7f8c8d;
  max-width: 600px;
  margin: 0 auto;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: #3498db;
  border-radius: 2px;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.benefit-card {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 40px 25px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 6px 15px rgba(0,0,0,0.1);
}

.benefit-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 25px rgba(0,0,0,0.15);
}

.benefit-icon {
  font-size: 3rem;
  color: #3498db;
  margin-bottom: 20px;
}

.benefit-card h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #2c3e50;
}

/* Responsive */
@media (max-width: 768px) {
  .section-title h2 {
    font-size: 2rem;
  }
  
  .benefits-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .section-title h2 {
    font-size: 1.8rem;
  }
  
  .benefit-card {
    padding: 30px 20px;
  }
  
  .benefit-icon {
    font-size: 2.5rem;
  }
}
</style>