<template>
  <!-- TGA专业服务 -->
  <section class="home-services">
    <div class="container">
      <div class="section-title">
        <h2>我们的专业服务</h2>
        <p>我们结合前沿技术与专业经验，为您的收藏品提供全方位评级服务</p>
      </div>
      
      <div class="services-grid">
        <div class="service-card">
          <div class="service-icon">
            <i class="fas fa-cube"></i>
          </div>
          <h3>3D高清建模</h3>
          <p>通过高精度3D扫描技术，全方位捕捉藏品细节，生成数字模型</p>
        </div>
        
        <div class="service-card">
          <div class="service-icon">
            <i class="fas fa-ruler-combined"></i>
          </div>
          <h3>量化评级标准</h3>
          <p>独创四维评分体系，科学量化藏品状态，提供客观评级依据</p>
        </div>
        
        <div class="service-card">
          <div class="service-icon">
            <i class="fas fa-robot"></i>
          </div>
          <h3>AI评级技术</h3>
          <p>运用人工智能进行初步评估，高效准确识别瑕疵与特征</p>
        </div>
        
        <div class="service-card">
          <div class="service-icon">
            <i class="fas fa-user-check"></i>
          </div>
          <h3>人工分数修正</h3>
          <p>专业评级师进行最终审核，确保评分结果公正可靠</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeServices'
}
</script>

<style scoped>
.home-services {
  padding: 80px 0;
  background: #ffffff;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.service-card {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 40px 25px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 6px 15px rgba(0,0,0,0.1);
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 25px rgba(0,0,0,0.15);
}

.service-icon {
  font-size: 3rem;
  color: #3498db;
  margin-bottom: 20px;
}

.service-card h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #2c3e50;
}

.service-card p {
  color: #5a6268;
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

@media (max-width: 480px) {
  .home-services {
    padding: 60px 0;
  }
  
  .service-card {
    padding: 30px 20px;
  }
  
  .service-icon {
    font-size: 2.5rem;
  }
}
</style>