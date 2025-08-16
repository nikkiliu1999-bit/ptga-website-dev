<template>
  <div class="model-viewer-wrapper">
    <div ref="modelContainer" class="model-viewer-container">
      <div v-if="loading" class="loading-overlay">
        <div class="spinner"></div>
        <div class="loading-text">加载3D模型中...</div>
      </div>
      
      <div v-if="error" class="error-overlay">
        {{ error }}
        <button @click="initThreeJS" class="retry-button">重试</button>
      </div>
      
      <div v-if="!loading && !error" class="controls-overlay">
        <button @click="toggleAutoRotate" class="control-button">
          {{ autoRotate ? '暂停旋转' : '自动旋转' }}
        </button>
        <button @click="resetView" class="control-button">重置视图</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const props = defineProps({
  modelUrl: {
    type: String,
    default: ''
  },
  // 新增：控制默认视图大小的参数，值越小模型显示越大
  defaultZoomFactor: {
    type: Number,
    default: 0.7 // 默认为1.2，比原来的1.8更近，模型更大
  }
})

const modelContainer = ref(null)
const loading = ref(true)
const error = ref(null)
const autoRotate = ref(true)

// 渲染器DOM引用
const rendererDom = ref(null)

let scene, camera, renderer, controls, model
let animationFrameId = null
let isMounted = false
let resizeHandler = null

// 清理资源
function cleanup() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
  
  if (resizeHandler && window.removeEventListener) {
    window.removeEventListener('resize', resizeHandler)
    resizeHandler = null
  }
  
  if (controls) {
    controls.dispose()
    controls = null
  }
  
  if (rendererDom.value && modelContainer.value) {
    const parent = rendererDom.value.parentNode
    if (parent === modelContainer.value) {
      modelContainer.value.removeChild(rendererDom.value)
    }
    rendererDom.value = null
  }
  
  if (renderer) {
    renderer.dispose()
    renderer.forceContextLoss()
    renderer = null
  }
  
  if (scene) {
    while(scene.children.length > 0) {
      const child = scene.children[0]
      scene.remove(child)
      
      if (child.geometry) child.geometry.dispose()
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(material => material.dispose())
        } else {
          child.material.dispose()
        }
      }
    }
    scene = null
  }
  
  camera = null
  model = null
}

// 初始化Three.js
async function initThreeJS() {
  if (!isMounted || !modelContainer.value) return;
  
  if (!props.modelUrl) {
    error.value = '未提供3D模型URL'
    loading.value = false
    return
  }
  
  loading.value = true
  error.value = null
  
  try {
    await nextTick()
    cleanup()
    
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf0f4f8)
    
    camera = new THREE.PerspectiveCamera(
      45,
      modelContainer.value.clientWidth / modelContainer.value.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 15)
    
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    renderer.setSize(
      modelContainer.value.clientWidth,
      modelContainer.value.clientHeight
    )
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    rendererDom.value = renderer.domElement
    
    if (modelContainer.value) {
      modelContainer.value.appendChild(rendererDom.value)
    }
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
    scene.add(ambientLight)
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0)
    directionalLight.position.set(5, 10, 7)
    scene.add(directionalLight)
    
    controls = new OrbitControls(camera, rendererDom.value)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    
    loadModel()
    animate()
    
    resizeHandler = () => handleResize()
    window.addEventListener('resize', resizeHandler)
  } catch (err) {
    console.error('Three.js初始化失败:', err)
    error.value = '3D渲染器初始化失败: ' + err.message
    loading.value = false
  }
}

