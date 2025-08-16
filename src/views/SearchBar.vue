<template>
  <div class="lookup-page">
    <!-- 导航栏 -->
    <NavBar />
    
    <!-- 搜索区域 -->
    <section class="search-section">
      <div class="container">
        <div class="section-title">
          <h2>潮玩评级查询</h2>
          <p>输入评级编号，获取详细的评级信息</p>
        </div>
        
        <div class="search-box">
          <div class="input-container">
            <input 
              type="text" 
              placeholder="输入评级编号 (如 TGA000123)" 
              v-model="certNumber"
              @keyup.enter="searchCert"
            >
            <button @click="searchCert" class="search-button">查询评级</button>
          </div>
        </div>
        
        <div class="search-tips">
          <p><i class="fas fa-info-circle"></i> 提示：评级编号通常以"TGA"开头，后接6位数字</p>
          <p><i class="fas fa-lightbulb"></i> 示例：TGA000123、TGA004567</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'

const router = useRouter()
const certNumber = ref('')

// 查询评级
const searchCert = () => {
  if (certNumber.value) {
    const cert = certNumber.value.toUpperCase().trim()
    router.push({ 
      path: '/certificate',
      query: { cert } 
    })
  }
}
</script>

<style scoped>
.lookup-page {
  padding-top: 80px; /* 为导航栏留出空间 */
}

.search-section {
  background: white;
  padding: 80px 0;
  min-height: calc(100vh - 80px - 200px); /* 确保内容区域有足够高度 */
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

.search-box {
  display: flex;
  justify-content: center;
  margin: 40px auto;
  max-width: 700px;
  width: 100%;
}

.input-container {
  display: flex;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.2);
}

input {
  padding: 16px 20px;
  flex-grow: 1;
  font-size: 1.1rem;
  border: 2px solid #3498db;
  border-right: none;
  outline: none;
  transition: all 0.3s ease;
}

input:focus {
  border-color: #2980b9;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

.search-button {
  padding: 0 24px;
  background: #3498db;
  color: white;
  border: none;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap; /* 确保按钮文字不换行 */
  min-width: 120px; /* 设置最小宽度 */
}

.search-button:hover {
  background: #2980b9;
}

.search-tips {
  max-width: 700px;
  margin: 30px auto 0;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  text-align: center;
  font-size: 1rem;
  color: #5a6268;
}

.search-tips p {
  margin: 10px 0;
}

.search-tips i {
  margin-right: 8px;
  color: #3498db;
}

/* Responsive */
@media (max-width: 768px) {
  .section-title h2 {
    font-size: 2rem;
  }
  
  .input-container {
    flex-direction: column;
    border-radius: 8px;
    overflow: visible;
    box-shadow: none;
  }
  
  input {
    width: 100%;
    border: 2px solid #3498db;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  
  .search-button {
    width: 100%;
    padding: 16px;
    border-radius: 8px;
  }
  
  .lookup-page {
    padding-top: 70px;
  }
  
  .search-section {
    padding: 60px 0;
  }
}

@media (max-width: 480px) {
  .section-title h2 {
    font-size: 1.8rem;
  }
  
  .section-title p {
    font-size: 1rem;
  }
  
  .search-tips {
    font-size: 0.9rem;
  }
  
  .search-button {
    font-size: 1rem; /* 在非常小的屏幕上减小字体 */
  }
}
</style>