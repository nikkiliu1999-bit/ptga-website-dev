<template>
  <div class="user-account-container">
    <div v-if="loading" class="text-center py-20">
      <div class="spinner">
        <i class="fas fa-spinner fa-spin fa-3x" style="color: #4776E6;"></i>
        <p class="mt-4 text-lg">加载中，请稍候...</p>
      </div>
    </div>
    
    <div v-else-if="user">
      <!-- 账户信息部分 -->
      <div class="account-card">
        <div class="account-header">
          <div class="avatar">
            {{ userInitials }}
          </div>
          <div class="account-info">
            <h1>{{ user.email }}</h1>
            <p class="account-meta">注册于: {{ formatDate(user.created_at) }}</p>
          </div>
        </div>
        
        <button 
          @click="logout"
          class="logout-btn"
        >
          <i class="fas fa-sign-out-alt"></i> 退出登录
        </button>
      </div>
      
      <!-- 订单记录部分 -->
      <div id="orders" class="orders-section">
        <div class="section-header">
          <h3 class="section-title">
            <i class="fas fa-shopping-bag"></i> 我的订单记录
          </h3>
        </div>
        
        <div v-if="orders.length === 0" class="no-data">
          <i class="fas fa-box-open"></i>
          <p>暂无订单记录</p>
        </div>
        
        <div v-else class="table-container">
          <table>
            <thead>
              <tr>
                <th>订单号</th>
                <th>提交日期</th>
                <th>商品数量</th>
                <th>总金额</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.id">
                <td>{{ order.tracking_id }}</td>
                <td>{{ formatDate(order.created_at) }}</td>
                <td>{{ order.items_count }}</td>
                <td>¥{{ order.total_price }}</td>
                <td>
                  <span :class="['status-badge', statusClass(order.status)]">
                    {{ order.status }}
                  </span>
                </td>
                <td>
                  <button @click="viewOrderDetails(order.id)" class="action-btn">
                    查看详情
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- 反馈部分 -->
      <div id="feedbacks" class="feedbacks-section">
        <div class="section-header">
          <h3 class="section-title">
            <i class="fas fa-comments"></i> 我的反馈
          </h3>
          <button 
            @click="navigateToCustomerService"
            class="new-feedback-btn"
          >
            <i class="fas fa-plus"></i> 提交新反馈
          </button>
        </div>
        
        <div v-if="loadingFeedbacks" class="text-center py-10">
          <i class="fas fa-spinner fa-spin fa-2x" style="color: #4776E6;"></i>
          <p class="mt-2">加载反馈中...</p>
        </div>
        
        <div v-else-if="feedbacks.length === 0" class="no-data">
          <i class="fas fa-comment-slash"></i>
          <p>暂无反馈记录</p>
        </div>
        
        <div v-else class="feedback-list">
          <div 
            v-for="feedback in feedbacks" 
            :key="feedback.id"
            class="feedback-card"
          >
            <div class="feedback-header">
              <div>
                <span class="feedback-date">{{ formatDate(feedback.submitted_at) }}</span>
                <span class="feedback-type">{{ formatFeedbackType(feedback.feedbackType) }}</span>
              </div>
              <span class="feedback-id">反馈ID: {{ feedback.id ? String(feedback.id).substring(0, 8) : '' }}</span>
            </div>
            <p class="feedback-content">{{ feedback.message }}</p>
            <div class="feedback-meta">
              <span>提交人: {{ feedback.name || '匿名' }}</span>
              <span>邮箱: {{ feedback.email }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 订单详情模态框 -->
      <div v-if="selectedOrder" class="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h3 class="modal-title">订单详情 #{{ selectedOrder.tracking_id }}</h3>
            <button @click="closeOrderDetails" class="close-btn">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="grid-cols-2">
              <div>
                <div class="info-group">
                  <div class="info-label">订单号</div>
                  <div class="info-value">{{ selectedOrder.tracking_id }}</div>
                </div>
                
                <div class="info-group">
                  <div class="info-label">提交日期</div>
                  <div class="info-value">{{ formatDate(selectedOrder.created_at) }}</div>
                </div>
                
                <div class="info-group">
                  <div class="info-label">状态</div>
                  <div class="info-value">
                    <span :class="['status-badge', statusClass(selectedOrder.status)]">
                      {{ selectedOrder.status }}
                    </span>
                  </div>
                </div>
                
                <div class="info-group">
                  <div class="info-label">总金额</div>
                  <div class="info-value">¥{{ selectedOrder.total_price }}</div>
                </div>
                
                <div class="info-group">
                  <h4 class="info-label" style="font-size: 18px; margin-top: 25px;">收件信息</h4>
                </div>
                
                <div class="info-group">
                  <div class="info-label">收件人</div>
                  <div class="info-value">{{ selectedOrder.customer_name }}</div>
                </div>
                
                <div class="info-group">
                  <div class="info-label">电话</div>
                  <div class="info-value">{{ selectedOrder.phone }}</div>
                </div>
                
                <div class="info-group">
                  <div class="info-label">地址</div>
                  <div class="info-value">{{ selectedOrder.address }}</div>
                </div>
              </div>
              
              <div>
                <h4 class="info-label" style="font-size: 18px; margin-bottom: 15px;">商品列表</h4>
                
                <div v-for="(item, index) in orderItems" :key="index" class="item-card">
                  <div class="item-title">商品 #{{ index + 1 }}: {{ item.character_name }}</div>
                  <div class="item-details">
                    <div>
                      <span class="detail-label">品牌:</span>
                      <span class="detail-value">{{ item.brand }}</span>
                    </div>
                    <div>
                      <span class="detail-label">服务类型:</span>
                      <span class="detail-value">{{ item.service_type === 'standard' ? '标准版' : '旗舰版' }}</span>
                    </div>
                    <div>
                      <span class="detail-label">包装盒:</span>
                      <span class="detail-value">{{ formatBoxType(item.box_type) }}</span>
                    </div>
                    <div>
                      <span class="detail-label">保价:</span>
                      <span class="detail-value">¥{{ item.insurance_value }} (¥{{ calculateInsurance(item.insurance_value) }}保费)</span>
                    </div>
                    <div>
                      <span class="detail-label">价格:</span>
                      <span class="detail-value">¥{{ item.item_price }}</span>
                    </div>
                  </div>
                  <div class="mt-3">
                    <div class="detail-label">备注:</div>
                    <p class="detail-value">{{ item.notes || '无备注' }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button @click="closeOrderDetails" class="btn btn-secondary">
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="login-prompt">
      <h2>您尚未登录</h2>
      <p>请登录以访问您的账户信息</p>
      <router-link 
        :to="{ name: 'Login' }" 
        class="login-btn"
      >
        立即登录
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { supabase } from '../supabase';
import { useAuth } from '../composables/useAuth';

const router = useRouter();
const route = useRoute();
const { user, logout: authLogout, loading } = useAuth();
const orders = ref([]);
const feedbacks = ref([]);
const selectedOrder = ref(null);
const orderItems = ref([]);
const loadingFeedbacks = ref(false);

// 用户名字首字母
const userInitials = computed(() => {
  if (!user.value?.email) return 'U';
  const [name] = user.value.email.split('@');
  return name[0].toUpperCase();
});

const logout = async () => {
  await authLogout();
  router.push({ name: 'Home' });
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const statusClass = (status) => {
  if (!status) return "";
  const statusLower = status.toLowerCase();
  if (statusLower.includes('pending')) return 'status-pending';
  if (statusLower.includes('processing')) return 'status-processing';
  if (statusLower.includes('completed')) return 'status-completed';
  if (statusLower.includes('shipped')) return 'status-shipped';
  if (statusLower.includes('cancelled')) return 'status-cancelled';
  return "";
};

const formatBoxType = (type) => {
  if (!type) return "";
  switch (type) {
    case 'small': return '小号盒子';
    case 'medium': return '中号盒子';
    case 'custom': return '定制盒子';
    default: return type;
  }
};

const calculateInsurance = (value) => {
  if (!value) return 0;
  return Math.round(value * 0.01);
};

// 反馈相关方法 - 匹配表结构
const formatFeedbackType = (type) => {
  if (!type) return "";
  const types = {
    'question': '问题咨询',
    'suggestion': '功能建议',
    'complaint': '投诉',
    'order': '订单相关',
    'other': '其他'
  };
  return types[type] || type;
};

// 导航到客户服务页面提交新反馈
const navigateToCustomerService = () => {
  router.push({ name: 'CustomerService' });
};

// 订单详情相关方法
const viewOrderDetails = async (orderId) => {
  try {
    // 获取订单详情
    const { data: orderData, error: orderError } = await supabase
      .from('submissions')
      .select('*')
      .eq('id', orderId)
      .single();
    
    if (orderError) throw orderError;
    
    selectedOrder.value = orderData;
    
    // 获取订单商品
    const { data: itemsData, error: itemsError } = await supabase
      .from('submission_items')
      .select('*')
      .eq('submission_id', orderData.tracking_id);
    
    if (itemsError) throw itemsError;
    
    orderItems.value = itemsData;
  } catch (error) {
    console.error('获取订单详情失败:', error);
    alert('无法加载订单详情，请稍后再试');
  }
};

const closeOrderDetails = () => {
  selectedOrder.value = null;
  orderItems.value = [];
};

// 加载用户反馈 - 完全匹配表结构
const loadFeedbacks = async () => {
  if (user.value) {
    loadingFeedbacks.value = true;
    try {
      console.log('当前用户ID:', user.value.id);
      
      // 精确匹配表结构的查询
      const { data: feedbackData, error } = await supabase
        .from('feedbacks')
        .select('*')
        .eq('user_id', user.value.id)  // 匹配表中的user_id字段
        .order('submitted_at', { ascending: false });  // 使用表中的submitted_at字段排序
      
      if (error) {
        console.error('Supabase反馈查询错误:', error);
        throw error;
      }
      
      console.log('获取到的反馈数据:', feedbackData);
      feedbacks.value = feedbackData || [];
    } catch (error) {
      console.error('反馈加载错误:', error);
      alert('反馈加载失败: ' + error.message);
    } finally {
      loadingFeedbacks.value = false;
    }
  }
};

// 加载用户订单
const loadOrders = async () => {
  if (user.value) {
    try {
      const { data: ordersData, error } = await supabase
        .from('submissions')
        .select('*')
        .eq('user_id', user.value.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      orders.value = ordersData || [];
    } catch (error) {
      console.error('订单加载错误:', error);
      alert('订单加载失败，请刷新页面重试');
    }
  }
};

// 滚动到锚点位置
const scrollToAnchor = (hash) => {
  if (hash) {
    setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) {
        const offset = 100; // 导航栏高度偏移
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        });
      }
    }, 100);
  }
};

