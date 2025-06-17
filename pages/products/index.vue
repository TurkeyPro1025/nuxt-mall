<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- 页面标题 -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">
        {{ pageTitle }}
      </h1>
      <p class="text-gray-600 mt-2">共找到 {{ filteredProducts.length }} 件商品</p>
    </div>

    <div class="lg:grid lg:grid-cols-4 lg:gap-8">
      <!-- 侧边栏筛选 -->
      <div class="hidden lg:block">
        <div class="bg-white rounded-lg p-6 shadow-sm">
          <h3 class="text-lg font-semibold mb-4">筛选</h3>
          
          <!-- 分类筛选 -->
          <div class="mb-6">
            <h4 class="font-medium mb-3">商品分类</h4>
            <div class="space-y-2">
              <label class="flex items-center">
                <input
                  v-model="selectedCategory"
                  type="radio"
                  value=""
                  class="mr-2"
                >
                全部分类
              </label>
              <label
                v-for="category in categories"
                :key="category.id"
                class="flex items-center"
              >
                <input
                  v-model="selectedCategory"
                  type="radio"
                  :value="category.slug"
                  class="mr-2"
                >
                {{ category.name }}
              </label>
            </div>
          </div>

          <!-- 价格筛选 -->
          <div class="mb-6">
            <h4 class="font-medium mb-3">价格范围</h4>
            <div class="space-y-2">
              <div class="flex space-x-2">
                <input
                  v-model.number="priceRange.min"
                  type="number"
                  placeholder="最低价"
                  class="flex-1 input-field text-sm"
                >
                <input
                  v-model.number="priceRange.max"
                  type="number"
                  placeholder="最高价"
                  class="flex-1 input-field text-sm"
                >
              </div>
            </div>
          </div>

          <!-- 评分筛选 -->
          <div class="mb-6">
            <h4 class="font-medium mb-3">评分</h4>
            <div class="space-y-2">
              <label
                v-for="rating in [5, 4, 3, 2, 1]"
                :key="rating"
                class="flex items-center"
              >
                <input
                  v-model.number="minRating"
                  type="radio"
                  :value="rating"
                  class="mr-2"
                >
                <StarRating :rating="rating" size="sm" />
                <span class="ml-1 text-sm">及以上</span>
              </label>
            </div>
          </div>

          <!-- 库存筛选 -->
          <div class="mb-6">
            <label class="flex items-center">
              <input
                v-model="inStockOnly"
                type="checkbox"
                class="mr-2"
              >
              仅显示有库存商品
            </label>
          </div>

          <!-- 重置按钮 -->
          <button
            @click="resetFilters"
            class="w-full btn-secondary text-sm"
          >
            重置筛选
          </button>
        </div>
      </div>

      <!-- 主要内容区域 -->
      <div class="lg:col-span-3">
        <!-- 移动端筛选按钮 -->
        <div class="lg:hidden mb-4">
          <button
            @click="showMobileFilters = true"
            class="btn-secondary"
          >
            筛选与排序
          </button>
        </div>

        <!-- 排序和视图切换 -->
        <div class="flex justify-between items-center mb-6">
          <div class="flex items-center space-x-4">
            <select
              v-model="sortBy"
              class="input-field text-sm"
            >
              <option value="default">默认排序</option>
              <option value="price-asc">价格从低到高</option>
              <option value="price-desc">价格从高到低</option>
              <option value="rating">评分最高</option>
              <option value="newest">最新发布</option>
            </select>
          </div>

          <div class="flex items-center space-x-2">
            <button
              @click="viewMode = 'grid'"
              :class="viewMode === 'grid' ? 'text-blue-600' : 'text-gray-400'"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
            </button>
            <button
              @click="viewMode = 'list'"
              :class="viewMode === 'list' ? 'text-blue-600' : 'text-gray-400'"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- 商品列表 -->
        <div v-if="filteredProducts.length > 0">
          <div
            v-if="viewMode === 'grid'"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <ProductCard
              v-for="product in paginatedProducts"
              :key="product.id"
              :product="product"
            />
          </div>
          
          <div
            v-else
            class="space-y-4"
          >
            <ProductListItem
              v-for="product in paginatedProducts"
              :key="product.id"
              :product="product"
            />
          </div>

          <!-- 分页 -->
          <div v-if="totalPages > 1" class="mt-8 flex justify-center">
            <nav class="flex space-x-2">
              <button
                v-for="page in totalPages"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium',
                  page === currentPage
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                ]"
              >
                {{ page }}
              </button>
            </nav>
          </div>
        </div>

        <!-- 无结果 -->
        <div v-else class="text-center py-12">
          <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.485 0-4.735.951-6.414 2.586A11.955 11.955 0 014 12C4 6.477 8.477 2 14 2s10 4.477 10 10-4.477 10-10 10z"></path>
          </svg>
          <p class="text-gray-500 mb-4">没有找到符合条件的商品</p>
          <button
            @click="resetFilters"
            class="btn-primary"
          >
            重置筛选条件
          </button>
        </div>
      </div>
    </div>

    <!-- 移动端筛选弹窗 -->
    <div
      v-if="showMobileFilters"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
    >
      <div class="fixed inset-y-0 left-0 w-80 bg-white p-6 overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold">筛选</h3>
          <button
            @click="showMobileFilters = false"
            class="p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- 移动端筛选内容（与桌面端相同） -->
        <!-- 这里可以复用桌面端的筛选组件 -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { products, categories, searchProducts, getProductsByCategory } from '~/data/products'

