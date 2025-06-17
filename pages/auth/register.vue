<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <NuxtLink to="/" class="text-3xl font-bold text-blue-600">
            原创商城
        </NuxtLink>
        <h2 class="mt-6 text-3xl font-bold text-gray-900">
          创建您的账户
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          已有账户？
          <NuxtLink to="/auth/login" class="text-blue-600 hover:text-blue-500 font-medium">
            立即登录
          </NuxtLink>
        </p>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="handleRegister" class="space-y-6">
          <!-- 用户名 -->
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">
              用户名
            </label>
            <div class="mt-1">
              <input
                id="username"
                v-model="form.username"
                type="text"
                required
                class="input-field"
                placeholder="输入您的用户名"
                :class="{ 'border-red-500': errors.username }"
              >
              <p v-if="errors.username" class="mt-1 text-sm text-red-600">
                {{ errors.username }}
              </p>
            </div>
          </div>

          <!-- 邮箱 -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              邮箱地址
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="input-field"
                placeholder="输入您的邮箱"
                :class="{ 'border-red-500': errors.email }"
              >
              <p v-if="errors.email" class="mt-1 text-sm text-red-600">
                {{ errors.email }}
              </p>
            </div>
          </div>

          <!-- 密码 -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              密码
            </label>
            <div class="mt-1 relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="input-field pr-10"
                placeholder="设置您的密码"
                :class="{ 'border-red-500': errors.password }"
              >
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                  v-if="showPassword"
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <svg
                  v-else
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
              </button>
              <p v-if="errors.password" class="mt-1 text-sm text-red-600">
                {{ errors.password }}
              </p>
            </div>

            <!-- 密码强度指示器 -->
            <div v-if="form.password" class="mt-2">
              <div class="text-xs text-gray-500 mb-1">密码强度</div>
              <div class="flex space-x-1">
                <div 
                  v-for="i in 4" 
                  :key="i"
                  class="h-1 flex-1 rounded"
                  :class="getPasswordStrengthColor(i)"
                ></div>
              </div>
              <div class="text-xs mt-1" :class="getPasswordStrengthTextColor()">
                {{ getPasswordStrengthText() }}
              </div>
            </div>
          </div>

          <!-- 确认密码 -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              确认密码
            </label>
            <div class="mt-1 relative">
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                class="input-field pr-10"
                placeholder="再次输入密码"
                :class="{ 'border-red-500': errors.confirmPassword }"
              >
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                  v-if="showConfirmPassword"
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <svg
                  v-else
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
              </button>
              <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">
                {{ errors.confirmPassword }}
              </p>
            </div>
          </div>

          <!-- 服务条款和隐私政策 -->
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="agreements"
                v-model="form.agreeToTerms"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                :class="{ 'border-red-500': errors.agreeToTerms }"
              >
            </div>
            <div class="ml-3 text-sm">
              <label for="agreements" class="text-gray-700">
                我同意
                <a href="#" class="text-blue-600 hover:text-blue-500 font-medium">服务条款</a>
                和
                <a href="#" class="text-blue-600 hover:text-blue-500 font-medium">隐私政策</a>
              </label>
              <p v-if="errors.agreeToTerms" class="mt-1 text-red-600">
                {{ errors.agreeToTerms }}
              </p>
            </div>
          </div>

          <!-- 营销邮件订阅 -->
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="newsletter"
                v-model="form.subscribeNewsletter"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              >
            </div>
            <div class="ml-3 text-sm">
              <label for="newsletter" class="text-gray-700">
                订阅我们的邮件通讯，获取最新优惠信息（可选）
              </label>
            </div>
          </div>

          <!-- 注册按钮 -->
          <div>
            <button
              type="submit"
              :disabled="isLoading || !isFormValid"
              class="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isLoading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                注册中...
              </span>
              <span v-else>创建账户</span>
            </button>
          </div>

          <!-- 分割线 -->
          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">或者使用</span>
              </div>
            </div>
          </div>

          <!-- 社交注册 -->
          <div class="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span class="ml-2">Google</span>
            </button>

            <button
              type="button"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.986C24.007 5.367 18.641.001 12.017.001z"/>
              </svg>
              <span class="ml-2">微信</span>
            </button>
          </div>
        </form>

        <!-- 注册须知 -->
        <div class="mt-6 p-4 bg-green-50 rounded-lg">
          <div class="flex">
            <svg class="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-green-800">
                注册完全免费
              </h3>
              <div class="mt-2 text-sm text-green-700">
                <p>• 注册后即可享受所有会员权益</p>
                <p>• 我们承诺保护您的隐私信息</p>
                <p>• 24小时客服支持</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 页面头部设置
useHead({
  title: '注册 - 商城学习项目'
})

