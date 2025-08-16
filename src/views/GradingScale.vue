<template>
  <div class="grading-scale">
    <div class="scale-header">
      <h2>PTGA 评级标准体系</h2>
      <p>严谨科学的评级标准，为您的藏品提供最权威的价值认证</p>
    </div>
    
    <div class="scale-intro">
      <p>PTGA评级体系基于国际通用的10分制标准，结合中国收藏品市场特点进行了优化。我们的评级标准考虑了藏品的多个维度，包括完整性、保存状态、稀有度等，确保评级结果公正、准确。</p>
    </div>
    
    <div class="rating-system">
      <div class="rating-scale">
        <div v-for="(grade, index) in grades" :key="index" class="grade-card">
          <div class="grade-header" :style="{ background: grade.color }">
            <h3>{{ grade.score }}</h3>
            <span>{{ grade.title }}</span>
          </div>
          <div class="grade-description">
            <p>{{ grade.description }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="grading-criteria">
      <h3>评级考量因素</h3>
      <div class="criteria-grid">
        <div v-for="(criterion, index) in criteria" :key="index" class="criterion-card">
          <div class="criterion-icon">
            <i :class="criterion.icon"></i>
          </div>
          <h4>{{ criterion.title }}</h4>
          <p>{{ criterion.description }}</p>
        </div>
      </div>
    </div>
    
    <div class="certificate-info">
      <h3>评级证书说明</h3>
      <div class="certificate-content">
        <div class="certificate-image">
          <img src="https://images.unsplash.com/photo-1620336655055-bd7b7c4f270c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="PTGA评级证书">
        </div>
        <div class="certificate-details">
          <ul>
            <li v-for="(detail, index) in certificateDetails" :key="index">
              <i class="fas fa-check-circle"></i> {{ detail }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GradingScale',
  data() {
    return {
      grades: [
        {
          score: 'GEM MT 10',
          title: '完美无瑕',
          description: '在专业放大镜下也无可察觉的瑕疵，完美保存状态，边缘和角部完美锋利',
          color: 'linear-gradient(135deg, #ffd700 0%, #ff9800 100%)'
        },
        {
          score: 'MINT 9',
          title: '极臻完美',
          description: '近乎完美的藏品，仅存在极微小的生产瑕疵或几乎不可见的轻微处理痕迹',
          color: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)'
        },
        {
          score: 'NM/MT 8',
          title: '近完美级',
          description: '保存极佳，可能存在微小瑕疵，需在放大镜下仔细观察才能发现',
          color: 'linear-gradient(135deg, #2196F3 0%, #0D47A1 100%)'
        },
        {
          score: 'NM 7',
          title: '上佳品相',
          description: '保存良好，有轻微使用痕迹，但整体状态出色，无明显瑕疵',
          color: 'linear-gradient(135deg, #9C27B0 0%, #6A1B9A 100%)'
        },
        {
          score: 'EX 5-6',
          title: '优良品相',
          description: '中等使用痕迹，可能有轻微折痕或磨损，但仍保持较好的整体状态',
          color: 'linear-gradient(135deg, #FF9800 0%, #EF6C00 100%)'
        },
        {
          score: 'VG 3-4',
          title: '良好品相',
          description: '明显使用痕迹，可能有折痕、磨损或小范围损伤，但主要特征清晰可见',
          color: 'linear-gradient(135deg, #F44336 0%, #C62828 100%)'
        }
      ],
      criteria: [
        {
          icon: 'fas fa-ruler-combined',
          title: '完整性',
          description: '检查藏品是否有缺失部分，是否保持原始完整状态'
        },
        {
          icon: 'fas fa-eye',
          title: '表面状态',
          description: '评估表面是否有划痕、污渍、褪色或其他可见缺陷'
        },
        {
          icon: 'fas fa-crop-alt',
          title: '边缘与边角',
          description: '检查边缘是否完整，边角是否尖锐无磨损'
        },
        {
          icon: 'fas fa-paint-brush',
          title: '颜色与印刷',
          description: '评估颜色鲜艳度、印刷质量和图案清晰度'
        },
        {
          icon: 'fas fa-weight',
          title: '材质与质感',
          description: '检查材质状态、厚度和原始质感保持度'
        },
        {
          icon: 'fas fa-certificate',
          title: '稀有度',
          description: '考虑藏品的稀缺性和市场稀有度因素'
        }
      ],
      certificateDetails: [
        '唯一数字编码，全球可验证真伪',
        '详细评级分数和子项评分',
        '专业防伪技术和安全设计',
        '藏品详细信息与特征描述',
        '二维码扫描查看数字证书',
        '与区块链技术结合，永久保存评级记录'
      ]
    }
  }
}
</script>

<style scoped>
.grading-scale {
  padding: 20px;
}

.scale-header {
  text-align: center;
  margin-bottom: 30px;
}

.scale-header h2 {
  font-size: 2rem;
  color: #1a2a6c;
  margin-bottom: 15px;
}

.scale-header p {
  font-size: 1.1rem;
  color: #555;
  max-width: 800px;
  margin: 0 auto;
}

.scale-intro {
  background: #f0f7ff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  border-left: 4px solid #1a56db;
}

.scale-intro p {
  margin: 0;
  line-height: 1.8;
  color: #333;
}

.rating-system {
  margin: 40px 0;
}

.rating-scale {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.grade-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.grade-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

.grade-header {
  padding: 20px;
  color: white;
  text-align: center;
}

.grade-header h3 {
  font-size: 2rem;
  margin: 0 0 10px;
}

.grade-header span {
  font-size: 1.1rem;
  font-weight: 500;
}

.grade-description {
  padding: 20px;
}

.grade-description p {
  margin: 0;
  color: #555;
  line-height: 1.6;
}

.grading-criteria {
  margin: 50px 0;
}

.grading-criteria h3 {
  text-align: center;
  font-size: 1.6rem;
  color: #1a2a6c;
  margin-bottom: 30px;
  position: relative;
  padding-bottom: 15px;
}

.grading-criteria h3::after {
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

.criteria-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}

.criterion-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.criterion-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

.criterion-icon {
  font-size: 2.5rem;
  color: #1a56db;
  margin-bottom: 20px;
}

.criterion-card h4 {
  font-size: 1.3rem;
  color: #1a2a6c;
  margin-bottom: 15px;
}

.certificate-info {
  margin-top: 50px;
}

.certificate-info h3 {
  text-align: center;
  font-size: 1.6rem;
  color: #1a2a6c;
  margin-bottom: 30px;
  position: relative;
  padding-bottom: 15px;
}

.certificate-info h3::after {
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

.certificate-content {
  display: flex;
  gap: 40px;
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

.certificate-image {
  flex: 1;
  border-radius: 8px;
  overflow: hidden;
  max-width: 400px;
}

.certificate-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.certificate-details {
  flex: 1;
}

.certificate-details ul {
  list-style: none;
  padding: 0;
}

.certificate-details ul li {
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: flex-start;
}

.certificate-details ul li:last-child {
  border-bottom: none;
}

.certificate-details ul li i {
  color: #4CAF50;
  font-size: 1.2rem;
  margin-right: 15px;
  margin-top: 4px;
}

@media (max-width: 900px) {
  .certificate-content {
    flex-direction: column;
  }
  
  .certificate-image {
    max-width: 100%;
  }
}
</style>