// 页面头部设置
useHead({
  title: '商品列表 - 商城学习项目'
})

// 响应式数据
const route = useRoute()
const router = useRouter()

const selectedCategory = ref('')
const priceRange = ref({ min: null, max: null })
const minRating = ref(0)
const inStockOnly = ref(false)
const sortBy = ref('default')
const viewMode = ref('grid')
const showMobileFilters = ref(false)
const currentPage = ref(1)
const pageSize = 12

// 计算属性
const pageTitle = computed(() => {
  if (route.query.search) {
    return `搜索结果: "${route.query.search}"`
  }
  if (selectedCategory.value) {
    const category = categories.find(c => c.slug === selectedCategory.value)
    return category ? category.name : '商品列表'
  }
  return '所有商品'
})

const filteredProducts = computed(() => {
  let result = [...products]

  // 搜索筛选
  if (route.query.search) {
    result = searchProducts(route.query.search as string)
  }

  // 分类筛选
  if (selectedCategory.value) {
    result = result.filter(p => {
      const categoryName = categories.find(c => c.slug === selectedCategory.value)?.name
      return p.category === categoryName
    })
  }

  // 价格筛选
  if (priceRange.value.min !== null && priceRange.value.min !== undefined) {
    result = result.filter(p => p.price >= priceRange.value.min!)
  }
  if (priceRange.value.max !== null && priceRange.value.max !== undefined) {
    result = result.filter(p => p.price <= priceRange.value.max!)
  }

  // 评分筛选
  if (minRating.value > 0) {
    result = result.filter(p => p.rating >= minRating.value)
  }

  // 库存筛选
  if (inStockOnly.value) {
    result = result.filter(p => p.stock > 0)
  }

  // 排序
  switch (sortBy.value) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      result.sort((a, b) => b.rating - a.rating)
      break
    case 'newest':
      result.sort((a, b) => b.id - a.id)
      break
  }

  return result
})

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / pageSize)
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredProducts.value.slice(start, end)
})

// 方法
const resetFilters = () => {
  selectedCategory.value = ''
  priceRange.value = { min: null, max: null }
  minRating.value = 0
  inStockOnly.value = false
  sortBy.value = 'default'
  currentPage.value = 1
}

// 监听路由变化
watch(() => route.query, (newQuery) => {
  if (newQuery.category) {
    selectedCategory.value = newQuery.category as string
  }
  currentPage.value = 1
}, { immediate: true })

// 监听筛选条件变化，重置页码
watch([selectedCategory, priceRange, minRating, inStockOnly, sortBy], () => {
  currentPage.value = 1
}, { deep: true })
</script> 