// 监听路由变化
watch(() => route.hash, (hash) => {
  scrollToAnchor(hash);
});

onMounted(async () => {
  if (user.value) {
    loading.value = true;
    
    try {
      // 加载订单和反馈
      await Promise.all([loadOrders(), loadFeedbacks()]);
      
      // 初始加载时检查锚点
      if (route.hash) {
        scrollToAnchor(route.hash);
      }
    } catch (error) {
      console.error('初始化错误:', error);
    } finally {
      loading.value = false;
    }
  }
});
</script>

<style scoped>
.user-account-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Poppins', 'Segoe UI', sans-serif;
}

/* 账户信息卡片 */
.account-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  padding: 30px;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.account-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.account-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 8px;
  background: linear-gradient(90deg, #4776E6, #8E54E9);
}

.account-header {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4776E6, #8E54E9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 36px;
  font-weight: 600;
  margin-right: 20px;
  box-shadow: 0 5px 15px rgba(71, 118, 230, 0.3);
}

.account-info h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 5px;
  color: #2c3e50;
}

.account-meta {
  color: #7f8c8d;
  font-size: 16px;
}

.logout-btn {
  background: linear-gradient(135deg, #ff6b6b, #ff4757);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
  display: flex;
  align-items: center;
}

.logout-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(255, 107, 107, 0.4);
}

