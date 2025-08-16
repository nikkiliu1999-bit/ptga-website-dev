<template>
  <div class="grading-process">
    <div class="process-header">
      <h2>PTGA 藏品评级服务全流程</h2>
      <p>专业、透明、安全的藏品评级服务，确保您的每一件藏品得到公正评价与完美保护</p>
    </div>
    
    <div class="highlight">
      <p><i class="fas fa-lightbulb"></i> 整个评级过程通常需要7-14个工作日，您可以在平台上实时追踪您的藏品状态</p>
    </div>
    
    <div class="process-steps">
      <div v-for="(step, index) in steps" :key="index" class="process-step">
        <div class="step-number">{{ index + 1 }}</div>
        <div class="step-image">
          <img :src="step.image" :alt="step.title">
        </div>
        <div class="step-content">
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
          <p>{{ step.details }}</p>
        </div>
      </div>
    </div>
    
    <div class="timeline-section">
      <h3>详细时间流程</h3>
      <div class="timeline-container">
        <div v-for="(item, index) in timeline" :key="index" class="timeline-item">
          <div class="timeline-content">
            <h4>{{ item.title }}</h4>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="features-section">
      <h3>我们的服务特色</h3>
      <div class="features">
        <div v-for="(feature, index) in features" :key="index" class="feature-card">
          <div class="feature-icon">
            <i :class="feature.icon"></i>
          </div>
          <h4>{{ feature.title }}</h4>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GradingProcess',
  data() {
    return {
      steps: [
        {
          title: '发起订单',
          description: '登录 PTGA 平台，提交藏品评级需求',
          details: '只需几分钟即可完成订单创建，支持多种支付方式',
          image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          title: '定制服务',
          description: '根据藏品规格，选择匹配的个性化服务',
          details: '提供标准、加急和特快三种服务类型',
          image: 'https://images.unsplash.com/photo-1551836022-8ad4fa3f0d6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          title: '寄件登记',
          description: '邮寄藏品至指定地址，平台录入快递信息',
          details: '提供顺丰上门取件约快递服务',
          image: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          title: '进度追踪',
          description: '平台签收后，订单页实时更新处理状态',
          details: '支持个人账户查询，随时掌握进度',
          image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          title: '专业评级',
          description: '按订单序列拆封，执行标准化评级流程',
          details: '由AI评级与专业评级师整体评估，确保公正性',
          image: 'https://images.unsplash.com/photo-1592409065737-a25380a8a0dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          title: '全链监控',
          description: '拆封→评级→封装同批次完成，全流程可追溯',
          details: '每个环节都有高清视频记录，安全无忧',
          image: 'https://images.unsplash.com/photo-1551836022-8ad4fa3f0d6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          title: '回寄登记',
          description: '评级封装后，安排快递按订单序列寄回',
          details: '您可以根据需要选择保价服务',
          image: 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          title: '收获惊喜',
          description: '等待签收快递，开启全新的藏品体验',
          details: '每件藏品附带唯一数字证书，全球可验证',
          image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
      ],
      timeline: [
        { title: '订单提交 (第1天)', description: '创建评级订单并完成支付，系统自动分配唯一订单号' },
        { title: '藏品寄送 (第1-3天)', description: '通过快递将藏品寄往PTGA评级中心' },
        { title: '藏品接收 (第3-5天)', description: 'PTGA接收藏品并录入系统，更新订单状态' },
        { title: '专业评级 (第5-8天)', description: '藏品进入评级流程，由三位专家独立评估' },
        { title: '封装处理 (第8-9天)', description: '评级完成后使用专业封装技术保护藏品' },
        { title: '回寄准备 (第9-10天)', description: '准备回寄快递，生成数字证书' }
      ],
      features: [
        { 
          icon: 'fas fa-shield-alt', 
          title: '安全保障', 
          description: '全流程高清监控，每件藏品独立处理' 
        },
        { 
          icon: 'fas fa-certificate', 
          title: '专业认证', 
          description: '专利AI评级与专业评级师团队，严格遵循全球评级标准' 
        },
        { 
          icon: 'fas fa-tachometer-alt', 
          title: '高效处理', 
          description: '标准服务7工作日完成，加急服务仅需3个工作日' 
        }
      ]
    }
  }
}
</script>

