<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航栏 -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <NuxtLink to="/" class="text-2xl font-bold text-blue-600">
                原创商城
            </NuxtLink>
          </div>

          <!-- 搜索框 -->
          <div class="hidden md:block flex-1 max-w-lg mx-8">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索商品..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                @keyup.enter="search"
              >
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- 右侧菜单 -->
          <div class="flex items-center space-x-4">
            <!-- 分类菜单 -->
            <div class="relative" ref="categoryDropdown">
              <button
                @click="toggleCategoryMenu"
                class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                分类
              </button>
              <div
                v-show="showCategoryMenu"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
              >
                <NuxtLink
                  v-for="category in categories"
                  :key="category.id"
                  :to="`/products?category=${category.slug}`"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="showCategoryMenu = false"
                >
                  {{ category.name }}
                </NuxtLink>
              </div>
            </div>

            <!-- 购物车 -->
            <button
              @click="toggleCart"
              class="relative text-gray-700 hover:text-blue-600 p-2"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6H19"></path>
              </svg>
              <span
                v-if="cartItemsCount > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              >
                {{ cartItemsCount }}
              </span>
            </button>

            <!-- 用户菜单 -->
            <div class="relative" ref="userDropdown">
              <button
                @click="toggleUserMenu"
                class="flex items-center text-gray-700 hover:text-blue-600 p-2"
              >
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </button>
              <div
                v-show="showUserMenu"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
              >
                <template v-if="isLoggedIn">
                  <NuxtLink to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    个人中心
                  </NuxtLink>
                  <NuxtLink to="/orders" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    我的订单
                  </NuxtLink>
                  <button
                    @click="logout"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    退出登录
                  </button>
                </template>
                <template v-else>
                  <NuxtLink to="/auth/login" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    登录
                  </NuxtLink>
                  <NuxtLink to="/auth/register" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    注册
                  </NuxtLink>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- 主要内容 -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- 底部 -->
    <footer class="bg-gray-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">商城</h3>
            <p class="text-gray-300">
              致力于为用户提供优质的购物体验
            </p>
          </div>
          <div>
            <h4 class="text-md font-semibold mb-4">客户服务</h4>
            <ul class="space-y-2 text-gray-300">
              <li><a href="#" class="hover:text-white">帮助中心</a></li>
              <li><a href="#" class="hover:text-white">退换货政策</a></li>
              <li><a href="#" class="hover:text-white">配送信息</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-md font-semibold mb-4">关于我们</h4>
            <ul class="space-y-2 text-gray-300">
              <li><a href="#" class="hover:text-white">公司介绍</a></li>
              <li><a href="#" class="hover:text-white">联系我们</a></li>
              <li><a href="#" class="hover:text-white">招聘信息</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-md font-semibold mb-4">关注我们</h4>
            <ul class="space-y-2 text-gray-300">
              <li><a href="#" class="hover:text-white">微信公众号</a></li>
              <li><a href="#" class="hover:text-white">新浪微博</a></li>
              <li><a href="#" class="hover:text-white">客服电话</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 原创商城</p>
        </div>
      </div>
    </footer>

    <!-- 购物车侧边栏 -->
    <CartSidebar />
  </div>
</template>

<script setup lang="ts">
import { categories } from '~/data/products'

// 购物车store
const cartStore = useCartStore()

// 状态管理
const searchQuery = ref('')
const showCategoryMenu = ref(false)
const showUserMenu = ref(false)

// 计算属性
const cartItemsCount = computed(() => cartStore.totalItems)
const isLoggedIn = ref(false)

// 方法
const search = () => {
  if (searchQuery.value.trim()) {
    navigateTo(`/products?search=${encodeURIComponent(searchQuery.value)}`)
  }
}

const toggleCategoryMenu = () => {
  showCategoryMenu.value = !showCategoryMenu.value
  showUserMenu.value = false
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  showCategoryMenu.value = false
}

const toggleCart = () => {
  cartStore.toggleCart()
}

const logout = () => {
  // 退出登录逻辑
  isLoggedIn.value = false
  showUserMenu.value = false
}

// 点击外部关闭下拉菜单
const categoryDropdown = ref<HTMLElement | null>(null)
const userDropdown = ref<HTMLElement | null>(null)

onMounted(() => {
  // 从localStorage加载购物车数据
  cartStore.loadFromStorage()
  
  const handleClickOutside = (event: Event) => {
    if (categoryDropdown.value && !categoryDropdown.value.contains(event.target as Node)) {
      showCategoryMenu.value = false
    }
    if (userDropdown.value && !userDropdown.value.contains(event.target as Node)) {
      showUserMenu.value = false
    }
  }
  
  document.addEventListener('click', handleClickOutside)
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script> 