.logout-btn i {
  margin-right: 8px;
}

/* 订单记录部分 */
.orders-section {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  padding: 30px;
  margin-bottom: 30px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f1f2f6;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  display: flex;
  align-items: center;
}

.section-title i {
  margin-right: 12px;
  color: #4776E6;
  font-size: 26px;
}

.no-data {
  text-align: center;
  padding: 40px 20px;
  color: #7f8c8d;
  font-size: 18px;
}

.no-data i {
  font-size: 48px;
  margin-bottom: 15px;
  color: #bdc3c7;
}

/* 表格样式 */
.table-container {
  overflow-x: auto;
  border-radius: 15px;
  border: 1px solid #f1f2f6;
}

.table-container table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 800px;
}

.table-container thead {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
}

.table-container th {
  padding: 16px 20px;
  text-align: left;
  font-weight: 600;
  color: #2c3e50;
  border-bottom: 2px solid #f1f2f6;
}

.table-container td {
  padding: 14px 20px;
  border-bottom: 1px solid #f1f2f6;
  color: #34495e;
}

.table-container tbody tr {
  transition: background-color 0.2s ease;
}

.table-container tbody tr:hover {
  background-color: #f8f9fa;
}

.status-badge {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  display: inline-block;
}

.action-btn {
  background: none;
  border: none;
  color: #3498db;
  font-weight: 600;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background-color: rgba(52, 152, 219, 0.1);
  color: #2980b9;
}

