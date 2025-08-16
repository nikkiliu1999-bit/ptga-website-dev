<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/" class="logo">
          <img src="../views/logo.jpg" alt="TGA Logo">
        </router-link>
        
        <button class="menu-toggle" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      
      <div class="navbar-links" :class="{ active: menuActive }">
        <router-link to="/">主页</router-link>
        
        <!-- 评级服务下拉菜单 -->
        <div class="dropdown-container" @click="toggleDropdown($event)">
          <a class="dropdown-toggle">
            评级服务
            <i class="fa fa-chevron-down"></i>
          </a>
          <div class="dropdown-menu" :class="{ active: dropdownActive }">
            <router-link to="/grading/process" class="dropdown-item">评级流程</router-link>
            <router-link to="/grading/scale" class="dropdown-item">评级标准</router-link>
            <router-link to="/grading/pricing" class="dropdown-item">评级收费</router-link>
            <router-link to="/grading/casedesign" class="dropdown-item">评级盒与标的设计</router-link>
            <router-link to="/grading/addonservice" class="dropdown-item">高端附加服务</router-link>
          </div>
        </div>
        
        <router-link to="/submit">提交评级</router-link>
        <router-link to="/lookup">评级查询</router-link>
        <router-link to="/showcase">TGA展柜</router-link>
      </div>
      
      <div class="user-menu">
        <!-- 修复头像点击区域 -->
        <div v-if="user" class="avatar-container" @click="toggleUserMenu">
          <div class="avatar">
            <img :src="userAvatar" alt="用户头像">
          </div>
        </div>
        <div v-else class="auth-buttons">
          <button @click="goToLogin" class="login-btn">登录</button>
          <button @click="goToRegister" class="register-btn">注册</button>
        </div>
        <div class="dropdown" :class="{ active: userMenuActive }" v-if="user">
          <router-link to="/account" class="dropdown-item">
            <i class="fas fa-user-circle"></i> 我的账户
          </router-link>
          <router-link to="/account#orders" class="dropdown-item">
            <i class="fas fa-shopping-bag"></i> 我的订单
          </router-link>
          <router-link to="/account#feedbacks" class="dropdown-item">
            <i class="fas fa-comment-alt"></i> 我的反馈
          </router-link>
          <div class="dropdown-divider"></div>
          <div class="dropdown-item" @click="logout">
            <i class="fas fa-sign-out-alt"></i> 退出登录
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { user, logout: authLogout } = useAuth()

const menuActive = ref(false)
const userMenuActive = ref(false)
const dropdownActive = ref(false)

// 计算用户头像
const userAvatar = computed(() => {
  return user.value?.user_metadata?.avatar_url || '../views/logo.jpg'
})

// 切换移动端菜单
const toggleMenu = () => {
  menuActive.value = !menuActive.value
}

// 切换用户菜单 - 添加调试日志
const toggleUserMenu = (e) => {
  e.stopPropagation() // 阻止事件冒泡
  userMenuActive.value = !userMenuActive.value
  dropdownActive.value = false // 关闭其他下拉菜单
}

// 切换评级服务下拉菜单
const toggleDropdown = (e) => {
  e.stopPropagation()
  dropdownActive.value = !dropdownActive.value
  userMenuActive.value = false // 关闭其他下拉菜单
}

// 登录
const goToLogin = () => {
  router.push({ name: 'Login' })
}

// 注册
const goToRegister = () => {
  router.push({ name: 'Register' })
}

// 导航到用户中心的不同部分
const navigateToSection = (section) => {
  router.push({ path: '/account', hash: `#${section}` });
  userMenuActive.value = false;
};

// 退出登录
const logout = async () => {
  await authLogout();
  userMenuActive.value = false;
  router.push({ name: 'Home' });
};

// 点击其他地方关闭所有下拉菜单
const handleClickOutside = (e) => {
  // 检查点击是否在用户菜单或下拉菜单内部
  if (!e.target.closest('.user-menu') && !e.target.closest('.dropdown-container')) {
    dropdownActive.value = false
    userMenuActive.value = false
  }
}

