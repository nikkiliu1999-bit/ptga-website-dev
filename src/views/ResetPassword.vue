<template>
  <div class="reset-password-page">
    <!-- 背景装饰 -->
    <div class="bubbles">
      <div v-for="i in 10" :key="i" class="bubble" :style="bubbleStyle(i)"></div>
    </div>
    
    <div class="reset-card">
      <div class="card-header">
        <div class="logo">
          <i class="fas fa-key"></i>
        </div>
        <h2>重置密码</h2>
        <p>请设置您的新密码</p>
      </div>

      <div class="card-body">
        <!-- 有效链接时显示表单 -->
        <form @submit.prevent="handleResetPassword" v-if="!isInvalidLink && !isLoadingParams">
          <div class="input-group">
            <i class="fas fa-lock"></i>
            <input
              v-model="newPassword"
              type="password"
              required
              placeholder="新密码（至少6位）"
              :class="{ 'error-border': passwordError }"
            />
          </div>
          <p v-if="passwordError" class="error-hint">{{ passwordError }}</p>

          <div class="input-group">
            <i class="fas fa-lock"></i>
            <input
              v-model="confirmPassword"
              type="password"
              required
              placeholder="确认新密码"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="reset-btn"
          >
            <span v-if="!loading">确认重置</span>
            <span v-if="loading" class="loading">
              <span class="spinner"></span> 处理中...
            </span>
          </button>
        </form>

        <!-- 链接验证加载状态 -->
        <div v-if="isLoadingParams" class="loading-state">
          <span class="spinner"></span>
          <p>验证链接有效性...</p>
        </div>

        <!-- 操作结果提示 -->
        <div v-if="message" :class="isSuccess ? 'success-message' : 'error-message'">
          <i :class="isSuccess ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"></i>
          {{ message }}
        </div>

        <!-- 无效链接提示 -->
        <div v-if="isInvalidLink" class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          {{ invalidLinkMessage }}
          <button class="resend-btn" @click="handleResendLink">
            重新发送重置链接
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'

const router = useRouter()

// 表单数据
const newPassword = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const message = ref('')
const isSuccess = ref(false)
const passwordError = ref('')

// 链接状态管理
const isInvalidLink = ref(false)
const invalidLinkMessage = ref('无效的重置链接，请重新申请')
const isLoadingParams = ref(true)
const token = ref('')
const type = ref('')

// 生成背景气泡样式（与登录页保持一致）
const bubbleStyle = (index) => {
  const styles = [
    { width: '40px', height: '40px', left: '10%', duration: '8s', delay: '0s' },
    { width: '20px', height: '20px', left: '20%', duration: '5s', delay: '1s' },
    { width: '50px', height: '50px', left: '35%', duration: '7s', delay: '2s' },
    { width: '80px', height: '80px', left: '50%', duration: '11s', delay: '0s' },
    { width: '35px', height: '35px', left: '55%', duration: '6s', delay: '1s' },
    { width: '45px', height: '45px', left: '65%', duration: '8s', delay: '3s' },
    { width: '90px', height: '90px', left: '70%', duration: '12s', delay: '2s' },
    { width: '25px', height: '25px', left: '80%', duration: '6s', delay: '2s' },
    { width: '15px', height: '15px', left: '70%', duration: '5s', delay: '1s' },
    { width: '90px', height: '90px', left: '25%', duration: '10s', delay: '4s' }
  ];
  
  const style = styles[index - 1];
  return {
    width: style.width,
    height: style.height,
    left: style.left,
    animationDuration: style.duration,
    animationDelay: style.delay
  };
};

// 解析URL中的参数（适配Supabase的格式）
const parseUrlParams = () => {
  const params = {
    access_token: '',
    type: '',
    error: '',
    error_code: '',
    error_description: ''
  }

  // 解析hash中的参数（Supabase通常将参数放在#后面）
  if (window.location.hash) {
    const hashParams = new URLSearchParams(window.location.hash.slice(1))
    params.access_token = hashParams.get('access_token') || ''
    params.type = hashParams.get('type') || ''
    params.error = hashParams.get('error') || ''
    params.error_code = hashParams.get('error_code') || ''
    params.error_description = hashParams.get('error_description') || ''
  }

  return params
}

// 页面加载时验证链接
onMounted(async () => {
  try {
    const params = parseUrlParams()
    console.log('解析到的重置链接参数:', params)

    // 提取关键参数
    token.value = params.access_token
    type.value = params.type

    // 检查错误参数
    if (params.error) {
      isInvalidLink.value = true
      if (params.error_code === 'otp_expired') {
        invalidLinkMessage.value = '重置链接已过期，请重新申请'
      } else if (params.error === 'access_denied') {
        invalidLinkMessage.value = '重置链接无效或已被使用'
      } else {
        invalidLinkMessage.value = `链接错误: ${params.error_description || params.error}`
      }
      return
    }

    // 检查必要参数
    if (!token.value) {
      isInvalidLink.value = true
      invalidLinkMessage.value = '链接缺少必要的令牌参数'
      console.error('未找到access_token参数')
      return
    }

    if (!type.value || type.value !== 'recovery') {
      isInvalidLink.value = true
      invalidLinkMessage.value = '链接类型不正确'
      console.error('无效的type参数:', type.value)
      return
    }

    // 验证令牌有效性
    const { data: { user }, error } = await supabase.auth.getUser(token.value)
    if (error || !user) {
      throw new Error(error?.message || '链接已失效，请重新申请')
    }

    // 链接有效
    isInvalidLink.value = false

  } catch (error) {
    isInvalidLink.value = true
    invalidLinkMessage.value = error.message || '链接验证失败，请重新申请'
    console.error('链接验证错误:', error)
  } finally {
    isLoadingParams.value = false
  }
})

