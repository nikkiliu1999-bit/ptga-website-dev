// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { ModelViewerElement } from '@google/model-viewer'
// src/main.js
import '@fortawesome/fontawesome-free/css/all.css'

// 全局注册自定义元素
if (!customElements.get('model-viewer')) {
  customElements.define('model-viewer', ModelViewerElement)
}

const app = createApp(App)

// 配置 Vue 忽略 model-viewer 自定义元素
app.config.compilerOptions.isCustomElement = (tag) => tag === 'model-viewer'

app.use(router)
app.mount('#app')