<template>
  <div class="image-section">
    <h2>{{ character }} - {{ series }}</h2>
    
    <div class="gallery">
      <div 
        v-for="(img, index) in images" 
        :key="index" 
        class="image-container"
      >
        <div v-if="!imgLoaded[index]" class="image-loading">
          <div class="spinner small"></div>
        </div>
        <img
          :src="img"
          :alt="`评级图片 ${index+1}`"
          class="rating-image"
          @load="onImageLoad(index)"
          :class="{ loaded: imgLoaded[index] }"
        >
        <div class="image-label">图 {{ index + 1 }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  character: String,
  series: String,
  images: Array
})

// 图片加载状态管理
const imgLoaded = ref([])

// 监听images变化，初始化imgLoaded数组
watch(() => props.images, (newImages) => {
  if (newImages && Array.isArray(newImages)) {
    imgLoaded.value = new Array(newImages.length).fill(false)
  }
}, { immediate: true })

// 图片加载完成处理
const onImageLoad = (index) => {
  imgLoaded.value[index] = true
}
</script>

<!-- GallerySection.vue -->
<style scoped>
.image-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.image-section h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #2c3e50;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  font-size: 1.8rem;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 15px;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 0;
}

.image-container {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 8px rgba(0,0,0,0.1);
  aspect-ratio: 1/1;
  transition: transform 0.3s;
}

.image-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.image-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  z-index: 10;
}

.spinner.small {
  width: 25px;
  height: 25px;
  border: 3px solid rgba(52, 152, 219, 0.2);
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.rating-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.rating-image.loaded {
  opacity: 1;
}

.image-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 5px;
  text-align: center;
  font-size: 0.85rem;
  font-family: 'Arial', sans-serif;
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .image-section h2 {
    font-size: 1.6rem;
  }
}

@media (max-width: 768px) {
  .image-section {
    padding: 15px;
  }
  
  .image-section h2 {
    font-size: 1.5rem;
    padding-bottom: 12px;
  }
}

@media (max-width: 480px) {
  .gallery {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .image-section h2 {
    font-size: 1.3rem;
    margin-bottom: 15px;
  }
  
  .image-label {
    font-size: 0.8rem;
  }
}
</style>