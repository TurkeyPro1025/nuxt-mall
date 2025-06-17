<template>
  <div>
    <!-- 首页横幅 -->
    <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            欢迎来到我们的商城
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-blue-100">
            发现优质商品，享受便捷购物体验
          </p>
          <NuxtLink
            to="/products"
            class="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-200"
          >
            开始购物
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 商品分类 -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">商品分类</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <NuxtLink
            v-for="category in categories"
            :key="category.id"
            :to="`/products?category=${category.slug}`"
            class="group text-center"
          >
            <div class="relative overflow-hidden rounded-lg mb-4 aspect-square">
              <img
                :src="category.image"
                :alt="category.name"
                class="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              >
              <div class="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition duration-300"></div>
            </div>
            <h3 class="font-semibold text-gray-800 group-hover:text-blue-600 transition duration-200">
              {{ category.name }}
            </h3>
            <p class="text-sm text-gray-600 mt-1">{{ category.description }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 推荐商品 -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-12">
          <h2 class="text-3xl font-bold">推荐商品</h2>
          <NuxtLink
            to="/products"
            class="text-blue-600 hover:text-blue-700 font-medium"
          >
            查看全部 →
          </NuxtLink>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>

    <!-- 特色功能 -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">为什么选择我们</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">快速配送</h3>
            <p class="text-gray-600">24小时内发货，全国包邮</p>
          </div>
          <div class="text-center">
            <div class="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">品质保证</h3>
            <p class="text-gray-600">正品保障，假一赔十</p>
          </div>
          <div class="text-center">
            <div class="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">贴心服务</h3>
            <p class="text-gray-600">7×24小时客服支持</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 最新商品 -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-12">
          <h2 class="text-3xl font-bold">最新商品</h2>
          <NuxtLink
            to="/products?sortBy=newest"
            class="text-blue-600 hover:text-blue-700 font-medium"
          >
            查看更多 →
          </NuxtLink>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard
            v-for="product in latestProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { categories, products, getFeaturedProducts } from '~/data/products'

// 页面头部设置
useHead({
  title: '首页 - 商城学习项目',
  meta: [
    { name: 'description', content: '发现优质商品，享受便捷购物体验' }
  ]
})

// 获取推荐商品
const featuredProducts = getFeaturedProducts()

// 获取最新商品（模拟最新发布的商品）
const latestProducts = computed(() => {
  return products.slice(0, 4)
})
</script> 