// 正确设置事件监听
onMounted(() => {
  window.addEventListener('click', handleClickOutside)
  
  // 清理函数
  return () => {
    window.removeEventListener('click', handleClickOutside)
  }
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1000;
  padding: 15px 0;
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo img {
  height: 80px;
  margin-right: 10px;
  border-radius: 4px;
}

.navbar-links {
  display: flex;
  gap: 30px;
  position: relative;
}

.navbar-links a {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  font-size: 1.1rem;
  transition: color 0.3s;
  position: relative;
}

.navbar-links a:hover {
  color: #3498db;
}

.navbar-links a.router-link-exact-active {
  color: #3498db;
}

.navbar-links a.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 3px;
  background: #3498db;
  border-radius: 2px;
}

/* 评级服务下拉菜单样式 */
.dropdown-container {
  position: relative;
}

.dropdown-toggle {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  font-size: 1.1rem;
}

.dropdown-toggle:hover {
  color: #3498db;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 5px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
  z-index: 100;
}

.dropdown-menu.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-menu .dropdown-item {
  display: block;
  padding: 12px 20px;
  text-decoration: none;
  color: #2c3e50;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.dropdown-menu .dropdown-item:hover {
  background: #f8f9fa;
  color: #3498db;
}

.user-menu {
  position: relative;
  display: flex;
  align-items: center;
  z-index: 1001; /* 确保用户菜单在最上层 */
}

/* 修复头像点击区域 - 扩大可点击范围 */
.avatar-container {
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.avatar-container:hover {
  background-color: rgba(0,0,0,0.05);
}

.avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #f0f7ff;
  transition: all 0.3s;
}

.avatar:hover {
  border-color: #3498db;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.auth-buttons {
  display: flex;
  gap: 10px;
}

.login-btn, .register-btn {
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.login-btn {
  background: transparent;
  border: 1px solid #3498db;
  color: #3498db;
}

.login-btn:hover {
  background: #3498db;
  color: white;
}

.register-btn {
  background: #3498db;
  border: 1px solid #3498db;
  color: white;
}

.register-btn:hover {
  background: #2980b9;
}

.dropdown {
  position: absolute;
  top: 55px;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  width: 200px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s;
  z-index: 10;
}

.dropdown.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #2c3e50;
}

.dropdown-item:hover {
  background: #f8f9fa;
  color: #3498db;
}

.dropdown-divider {
  height: 1px;
  background: #eee;
  margin: 5px 0;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
}

.menu-toggle span {
  width: 100%;
  height: 3px;
  background: #2c3e50;
  border-radius: 3px;
  transition: all 0.3s;
}

/* 移动端样式调整 */
@media (max-width: 992px) {
  .menu-toggle {
    display: flex;
  }
  
  .navbar-links {
    position: fixed;
    top: 0;
    right: -300px;
    width: 280px;
    height: 100vh;
    background: white;
    flex-direction: column;
    padding: 80px 30px 30px;
    box-shadow: -5px 0 15px rgba(0,0,0,0.1);
    transition: right 0.3s;
    z-index: 5;
  }
  
  .navbar-links.active {
    right: 0;
  }
  
  .navbar-links a, .dropdown-toggle {
    padding: 12px 0;
    border-bottom: 1px solid #eee;
    width: 100%;
  }
  
  .dropdown-menu {
    position: static;
    opacity: 1;
    visibility: visible;
    transform: none;
    box-shadow: none;
    padding-left: 15px;
    display: none;
    margin: 0;
  }
  
  .dropdown-menu.active {
    display: block;
  }
  
  .navbar-links a.router-link-exact-active::after {
    display: none;
  }
  
  .user-menu {
    margin-left: auto;
    margin-right: 15px;
  }
  
  .dropdown {
    right: 15px;
  }
}

@media (max-width: 576px) {
  .logo img {
    height: 60px;
  }
  
  .avatar {
    width: 40px;
    height: 40px;
  }
  
  .auth-buttons {
    gap: 5px;
  }
  
  .login-btn, .register-btn {
    padding: 6px 12px;
    font-size: 0.9rem;
  }
}
</style>