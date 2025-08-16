<template>
  <!-- 顶部 Banner -->
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <div class="logo">
          <div class="logo-icon">
            <img src="../views/logo.jpg" alt="TGA Logo">
          </div>
          <!-- <div class="logo-text">TGA</div> -->
        </div>
        <h1>为每一份热爱保驾护航</h1>
        <p>
          TGA，全称Toy Grading Authentic，隶属上海潮评科技有限公司。TGA作为第三方评级机构，为市面上大部分的玩具、挂件、手办等提供专业的评级服务。我们致力于为收藏家提供最专业、最权威的评级服务与多样化的服务。TGA将助力每一个潮玩保护、收藏、增值，为整个潮玩社群和潮玩产业增添新的活力。
        </p>
        <div class="hero-buttons">
          <router-link to="/submit" class="btn btn-primary">提交评级订单</router-link>
          <router-link to="/grading/process" class="btn btn-outline">了解评级流程</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Banner'
}
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #0f0618 0%, #202329 100%);
  color: white;
  padding: 100px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('../views/background.jpg') no-repeat center center/cover;
  opacity: 0.3;
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.logo-icon {
  /* 调整图片容器大小以适应你的logo */
  width: 200px;
  height: 150px;
  margin-right: 15px;
}

.logo-icon img {
  width: 130%;
  height: 150%;
  object-fit: contain;
  /* 确保图片在深色背景上清晰可见 */
  filter: drop-shadow(0 0 3px rgba(255,255,255,0.5));
}

.logo-text {
  font-size: 4rem;
  font-weight: 700;
  letter-spacing: 2px;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  line-height: 1.8;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.btn {
  padding: 14px 30px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  border: none;
}

.btn-primary {
  background: white;
  color: #2980b9;
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
}

.btn-primary:hover {
  background: #f0f7ff;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
}

.btn-outline {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-outline:hover {
  background: rgba(255,255,255,0.1);
  transform: translateY(-3px);
}

/* 响应式样式 */
@media (max-width: 992px) {
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .hero p {
    font-size: 1.1rem;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 70px 0;
  }
  
  .logo-text {
    font-size: 3rem;
  }
  
  .hero h1 {
    font-size: 2rem;
  }
  
  .hero-buttons {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style>