/* 反馈部分 */
.feedbacks-section {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  padding: 30px;
  margin-bottom: 30px;
}

.new-feedback-btn {
  background: linear-gradient(135deg, #4776E6, #8E54E9);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.new-feedback-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(71, 118, 230, 0.4);
}

.new-feedback-btn i {
  margin-right: 8px;
}

.feedback-card {
  background: #fff;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  border-left: 4px solid #4776E6;
  transition: all 0.3s ease;
}

.feedback-card:hover {
  transform: translateX(5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.07);
}

.feedback-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.feedback-date {
  color: #7f8c8d;
  font-size: 14px;
}

.feedback-type {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background-color: #e3f2fd;
  color: #1976d2;
  margin-left: 10px;
}

.feedback-id {
  font-size: 13px;
  color: #95a5a6;
  background: #f8f9fa;
  padding: 3px 8px;
  border-radius: 5px;
}

.feedback-content {
  color: #2c3e50;
  line-height: 1.6;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px dashed #f1f2f6;
}

.feedback-meta {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #7f8c8d;
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
}

.modal {
  background: white;
  border-radius: 20px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow: auto;
  position: relative;
}

.modal-header {
  padding: 20px 30px;
  border-bottom: 1px solid #f1f2f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
}

.modal-title {
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
}

.close-btn {
  background: none;
  border: none;
  color: #7f8c8d;
  font-size: 24px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #f8f9fa;
  color: #e74c3c;
}

.modal-body {
  padding: 30px;
}

.grid-cols-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.info-group {
  margin-bottom: 20px;
}

.info-label {
  font-weight: 600;
  color: #7f8c8d;
  margin-bottom: 8px;
  font-size: 14px;
}

.info-value {
  font-size: 16px;
  color: #2c3e50;
  font-weight: 500;
}

.item-card {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
}

.item-title {
  font-weight: 700;
  margin-bottom: 10px;
  color: #2c3e50;
}

.item-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  font-size: 14px;
}

.detail-label {
  color: #7f8c8d;
}

.detail-value {
  color: #2c3e50;
  font-weight: 500;
}

.modal-footer {
  padding: 20px 30px;
  border-top: 1px solid #f1f2f6;
  display: flex;
  justify-content: flex-end;
}

.btn {
  padding: 10px 25px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.btn-secondary {
  background: #f1f2f6;
  color: #2c3e50;
  margin-right: 15px;
}

.btn-secondary:hover {
  background: #e9ecef;
}

.btn-primary {
  background: linear-gradient(135deg, #4776E6, #8E54E9);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(71, 118, 230, 0.4);
}

/* 登录提示 */
.login-prompt {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.login-prompt h2 {
  font-size: 28px;
  margin-bottom: 20px;
  color: #2c3e50;
}

.login-prompt p {
  font-size: 18px;
  color: #7f8c8d;
  margin-bottom: 30px;
}

.login-btn {
  display: inline-block;
  padding: 14px 35px;
  background: linear-gradient(135deg, #4776E6, #8E54E9);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
}

.login-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(71, 118, 230, 0.4);
}

/* 状态标签样式 */
.status-pending { color: #d35400; background-color: #fef9e7; }
.status-processing { color: #2980b9; background-color: #e3f2fd; }
.status-completed { color: #27ae60; background-color: #e8f5e9; }
.status-shipped { color: #8e44ad; background-color: #f3e5f5; }
.status-cancelled { color: #c0392b; background-color: #ffebee; }

/* 响应式设计 */
@media (max-width: 992px) {
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
  
  .account-header {
    flex-direction: column;
    text-align: center;
  }
  
  .avatar {
    margin-right: 0;
    margin-bottom: 15px;
  }
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
}

@media (max-width: 576px) {
  .user-account-container {
    padding: 15px;
  }
  
  .account-card, .orders-section, .feedbacks-section {
    padding: 20px;
  }
  
  .modal-body {
    padding: 20px;
  }
  
  .feedback-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .feedback-type {
    margin-left: 0;
    margin-top: 5px;
  }
}
</style>