<template>
  <div class="submit-container">
    <!-- 页面标题 -->
    <section class="page-header">
      <div class="container">
        <h2>潮玩评级提交系统</h2>
        <p>专业、权威、可信赖的潮玩评级服务，为您的收藏品提供专业认证</p>
      </div>
    </section>

    <div class="container">
      <!-- 消息提示 -->
      <div v-if="showMessage" :class="['message', messageClass]">
        <i :class="messageIcon"></i> {{ messageText }}
      </div>
      
      <!-- 登录提示 -->
      <div v-if="!user" class="login-prompt">
        <h3>请先登录以提交订单</h3>
        <p>登录后您可以追踪订单状态并管理您的提交记录</p>
        <button @click="redirectToLogin" class="login-btn">
          <i class="fas fa-sign-in-alt"></i> 立即登录
        </button>
      </div>
      
      <!-- 成功提交后显示的ID卡片 -->
      <div v-if="submissionSuccess && submissionId" class="success-card">
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h3>提交成功！</h3>
        <p>您的提交ID是：</p>
        <div class="submission-id-display">{{ submissionId }}</div>
        <p class="id-note">请记录此ID用于后续查询和追踪</p>
        <button class="copy-btn" @click="copyToClipboard">
          <i class="fas fa-copy"></i> 复制ID
        </button>
        <button class="new-submission-btn" @click="startNewSubmission">
          <i class="fas fa-plus-circle"></i> 新增提交
        </button>
      </div>
      
      <form @submit.prevent="submitForm" v-if="user && !submissionSuccess">
        <!-- 基础信息部分 -->
        <div class="form-section">
          <h3 class="section-title">基础信息</h3>
          
          <div class="form-row">
            <div class="form-group">
              <label for="name">收件人 <span class="required">*</span></label>
              <input type="text" id="name" class="form-control" v-model="formData.name" required placeholder="请输入收件人姓名">
            </div>
            
            <div class="form-group">
              <label for="phone">联系电话 <span class="required">*</span></label>
              <input type="tel" id="phone" class="form-control" v-model="formData.phone" required placeholder="请输入联系电话">
            </div>
          </div>
          
          <div class="form-group">
            <label for="address">收货地址 <span class="required">*</span></label>
            <input type="text" id="address" class="form-control" v-model="formData.address" required placeholder="请输入详细收货地址">
          </div>
        </div>
        
        <!-- 商品信息部分 -->
        <div class="form-section">
          <h3 class="section-title">送评商品</h3>
          
          <button type="button" class="add-item-btn" @click="addItem">
            <i class="fas fa-plus"></i> 添加商品
          </button>
          
          <!-- 商品列表 -->
          <div v-for="(item, index) in formData.items" :key="index" class="item-card">
            <div class="item-header">
              <h3 class="item-title">商品 #{{ index + 1 }}</h3>
              <button type="button" class="remove-item" @click="removeItem(index)" v-if="formData.items.length > 1">
                <i class="fas fa-times"></i>
              </button>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label :for="'characterName'+index">角色名称 <span class="required">*</span></label>
                <input type="text" :id="'characterName'+index" class="form-control" v-model="item.characterName" required placeholder="请输入角色名称">
              </div>
              
              <div class="form-group">
                <label :for="'brand'+index">品牌 & 系列 <span class="required">*</span></label>
                <input type="text" :id="'brand'+index" class="form-control" v-model="item.brand" required placeholder="请输入品牌和系列">
              </div>
            </div>
            
            <div class="form-group">
              <label>选择包装盒</label>
              <div class="box-options">
                <div class="box-option" :class="{selected: item.boxType === 'small'}" @click="item.boxType = 'small'">
                  <h4>小号盒子</h4>
                  <p>10.5x7.5x6.6cm</p>
                  <div class="box-price">¥15/50</div>
                </div>
                
                <div class="box-option" :class="{selected: item.boxType === 'medium'}" @click="item.boxType = 'medium'">
                  <h4>中号盒子</h4>
                  <p>20x10x8.5cm</p>
                  <div class="box-price">¥20/80</div>
                </div>
                
                <div class="box-option" :class="{selected: item.boxType === 'custom'}" @click="item.boxType = 'custom'">
                  <h4>定制盒子</h4>
                  <p>根据尺寸定制</p>
                  <div class="box-price">尺寸计算</div>
                </div>
              </div>
              
              <!-- 定制盒子尺寸 -->
              <div v-if="item.boxType === 'custom'" class="custom-dimensions">
                <div class="form-group">
                  <label>长度 (cm)</label>
                  <input type="number" class="form-control" v-model="item.customLength" min="1" placeholder="长度">
                </div>
                
                <div class="form-group">
                  <label>宽度 (cm)</label>
                  <input type="number" class="form-control" v-model="item.customWidth" min="1" placeholder="宽度">
                </div>
                
                <div class="form-group">
                  <label>高度 (cm)</label>
                  <input type="number" class="form-control" v-model="item.customHeight" min="1" placeholder="高度">
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label>服务类型</label>
              <div class="service-options">
                <div class="service-option" :class="{selected: item.serviceType === 'standard'}" @click="item.serviceType = 'standard'">
                  <h4>标准版</h4>
                  <p>基础评级服务</p>
                </div>
                
                <div class="service-option" :class="{selected: item.serviceType === 'premium'}" @click="item.serviceType = 'premium'">
                  <h4>旗舰版</h4>
                  <p>高级评级服务</p>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label>个性化附加服务</label>
              <div class="addon-services">
                <div class="addon-service" :class="{selected: item.addons.includes('priority')}">
                  <input type="checkbox" :id="'priority'+index" v-model="item.addons" value="priority">
                  <div class="addon-label">
                    <h4>优先快评</h4>
                    <p>加急处理您的评级请求</p>
                  </div>
                  <div class="addon-price">+¥20</div>
                </div>
                
                <div class="addon-service" :class="{selected: item.addons.includes('tag')}">
                  <input type="checkbox" :id="'tag'+index" v-model="item.addons" value="tag">
                  <div class="addon-label">
                    <h4>加评标签</h4>
                    <p>吊牌/身份卡等附加评级</p>
                  </div>
                  <div class="addon-price">+¥10</div>
                </div>
                
                <div class="addon-service" :class="{selected: item.addons.includes('color')}">
                  <input type="checkbox" :id="'color'+index" v-model="item.addons" value="color">
                  <div class="addon-label">
                    <h4>特殊色标</h4>
                    <p>定制化特殊颜色标签</p>
                  </div>
                  <div class="addon-price">+¥30</div>
                </div>
              </div>
              
              <div class="form-group">
                <label>寄回保价</label>
                <div class="insurance-input">
                  <input type="number" class="form-control" v-model="item.insuranceValue" min="0" placeholder="请输入保价金额">
                  <div class="insurance-price">+¥{{ calculateInsurance(item.insuranceValue) }}</div>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label :for="'notes'+index">备注</label>
              <textarea :id="'notes'+index" class="form-control" v-model="item.notes" placeholder="请说明需要特别注意的地方..."></textarea>
            </div>
            
            <!-- 商品价格摘要 -->
            <div class="price-summary">
              <div class="price-row">
                <div class="price-label">基础服务价格</div>
                <div class="price-value">¥{{ calculateBasePrice(item) }}</div>
              </div>
              
              <div class="price-row" v-if="item.addons.includes('priority')">
                <div class="price-label">优先快评</div>
                <div class="price-value">+¥20</div>
              </div>
              
              <div class="price-row" v-if="item.addons.includes('tag')">
                <div class="price-label">加评标签</div>
                <div class="price-value">+¥10</div>
              </div>
              
              <div class="price-row" v-if="item.addons.includes('color')">
                <div class="price-label">特殊色标</div>
                <div class="price-value">+¥30</div>
              </div>
              
              <div class="price-row" v-if="item.insuranceValue > 0">
                <div class="price-label">寄回保价 ({{ item.insuranceValue }}元)</div>
                <div class="price-value">+¥{{ calculateInsurance(item.insuranceValue) }}</div>
              </div>
              
              <div class="price-row total">
                <div class="price-label">商品总价</div>
                <div class="price-value">¥{{ calculateItemTotal(item) }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 价格汇总 -->
        <div class="form-section">
          <h3 class="section-title">订单总览</h3>
          
          <div class="price-summary">
            <div class="price-row" v-for="(item, index) in formData.items" :key="'summary-'+index">
              <div class="price-label">商品 #{{ index + 1 }} ({{ item.characterName }})</div>
              <div class="price-value">¥{{ calculateItemTotal(item) }}</div>
            </div>
            
            <div class="price-row">
              <div class="price-label">运费</div>
              <div class="price-value">¥0</div>
            </div>
            
            <div class="price-row total">
              <div class="price-label">总计</div>
              <div class="price-value total-price">¥{{ calculateTotalPrice() }}</div>
            </div>
          </div>
          
          <button type="submit" class="submit-btn" :disabled="loading">
            <i class="fas fa-check-circle"></i> 
            {{ loading ? '提交中...' : '确认提交评级订单' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../supabase';
import { useAuth } from '../composables/useAuth';

export default {
  name: 'SubmitPage',
  setup() {
    const router = useRouter();
    const { user } = useAuth();
    
    // 表单数据
    const formData = ref({
      name: '',
      phone: '',
      address: '',
      items: [
        {
          characterName: '',
          brand: '',
          boxType: 'small',
          customLength: null,
          customWidth: null,
          customHeight: null,
          serviceType: 'standard',
          addons: [],
          insuranceValue: 0,
          notes: ''
        }
      ]
    });
    
    const loading = ref(false);
    const showMessage = ref(false);
    const messageText = ref('');
    const messageClass = ref('');
    const messageIcon = ref('');
    const submissionSuccess = ref(false);
    const submissionId = ref('');
    
    // 重定向到登录页
    const redirectToLogin = () => {
      router.push({ 
        name: 'Login', 
        query: { redirect: router.currentRoute.value.fullPath } 
      });
    };
    
    // 生成8位字母数字混合的随机ID
    const generate8CharId = () => {
      // 包含大写字母、小写字母和数字
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let id = '';
      
      for (let i = 0; i < 8; i++) {
        // 随机从字符集中选择一个字符
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      
      return id;
    };
    
    // 检查ID是否已存在，确保唯一性
    const isIdUnique = async (id) => {
      const { data } = await supabase
        .from('submissions')
        .select('tracking_id')
        .eq('tracking_id', id)
        .single();
      
      // 如果查询不到数据，说明ID是唯一的
      return !data;
    };
    
    // 生成唯一的8位ID
    const generateUniqueId = async () => {
      let id = generate8CharId();
      
      // 检查ID是否唯一，如果不唯一则重新生成
      const isUnique = await isIdUnique(id);
      if (!isUnique) {
        return generateUniqueId();
      }
      
      return id;
    };
    
    // 添加新商品
    const addItem = () => {
      formData.value.items.push({
        characterName: '',
        brand: '',
        boxType: 'small',
        customLength: null,
        customWidth: null,
        customHeight: null,
        serviceType: 'standard',
        addons: [],
        insuranceValue: 0,
        notes: ''
      });
    };
    
    // 移除商品
    const removeItem = (index) => {
      formData.value.items.splice(index, 1);
    };
    
    // 开始新的提交
    const startNewSubmission = () => {
      submissionSuccess.value = false;
      submissionId.value = '';
      // 重置表单数据
      formData.value = {
        name: '',
        phone: '',
        address: '',
        items: [
          {
            characterName: '',
            brand: '',
            boxType: 'small',
            customLength: null,
            customWidth: null,
            customHeight: null,
            serviceType: 'standard',
            addons: [],
            insuranceValue: 0,
            notes: ''
          }
        ]
      };
    };
    
    // 价格计算方法
    const calculateBasePrice = (item) => {
      if (item.boxType === 'small') {
        return item.serviceType === 'standard' ? 15 : 50;
      } else if (item.boxType === 'medium') {
        return item.serviceType === 'standard' ? 20 : 80;
      } else if (item.boxType === 'custom') {
        // 定制盒子价格计算: (长+宽+高) x 10
        const length = item.customLength || 0;
        const width = item.customWidth || 0;
        const height = item.customHeight || 0;
        return (length + width + height) * 10;
      }
      return 0;
    };
    
    const calculateInsurance = (value) => {
      return Math.round(value * 0.01);
    };
    
    const calculateItemTotal = (item) => {
      let total = calculateBasePrice(item);
      
      // 附加服务
      if (item.addons.includes('priority')) total += 20;
      if (item.addons.includes('tag')) total += 10;
      if (item.addons.includes('color')) total += 30;
      
      // 保价
      if (item.insuranceValue > 0) {
        total += calculateInsurance(item.insuranceValue);
      }
      
      return total;
    };
    
    const calculateTotalPrice = () => {
      return formData.value.items.reduce((total, item) => {
        return total + calculateItemTotal(item);
      }, 0);
    };
    
    // 复制ID到剪贴板
    const copyToClipboard = () => {
      navigator.clipboard.writeText(submissionId.value)
        .then(() => {
          showMessage.value = true;
          messageText.value = '提交ID已复制到剪贴板';
          messageClass.value = 'success';
          messageIcon.value = 'fas fa-check-circle';
          
          setTimeout(() => {
            showMessage.value = false;
          }, 2000);
        })
        .catch(err => {
          console.error('无法复制内容: ', err);
          showMessage.value = true;
          messageText.value = '复制失败，请手动复制';
          messageClass.value = 'error';
          messageIcon.value = 'fas fa-exclamation-circle';
        });
    };
    
    // 提交表单
    const submitForm = async () => {
      // 检查用户是否登录
      if (!user.value) {
        redirectToLogin();
        return;
      }
      
      // 简单验证
      if (!formData.value.name || !formData.value.phone || !formData.value.address) {
        showMessage.value = true;
        messageText.value = '请填写完整的收件人信息';
        messageClass.value = 'error';
        messageIcon.value = 'fas fa-exclamation-circle';
        return;
      }
      
      for (const item of formData.value.items) {
        if (!item.characterName || !item.brand) {
          showMessage.value = true;
          messageText.value = '请填写完整的商品信息';
          messageClass.value = 'error';
          messageIcon.value = 'fas fa-exclamation-circle';
          return;
        }
        
        if (item.boxType === 'custom' && 
            (!item.customLength || !item.customWidth || !item.customHeight)) {
          showMessage.value = true;
          messageText.value = '请填写定制盒子的尺寸';
          messageClass.value = 'error';
          messageIcon.value = 'fas fa-exclamation-circle';
          return;
        }
      }
      
      loading.value = true;
      
      try {
        // 生成8位唯一的字母数字混合ID
        const generatedId = await generateUniqueId();
        
        // 准备提交数据 - 包含用户ID
        const submissionData = {
          customer_name: formData.value.name,
          phone: formData.value.phone,
          address: formData.value.address,
          total_price: calculateTotalPrice(),
          tracking_id: generatedId,
          user_id: user.value.id,
          items_count: formData.value.items.length  // 添加商品数量
  // 添加用户ID关联
        };
        
        // 插入主表submissions
        const { error: submissionError } = await supabase
          .from('submissions')
          .insert([submissionData]);
          
        if (submissionError) throw submissionError;
        
        // 准备商品数据 - 使用我们生成的ID作为外键
        const itemsData = formData.value.items.map(item => ({
          submission_id: generatedId,  // 使用我们生成的字符串ID
          character_name: item.characterName,
          brand: item.brand,
          box_type: item.boxType,
          box_length: item.customLength,
          box_width: item.customWidth,
          box_height: item.customHeight,
          service_type: item.serviceType,
          is_priority: item.addons.includes('priority'),
          is_tag: item.addons.includes('tag'),
          is_special_color: item.addons.includes('color'),
          insurance_value: item.insuranceValue,
          item_price: calculateItemTotal(item),
          notes: item.notes
        }));
        
        // 插入子表submission_items
        const { error: itemsError } = await supabase
          .from('submission_items')
          .insert(itemsData);
          
        if (itemsError) throw itemsError;
        
        // 提交成功
        submissionSuccess.value = true;
        submissionId.value = generatedId;  // 显示我们生成的ID
        showMessage.value = false;
        
      } catch (error) {
        console.error('提交失败:', error);
        showMessage.value = true;
        messageText.value = '提交失败: ' + error.message;
        messageClass.value = 'error';
        messageIcon.value = 'fas fa-exclamation-circle';
      } finally {
        loading.value = false;
      }
    };
    
    return {
      user,
      formData,
      loading,
      showMessage,
      messageText,
      messageClass,
      messageIcon,
      submissionSuccess,
      submissionId,
      addItem,
      removeItem,
      startNewSubmission,
      calculateBasePrice,
      calculateInsurance,
      calculateItemTotal,
      calculateTotalPrice,
      copyToClipboard,
      submitForm,
      redirectToLogin
    };
  }
}
</script>

<style scoped>
/* 新增登录提示样式 */
.login-prompt {
  background: #fff;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(45, 58, 95, 0.15);
}

.login-prompt h3 {
  font-size: 1.8rem;
  color: #2d3a5f;
  margin-bottom: 15px;
}

.login-prompt p {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 25px;
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

.submit-container {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  color: #333;
  line-height: 1.6;
  padding-bottom: 50px;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 页面标题样式 */
.page-header {
  text-align: center;
  padding: 60px 0 40px;
  background: linear-gradient(to right, #383f50, #474950);
  color: white;
  margin-bottom: 50px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.page-header h2 {
  font-size: 2.8rem;
  margin-bottom: 15px;
  font-weight: 700;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
}

.page-header p {
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
  opacity: 0.9;
}

/* 成功卡片样式 */
.success-card {
  background: white;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(45, 58, 95, 0.15);
  animation: fadeIn 0.5s ease-out;
}

.success-icon {
  font-size: 5rem;
  color: #2ecc71;
  margin-bottom: 20px;
  animation: pulse 1s ease-out;
}

.success-card h3 {
  font-size: 1.8rem;
  color: #2d3a5f;
  margin-bottom: 15px;
}

.success-card p {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 10px;
}

.submission-id-display {
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: #2d3a5f;
  background: #f8f9ff;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  border: 2px dashed #3498db;
  font-family: 'Courier New', monospace;
}

.id-note {
  color: #777;
  font-style: italic;
  margin-bottom: 25px;
}

.copy-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  margin-right: 10px;
  margin-bottom: 15px;
}

.copy-btn i {
  margin-right: 10px;
}

.copy-btn:hover {
  background: #2980b9;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

.new-submission-btn {
  background: #2d3a5f;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  margin-bottom: 15px;
}

.new-submission-btn i {
  margin-right: 10px;
}

.new-submission-btn:hover {
  background: #1a2a4c;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(45, 58, 95, 0.3);
}

/* 表单样式 */
.form-section {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  margin-bottom: 30px;
}

.form-section:hover {
  transform: translateY(-5px);
}

.section-title {
  color: #2d3a5f;
  font-size: 1.8rem;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 3px solid #3498db;
  display: inline-block;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #444;
  font-size: 1.05rem;
}

.form-control {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8f9ff;
}

.form-control:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  outline: none;
  background: white;
}

textarea.form-control {
  min-height: 150px;
  resize: vertical;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

/* 商品卡片 */
.item-card {
  background: #f8f9ff;
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 25px;
  border: 1px solid #e1e4f0;
  position: relative;
  box-shadow: 0 3px 10px rgba(0,0,0,0.05);
  animation: fadeIn 0.5s ease-out;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px dashed #e1e4f0;
}

.item-title {
  font-size: 1.4rem;
  color: #2d3a5f;
  font-weight: 600;
}

.remove-item {
  background: #e74c3c;
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.remove-item:hover {
  background: #c0392b;
  transform: rotate(90deg);
}

/* 盒子选项 */
.box-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.box-option {
  border: 2px solid #e1e4f0;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  position: relative;
  background: white;
}

.box-option:hover {
  border-color: #3498db;
  background: #f0f7ff;
  transform: translateY(-3px);
}

.box-option.selected {
  border-color: #3498db;
  background: #e1f0ff;
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.2);
}

.box-option h4 {
  color: #2d3a5f;
  margin-bottom: 10px;
}

.box-option p {
  color: #666;
  font-size: 0.95rem;
}

.box-price {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #3498db;
  color: white;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
}

.custom-dimensions {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-top: 15px;
}

/* 服务选项 */
.service-options {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
}

.service-option {
  flex: 1;
  min-width: 200px;
  border: 2px solid #e1e4f0;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  background: white;
}

.service-option:hover {
  border-color: #3498db;
  background: #f0f7ff;
  transform: translateY(-3px);
}

.service-option.selected {
  border-color: #3498db;
  background: #e1f0ff;
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.2);
}

.service-option h4 {
  color: #2d3a5f;
  margin-bottom: 10px;
}

.service-option p {
  color: #666;
  font-size: 0.95rem;
}

/* 附加服务 */
.addon-services {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.addon-service {
  display: flex;
  align-items: center;
  padding: 15px;
  border: 2px solid #e1e4f0;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: white;
  cursor: pointer;
}

.addon-service:hover {
  border-color: #3498db;
  background: #f0f7ff;
}

.addon-service.selected {
  border-color: #3498db;
  background: #e1f0ff;
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.2);
}

.addon-service input {
  margin-right: 12px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.addon-label {
  flex: 1;
}

.addon-label h4 {
  color: #2d3a5f;
  margin-bottom: 5px;
}

.addon-label p {
  color: #666;
  font-size: 0.9rem;
}

.addon-price {
  background: #2ecc71;
  color: white;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;
}

/* 保险输入 */
.insurance-input {
  display: flex;
  align-items: center;
  gap: 15px;
}

.insurance-input input {
  flex: 1;
}

.insurance-price {
  background: #9b59b6;
  color: white;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;
  min-width: 80px;
  text-align: center;
}

/* 添加商品按钮 */
.add-item-btn {
  background: #2d3a5f;
  color: white;
  border: none;
  padding: 14px 25px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  margin-bottom: 25px;
  box-shadow: 0 4px 10px rgba(45, 58, 95, 0.3);
}

.add-item-btn i {
  margin-right: 10px;
}

.add-item-btn:hover {
  background: #1a2a4c;
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(45, 58, 95, 0.4);
}

/* 价格汇总 */
.price-summary {
  background: #f8f9ff;
  border-radius: 10px;
  padding: 30px;
  border: 2px solid #e1e4f0;
  margin-top: 20px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px dashed #e1e4f0;
}

.price-row:last-child {
  border-bottom: none;
}

.price-row.total {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2d3a5f;
  margin-top: 10px;
  padding-top: 15px;
}

.price-label {
  color: #555;
}

.price-value {
  font-weight: 600;
  color: #3498db;
}

.total-price {
  color: #e74c3c;
  font-size: 1.6rem;
}

/* 提交按钮 */
.submit-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 16px 40px;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  width: 100%;
  margin-top: 30px;
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

.submit-btn:hover {
  background: #2980b9;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(52, 152, 219, 0.4);
}

.submit-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* 表单消息 */
.message {
  padding: 15px;
  border-radius: 8px;
  margin: 20px 0;
  font-weight: 500;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 1.1rem;
  animation: fadeIn 0.3s ease-out;
}

.message i {
  font-size: 1.3rem;
}

.message.success {
  background: #d4edda;
  color: #155724;
  border-left: 4px solid #28a745;
}

.message.error {
  background: #f8d7da;
  color: #721c24;
  border-left: 4px solid #dc3545;
}

/* 动画效果 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0% { transform: scale(0.8); opacity: 0.7; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .form-row, 
  .box-options, 
  .service-options,
  .custom-dimensions,
  .addon-services {
    grid-template-columns: 1fr;
  }
  
  .page-header h2 {
    font-size: 2.2rem;
  }
  
  .insurance-input {
    flex-direction: column;
    align-items: stretch;
  }
  
  .section-title {
    font-size: 1.6rem;
  }
  
  .item-title {
    font-size: 1.2rem;
  }
  
  .price-row.total {
    font-size: 1.2rem;
  }
  
  .total-price {
    font-size: 1.4rem;
  }
  
  .submission-id-display {
    font-size: 1.8rem;
    letter-spacing: 2px;
    padding: 15px;
  }
  
  .success-icon {
    font-size: 4rem;
  }
  
  .copy-btn, .new-submission-btn {
    width: 100%;
    margin-right: 0;
  }
}

.required {
  color: #e74c3c;
}
</style>