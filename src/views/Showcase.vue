<template>
  <div class="showcase-page">
    <NavBar />
    
    <section class="showcase-section">
      <div class="container">
        <div class="section-title">
          <h2>热门潮玩评级展示</h2>
          <p>浏览高分收藏品及所属用户</p>
        </div>
        
        <div class="gallery" v-if="!loading && hotItems.length > 0">
          <div 
            v-for="item in hotItems" 
            :key="item.cert_id" 
            class="card"
            @click="viewDetails(item.cert_id)"
          >
            <div class="image-placeholder">
              <img v-if="item.images && item.images[0]" :src="item.images[0]" alt="潮玩图片" class="toy-image">
              <div v-else class="no-image">暂无图片</div>
            </div>
            <div class="score">{{ item.total_score }}</div>
            <div class="info">
              <div class="series">{{ item.series }}</div>
              <div class="character">{{ item.character }}</div>
              <div class="user-info">
                <span class="user-label">用户ID:</span>
                <span class="user-id">{{ item.user_id || '匿名用户' }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else-if="loading" class="loading">
          加载热门评级中...
          <div class="spinner"></div>
        </div>
        
        <div v-else class="no-data">
          暂无热门评级数据
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'
import NavBar from '../components/NavBar.vue'

const router = useRouter()
const hotItems = ref([])
const loading = ref(true)

const fetchHotItems = async () => {
  try {
    loading.value = true
    const { data, error } = await supabase
      .from('ratings')
      .select('cert_id, images, total_score, series, character, user_id')
      .order('total_score', { ascending: false })
      .limit(20)

    if (error) throw error
    hotItems.value = data || []
  } catch (err) {
    console.error('获取热门数据失败:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchHotItems()
})

const viewDetails = (certId) => {
  router.push({ 
    path: '/certificate',
    query: { cert: certId } 
  })
}
</script>

<style scoped>
.showcase-page {
  padding-top: 80px;
}

.showcase-section {
  background: white;
  min-height: calc(100vh - 120px);
  padding: 60px 0;
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

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 25px;
  margin-top: 40px;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 25px rgba(0,0,0,0.15);
}

.image-placeholder {
  height: 240px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.toy-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-image {
  color: #7f8c8d;
  font-size: 1rem;
}

.score {
  position: absolute;
  top: 15px;
  right: 15px;
  background: linear-gradient(135deg, #ffd700 0%, #ffa500 100%);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  z-index: 10;
}

.info {
  padding: 15px;
  text-align: center;
  background: white;
}

.series {
  font-size: 0.95rem;
  color: #7f8c8d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.character {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-top: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-info {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed #eee;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.user-label {
  font-size: 0.85rem;
  color: #7f8c8d;
}

.user-id {
  font-size: 0.9rem;
  font-weight: 600;
  color: #e74c3c;
}

.loading {
  text-align: center;
  padding: 50px 0;
  font-size: 1.2rem;
  color: #3498db;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(52, 152, 219, 0.2);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.no-data {
  text-align: center;
  padding: 50px 0;
  font-size: 1.2rem;
  color: #7f8c8d;
  background: #f8f9fa;
  border-radius: 8px;
  margin-top: 30px;
}

@media (max-width: 768px) {
  .section-title h2 {
    font-size: 2rem;
  }
  
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .showcase-page {
    padding-top: 70px;
  }
  
  .showcase-section {
    padding: 40px 0;
  }
}

@media (max-width: 480px) {
  .gallery {
    grid-template-columns: 1fr;
  }
  
  .section-title h2 {
    font-size: 1.8rem;
  }
  
  .section-title p {
    font-size: 1rem;
  }
}
</style>