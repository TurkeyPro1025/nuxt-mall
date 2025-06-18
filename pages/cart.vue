<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">购物车</h1>

    <div v-if="cartItems.length === 0" class="text-center py-16">
      <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6H19"></path>
      </svg>
      <h2 class="text-2xl font-semibold text-gray-900 mb-2">购物车是空的</h2>
      <p class="text-gray-600 mb-8">还没有添加任何商品，去逛逛吧！</p>
      <NuxtLink to="/products" class="btn-primary">
        开始购物
      </NuxtLink>
    </div>

    <div v-else class="lg:grid lg:grid-cols-3 lg:gap-8">
      <!-- 购物车商品列表 -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow-sm">
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold">购物车商品 ({{ totalItems }} 件)</h2>
              <button
                @click="clearCart"
                class="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                清空购物车
              </button>
            </div>
          </div>

          <div class="divide-y divide-gray-200">
            <div
              v-for="item in cartItems"
              :key="item.product.id"
              class="p-6 flex items-center space-x-4"
            >
              <!-- 商品图片 -->
              <div class="flex-shrink-0">
                <img
                  :src="item.product.image"
                  :alt="item.product.name"
                  class="w-20 h-20 object-cover rounded cursor-pointer"
                  @click="goToProduct(item.product.id)"
                >
              </div>

              <!-- 商品信息 -->
              <div class="flex-1 min-w-0">
                <h3 
                  class="text-lg font-medium text-gray-900 hover:text-blue-600 cursor-pointer"
                  @click="goToProduct(item.product.id)"
                >
                  {{ item.product.name }}
                </h3>
                <p class="text-sm text-gray-600 mt-1">{{ item.product.description }}</p>
                
                <!-- 商品标签 -->
                <div v-if="item.product.tags && item.product.tags.length > 0" class="flex flex-wrap gap-1 mt-2">
                  <span
                    v-for="tag in item.product.tags.slice(0, 2)"
                    :key="tag"
                    class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                  >
                    {{ tag }}
                  </span>
                </div>

                <!-- 库存状态 -->
                <div class="mt-2">
                  <span
                    v-if="item.product.stock > 5"
                    class="text-sm text-green-600"
                  >
                    有库存
                  </span>
                  <span
                    v-else-if="item.product.stock > 0"
                    class="text-sm text-orange-600"
                  >
                    仅剩 {{ item.product.stock }} 件
                  </span>
                  <span
                    v-else
                    class="text-sm text-red-600"
                  >
                    缺货
                  </span>
                </div>
              </div>

              <!-- 价格和数量 -->
              <div class="flex flex-col items-end space-y-4">
                <div class="text-right">
                  <div class="text-lg font-bold text-red-600">
                    ¥{{ item.product.price.toLocaleString() }}
                  </div>
                  <div
                    v-if="item.product.originalPrice && item.product.originalPrice > item.product.price"
                    class="text-sm text-gray-500 line-through"
                  >
                    ¥{{ item.product.originalPrice.toLocaleString() }}
                  </div>
                </div>

                <!-- 数量控制 -->
                <div class="flex items-center border border-gray-300 rounded-lg">
                  <button
                    @click="updateQuantity(item.product.id, item.quantity - 1)"
                    :disabled="item.quantity <= 1"
                    class="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <span class="px-4 py-2 border-x border-gray-300 min-w-[3rem] text-center">
                    {{ item.quantity }}
                  </span>
                  <button
                    @click="updateQuantity(item.product.id, item.quantity + 1)"
                    :disabled="item.quantity >= item.product.stock"
                    class="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>

                <!-- 小计 -->
                <div class="text-right">
                  <div class="text-sm text-gray-600">小计</div>
                  <div class="text-lg font-bold text-gray-900">
                    ¥{{ (item.product.price * item.quantity).toLocaleString() }}
                  </div>
                </div>

                <!-- 删除按钮 -->
                <button
                  @click="removeFromCart(item.product.id)"
                  class="text-red-500 hover:text-red-700 p-1"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 订单摘要 -->
      <div class="mt-8 lg:mt-0">
        <div class="bg-white rounded-lg shadow-sm p-6 sticky top-4">
          <h3 class="text-lg font-semibold mb-4">订单摘要</h3>
          
          <div class="space-y-3 mb-6">
            <div class="flex justify-between">
              <span class="text-gray-600">商品金额 ({{ totalItems }} 件)</span>
              <span>¥{{ subtotal.toLocaleString() }}</span>
            </div>
            
            <div class="flex justify-between">
              <span class="text-gray-600">运费</span>
              <span v-if="freeShipping" class="text-green-600">免费</span>
              <span v-else>¥{{ shippingFee.toLocaleString() }}</span>
            </div>
            
            <div v-if="discount > 0" class="flex justify-between text-green-600">
              <span>优惠</span>
              <span>-¥{{ discount.toLocaleString() }}</span>
            </div>
            
            <div class="border-t border-gray-200 pt-3">
              <div class="flex justify-between items-center">
                <span class="text-lg font-semibold">总计</span>
                <span class="text-xl font-bold text-red-600">
                  ¥{{ totalAmount.toLocaleString() }}
                </span>
              </div>
            </div>
          </div>

          <!-- 优惠券 -->
          <div class="mb-6">
            <div class="flex space-x-2">
              <input
                v-model="couponCode"
                type="text"
                placeholder="输入优惠券代码"
                class="flex-1 input-field text-sm"
              >
              <button
                @click="applyCoupon"
                class="btn-secondary text-sm px-4"
              >
                使用
              </button>
            </div>
          </div>

          <!-- 结算按钮 -->
          <div class="space-y-3">
            <button
              @click="goToCheckout"
              class="w-full btn-primary py-3 text-lg"
            >
              去结算
            </button>
            
            <NuxtLink
              to="/products"
              class="block w-full btn-secondary py-3 text-lg text-center"
            >
              继续购物
            </NuxtLink>
          </div>

          <!-- 购物保障 -->
          <div class="mt-6 pt-6 border-t border-gray-200">
            <h4 class="font-medium mb-3">购物保障</h4>
            <div class="space-y-2 text-sm text-gray-600">
              <div class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                7天无理由退货
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                正品保障
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                快速发货
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 推荐商品 -->
    <section v-if="cartItems.length > 0" class="mt-16">
      <h2 class="text-2xl font-bold mb-8">猜你喜欢</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in recommendedProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>
  </div>

  <!-- Toast提示 -->
  <div
    v-if="showToast"
    :class="[
      'fixed top-20 right-4 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300',
      toastType === 'success' ? 'bg-green-500' : toastType === 'error' ? 'bg-red-500' : 'bg-orange-500',
      showToast ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    ]"
  >
    <div class="flex items-center">
      <svg v-if="toastType === 'success'" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <svg v-else-if="toastType === 'error'" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
      <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { products } from '~/data/products'