// 加载模型
function loadModel() {
  const loader = new GLTFLoader()
  loader.setCrossOrigin('anonymous')
  
  console.log('正在加载模型:', props.modelUrl)
  
  loader.load(props.modelUrl, 
    (gltf) => {
      if (!isMounted) return;
      
      model = gltf.scene
      
      const bbox = new THREE.Box3().setFromObject(model)
      const center = new THREE.Vector3()
      bbox.getCenter(center)
      const size = bbox.getSize(new THREE.Vector3())
      const maxSize = Math.max(size.x, size.y, size.z)
      
      const scaleFactor = 8 / maxSize
      model.scale.set(scaleFactor, scaleFactor, scaleFactor)
      model.position.sub(center.multiplyScalar(scaleFactor))
      
      model.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.side = THREE.DoubleSide
          if (!child.material.map) {
            child.material.color = new THREE.Color(0x3498db)
          }
        }
      })
      
      scene.add(model)
      loading.value = false
      fitModelToView()
    }, 
    undefined,
    (err) => {
      if (!isMounted) return;
      console.error('模型加载错误:', err)
      error.value = '3D模型加载失败: ' + (err.message || '请检查模型URL')
      loading.value = false
    }
  )
}

// 调整模型视图 - 修改此处使默认视图更大
function fitModelToView() {
  if (!model || !controls) return
  
  const bbox = new THREE.Box3().setFromObject(model)
  const size = bbox.getSize(new THREE.Vector3()).length()
  const center = bbox.getCenter(new THREE.Vector3())
  
  // 核心修改：使用zoomFactor控制相机距离，值越小模型越大
  // 原来的参数是1.8, 0.8, 1.8，现在改为更小的值
  const zoom = props.defaultZoomFactor;
  
  camera.position.copy(center)
  camera.position.x += size * zoom     // 水平距离
  camera.position.y += size * (zoom * 0.5)  // 垂直距离
  camera.position.z += size * zoom     // 深度距离
  camera.lookAt(center)
  
  controls.target.copy(center)
  controls.update()
  
  // 同时调整相机的最近/最远距离限制
  controls.minDistance = size * 0.05    // 可以离得更近
  controls.maxDistance = size * 3       // 最远也不会太远
}

// 动画循环
function animate() {
  if (!isMounted) return;
  
  animationFrameId = requestAnimationFrame(animate)
  
  if (model && autoRotate.value) {
    model.rotation.y += 0.003
  }
  
  if (controls) {
    controls.update()
  }
  
  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }
}

// 处理窗口大小变化
function handleResize() {
  if (!camera || !renderer || !modelContainer.value) return
  
  camera.aspect = modelContainer.value.clientWidth / modelContainer.value.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(
    modelContainer.value.clientWidth,
    modelContainer.value.clientHeight
  )
}

// 切换自动旋转
function toggleAutoRotate() {
  autoRotate.value = !autoRotate.value
}

// 重置视图
function resetView() {
  if (model && controls) {
    fitModelToView()
  }
}

// 监听模型URL变化
watch(() => props.modelUrl, (newUrl) => {
  if (newUrl && isMounted) {
    setTimeout(() => initThreeJS(), 100)
  }
})

onMounted(() => {
  isMounted = true;
  nextTick().then(() => {
    if (props.modelUrl) {
      initThreeJS();
    } else {
      loading.value = false
      error.value = '未提供3D模型URL'
    }
  })
})

onUnmounted(() => {
  isMounted = false;
  cleanup();
})
</script>

<style scoped>
/* 样式部分保持不变 */
.model-viewer-wrapper {
  width: 100%;
}

.model-viewer-container {
  width: 100%;
  height: 400px;
  background: #f0f4f8;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  padding: 0;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(240, 244, 248, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(52, 152, 219, 0.3);
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: 1.1rem;
  color: #3498db;
  font-weight: 600;
}

.error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 235, 238, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
  color: #e53935;
  padding: 20px;
  text-align: center;
  font-weight: 600;
}

.retry-button {
  margin-top: 15px;
  padding: 10px 20px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.retry-button:hover {
  background: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.controls-overlay {
  position: absolute;
  bottom: 15px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  z-index: 5;
}

.control-button {
  padding: 8px 16px;
  background: rgba(52, 152, 219, 0.85);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s;
  backdrop-filter: blur(4px);
}

.control-button:hover {
  background: rgba(41, 128, 185, 0.95);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .model-viewer-container {
    height: 300px;
  }
  
  .control-button {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
}
</style>
