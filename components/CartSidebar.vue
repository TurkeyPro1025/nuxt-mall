<template>
  <!-- 遮罩层 -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 z-40"
    @click="closeCart"
  ></div>

  <!-- 侧边栏 -->
  <div
    :class="[
      'fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-50',
      isOpen ? 'translate-x-0' : 'translate-x-full'
    ]"
  >
    <!-- 头部 -->
    <div class="flex items-center justify-between p-4 border-b">
      <h2 class="text-lg font-semibold">购物车</h2>
      <button
        @click="closeCart"
        class="p-2 hover:bg-gray-100 rounded-lg"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <!-- 购物车内容 -->
    <div class="flex-1 overflow-y-auto p-4">
      <div v-if="cartItems.length === 0" class="text-center py-8">
        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6H19"></path>
        </svg>
        <p class="text-gray-500">购物车是空的</p>
        <NuxtLink
          to="/products"
          @click="closeCart"
          class="inline-block mt-4 text-blue-600 hover:text-blue-700"
        >
          去购物 →
        </NuxtLink>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="item in cartItems"
          :key="item.product.id"
          class="flex items-center space-x-3 p-3 border rounded-lg"
        >
          <!-- 商品图片 -->
          <img
            :src="item.product.image"
            :alt="item.product.name"
            class="w-16 h-16 object-cover rounded"
          >
          
          <!-- 商品信息 -->
          <div class="flex-1 min-w-0">
            <h3 class="font-medium text-sm truncate">{{ item.product.name }}</h3>
            <p class="text-red-600 font-semibold">¥{{ item.product.price.toLocaleString() }}</p>
            
            <!-- 数量控制 -->
            <div class="flex items-center space-x-2 mt-2">
              <button
                @click="updateQuantity(item.product.id, item.quantity - 1)"
                class="w-6 h-6 rounded-full border flex items-center justify-center text-sm hover:bg-gray-100"
              >
                -
              </button>
              <span class="text-sm font-medium">{{ item.quantity }}</span>
              <button
                @click="updateQuantity(item.product.id, item.quantity + 1)"
                class="w-6 h-6 rounded-full border flex items-center justify-center text-sm hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <!-- 删除按钮 -->
          <button
            @click="removeFromCart(item.product.id)"
            class="text-red-500 hover:text-red-700 p-1"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 底部结算 -->
    <div v-if="cartItems.length > 0" class="border-t p-4 space-y-4">
      <div class="flex justify-between items-center">
        <span class="font-semibold">总计:</span>
        <span class="text-xl font-bold text-red-600">¥{{ totalPrice.toLocaleString() }}</span>
      </div>
      
      <div class="space-y-2">
        <NuxtLink
          to="/checkout"
          @click="closeCart"
          class="block w-full btn-primary text-center"
        >
          去结算
        </NuxtLink>
        <NuxtLink
          to="/cart"
          @click="closeCart"
          class="block w-full btn-secondary text-center"
        >
          查看购物车
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CartItem } from '~/types'

// 模拟购物车数据
const isOpen = ref(false)
const cartItems = ref<CartItem[]>([])

const totalPrice = computed(() => {
  return cartItems.value.reduce((total: number, item: CartItem) => {
    return total + (item.product.price * item.quantity)
  }, 0)
})

const closeCart = () => {
  isOpen.value = false
}

const updateQuantity = (productId: number, newQuantity: number) => {
  if (newQuantity <= 0) {
    removeFromCart(productId)
    return
  }
  
  const item = cartItems.value.find((item: CartItem) => item.product.id === productId)
  if (item) {
    item.quantity = newQuantity
  }
}

const removeFromCart = (productId: number) => {
  const index = cartItems.value.findIndex((item: CartItem) => item.product.id === productId)
  if (index > -1) {
    cartItems.value.splice(index, 1)
  }
}

// 监听全局事件来控制侧边栏
// TODO: 实际应该通过store来管理状态
</script> 