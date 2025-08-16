<template>
  <div class="home-container">
    <!-- 使用 Banner 组件 -->
    <Banner />
    
    <!-- 为什么要评级 -->
    <WhyGrade />
    
    <!-- TGA专业服务 -->
    <HomeServices />
    
    <!-- 提交评级 -->
    <section class="submit-section">
      <div class="container">
        <div class="submit-content">
          <h2>提交你的评级订单！</h2>
          <p>只需简单几步，即可为您的收藏品获取专业权威的TGA评级认证</p>
          <router-link to="/submit" class="btn btn-primary btn-large">开始评级流程</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import Banner from '../components/Banner.vue' // 导入 Banner 组件
import WhyGrade from '../components/WhyGrade.vue'
import HomeServices from '../components/HomeServices.vue'
</script>

<style scoped>
.home-container {
  padding-top: 0;
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

/* Submit Section */
.submit-section {
  background: linear-gradient(135deg, #2a282d 0%, #bac2cf 100%);
  color: white;
  text-align: center;
  padding: 100px 0;
}

.submit-content {
  max-width: 700px;
  margin: 0 auto;
}

.submit-content h2 {
  font-size: 2.8rem;
  margin-bottom: 20px;
}

.submit-content p {
  font-size: 1.2rem;
  margin-bottom: 40px;
}

.btn-large {
  padding: 18px 45px;
  font-size: 1.2rem;
}

/* 响应式样式 */
@media (max-width: 480px) {
  .section-title h2 {
    font-size: 1.8rem;
  }
  
  .submit-content h2 {
    font-size: 2rem;
  }
  
  .btn-large {
    padding: 16px 30px;
    font-size: 1.1rem;
  }
}
</style>