// 页面头部设置
useHead({
  title: '购物车'
})

// 购物车store
const cartStore = useCartStore()

// 响应式数据
const couponCode = ref('')
const discount = ref(0)
const shippingFee = ref(10)
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'error' | 'warning'>('success')

// 计算属性
const cartItems = computed(() => cartStore.items)
const totalItems = computed(() => cartStore.totalItems)
const subtotal = computed(() => cartStore.totalPrice)

const freeShipping = computed(() => {
  return subtotal.value >= 99 // 满99免运费
})

const totalAmount = computed(() => {
  const shipping = freeShipping.value ? 0 : shippingFee.value
  return subtotal.value + shipping - discount.value
})

const recommendedProducts = computed(() => {
  return products.filter(p => !cartItems.value.some((item: any) => item.product.id === p.id)).slice(0, 4)
})

// 方法
const goToProduct = (productId: number) => {
  navigateTo(`/products/${productId}`)
}

const showSuccessToast = (message: string) => {
  toastMessage.value = message;
  toastType.value = 'success';
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
}

const showErrorToast = (message: string) => {
  toastMessage.value = message;
  toastType.value = 'error';
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
}

const showWarningToast = (message: string) => {
  toastMessage.value = message;
  toastType.value = 'warning';
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
}

const updateQuantity = (productId: number, newQuantity: number) => {
  try {
    cartStore.updateQuantity(productId, newQuantity)
  } catch (error) {
    if (error instanceof Error) {
      showErrorToast(error.message);
    } else {
      showErrorToast('更新商品数量失败');
    }
  }
}

const removeFromCart = (productId: number) => {
  try {
    cartStore.removeFromCart(productId)
    showSuccessToast('商品已从购物车中移除');
  } catch (error) {
    showErrorToast('移除商品失败');
  }
}

const clearCart = () => {
  if (cartItems.value.length === 0) {
    showWarningToast('购物车已经是空的');
    return;
  }
  
  if (confirm('确定要清空购物车吗？')) {
    try {
      cartStore.clearCart()
      showSuccessToast('购物车已清空');
    } catch (error) {
      showErrorToast('清空购物车失败');
    }
  }
}

const applyCoupon = () => {
  // 模拟优惠券逻辑
  if (couponCode.value === 'SAVE10') {
    discount.value = 10
    couponCode.value = ''
    alert('优惠券使用成功！')
  } else if (couponCode.value) {
    alert('优惠券代码无效')
  }
}

const goToCheckout = () => {
  // 跳转到结算页面
  navigateTo('/checkout')
}

// 页面加载时从localStorage恢复购物车数据
onMounted(() => {
  cartStore.loadFromStorage()
})
</script> 