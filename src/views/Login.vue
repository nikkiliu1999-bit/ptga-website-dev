<template>
  <div class="login-page">
    <!-- 背景装饰 -->
    <div class="bubbles">
      <div v-for="i in 10" :key="i" class="bubble" :style="bubbleStyle(i)"></div>
    </div>
    
    <!-- 主登录卡片 -->
    <div class="login-card">
      <!-- 卡片头部 -->
      <div class="card-header">
        <div class="logo">
          <i class="fas fa-lock"></i>
        </div>
        <h2>欢迎回来</h2>
        <p>请登录您的账户以继续</p>
      </div>
      
      <!-- 卡片主体 -->
      <div class="card-body">
        <form @submit.prevent="handleLogin">
          <!-- 邮箱输入 -->
          <div class="input-group">
            <i class="fas fa-envelope"></i>
            <input 
              id="email-address"
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
              autocomplete="current-password"
              required
              placeholder="密码"
            />
          </div>
          
          <!-- 选项区域 -->
          <div class="options">
            <div class="remember-me">
              <input id="remember-me" v-model="rememberMe" name="remember-me" type="checkbox" />
              <label for="remember-me">记住我</label>
            </div>
            <a href="#" class="forgot-password" @click.prevent="openForgotPasswordModal">忘记密码?</a>
          </div>
          
          <!-- 登录按钮 -->
          <button
            type="submit"
            :disabled="loading"
            class="login-btn"
          >
            <span v-if="!loading">登录</span>
            <span v-if="loading" class="loading">
              <span class="spinner"></span> 登录中...
            </span>
          </button>
          
          <!-- 分隔线 -->
          <div class="divider">
            <span>或使用其他方式登录</span>
          </div>
          
          <!-- 社交登录 -->
          <div class="social-login">
            <div class="social-btn google" @click="socialLogin('google')">
              <i class="fab fa-google"></i>
            </div>
            <div class="social-btn facebook" @click="socialLogin('facebook')">
              <i class="fab fa-facebook-f"></i>
            </div>
            <div class="social-btn twitter" @click="socialLogin('twitter')">
              <i class="fab fa-twitter"></i>
            </div>
          </div>
          
          <!-- 注册链接 -->
          <div class="register-link">
            还没有账号? <router-link :to="{ name: 'Register' }">立即注册</router-link>
          </div>
        </form>
        
        <!-- 错误消息 -->
        <div v-if="errorMessage" class="error-message">
          <i class="fas fa-exclamation-circle"></i> {{ errorMessage }}
        </div>
      </div>
    </div>
    
    <!-- 忘记密码模态框 -->
    <div v-if="showForgotPasswordModal" class="modal-backdrop" @click="closeForgotPasswordModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>重置密码</h3>
          <button class="close-btn" @click="closeForgotPasswordModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <p>请输入您的邮箱地址，我们将发送重置密码的链接给您</p>
          
          <div class="input-group">
            <i class="fas fa-envelope"></i>
            <input 
              v-model="forgotPasswordEmail"
              type="email"
              required
              placeholder="邮箱地址"
            />
          </div>
          
          <div v-if="forgotPasswordMessage" :class="forgotPasswordSuccess ? 'success-message' : 'error-message'">
            <i :class="forgotPasswordSuccess ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"></i> 
            {{ forgotPasswordMessage }}
          </div>
        </div>
        
        <div class="modal-footer">
          <button 
            class="cancel-btn" 
            @click="closeForgotPasswordModal"
            :disabled="forgotPasswordLoading"
          >
            取消
          </button>
          <button 
            class="submit-btn" 
            @click="handleForgotPassword"
            :disabled="forgotPasswordLoading"
          >
            <span v-if="!forgotPasswordLoading">发送重置链接</span>
            <span v-if="forgotPasswordLoading" class="loading">
              <span class="spinner"></span> 发送中...
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { supabase } from '../supabase' // 假设已配置Supabase客户端

const router = useRouter()
const { login, loading } = useAuth()

// 登录表单数据
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const errorMessage = ref('')

// 忘记密码模态框相关
const showForgotPasswordModal = ref(false)
const forgotPasswordEmail = ref('')
const forgotPasswordLoading = ref(false)
const forgotPasswordMessage = ref('')
const forgotPasswordSuccess = ref(false)

// 打开忘记密码模态框
const openForgotPasswordModal = () => {
  showForgotPasswordModal.value = true
  forgotPasswordEmail.value = email.value // 预填邮箱
  forgotPasswordMessage.value = ''
}

// 关闭忘记密码模态框
const closeForgotPasswordModal = () => {
  showForgotPasswordModal.value = false
}

