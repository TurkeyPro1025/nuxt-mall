import type { User } from '~/types'

export const useUserStore = () => {
  const user = ref<User | null>(null)
  const isLoggedIn = computed(() => !!user.value)

  // 登录
  const login = async (email: string, password: string) => {
    // 模拟登录API调用
    try {
      // 这里应该调用真实的API
      const mockUser: User = {
        id: 1,
        username: 'demo_user',
        email: email,
        firstName: '演示',
        lastName: '用户',
        avatar: 'https://via.placeholder.com/100x100'
      }
      
      user.value = mockUser
      
      // 保存到localStorage
      if (process.client) {
        localStorage.setItem('user', JSON.stringify(mockUser))
      }
      
      return { success: true, user: mockUser }
    } catch (error) {
      return { success: false, error: '登录失败' }
    }
  }

  // 注册
  const register = async (userData: Partial<User> & { password: string }) => {
    // 模拟注册API调用
    try {
      const newUser: User = {
        id: Date.now(),
        username: userData.username || '',
        email: userData.email || '',
        firstName: userData.firstName,
        lastName: userData.lastName
      }
      
      user.value = newUser
      
      if (process.client) {
        localStorage.setItem('user', JSON.stringify(newUser))
      }
      
      return { success: true, user: newUser }
    } catch (error) {
      return { success: false, error: '注册失败' }
    }
  }

  // 登出
  const logout = () => {
    user.value = null
    if (process.client) {
      localStorage.removeItem('user')
    }
  }

  // 从localStorage加载用户信息
  const loadFromStorage = () => {
    if (process.client) {
      const saved = localStorage.getItem('user')
      if (saved) {
        user.value = JSON.parse(saved)
      }
    }
  }

  // 更新用户信息
  const updateProfile = async (updates: Partial<User>) => {
    if (user.value) {
      user.value = { ...user.value, ...updates }
      
      if (process.client) {
        localStorage.setItem('user', JSON.stringify(user.value))
      }
      
      return { success: true, user: user.value }
    }
    return { success: false, error: '用户未登录' }
  }

  return {
    user: readonly(user),
    isLoggedIn,
    login,
    register,
    logout,
    loadFromStorage,
    updateProfile
  }
} 