// 表单数据
const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false,
  subscribeNewsletter: false
})

// 状态
const isLoading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const errors = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: ''
})

// 计算属性
const isFormValid = computed(() => {
  return form.value.username && 
         form.value.email && 
         form.value.password && 
         form.value.confirmPassword && 
         form.value.agreeToTerms &&
         form.value.password === form.value.confirmPassword &&
         getPasswordStrength() >= 2
})

// 密码强度计算
const getPasswordStrength = () => {
  const password = form.value.password
  if (!password) return 0
  
  let strength = 0
  
  // 长度检查
  if (password.length >= 8) strength++
  if (password.length >= 12) strength++
  
  // 复杂度检查
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
  if (/\d/.test(password)) strength++
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++
  
  return Math.min(strength, 4)
}

const getPasswordStrengthColor = (index: number) => {
  const strength = getPasswordStrength()
  if (index <= strength) {
    if (strength <= 1) return 'bg-red-500'
    if (strength <= 2) return 'bg-yellow-500'
    if (strength <= 3) return 'bg-blue-500'
    return 'bg-green-500'
  }
  return 'bg-gray-200'
}

const getPasswordStrengthText = () => {
  const strength = getPasswordStrength()
  if (strength <= 1) return '弱'
  if (strength <= 2) return '中等'
  if (strength <= 3) return '强'
  return '非常强'
}

const getPasswordStrengthTextColor = () => {
  const strength = getPasswordStrength()
  if (strength <= 1) return 'text-red-600'
  if (strength <= 2) return 'text-yellow-600'
  if (strength <= 3) return 'text-blue-600'
  return 'text-green-600'
}

// 表单验证方法
const validateForm = () => {
  errors.value = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: ''
  }
  
  let isValid = true

  // 用户名验证
  if (!form.value.username) {
    errors.value.username = '请输入用户名'
    isValid = false
  } else if (form.value.username.length < 3) {
    errors.value.username = '用户名至少需要3个字符'
    isValid = false
  } else if (form.value.username.length > 20) {
    errors.value.username = '用户名不能超过20个字符'
    isValid = false
  } else if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(form.value.username)) {
    errors.value.username = '用户名只能包含字母、数字、下划线和中文'
    isValid = false
  }

  // 邮箱验证
  if (!form.value.email) {
    errors.value.email = '请输入邮箱地址'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = '邮箱格式不正确'
    isValid = false
  }

  // 密码验证
  if (!form.value.password) {
    errors.value.password = '请输入密码'
    isValid = false
  } else if (form.value.password.length < 6) {
    errors.value.password = '密码至少需要6位字符'
    isValid = false
  } else if (getPasswordStrength() < 2) {
    errors.value.password = '密码强度太弱，请包含大小写字母和数字'
    isValid = false
  }

  // 确认密码验证
  if (!form.value.confirmPassword) {
    errors.value.confirmPassword = '请确认密码'
    isValid = false
  } else if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = '两次输入的密码不一致'
    isValid = false
  }

  // 服务条款验证
  if (!form.value.agreeToTerms) {
    errors.value.agreeToTerms = '请同意服务条款和隐私政策'
    isValid = false
  }

  return isValid
}

// 注册处理方法
const handleRegister = async () => {
  if (!validateForm()) {
    return
  }

  isLoading.value = true

  try {
    // 模拟注册API调用
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 模拟注册成功
    console.log('注册成功:', {
      username: form.value.username,
      email: form.value.email,
      subscribeNewsletter: form.value.subscribeNewsletter
    })
    
    // 显示成功消息（这里可以使用通知组件）
    alert('注册成功！即将跳转到登录页面...')
    
    // 跳转到登录页面
    await navigateTo('/auth/login')
  } catch (error) {
    console.error('注册失败:', error)
    // 处理注册错误
    alert('注册失败，请稍后重试')
  } finally {
    isLoading.value = false
  }
}

// 清除错误信息的监听器
watch(() => form.value.username, () => {
  if (errors.value.username) {
    errors.value.username = ''
  }
})

watch(() => form.value.email, () => {
  if (errors.value.email) {
    errors.value.email = ''
  }
})

watch(() => form.value.password, () => {
  if (errors.value.password) {
    errors.value.password = ''
  }
  // 当密码改变时，也要检查确认密码
  if (form.value.confirmPassword && errors.value.confirmPassword) {
    errors.value.confirmPassword = ''
  }
})

watch(() => form.value.confirmPassword, () => {
  if (errors.value.confirmPassword) {
    errors.value.confirmPassword = ''
  }
})

watch(() => form.value.agreeToTerms, () => {
  if (errors.value.agreeToTerms) {
    errors.value.agreeToTerms = ''
  }
})
</script> 