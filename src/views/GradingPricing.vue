<template>
  <div class="grading-pricing">
    <div class="pricing-header">
      <h2>PTGA 评级服务价格</h2>
      <p>透明、合理的价格体系，为您的藏品提供专业评级服务</p>
    </div>
    
    <div class="pricing-intro">
      <p>我们提供多种尺寸的评级封装服务，满足不同类型藏品的需求。所有价格均包含专业评级、封装和基础保险服务。如需额外保价服务，可在提交订单时选择。</p>
    </div>
    
    <div class="pricing-cards">
      <div class="pricing-card">
        <div class="card-header" style="background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);">
          <h3>小号评级服务</h3>
          <p>尺寸：小于 9x8x5cm</p>
        </div>
        <div class="card-body">
          <div class="size-examples">
            <h4>适用藏品示例</h4>
            <ul>
              <li>泡泡玛特 SP 系列盲盒</li>
              <li>泡泡玛特 DIMOO 迷你系列</li>
              <li>小号手办、迷你玩偶</li>
              <li>小型徽章、钥匙扣</li>
              <li>Q版盲盒公仔</li>
            </ul>
          </div>
          <div class="pricing-options">
            <div class="option">
              <div class="option-header">
                <h4>标准版</h4>
                <div class="price">¥15</div>
              </div>
              <p>PET材质薄折叠盒</p>
              <ul>
                <li>专业评级认证</li>
                <li>基础保护封装</li>
                <li>基础保险服务</li>
                <li>数字证书</li>
              </ul>
              <router-link to="/submit" class="btn-select">选择此服务</router-link>
            </div>
            <div class="option">
              <div class="option-header">
                <h4>旗舰版</h4>
                <div class="price">¥50</div>
              </div>
              <p>PS材质高清高透厚收藏盒</p>
              <ul>
                <li>专业评级认证</li>
                <li>高级防刮保护</li>
                <li>UV防护封装</li>
                <li>增强保险服务</li>
                <li>数字证书+防伪标签</li>
              </ul>
              <router-link to="/submit" class="btn-select">选择此服务</router-link>
            </div>
          </div>
        </div>
      </div>
      
      <div class="pricing-card">
        <div class="card-header" style="background: linear-gradient(135deg, #2196F3 0%, #0D47A1 100%);">
          <h3>中号评级服务</h3>
          <p>尺寸：小于 18x9x8cm</p>
        </div>
        <div class="card-body">
          <div class="size-examples">
            <h4>适用藏品示例</h4>
            <ul>
              <li>泡泡玛特 SP 光织园系列</li>
              <li>泡泡玛特 LABUBU 系列</li>
              <li>迪士尼星黛露挂件</li>
              <li>中型手办、玩偶</li>
              <li>潮流玩具模型</li>
            </ul>
          </div>
          <div class="pricing-options">
            <div class="option">
              <div class="option-header">
                <h4>标准版</h4>
                <div class="price">¥20</div>
              </div>
              <p>PET材质薄折叠盒</p>
              <ul>
                <li>专业评级认证</li>
                <li>基础保护封装</li>
                <li>基础保险服务</li>
                <li>数字证书</li>
              </ul>
              <router-link to="/submit" class="btn-select">选择此服务</router-link>
            </div>
            <div class="option">
              <div class="option-header">
                <h4>旗舰版</h4>
                <div class="price">¥80</div>
              </div>
              <p>PS材质高清高透厚收藏盒</p>
              <ul>
                <li>专业评级认证</li>
                <li>高级防刮保护</li>
                <li>UV防护封装</li>
                <li>增强保险服务</li>
                <li>数字证书+防伪标签</li>
                <li>定制展示底座</li>
              </ul>
              <router-link to="/submit" class="btn-select">选择此服务</router-link>
            </div>
          </div>
        </div>
      </div>
      
      <div class="pricing-card">
        <div class="card-header" style="background: linear-gradient(135deg, #9C27B0 0%, #6A1B9A 100%);">
          <h3>定制评级服务</h3>
          <p>其他尺寸采用定制服务</p>
        </div>
        <div class="card-body">
          <div class="size-examples">
            <h4>适用藏品示例</h4>
            <ul>
              <li>大型手办模型</li>
              <li>特殊形状藏品</li>
              <li>超大尺寸潮玩</li>
              <li>组合式收藏品</li>
              <li>限量版艺术玩具</li>
            </ul>
          </div>
          <div class="custom-option">
            <div class="custom-details">
              <p>价格根据尺寸大小调整，提交评级申请后系统会自动计算报价</p>
              <ul>
                <li>完全定制化封装方案</li>
                <li>专业尺寸测量服务</li>
                <li>高级保护材料选择</li>
                <li>定制展示解决方案</li>
                <li>专属客户经理服务</li>
              </ul>
            </div>
            <router-link to="/submit" class="btn-custom">提交定制申请</router-link>
          </div>
        </div>
      </div>
    </div>
    
    <div class="material-comparison">
      <h3>封装材料对比</h3>
      <div class="comparison-grid">
        <div class="comparison-card">
          <div class="material-header" style="background: #f5f5f5;">
            <h4>标准版材料</h4>
            <p>PET (聚对苯二甲酸乙二醇酯)</p>
          </div>
          <ul>
            <li><i class="fas fa-check"></i> 轻便耐用</li>
            <li><i class="fas fa-check"></i> 高透明度</li>
            <li><i class="fas fa-check"></i> 良好的抗冲击性</li>
            <li><i class="fas fa-check"></i> 环保可回收</li>
            <li><i class="fas fa-times"></i> 中等防刮性能</li>
            <li><i class="fas fa-times"></i> 有限UV防护</li>
          </ul>
        </div>
        <div class="comparison-card">
          <div class="material-header" style="background: #e3f2fd;">
            <h4>旗舰版材料</h4>
            <p>PS (聚苯乙烯)</p>
          </div>
          <ul>
            <li><i class="fas fa-check"></i> 超高透明度</li>
            <li><i class="fas fa-check"></i> 卓越的光学性能</li>
            <li><i class="fas fa-check"></i> 超强防刮表面</li>
            <li><i class="fas fa-check"></i> 99% UV防护</li>
            <li><i class="fas fa-check"></i> 抗黄变性能</li>
            <li><i class="fas fa-check"></i> 博物馆级保护</li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="how-to-order">
      <h3>如何下单</h3>
      <div class="steps">
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h4>选择服务类型</h4>
            <p>根据您的藏品尺寸选择合适的服务类型</p>
          </div>
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h4>填写藏品信息</h4>
            <p>在提交页面填写藏品详细信息</p>
          </div>
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h4>获取自动报价</h4>
            <p>系统根据藏品尺寸自动计算价格</p>
          </div>
        </div>
        <div class="step">
          <div class="step-number">4</div>
          <div class="step-content">
            <h4>完成支付</h4>
            <p>选择支付方式完成订单支付</p>
          </div>
        </div>
      </div>
      <router-link to="/submit" class="btn-start">开始评级申请</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GradingPricing'
}
</script>

