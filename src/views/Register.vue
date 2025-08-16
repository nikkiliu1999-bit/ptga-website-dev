<template>
  <div class="login-page">
    <!-- 背景装饰 -->
    <div class="bubbles">
      <div v-for="i in 10" :key="i" class="bubble" :style="bubbleStyle(i)"></div>
    </div>
    
    <!-- 主注册卡片 -->
    <div class="login-card">
      <!-- 卡片头部 -->
      <div class="card-header">
        <div class="logo">
          <i class="fas fa-user-plus"></i>
        </div>
        <h2>创建新账户</h2>
        <p>填写以下信息完成注册</p>
      </div>
      
      <!-- 卡片主体 -->
      <div class="card-body">
        <form @submit.prevent="handleRegister">
          <!-- 邮箱输入 -->
          <div class="input-group">
            <i class="fas fa-envelope"></i>
            <input 
              id="email"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              placeholder="邮箱地址"
            />
          </div>
          
          <!-- 密码输入 -->
          <div class="input-group">
            <i class="fas fa-lock"></i>
            <input 
              id="password"
              v-model="password"
              name="password"
              type="password"
              autocomplete="new-password"
              required
              placeholder="密码"
              @input="validatePassword"
            />
          </div>
          
          <!-- 密码要求提示 -->
          <div class="password-requirements" v-if="showPasswordRequirements">
            <p :class="{ valid: password.length >= 6 }">
              <i :class="password.length >= 6 ? 'fas fa-check text-green-500' : 'fas fa-times text-red-500'"></i>
              至少6位字符
            </p>
            <p :class="{ valid: hasLowerCase }">
              <i :class="hasLowerCase ? 'fas fa-check text-green-500' : 'fas fa-times text-red-500'"></i>
              至少1位小写字母
            </p>
            <p :class="{ valid: hasUpperCase }">
              <i :class="hasUpperCase ? 'fas fa-check text-green-500' : 'fas fa-times text-red-500'"></i>
              至少1位大写字母
            </p>
            <p :class="{ valid: hasNumber }">
              <i :class="hasNumber ? 'fas fa-check text-green-500' : 'fas fa-times text-red-500'"></i>
              至少1位数字
            </p>
          </div>
          
          <!-- 确认密码输入 -->
          <div class="input-group">
            <i class="fas fa-lock-open"></i>
            <input 
              id="confirm-password"
              v-model="confirmPassword"
              name="confirm-password"
              type="password"
              autocomplete="new-password"
              required
              placeholder="确认密码"
              @input="checkPasswordMatch"
            />
          </div>
          
          <!-- 密码不匹配提示 -->
          <p v-if="showPasswordMismatch" class="password-mismatch">
            两次输入的密码不一致
          </p>
          
          <!-- 同意条款 -->
          <div class="terms-agreement">
            <input
              id="terms"
              v-model="agreeTerms"
              name="terms"
              type="checkbox"
              required
            />
            <label for="terms">
              我同意服务条款和隐私政策
            </label>
          </div>
          
          <!-- 注册按钮 -->
          <button
            type="submit"
            :disabled="loading || !isPasswordValid || !agreeTerms"
            class="login-btn"
          >
            <span v-if="!loading">注册</span>
            <span v-if="loading" class="loading">
              <span class="spinner"></span> 注册中...
            </span>
          </button>
          
          <!-- 登录链接 -->
          <div class="register-link">
            已有账号? <router-link :to="{ name: 'Login' }">立即登录</router-link>
          </div>
        </form>
        
        <!-- 错误消息 -->
        <div v-if="errorMessage" class="error-message">
          <i class="fas fa-exclamation-circle"></i> {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { register, loading } = useAuth()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeTerms = ref(false)
const errorMessage = ref('')

// 密码验证相关状态
const hasLowerCase = ref(false)
const hasUpperCase = ref(false)
const hasNumber = ref(false)
const showPasswordRequirements = ref(false)
const showPasswordMismatch = ref(false)

// 验证密码是否符合要求
const validatePassword = () => {
  showPasswordRequirements.value = password.value.length > 0
  
  // 检查是否包含小写字母
  hasLowerCase.value = /[a-z]/.test(password.value)
  
  // 检查是否包含大写字母
  hasUpperCase.value = /[A-Z]/.test(password.value)
  
  // 检查是否包含数字
  hasNumber.value = /[0-9]/.test(password.value)
  
  // 检查密码是否匹配
  checkPasswordMatch()
}

// 检查两次输入的密码是否一致
const checkPasswordMatch = () => {
  showPasswordMismatch.value = confirmPassword.value.length > 0 && 
                              password.value !== confirmPassword.value
}

// 密码是否符合所有要求
const isPasswordValid = computed(() => {
  return password.value.length >= 6 && 
         hasLowerCase.value && 
         hasUpperCase.value && 
         hasNumber.value &&
         password.value === confirmPassword.value
})

// 监听密码变化进行验证
watch(password, validatePassword)

// 生成气泡样式
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

const handleRegister = async () => {
  errorMessage.value = ''
  
  // 客户端验证
  if (!isPasswordValid.value) {
    errorMessage.value = '密码至少6位，须至少包含1位大写字母，1位小写字母，1位数字'
    return;
  }
  
  if (!agreeTerms.value) {
    errorMessage.value = '请同意服务条款和隐私政策'
    return;
  }
  
  try {
    await register(email.value, password.value)
    alert('注册成功！请检查您的邮箱以确认账户')
    router.push({ name: 'Login' })
  } catch (error) {
    // 处理Supabase返回的错误 - 关键修改部分
    if (error.message.includes('already been registered') || 
        error.message.includes('already exists') ||
        error.message.includes('duplicate key value')) {
      errorMessage.value = '该邮箱已被注册'
    } else if (error.message.includes('Password should be at least 6 characters') || 
        error.message.includes('Password should contain at least one character of each')) {
      errorMessage.value = '密码至少6位，须至少包含1位大写字母，1位小写字母，1位数字'
    } else {
      errorMessage.value = error.message || '注册失败，请重试'
    }
    console.error('注册失败:', error)
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login-page {
  background: linear-gradient(135deg, #0a1747 0%, #6c87ac 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

/* 背景动画效果 */
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

.login-card {
  position: relative;
  z-index: 10;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 100%;
  max-width: 440px;
  transform: translateY(0);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

.card-header {
  background: linear-gradient(135deg, #1e2330 0%, #948e9c 100%);
  padding: 30px 20px;
  text-align: center;
  color: white;
  position: relative;
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
  letter-spacing: 0.5px;
}

.card-header p {
  font-size: 15px;
  opacity: 0.9;
  font-weight: 300;
}

.card-body {
  padding: 30px;
}

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

.input-group input::placeholder {
  color: #a0aec0;
}

/* 密码要求样式 */
.password-requirements {
  margin: -15px 0 25px 10px;
  font-size: 13px;
  color: #6b6d70;
}

.password-requirements p {
  margin-bottom: 4px;
  display: flex;
  align-items: center;
}

.password-requirements p i {
  width: 16px;
  margin-right: 6px;
}

.password-requirements p.valid {
  color: #22c55e;
}

/* 密码不匹配提示 */
.password-mismatch {
  color: #e53e3e;
  font-size: 14px;
  margin: -15px 0 25px 10px;
  display: flex;
  align-items: center;
}

.password-mismatch::before {
  content: "⚠️";
  margin-right: 6px;
}

.terms-agreement {
  display: flex;
  align-items: flex-start;
  margin-bottom: 25px;
}

.terms-agreement input {
  width: 18px;
  height: 18px;
  margin-right: 8px;
  margin-top: 3px;
  accent-color: #3f4145;
}

.terms-agreement label {
  color: #6b6d70;
  font-size: 14px;
  line-height: 1.5;
}

.login-btn {
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
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(92, 89, 98, 0.4);
}

.login-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(92, 89, 97, 0.6);
}

.login-btn:active {
  transform: translateY(1px);
}

.login-btn:disabled {
  background: linear-gradient(135deg, #a0aec0 0%, #718096 100%);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

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

.register-link {
  text-align: center;
  margin-top: 25px;
  color: #4a5568;
  font-size: 16px;
}

.register-link a {
  color: #4776E6;
  text-decoration: none;
  font-weight: 600;
  margin-left: 5px;
  transition: color 0.2s;
}

.register-link a:hover {
  color: #3556c0;
  text-decoration: underline;
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
  animation: shake 0.5s ease;
}

.error-message i {
  margin-right: 10px;
  font-size: 18px;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-5px); }
  40%, 80% { transform: translateX(5px); }
}

@media (max-width: 480px) {
  .login-card {
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
  
  .password-requirements {
    font-size: 12px;
  }
}
</style>