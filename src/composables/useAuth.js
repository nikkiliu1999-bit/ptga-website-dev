import { ref, computed } from 'vue'
import { supabase } from '../supabase'

const user = ref(null)
const loading = ref(true)

// 初始化检查用户状态
supabase.auth.getUser().then(({ data }) => {
  user.value = data.user
  loading.value = false
})

// 监听认证状态变化
supabase.auth.onAuthStateChange((event, session) => {
  user.value = session?.user || null
  loading.value = false
})

export const useAuth = () => {
  const isAuthenticated = computed(() => !!user.value)
  
  const login = async (email, password) => {
    loading.value = true
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        // 处理特定登录错误
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('邮箱或密码不正确')
        } else {
          throw error
        }
      }
    } finally {
      loading.value = false
    }
  }
  
  const register = async (email, password) => {
    loading.value = true
    try {
      const { data, error } = await supabase.auth.signUp({ email, password })
      
      if (error) {
        // 处理特定注册错误
        if (error.message.includes('already been registered') || 
            error.message.includes('already exists') ||
            error.message.includes('duplicate key value')) {
          throw new Error('该邮箱已被注册')
        } else if (error.message.includes('Password should be at least 6 characters') || 
                   error.message.includes('Password should contain at least one character of each')) {
          throw new Error('密码至少6位，须至少包含1位大写字母，1位小写字母，1位数字')
        } else {
          throw error
        }
      }
      return data
    } finally {
      loading.value = false
    }
  }
  
  const logout = async () => {
    loading.value = true
    try {
      await supabase.auth.signOut()
    } finally {
      loading.value = false
    }
  }
  
  // 获取用户反馈
  const getFeedback = async () => {
    if (!user.value) return []
    
    try {
      const { data, error } = await supabase
        .from('feedbacks')
        .select('*')
        .eq('user_id', user.value.id)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('获取反馈失败:', error)
      return []
    }
  }
  
  // 提交反馈
  const submitFeedback = async (content) => {
    if (!user.value) return false
    
    try {
      const { error } = await supabase
        .from('feedbacks')
        .insert({
          user_id: user.value.id,
          email: user.value.email,
          content: content,
          status: 'pending'
        })
      
      if (error) throw error
      return true
    } catch (error) {
      console.error('提交反馈失败:', error)
      return false
    }
  }

  return { 
    user, 
    loading,
    isAuthenticated,
    login, 
    register, 
    logout,
    getFeedback,
    submitFeedback
  }
}