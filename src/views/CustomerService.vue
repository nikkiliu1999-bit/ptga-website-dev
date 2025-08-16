<template>
  <div class="customer-service-page">
    <!-- 页面标题区域 -->
    <section class="page-header">
      <div class="container">
        <h1>联系我们</h1>
        <p>我们重视您的每一条反馈，您的建议是我们进步的动力</p>
      </div>
    </section>

    <!-- 主要内容区域 -->
    <main class="container">
      <div class="content-wrapper">
        <!-- 联系信息卡片 -->
        <div class="contact-info">
          <h2>联系方式</h2>
          
          <div class="info-item">
            <i class="icon location"></i>
            <div>
              <h3>地址</h3>
              <p>上海市闵行区平阳路258号1层</p>
            </div>
          </div>
          
          <div class="info-item">
            <i class="icon phone"></i>
            <div>
              <h3>电话</h3>
              <p>400-888-8888</p>
            </div>
          </div>
          
          <div class="info-item">
            <i class="icon email"></i>
            <div>
              <h3>邮箱</h3>
              <p>service@tga.com</p>
            </div>
          </div>
          
          <div class="info-item">
            <i class="icon time"></i>
            <div>
              <h3>工作时间</h3>
              <p>周一至周五 9:00-18:00</p>
            </div>
          </div>
          
          <div class="social-links">
            <a href="#" class="social-icon" aria-label="微信"><i class="icon wechat"></i></a>
            <a href="#" class="social-icon" aria-label="微博"><i class="icon weibo"></i></a>
            <a href="#" class="social-icon" aria-label="Instagram"><i class="icon instagram"></i></a>
          </div>
        </div>
        
        <!-- 反馈表单 -->
        <div class="feedback-form">
          <h2>提交反馈</h2>
          <p>请填写您的反馈内容，我们将尽快与您联系</p>
          
          <!-- 登录提示 -->
          <div v-if="!user" class="login-prompt">
            <h3>请先登录以提交反馈</h3>
            <p>登录后我们可以更好地为您服务并追踪反馈进度</p>
            <button @click="redirectToLogin" class="login-btn">
              <i class="fas fa-sign-in-alt"></i> 立即登录
            </button>
          </div>
          
          <form v-else @submit.prevent="handleSubmit" :class="{ submitting: isSubmitting }">
            <!-- 姓名输入 -->
            <div class="form-group">
              <label for="name">姓名（选填）</label>
              <input 
                type="text" 
                id="name" 
                v-model="formData.name" 
                placeholder="请输入您的姓名"
                :disabled="isSubmitting"
              >
            </div>
            
            <!-- 邮箱输入 -->
            <div class="form-group">
              <label for="email">邮箱 <span class="required">*</span></label>
              <input 
                type="email" 
                id="email" 
                v-model="formData.email" 
                placeholder="请输入您的邮箱地址"
                :class="{ error: errors.email }"
                :disabled="isSubmitting"
              >
              <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
            </div>
            
            <!-- 反馈类型 -->
            <div class="form-group">
              <label for="feedbackType">反馈类型</label>
              <select 
                id="feedbackType" 
                v-model="formData.feedbackType"
                :disabled="isSubmitting"
              >
                <option value="">请选择反馈类型</option>
                <option value="suggestion">建议</option>
                <option value="complaint">投诉</option>
                <option value="inquiry">咨询</option>
                <option value="praise">表扬</option>
                <option value="other">其他</option>
              </select>
            </div>
            
            <!-- 反馈内容 -->
            <div class="form-group">
              <label for="message">反馈内容 <span class="required">*</span></label>
              <textarea 
                id="message" 
                v-model="formData.message" 
                rows="5" 
                placeholder="请详细描述您的反馈内容..."
                :class="{ error: errors.message }"
                :disabled="isSubmitting"
              ></textarea>
              <span class="error-message" v-if="errors.message">{{ errors.message }}</span>
            </div>
            
            <!-- 提交按钮 -->
            <button 
              type="submit" 
              class="submit-btn"
              :disabled="isSubmitting"
            >
              <span v-if="!isSubmitting">提交反馈</span>
              <span v-if="isSubmitting" class="loading">
                <i class="spinner"></i> 提交中...
              </span>
            </button>
          </form>
          
          <!-- 提交成功提示 -->
          <div v-if="isSubmitted" class="success-message">
            <i class="icon success-icon"></i>
            <div>
              <h3>提交成功！</h3>
              <p>感谢您的反馈，我们将尽快处理并与您联系。</p>
              <button @click="resetForm" class="reset-btn">提交新反馈</button>
            </div>
          </div>
          
          <!-- 错误提示 -->
          <div v-if="errorMessage" class="error-message-container">
            <i class="icon error-icon"></i>
            <div>
              <h3>提交失败</h3>
              <p>{{ errorMessage }}</p>
              <button @click="errorMessage = ''" class="reset-btn">重试</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// 导入Supabase客户端
import { supabase } from '../supabase';
// 导入Auth composable
import { useAuth } from '../composables/useAuth';

