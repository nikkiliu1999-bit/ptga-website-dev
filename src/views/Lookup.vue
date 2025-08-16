<template>
  <div class="lookup-container">
    <div class="back-button" @click="$router.go(-1)">← 返回</div>
    
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>加载评级数据中...</p>
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else-if="!ratingData" class="no-data">
      未找到评级信息
    </div>
    
    <div v-else class="content">
      <!-- 左侧：图片展示区 -->
      <div class="left-section">
        <GallerySection
          :character="ratingData.character"
          :series="ratingData.series"
          :images="ratingData.images"
        />
        
        <!-- 3D模型展示区 -->
        <div class="model-section">
          <h3>3D Model</h3>
          <ModelViewer 
            :model-url="ratingData.model_url"
            :preview-image="previewImage"
            :default-zoom-factor="0.7"></ModelViewer>  <!-- 控制3D模型初始大小 -->
        </div>
      </div>
      
      <!-- 右侧：评级信息 -->
      <div class="right-section">
        <ScoreInfoSection
          :cert-id="ratingData.cert_id"
          :grade-date="ratingData.grade_date"
          :total-score="ratingData.total_score"
          :scores="{
            color_score: ratingData.color_score,
            material_score: ratingData.material_score,
            proportion_score: ratingData.proportion_score,
            accessory_score: ratingData.accessory_score,
            tag_score: ratingData.tag_score
          }"
        />
        
        <!-- 雷达图 -->
        <div class="radar-section-container">
          <RadarChartSection 
            :scores="{
              color_score: ratingData.color_score,
              material_score: ratingData.material_score,
              proportion_score: ratingData.proportion_score,
              accessory_score: ratingData.accessory_score,
              tag_score: ratingData.tag_score
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../supabase'
import GallerySection from '../components/GallerySection.vue'
import ScoreInfoSection from '../components/ScoreInfoSection.vue'
import RadarChartSection from '../components/RadarChartSection.vue'
import ModelViewer from '../components/ModelViewer.vue'

const route = useRoute()
const certId = ref(route.query.cert || '')
const ratingData = ref(null)
const loading = ref(true)
const error = ref(null)
const previewImage = ref('')

// 获取评级数据
const fetchData = async () => {
  loading.value = true
  error.value = null
  ratingData.value = null

  try {
    // 标准化证书编号格式
    const certNum = certId.value.replace('TGA', '').replace(/\s/g, '')
    const formattedCertId = `TGA${certNum.padStart(6, '0')}`

    console.log('查询评级数据:', formattedCertId)
    
    const { data, error: queryError } = await supabase
      .from('ratings')
      .select('*')
      .eq('cert_id', formattedCertId)
      .single()

    if (queryError) throw queryError
    ratingData.value = data

    // 设置预览图（使用第一张图片作为预览）
    if (data.images && data.images.length > 0) {
      previewImage.value = data.images[0]
    } else {
      // 如果没有图片，使用SVG数据URI作为占位符
      previewImage.value = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect width="200" height="200" fill="%23f0f0f0"/%3E%3Ctext x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%233498db" font-size="18"%3E3D模型预览%3C/text%3E%3C/svg%3E'
    }
  } catch (err) {
    console.error('获取数据失败:', err)
    error.value = '获取评级信息失败，请检查编号或稍后重试'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (certId.value) fetchData()
})

// 监听路由参数变化
watch(() => route.query.cert, (newCert) => {
  if (newCert) {
    certId.value = newCert
    fetchData()
  }
})
</script>

<style scoped>
.lookup-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #f8f9fa;
  min-height: 100vh;
  box-sizing: border-box;
}

.back-button {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  color: #3498db;
  margin-bottom: 25px;
  font-size: 1rem;
  padding: 8px 15px;
  border-radius: 4px;
  transition: background 0.2s;
  background: white;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  font-family: 'Arial', sans-serif;
}

.back-button:hover {
  background: #f0f7ff;
}

.loading {
  text-align: center;
  padding: 50px 0;
  color: #3498db;
  font-family: 'Arial', sans-serif;
}

.spinner {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid rgba(52, 152, 219, 0.2);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error, .no-data {
  text-align: center;
  padding: 40px 20px;
  background: #ffebee;
  border-radius: 8px;
  color: #e53935;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  font-family: 'Arial', sans-serif;
}

.content {
  display: grid;
  grid-template-columns: 45% 55%; /* 调整左右宽度比例，右侧更宽 */
  gap: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  padding: 25px;
  width: 100%;
  box-sizing: border-box;
}

.left-section {
  display: flex;
  flex-direction: column;
  gap: 25px;
  max-width: 100%; /* 限制左侧最大宽度 */
}

/* 确保图片画廊自适应 */
.left-section :deep(.gallery) {
  width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box;
}

.model-section {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  width: 100%;
  box-sizing: border-box;
}

.model-section h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #2c3e50;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  font-size: 1.4rem;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.right-section {
  display: flex;
  flex-direction: column;
  gap: 25px;
  min-width: 0; /* 允许内容收缩 */
}

.radar-section-container {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

/* 响应式调整 */
@media (max-width: 1100px) {
  .content {
    grid-template-columns: 1fr; /* 屏幕较小时切换为上下布局 */
  }
}

@media (max-width: 1024px) {
  .content {
    gap: 20px;
    padding: 20px;
  }
  
  .left-section, .right-section {
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .lookup-container {
    padding: 15px;
  }
  
  .content {
    padding: 15px;
    border-radius: 10px;
  }
  
  .model-section, .radar-section-container {
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .back-button {
    font-size: 0.9rem;
    padding: 6px 12px;
    margin-bottom: 15px;
  }
  
  .error, .no-data {
    padding: 20px 15px;
    font-size: 1rem;
  }
  
  .content {
    padding: 15px 10px;
    border-radius: 8px;
  }
  
  .model-section h3, .radar-section-container h3 {
    font-size: 1.2rem;
  }
}

/* 确保雷达图容器正常显示 */
:deep(.radar-section) {
  display: block !important;
  opacity: 1 !important;
  visibility: visible !important;
  height: auto !important;
}
</style>