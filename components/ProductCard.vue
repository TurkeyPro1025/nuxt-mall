<template>
  <div class="card group cursor-pointer" @click="goToProduct">
    <!-- 商品图片 -->
    <div class="relative overflow-hidden aspect-square">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-105 transition duration-300"
      >
      <!-- 折扣标签 -->
      <div
        v-if="product.discount"
        class="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
      >
        -{{ product.discount }}%
      </div>
      <!-- 库存不足标签 -->
      <div
        v-if="product.stock <= 5"
        class="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded"
      >
        仅剩{{ product.stock }}件
      </div>
    </div>

    <!-- 商品信息 -->
    <div class="p-4">
      <h3 class="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition duration-200">
        {{ product.name }}
      </h3>
      
      <p class="text-sm text-gray-600 mb-3 line-clamp-2">
        {{ product.description }}
      </p>

      <!-- 评分 -->
      <div class="flex items-center mb-3">
        <div class="flex items-center">
          <StarRating :rating="product.rating" size="sm" />
          <span class="text-sm text-gray-600 ml-1">{{ product.rating }}</span>
        </div>
        <span class="text-sm text-gray-500 ml-2">({{ product.reviewCount }})</span>
      </div>

      <!-- 价格 -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-2">
          <span class="text-lg font-bold text-red-600">
            ¥{{ product.price.toLocaleString() }}
          </span>
          <span
            v-if="product.originalPrice && product.originalPrice > product.price"
            class="text-sm text-gray-500 line-through"
          >
            ¥{{ product.originalPrice.toLocaleString() }}
          </span>
        </div>
      </div>

      <!-- 标签 -->
      <div v-if="product.tags && product.tags.length > 0" class="flex flex-wrap gap-1 mb-4">
        <span
          v-for="tag in product.tags.slice(0, 3)"
          :key="tag"
          class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
        >
          {{ tag }}
        </span>
      </div>

      <!-- 操作按钮 -->
      <div class="flex space-x-2">
        <button
          @click.stop="addToCart"
          :disabled="product.stock === 0"
          class="flex-1 btn-primary disabled:bg-gray-300 disabled:cursor-not-allowed text-sm py-2"
        >
          <span v-if="product.stock > 0">加入购物车</span>
          <span v-else>缺货</span>
        </button>
        <button
          @click.stop="toggleWishlist"
          class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200"
        >
          <svg
            class="w-5 h-5"
            :class="isInWishlist ? 'text-red-500 fill-current' : 'text-gray-400'"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Toast提示 -->
    <div
      v-if="showToast"
      :class="[
        'fixed top-20 right-4 text-white px-4 py-2 rounded-lg shadow-lg z-50 transform transition-all duration-300 text-sm',
        toastType === 'success' ? 'bg-green-500' : 'bg-red-500',
        showToast ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      ]"
    >
      <div class="flex items-center">
        <svg v-if="toastType === 'success'" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        {{ toastMessage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types'

// Props
interface Props {
  product: Product
}

const props = defineProps<Props>()

// 购物车store
const cartStore = useCartStore()

// 状态
const isInWishlist = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('success')

// 方法
const goToProduct = () => {
  navigateTo(`/products/${props.product.id}`)
}

const showSuccessToast = (message: string) => {
  toastMessage.value = message;
  toastType.value = 'success';
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 2000);
}

const showErrorToast = (message: string) => {
  toastMessage.value = message;
  toastType.value = 'error';
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 2000);
}

const addToCart = () => {
  try {
    cartStore.addToCart(props.product, 1);
    showSuccessToast(`已将「${props.product.name}」加入购物车`);
  } catch (error) {
    console.error('添加到购物车失败:', error);
    if (error instanceof Error) {
      showErrorToast(error.message);
    } else {
      showErrorToast('添加到购物车失败，请重试');
    }
  }
}

const toggleWishlist = () => {
  isInWishlist.value = !isInWishlist.value
  
  if (isInWishlist.value) {
    showSuccessToast(`已将「${props.product.name}」加入收藏`);
  } else {
    showSuccessToast(`已将「${props.product.name}」移出收藏`);
  }
  
  // TODO: 实际实现收藏/取消收藏逻辑
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 