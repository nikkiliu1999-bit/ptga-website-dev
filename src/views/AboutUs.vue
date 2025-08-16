<template>
  <div class="about-us">
    <!-- Hero Banner -->
    <section class="hero-banner">
      <div class="container">
        <div class="hero-content">
          <h1>为什么选择TGA？</h1>
          <p>我们提供行业领先的潮玩评级服务与解决方案</p>
        </div>
      </div>
    </section>

    <!-- Why Choose TGA -->
    <section class="why-choose">
      <div class="container">
        <div class="features">
          <!-- Feature 1 -->
          <div class="feature">
            <div class="feature-header">
              <div class="icon">1</div>
              <h2>先进的评级形式</h2>
            </div>
            <div class="feature-content">
              <h3>创新技术结合专业经验</h3>
              <ul>
                <li>运用领先行业的3D扫描技术与AI评级技术，多项专利加持，实现行业顶级标准！</li>
                <li>结合评级师的视角，极致理性与轻微感性的完美结合，促成每一次有温度的评级。</li>
              </ul>
              <div class="illustration">
                <img src="../views/logo.jpg" alt="先进评级技术">
              </div>
            </div>
          </div>

          <!-- Feature 2 -->
          <div class="feature">
            <div class="feature-header">
              <div class="icon">2</div>
              <h2>量化的评级标准</h2>
            </div>
            <div class="feature-content">
              <h3>科学全面的评分体系</h3>
              <ul>
                <li>独创四维评分标准，全方位覆盖玩具物理属性，更好了解每一个玩具的真实情况。</li>
                <li><router-link to="/grading-scale" class="learn-more">了解更多关于"评级标准"</router-link></li>
              </ul>
              <div class="illustration">
                <img src="../views/logo.jpg" alt="评级标准">
              </div>
            </div>
          </div>

          <!-- Feature 3 -->
          <div class="feature">
            <div class="feature-header">
              <div class="icon">3</div>
              <h2>精致的评级装置</h2>
            </div>
            <div class="feature-content">
              <h3>兼具展示与保护功能</h3>
              <ul>
                <li>高透评级外壳与内部固定装置，既能多角度的观赏，也有全方位的保护。</li>
                <li>精巧的嵌套机关设计，再也不怕整个玩具系列在垒墙过程中的坍塌滑落。</li>
                <li>半封闭装置与密封条，自主选择藏品的可玩性与收藏性，玩具始终可玩。</li>
              </ul>
              <div class="illustration">
                <img src="../views/logo.jpg" alt="评级装置">
              </div>
            </div>
          </div>

          <!-- Feature 4 -->
          <div class="feature">
            <div class="feature-header">
              <div class="icon">4</div>
              <h2>极致的评级服务</h2>
            </div>
            <div class="feature-content">
              <h3>全程无忧的服务体验</h3>
              <ul>
                <li>评级全流程可追踪，确保您的藏品保持全程可溯的安全状态。</li>
                <li><router-link to="/grading-process" class="learn-more">了解更多关于"评级流程"</router-link></li>
                <li>多尺寸装置可定制，确保您的藏品拥有量身定做的收纳方案。</li>
                <li>个性化服务可选择，确保您每一次收获独一无二的评级体验。</li>
              </ul>
              <div class="illustration">
                <img src="../views/logo.jpg" alt="评级服务">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>准备好开始您的评级之旅了吗？</h2>
          <p>立即提交您的藏品，体验TGA的专业评级服务</p>
          <router-link to="/submit" class="btn btn-primary btn-large">提交评级订单</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutUs'
}
</script>

<style scoped>
.about-us {
  padding-top: 80px;
}

/* Hero Banner */
.hero-banner {
  background: linear-gradient(135deg, #2c3e50 0%, #1a2530 100%);
  color: white;
  padding: 100px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/images/background.jpg') center/cover no-repeat;
  opacity: 0.2;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
}

.hero-content h1 {
  font-size: 3.5rem;
  margin-bottom: 20px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.hero-content p {
  font-size: 1.4rem;
  opacity: 0.9;
}

/* Why Choose Section */
.why-choose {
  padding: 100px 0;
  background: #f8f9fa;
}

.features {
  max-width: 1200px;
  margin: 0 auto;
}

.feature {
  background: white;
  border-radius: 15px;
  margin-bottom: 40px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  overflow: hidden;
}

.feature-header {
  display: flex;
  align-items: center;
  padding: 25px 30px;
  background: #3498db;
  color: white;
}

.feature-header .icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  color: #3498db;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: bold;
  margin-right: 20px;
  flex-shrink: 0;
}

.feature-header h2 {
  font-size: 1.8rem;
  margin: 0;
}

.feature-content {
  padding: 30px;
}

.feature-content h3 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.feature-content ul {
  padding-left: 20px;
  margin-bottom: 30px;
}

.feature-content li {
  margin-bottom: 15px;
  position: relative;
  font-size: 1.1rem;
  line-height: 1.6;
}

.feature-content li::before {
  content: "•";
  color: #3498db;
  font-weight: bold;
  display: inline-block; 
  width: 1em;
  margin-left: -1em;
}

.learn-more {
  color: #3498db;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  margin-top: 10px;
}

.learn-more:hover {
  text-decoration: underline;
}

.illustration {
  border-radius: 10px;
  overflow: hidden;
  margin-top: 20px;
}

.illustration img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

/* CTA Section */
.cta-section {
  padding: 100px 0;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  text-align: center;
}

.cta-content {
  max-width: 700px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: 2.8rem;
  margin-bottom: 20px;
}

.cta-content p {
  font-size: 1.2rem;
  margin-bottom: 40px;
  opacity: 0.9;
}

.btn-large {
  padding: 18px 45px;
  font-size: 1.2rem;
  font-weight: 600;
}

@media (max-width: 992px) {
  .hero-content h1 {
    font-size: 2.8rem;
  }
  
  .hero-content p {
    font-size: 1.2rem;
  }
  
  .feature-header {
    padding: 20px;
  }
  
  .feature-header h2 {
    font-size: 1.6rem;
  }
}

@media (max-width: 768px) {
  .hero-banner {
    padding: 80px 0;
  }
  
  .hero-content h1 {
    font-size: 2.3rem;
  }
  
  .feature-header {
    flex-direction: column;
    text-align: center;
  }
  
  .feature-header .icon {
    margin-right: 0;
    margin-bottom: 15px;
  }
  
  .cta-content h2 {
    font-size: 2.2rem;
  }
}

@media (max-width: 576px) {
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .feature-content {
    padding: 20px 15px;
  }
  
  .cta-content h2 {
    font-size: 1.8rem;
  }
}
</style>