<style scoped>
.grading-pricing {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.pricing-header {
  text-align: center;
  margin-bottom: 30px;
}

.pricing-header h2 {
  font-size: 2rem;
  color: #1a2a6c;
  margin-bottom: 15px;
}

.pricing-header p {
  font-size: 1.1rem;
  color: #555;
  max-width: 800px;
  margin: 0 auto;
}

.pricing-intro {
  background: #f0f7ff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  border-left: 4px solid #1a56db;
}

.pricing-intro p {
  margin: 0;
  line-height: 1.8;
  color: #333;
  text-align: center;
}

.pricing-cards {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 40px 0;
}

.pricing-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.pricing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
}

.card-header {
  padding: 20px;
  color: white;
  text-align: center;
}

.card-header h3 {
  font-size: 1.6rem;
  margin: 0 0 10px;
}

.card-header p {
  margin: 0;
  font-size: 1.1rem;
  opacity: 0.9;
}

.card-body {
  padding: 25px;
}

.size-examples {
  margin-bottom: 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid #eee;
}

.size-examples h4 {
  font-size: 1.3rem;
  color: #1a2a6c;
  margin-bottom: 15px;
}

.size-examples ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

.size-examples li {
  padding: 8px 15px;
  background: #f9f9f9;
  border-radius: 6px;
  font-size: 0.95rem;
}

