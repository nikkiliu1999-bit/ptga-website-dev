import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Lookup from '../views/Lookup.vue'
import SearchBar from '../views/SearchBar.vue'
import Showcase from '../views/Showcase.vue'
import GradingServices from '../views/GradingServices.vue'
import GradingScale from '../views/GradingScale.vue'
import GradingProcess from '../views/GradingProcess.vue'
import GradingPricing from '../views/GradingPricing.vue'
import GradingCaseDesign from '../views/GradingCaseDesign.vue'
import ServiceAgreement from '../views/ServiceAgreement.vue'
import CustomerService from '../views/CustomerService.vue'
import Submit from '../views/Submit.vue'
import { supabase } from '../supabase'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/lookup',
    name: 'Lookup',
    component: SearchBar
  },
  {
    path: '/certificate',
    name: 'CertificateLookup',
    component: Lookup,
    props: (route) => ({ cert: route.query.cert })
  },
  {
    path: '/showcase',
    name: 'Showcase',
    component: Showcase
  },
  {
    path: '/grading',
    name: 'GradingServices',
    component: GradingServices,
    children: [
      {
        path: '',
        redirect: { name: 'GradingProcess' }
      },
      {
        path: 'process',
        name: 'GradingProcess',
        component: GradingProcess
      },
      {
        path: 'scale',
        name: 'GradingScale',
        component: GradingScale
      },
      {
        path: 'pricing',
        name: 'GradingPricing',
        component: GradingPricing
      }
    ]
  },
  {
    path: '/grading/casedesign',
    name: 'GradingCaseDesign',
    component: GradingCaseDesign
  },
  {
    path: '/protection-policy',
    name: 'ServiceAgreement',
    component: ServiceAgreement
  },
  {
    path: '/customerservice',
    name: 'CustomerService',
    component: CustomerService,
    //meta: { requiresAuth: true }
  },
  {
    path: '/submit',
    name: 'Submit',
    component: Submit,
    meta: { requiresAuth: true } // 添加认证标记
  },
  // 认证相关路由
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/UserAccount.vue'),
    meta: { requiresAuth: true }
  },
  // 添加密码重置页面路由
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('../views/ResetPassword.vue') // 对应你创建的密码重置组件
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // 添加滚动行为配置
  scrollBehavior(to, from, savedPosition) {
    // 如果是通过浏览器前进/后退按钮导航，恢复之前的滚动位置
    if (savedPosition) {
      return savedPosition;
    } 
    // 否则滚动到顶部
    else {
      return { top: 0 };
    }
  }
})

// 添加路由守卫
router.beforeEach(async (to) => {
  // 获取当前用户
  const { data: { user } } = await supabase.auth.getUser()
  
  // 检查是否需要认证
  if (to.meta.requiresAuth && !user) {
    return { 
      name: 'Login', 
      query: { redirect: to.fullPath } 
    }
  }
  
  // 如果用户已登录但访问登录/注册页，重定向到首页
  if ((to.name === 'Login' || to.name === 'Register') && user) {
    return { name: 'Home' }
  }

  // 密码重置页面不需要认证，任何人都可以访问（即使已登录）
})

export default router