export default {
  setup() {
    const router = useRouter();
    const { user } = useAuth();
    
    // 表单数据
    const formData = ref({
      name: '',
      email: '',
      feedbackType: '',
      message: ''
    });
    
    // 错误信息
    const errors = ref({
      email: '',
      message: ''
    });
    
    // 状态标识
    const isSubmitting = ref(false);
    const isSubmitted = ref(false);
    const errorMessage = ref('');
    
    // 重定向到登录页
    const redirectToLogin = () => {
      router.push({ 
        name: 'Login', 
        query: { redirect: router.currentRoute.value.fullPath } 
      });
    };
    
    // 表单验证
    const validateForm = () => {
      let isValid = true;
      errors.value = { email: '', message: '' };
      
      // 验证邮箱
      if (!formData.value.email) {
        errors.value.email = '请输入您的邮箱地址';
        isValid = false;
      } else if (!isValidEmail(formData.value.email)) {
        errors.value.email = '请输入有效的邮箱地址';
        isValid = false;
      }
      
      // 验证反馈内容
      if (!formData.value.message) {
        errors.value.message = '请输入反馈内容';
        isValid = false;
      } else if (formData.value.message.length < 5) {
        errors.value.message = '反馈内容至少需要5个字符';
        isValid = false;
      }
      
      return isValid;
    };
    
    // 邮箱格式验证
    const isValidEmail = (email) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    };
    
    // 处理表单提交到Supabase
    const handleSubmit = async () => {
      // 清除之前的错误信息
      errorMessage.value = '';
      
      // 表单验证
      if (!validateForm()) {
        // 滚动到第一个错误字段
        const firstError = document.querySelector('.form-group .error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
      
      // 模拟提交状态
      isSubmitting.value = true;
      
      try {
        // 准备提交到Supabase的数据，添加用户ID
        const feedbackData = {
          ...formData.value,
          submitted_at: new Date().toISOString(),
          user_id: user.value.id  // 添加用户ID关联
        };
        
        // 提交数据到Supabase的feedbacks表
        const { error } = await supabase
          .from('feedbacks')
          .insert([feedbackData]);
          
        if (error) {
          throw error;
        }
        
        // 提交成功
        isSubmitted.value = true;
      } catch (error) {
        console.error('提交失败:', error);
        errorMessage.value = '提交失败，请稍后再试。错误信息：' + error.message;
      } finally {
        isSubmitting.value = false;
      }
    };
    
    // 重置表单
    const resetForm = () => {
      formData.value = {
        name: '',
        email: '',
        feedbackType: '',
        message: ''
      };
      errors.value = {
        email: '',
        message: ''
      };
      isSubmitted.value = false;
      errorMessage.value = '';
      
      // 滚动到表单顶部
      document.querySelector('.feedback-form').scrollIntoView({ behavior: 'smooth' });
    };
    
    return {
      user,
      formData,
      errors,
      isSubmitting,
      isSubmitted,
      errorMessage,
      redirectToLogin,
      handleSubmit,
      resetForm
    };
  }
}
</script>

<style scoped>
.customer-service-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-header {
  background: #353c44;
  color: white;
  padding: 60px 0;
  text-align: center;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.page-header p {
  font-size: 1.1rem;
  color: #bdc3c7;
  max-width: 700px;
  margin: 0 auto;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 40px;
  padding: 60px 0;
  align-items: start;
}

.contact-info {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.contact-info h2 {
  color: #353c44;
  font-size: 1.8rem;
  margin-bottom: 30px;
  position: relative;
  padding-bottom: 15px;
}

.contact-info h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background: #3498db;
}

.info-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 25px;
}

.info-item .icon {
  margin-right: 15px;
  margin-top: 3px;
  flex-shrink: 0;
}

.info-item h3 {
  color: #353c44;
  font-size: 1.1rem;
  margin-bottom: 5px;
}

.info-item p {
  color: #666;
  margin: 0;
  line-height: 1.6;
}

.contact-info .social-links {
  margin-top: 40px;
  display: flex;
  gap: 15px;
}

.feedback-form {
  padding: 30px;
}

.feedback-form h2 {
  color: #353c44;
  font-size: 1.8rem;
  margin-bottom: 15px;
}

.feedback-form > p {
  color: #666;
  margin-bottom: 30px;
  font-size: 1.05rem;
}

/* 登录提示样式 */
.login-prompt {
  background: #fff;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  margin-top: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.login-prompt h3 {
  font-size: 1.5rem;
  color: #2d3a5f;
  margin-bottom: 15px;
}

.login-prompt p {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 20px;
}

.login-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
}

.login-btn i {
  margin-right: 10px;
}

.login-btn:hover {
  background: #2980b9;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #353c44;
  font-weight: 500;
}

.required {
  color: #e74c3c;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.form-group textarea {
  resize: vertical;
}

.form-group .error {
  border-color: #e74c3c;
}

.error-message {
  display: block;
  margin-top: 5px;
  color: #e74c3c;
  font-size: 0.9rem;
}