.pricing-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.option {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.option:hover {
  border-color: #1a56db;
  box-shadow: 0 5px 15px rgba(26, 86, 219, 0.1);
}

.option-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.option-header h4 {
  margin: 0;
  font-size: 1.3rem;
  color: #333;
}

.price {
  font-size: 1.8rem;
  font-weight: 700;
  color: #e74c3c;
}

.option p {
  margin: 0 0 15px;
  color: #666;
  font-size: 0.95rem;
}

.option ul {
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
}

.option li {
  padding: 8px 0;
  display: flex;
  align-items: flex-start;
}

.option li:before {
  content: '•';
  color: #1a56db;
  font-weight: bold;
  margin-right: 10px;
}

.btn-select {
  display: block;
  text-align: center;
  background: #1a56db;
  color: white;
  padding: 12px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-select:hover {
  background: #0d47a1;
  transform: translateY(-3px);
  box-shadow: 0 4px 10px rgba(26, 86, 219, 0.3);
}

.custom-option {
  text-align: center;
  padding: 20px;
}

.custom-details {
  margin-bottom: 25px;
}

.custom-details p {
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.custom-details ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
}

.custom-details li {
  padding: 12px;
  background: #f5f7fa;
  border-radius: 8px;
  font-size: 0.95rem;
}

.btn-custom {
  display: inline-block;
  background: linear-gradient(135deg, #9C27B0 0%, #6A1B9A 100%);
  color: white;
  padding: 14px 35px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.btn-custom:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(156, 39, 176, 0.4);
}

.material-comparison {
  margin: 50px 0;
  padding: 30px;
  background: #f8f9ff;
  border-radius: 12px;
}

.material-comparison h3 {
  text-align: center;
  font-size: 1.8rem;
  color: #1a2a6c;
  margin-bottom: 30px;
  position: relative;
  padding-bottom: 15px;
}

.material-comparison h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #ffd700 0%, #ff9800 100%);
  border-radius: 2px;
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 900px;
  margin: 0 auto;
}

.comparison-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
}

.material-header {
  padding: 20px;
  text-align: center;
}

.material-header h4 {
  margin: 0 0 10px;
  font-size: 1.4rem;
}

.material-header p {
  margin: 0;
  font-size: 1.1rem;
}

.comparison-card ul {
  list-style: none;
  padding: 20px;
  margin: 0;
}

.comparison-card li {
  padding: 12px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
}

.comparison-card li:last-child {
  border-bottom: none;
}

.comparison-card i {
  margin-right: 12px;
  font-size: 1.2rem;
  width: 24px;
}

.fa-check {
  color: #4CAF50;
}

.fa-times {
  color: #F44336;
}

.how-to-order {
  text-align: center;
  margin: 50px 0;
}

.how-to-order h3 {
  font-size: 1.8rem;
  color: #1a2a6c;
  margin-bottom: 40px;
  position: relative;
  padding-bottom: 15px;
}

.how-to-order h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #ffd700 0%, #ff9800 100%);
  border-radius: 2px;
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 25px;
  max-width: 1000px;
  margin: 0 auto 40px;
}

.step {
  position: relative;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.step:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

.step-number {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background: #1a56db;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 700;
}

.step-content {
  padding-top: 20px;
}

.step-content h4 {
  font-size: 1.3rem;
  color: #1a2a6c;
  margin: 0 0 10px;
}

.step-content p {
  color: #666;
  margin: 0;
  font-size: 0.95rem;
}

.btn-start {
  display: inline-block;
  background: linear-gradient(135deg, #1a2a6c 0%, #2a4365 100%);
  color: white;
  padding: 14px 40px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.btn-start:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(26, 42, 108, 0.4);
}

@media (max-width: 768px) {
  .pricing-options {
    grid-template-columns: 1fr;
  }
  
  .step {
    padding: 15px;
  }
}
</style>