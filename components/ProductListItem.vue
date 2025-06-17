<template>
  <div class="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition duration-200">
    <div class="flex space-x-4">
      <!-- 商品图片 -->
      <div class="flex-shrink-0">
        <img
          :src="product.image"
          :alt="product.name"
          class="w-24 h-24 object-cover rounded cursor-pointer"
          @click="goToProduct"
        >
      </div>

      <!-- 商品信息 -->
      <div class="flex-1 min-w-0">
        <div class="flex justify-between">
          <div class="flex-1">
            <h3 
              class="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer line-clamp-1"
              @click="goToProduct"
            >
              {{ product.name }}
            </h3>
            
            <p class="text-gray-600 text-sm mt-1 line-clamp-2">
              {{ product.description }}
            </p>

            <!-- 评分和评论数 -->
            <div class="flex items-center mt-2">
              <StarRating :rating="product.rating" size="sm" />
              <span class="text-sm text-gray-600 ml-1">{{ product.rating }}</span>
              <span class="text-sm text-gray-500 ml-2">({{ product.reviewCount }} 评论)</span>
            </div>

            <!-- 标签 -->
            <div v-if="product.tags && product.tags.length > 0" class="flex flex-wrap gap-1 mt-2">
              <span
                v-for="tag in product.tags.slice(0, 3)"
                :key="tag"
                class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- 价格和操作 -->
          <div class="flex flex-col items-end justify-between ml-4">
            <div class="text-right">
              <div class="flex items-center space-x-2">
                <span class="text-xl font-bold text-red-600">
                  ¥{{ product.price.toLocaleString() }}
                </span>
                <!-- 折扣标签 -->
                <span
                  v-if="product.discount"
                  class="bg-red-500 text-white text-xs px-1 py-0.5 rounded"
                >
                  -{{ product.discount }}%
                </span>
              </div>
              
              <div
                v-if="product.originalPrice && product.originalPrice > product.price"
                class="text-sm text-gray-500 line-through mt-1"
              >
                ¥{{ product.originalPrice.toLocaleString() }}
              </div>
              
              <!-- 库存信息 -->
              <div class="text-sm text-gray-500 mt-1">
                <span v-if="product.stock > 5">有库存</span>
                <span v-else-if="product.stock > 0" class="text-orange-600">
                  仅剩 {{ product.stock }} 件
                </span>
                <span v-else class="text-red-600">缺货</span>
              </div>
            </div>

            <!-- 操作按钮 -->
            <div class="flex space-x-2 mt-4">
              <button
                @click="addToCart"
                :disabled="product.stock === 0"
                class="btn-primary text-sm px-4 py-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <span v-if="product.stock > 0">加入购物车</span>
                <span v-else>缺货</span>
              </button>
              
              <button
                @click="toggleWishlist"
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
        </div>
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

// 状态
const isInWishlist = ref(false)

// 方法
const goToProduct = () => {
  navigateTo(`/products/${props.product.id}`)
}

const addToCart = () => {
  // 这里应该调用购物车store
  console.log('添加到购物车:', props.product.name)
  // TODO: 实际实现添加到购物车逻辑
}

const toggleWishlist = () => {
  isInWishlist.value = !isInWishlist.value
  // TODO: 实际实现收藏/取消收藏逻辑
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 