<style scoped>
.grading-process {
  padding: 20px;
}

.process-header {
  text-align: center;
  margin-bottom: 30px;
}

.process-header h2 {
  font-size: 2rem;
  color: #1a2a6c;
  margin-bottom: 15px;
}

.process-header p {
  font-size: 1.1rem;
  color: #555;
  max-width: 800px;
  margin: 0 auto;
}

.highlight {
  background: linear-gradient(120deg, #fff9c4 0%, #fff9c4 100%);
  padding: 15px 20px;
  border-radius: 8px;
  border-left: 4px solid #ffd700;
  margin-bottom: 30px;
  max-width: 800px;
  margin: 0 auto 30px;
}

.highlight p {
  display: flex;
  align-items: center;
  margin: 0;
  color: #333;
  font-weight: 500;
}

.highlight i {
  color: #ff9800;
  margin-right: 10px;
  font-size: 1.2rem;
}

.process-steps {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.process-step {
  background: white;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
}

.process-step:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.step-number {
  position: absolute;
  top: -15px;
  left: -15px;
  background: linear-gradient(135deg, #1a56db 0%, #1a2a6c 100%);
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

.step-image {
  height: 180px;
  overflow: hidden;
}

.step-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.process-step:hover .step-image img {
  transform: scale(1.05);
}

.step-content {
  padding: 20px;
}

.step-content h3 {
  font-size: 1.4rem;
  margin-bottom: 10px;
  color: #1a2a6c;
}

.step-content p {
  color: #555;
  margin-bottom: 8px;
  font-size: 0.95rem;
}

.timeline-section {
  background: #f8f9ff;
  border-radius: 12px;
  padding: 30px;
  margin: 40px 0;
}

.timeline-section h3 {
  text-align: center;
  font-size: 1.6rem;
  color: #1a2a6c;
  margin-bottom: 30px;
  position: relative;
  padding-bottom: 15px;
}

.timeline-section h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #ffd700 0%, #ff9800 100%);
  border-radius: 2px;
}

.timeline-container {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline-container::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, #1a56db, #ffd700, #ff9800);
  left: 50%;
  margin-left: -2px;
  border-radius: 2px;
}

.timeline-item {
  position: relative;
  width: 50%;
  padding: 20px 40px;
  margin-bottom: 30px;
}

.timeline-item:nth-child(odd) {
  left: 0;
}

.timeline-item:nth-child(even) {
  left: 50%;
}

.timeline-item::after {
  content: '';
  position: absolute;
  top: 30px;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #1a56db 0%, #1a2a6c 100%);
  border-radius: 50%;
  z-index: 1;
}

.timeline-item:nth-child(odd)::after {
  right: -10px;
}

.timeline-item:nth-child(even)::after {
  left: -10px;
}

.timeline-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);
}

.timeline-content h4 {
  font-size: 1.2rem;
  color: #1a2a6c;
  margin-bottom: 10px;
}

.features-section {
  margin-top: 50px;
}

.features-section h3 {
  text-align: center;
  font-size: 1.6rem;
  color: #1a2a6c;
  margin-bottom: 30px;
  position: relative;
  padding-bottom: 15px;
}

.features-section h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #ffd700 0%, #ff9800 100%);
  border-radius: 2px;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  max-width: 1000px;
  margin: 0 auto;
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #1a56db;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  width: 80px;
  height: 80px;
  line-height: 80px;
  border-radius: 50%;
  margin: 0 auto 20px;
}

.feature-card h4 {
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: #1a2a6c;
}

@media (max-width: 768px) {
  .timeline-container::before {
    left: 30px;
  }
  
  .timeline-item {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
    left: 0 !important;
  }
  
  .timeline-item:nth-child(odd)::after,
  .timeline-item:nth-child(even)::after {
    left: 18px;
  }
  
  .process-steps {
    grid-template-columns: 1fr;
  }
}
</style>