.submit-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.submit-btn:hover {
  background: #2980b9;
}

.submit-btn:active {
  transform: translateY(2px);
}

.submit-btn:disabled {
  background: #95a5a6;
  cursor: not-allowed;
}

.loading {
  display: inline-flex;
  align-items: center;
}

.spinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin-right: 8px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.success-message {
  background: #f1f9f7;
  border: 1px solid #c3e6cd;
  border-radius: 4px;
  padding: 30px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  gap: 20px;
  animation: fadeIn 0.5s;
}

.error-message-container {
  background: #fef3f2;
  border: 1px solid #fde2e1;
  border-radius: 4px;
  padding: 30px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  gap: 20px;
  animation: fadeIn 0.5s;
}

.error-icon {
  width: 50px;
  height: 50px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23dc3545"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>');
  background-size: contain;
  background-repeat: no-repeat;
  flex-shrink: 0;
}

.error-message-container h3 {
  color: #dc3545;
  margin-top: 0;
  margin-bottom: 10px;
}

.error-message-container p {
  color: #b02a37;
  margin: 0;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.success-icon {
  width: 50px;
  height: 50px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2328a745"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>');
  background-size: contain;
  background-repeat: no-repeat;
  flex-shrink: 0;
}

.success-message h3 {
  color: #28a745;
  margin-top: 0;
  margin-bottom: 10px;
}

.success-message p {
  color: #2c6e36;
  margin: 0;
}

.reset-btn {
  background: transparent;
  color: #3498db;
  border: 1px solid #3498db;
  padding: 8px 20px;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 15px;
  transition: all 0.3s;
}

.reset-btn:hover {
  background: #3498db;
  color: white;
}

.icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.location { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%233498db"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>'); }
.phone { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%233498db"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>'); }
.email { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%233498db"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>'); }
.time { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%233498db"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>'); }
.wechat { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M8.2 13.6c-.3 0-.5-.2-.5-.5s.2-.5.5-.5c.3 0 .5.2.5.5s-.3.5-.5.5zm3.5 0c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5-.2.5-.5.5z"/><path d="M12 3C6.5 3 2 6.6 2 11c0 2 1.1 3.8 2.8 5 .2.1.3.4.2.7 0 .2-.1.3-.2.4-.4.3-.8.6-1.1.9-.1.1-.2.2-.1.4.1.5.9 1.1 1.7 1.8 2.4.1.1.3.1.4 0 .6-.4 1.1-.7 1.7-1 .1-.1.3 0 .4.1.8.4 1.7.6 2.6.7 4.5.1 8.2-2.9 8.2-6.5 0-4.4-4.5-8-10-8zm6.7 9.8c-.1.1-.3.2-.5.1-.6-.2-1.4-.4-2.1-.3-.1 0-.2 0-.3-.1-.1-.1-.1-.2 0-.3.4-.5.6-1.1.6-1.8 0-1.5-1.4-2.8-3.1-2.8-1.7 0-3.1 1.2-3.1 2.8 0 1.5 1.4 2.8 3.1 2.8.5 0 1-.1 1.4-.3.1-.1.3-.1.4 0 .5.3 1.1.5 2.1.8.1.1.2.2.4.2.1 0 .3-.1.4-.1.4-.4.9-.9 1.3-1.4.1-.1.1-.3.1-.4 0-.2-.1-.4-.1-.6-.2-.1-.1-.2-.3-.1-.4.3-.7.5-1.5.5-2.3.1-.1-.1-.2-.1-.3-.1z"/></svg>'); }
.weibo { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M10.32 15.42c-.15.08-.33.13-.51.13-.51 0-.92-.42-.92-.93 0-.51.41-.93.92-.93.23 0 .44.09.61.23.1.1.18.22.23.35.05.13.07.27.07.41 0 .23-.07.45-.2.64-.1.14-.25.25-.42.3zm.72-3.07c-.6.34-1.29.54-2.01.54-1.85 0-3.35-1.5-3.35-3.35 0-.72.23-1.39.62-1.94.06-.08.06-.2 0-.28-.07-.08-.19-.08-.26 0-.5.65-.79 1.43-.79 2.26 0 2.14 1.74 3.88 3.88 3.88.87 0 1.69-.29 2.36-.79.09-.06.1-.19.04-.28-.05-.08-.18-.09-.27-.04zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.5 11.5c0 1.93-1.57 3.5-3.5 3.5-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5c1.93 0 3.5 1.57 3.5 3.5z"/></svg>'); }
.instagram { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>'); }

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #3498db;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  text-decoration: none;
}

.social-icon:hover {
  background: #2980b9;
  transform: translateY(-3px);
}

@media (max-width: 768px) {
  .content-wrapper {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 40px 0;
  }
  
  .page-header {
    padding: 40px 0;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .contact-info,
  .feedback-form {
    padding: 20px;
  }
  
  .contact-info h2,
  .feedback-form h2 {
    font-size: 1.5rem;
  }
}
</style>