// 处理忘记密码请求
const handleForgotPassword = async () => {
    if (!forgotPasswordEmail.value) {
    forgotPasswordMessage.value = '请输入邮箱地址'
    forgotPasswordSuccess.value = false
    return
    }

    forgotPasswordLoading.value = true
    forgotPasswordMessage.value = ''
      
    try {
    // 生成重置链接时添加调试信息
    const origin = window.location.origin
    const redirectUrl = `${origin}/reset-password`
    console.log('生成重置链接，重定向地址:', redirectUrl)
        
    // 调用Supabase生成重置链接
    const { error } = await supabase.auth.resetPasswordForEmail(
        forgotPasswordEmail.value,
        { 
        redirectTo: redirectUrl,
        // 明确指定链接类型为邮箱重置
        type: 'recovery'
        }
    )
        
    if (error) {
        console.error('Supabase生成链接错误:', error)
        throw error
    }
        
    forgotPasswordSuccess.value = true
    forgotPasswordMessage.value = '重置密码的链接已发送到您的邮箱，请查收（注意检查垃圾邮件）'
    forgotPasswordEmail.value = ''
        
    // 3秒后自动关闭模态框
    setTimeout(closeForgotPasswordModal, 3000)
    } catch (error) {
    forgotPasswordSuccess.value = false
    forgotPasswordMessage.value = error.message || '发送重置链接失败，请稍后再试'
    console.error('忘记密码错误:', error)
    } finally {
    forgotPasswordLoading.value = false
    }
}


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

// 处理登录
const handleLogin = async () => {
  errorMessage.value = '';
  try {
    await login(email.value, password.value, rememberMe.value);
    
    // 重定向到原始页面或首页
    const redirect = router.currentRoute.value.query.redirect || '/account';
    router.push(redirect);
  } catch (error) {
    errorMessage.value = error.message || '登录失败，请检查邮箱和密码';
    console.error('登录失败:', error);
  }
};

// 社交登录
const socialLogin = async (provider) => {
  errorMessage.value = '';
  try {
    // 这里可以添加真实的社交登录逻辑
    throw new Error(`暂不支持 ${provider} 登录`);
  } catch (error) {
    errorMessage.value = error.message;
    console.error(`${provider} 登录失败:`, error);
  }
};
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

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.remember-me {
  display: flex;
  align-items: center;
}

.remember-me input {
  width: 18px;
  height: 18px;
  margin-right: 8px;
  accent-color: #3f4145;
}

.remember-me label {
  color: #6b6d70;
  font-size: 15px;
  cursor: pointer;
}

.forgot-password {
  color: #4776E6;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: color 0.2s;
  cursor: pointer;
}

.forgot-password:hover {
  color: #3556c0;
  text-decoration: underline;
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

.divider {
  display: flex;
  align-items: center;
  margin: 25px 0;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #e2e8f0;
}

.divider span {
  padding: 0 15px;
  color: #718096;
  font-size: 14px;
}

.social-login {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
}

.social-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border: 1px solid #e2e8f0;
  color: #4a5568;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.social-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.social-btn.google:hover {
  background: #4285F4;
  color: white;
  border-color: #4285F4;
}

.social-btn.facebook:hover {
  background: #4267B2;
  color: white;
  border-color: #4267B2;
}

.social-btn.twitter:hover {
  background: #1DA1F2;
  color: white;
  border-color: #1DA1F2;
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

.error-message i, .success-message i {
  margin-right: 10px;
  font-size: 18px;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-5px); }
  40%, 80% { transform: translateX(5px); }
}

.footer {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  z-index: 5;
}

.footer a {
  color: white;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}

/* 忘记密码模态框样式 */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

.modal {
  background-color: white;
  border-radius: 15px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease;
}

.modal-header {
  padding: 20px 25px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  font-size: 20px;
  color: #1a202c;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: #718096;
  cursor: pointer;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #e53e3e;
}

.modal-body {
  padding: 25px;
}

.modal-body p {
  color: #4a5568;
  margin-bottom: 20px;
  line-height: 1.5;
}

.modal-footer {
  padding: 15px 25px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancel-btn {
  padding: 10px 20px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: white;
  color: #4a5568;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn:hover {
  background-color: #f7fafc;
}

.cancel-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.submit-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #27282a 0%, #7e7c82 100%);
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-btn:hover {
  background: linear-gradient(135deg, #1a1c1e 0%, #6c6a72 100%);
}

.submit-btn:disabled {
  background: linear-gradient(135deg, #a0aec0 0%, #718096 100%);
  cursor: not-allowed;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
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
  
  .options {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .cancel-btn, .submit-btn {
    width: 100%;
  }
}
</style>