// 密码验证
const validatePassword = () => {
  if (newPassword.value.length < 6) {
    passwordError.value = '密码长度不能少于6位'
    return false
  }
  if (newPassword.value !== confirmPassword.value) {
    passwordError.value = '两次输入的密码不一致'
    return false
  }
  passwordError.value = ''
  return true
}

// 处理密码重置
const handleResetPassword = async () => {
  if (!validatePassword()) return
  if (!token.value) return

  loading.value = true
  message.value = ''

  try {
    // 使用令牌更新密码
    const { error } = await supabase.auth.updateUser(
      token.value,
      { password: newPassword.value }
    )

    if (error) throw error

    isSuccess.value = true
    message.value = '密码重置成功，3秒后跳转到登录页...'
    
    // 重置成功后跳转登录页
    setTimeout(() => {
      router.push('/login')
    }, 3000)
  } catch (error) {
    isSuccess.value = false
    message.value = error.message || '密码重置失败，请重试'
    console.error('密码重置错误:', error)

    // 处理令牌过期情况
    if (error.message.includes('expired') || error.message.includes('invalid')) {
      isInvalidLink.value = true
      invalidLinkMessage.value = '链接已过期或无效，请重新申请'
    }
  } finally {
    loading.value = false
  }
}

// 重新发送重置链接
const handleResendLink = () => {
  router.push({
    name: 'Login',
    query: { showForgotModal: 'true' }
  })
}
</script>

<style scoped>
/* 页面基础样式 */
.reset-password-page {
  background: linear-gradient(135deg, #0a1747 0%, #6c87ac 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

/* 背景气泡动画 */
.bubbles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.bubble {
  position: absolute;
  bottom: -100px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: rise 10s infinite ease-in;
}

@keyframes rise {
  0% {
    bottom: -100px;
    transform: translateX(0);
  }
  50% {
    transform: translateX(100px);
  }
  100% {
    bottom: 1080px;
    transform: translateX(-200px);
  }
}

/* 卡片样式 */
.reset-card {
  position: relative;
  z-index: 10;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 440px;
  overflow: hidden;
}

/* 卡片头部 */
.card-header {
  background: linear-gradient(135deg, #1e2330 0%, #948e9c 100%);
  padding: 30px 20px;
  text-align: center;
  color: white;
}

.logo {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  margin: 0 auto 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  border: 2px solid rgba(61, 49, 49, 0.3);
}

.card-header h2 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 5px;
}

.card-header p {
  font-size: 15px;
  opacity: 0.9;
  font-weight: 300;
}

/* 卡片主体 */
.card-body {
  padding: 30px;
}

/* 输入框样式 */
.input-group {
  position: relative;
  margin-bottom: 25px;
}

.input-group i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #343638;
  font-size: 18px;
}

.input-group input {
  width: 100%;
  padding: 15px 15px 15px 50px;
  border: 2px solid #e1e5eb;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background-color: #f8f9fa;
}

.input-group input:focus {
  border-color: #4776E6;
  box-shadow: 0 0 0 3px rgba(71, 118, 230, 0.2);
  outline: none;
  background-color: #fff;
}

.error-border {
  border-color: #e53e3e !important;
}

.error-hint {
  color: #e53e3e;
  font-size: 14px;
  margin: -15px 0 15px 0;
  padding-left: 50px;
}

/* 按钮样式 */
.reset-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #27282a 0%, #7e7c82 100%);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(92, 89, 98, 0.4);
}

.reset-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(92, 89, 97, 0.6);
}

.reset-btn:disabled {
  background: linear-gradient(135deg, #a0aec0 0%, #718096 100%);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* 加载状态 */
.loading {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin-right: 10px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.loading-state p {
  color: #4a5568;
  font-size: 16px;
  margin-top: 15px;
}

/* 消息提示 */
.success-message {
  background: #f0fff4;
  border-left: 4px solid #38a169;
  color: #2f855a;
  padding: 12px 15px;
  border-radius: 8px;
  margin-top: 20px;
  display: flex;
  align-items: center;
}

.error-message {
  background: #fff0f0;
  border-left: 4px solid #e53e3e;
  color: #e53e3e;
  padding: 12px 15px;
  border-radius: 8px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.success-message i, .error-message i {
  margin-right: 10px;
  font-size: 18px;
}

/* 重新发送按钮 */
.resend-btn {
  margin-left: 10px;
  margin-top: 5px;
  background: none;
  border: none;
  color: #4776E6;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
  padding: 0;
}

.resend-btn:hover {
  color: #3556c0;
}

/* 响应式调整 */
@media (max-width: 480px) {
  .reset-card {
    border-radius: 15px;
  }
  
  .card-header {
    padding: 25px 15px;
  }
  
  .card-body {
    padding: 25px 20px;
  }
  
  .logo {
    width: 70px;
    height: 70px;
    font-size: 35px;
  }
  
  .card-header h2 {
    font-size: 24px;
  }
}
</style>
    