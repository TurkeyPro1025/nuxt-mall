<template>
    <div v-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- 面包屑导航 -->
        <nav class="mb-8">
            <ol class="flex items-center space-x-2 text-sm">
                <li>
                    <NuxtLink to="/" class="text-blue-600 hover:text-blue-700">首页</NuxtLink>
                </li>
                <li class="text-gray-500">/</li>
                <li>
                    <NuxtLink to="/products" class="text-blue-600 hover:text-blue-700">商品</NuxtLink>
                </li>
                <li class="text-gray-500">/</li>
                <li>
                    <NuxtLink
                        :to="`/products?category=${getCategorySlug(product.category)}`"
                        class="text-blue-600 hover:text-blue-700">
                        {{ product.category }}
                    </NuxtLink>
                </li>
                <li class="text-gray-500">/</li>
                <li class="text-gray-900 font-medium">{{ product.name }}</li>
            </ol>
        </nav>

        <div class="lg:grid lg:grid-cols-2 lg:gap-12">
            <!-- 商品图片 -->
            <div class="mb-8 lg:mb-0">
                <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                    <img :src="currentImage" :alt="product.name" class="w-full h-full object-cover" />
                </div>

                <!-- 图片缩略图 -->
                <div v-if="product.images && product.images.length > 1" class="flex space-x-2">
                    <button
                        v-for="(image, index) in product.images"
                        :key="index"
                        @click="currentImage = image"
                        :class="[
                            'w-16 h-16 rounded-lg overflow-hidden border-2 transition duration-200',
                            currentImage === image ? 'border-blue-600' : 'border-gray-200 hover:border-gray-300',
                        ]">
                        <img :src="image" :alt="`${product.name} 图片 ${index + 1}`" class="w-full h-full object-cover" />
                    </button>
                </div>
            </div>

            <!-- 商品信息 -->
            <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ product.name }}</h1>

                <!-- 评分和评论 -->
                <div class="flex items-center mb-6">
                    <StarRating :rating="product.rating" />
                    <span class="ml-2 text-lg font-medium">{{ product.rating }}</span>
                    <span class="ml-2 text-gray-600">({{ product.reviewCount }} 条评论)</span>
                </div>

                <!-- 价格 -->
                <div class="mb-6">
                    <div class="flex items-center space-x-3">
                        <span class="text-3xl font-bold text-red-600"> ¥{{ product.price.toLocaleString() }} </span>
                        <span
                            v-if="product.originalPrice && product.originalPrice > product.price"
                            class="text-xl text-gray-500 line-through">
                            ¥{{ product.originalPrice.toLocaleString() }}
                        </span>
                        <span v-if="product.discount" class="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                            立省¥{{ (product.originalPrice! - product.price).toLocaleString() }}
                        </span>
                    </div>
                </div>

                <!-- 商品描述 -->
                <div class="mb-6">
                    <h3 class="text-lg font-semibold mb-2">商品描述</h3>
                    <p class="text-gray-700 leading-relaxed">{{ product.description }}</p>
                </div>

                <!-- 商品标签 -->
                <div v-if="product.tags && product.tags.length > 0" class="mb-6">
                    <h3 class="text-lg font-semibold mb-2">商品标签</h3>
                    <div class="flex flex-wrap gap-2">
                        <span
                            v-for="tag in product.tags"
                            :key="tag"
                            class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {{ tag }}
                        </span>
                    </div>
                </div>

                <!-- 库存状态 -->
                <div class="mb-6">
                    <div class="flex items-center">
                        <span class="text-lg font-semibold mr-2">库存状态:</span>
                        <span v-if="product.stock > 5" class="text-green-600 font-medium"> 有库存 </span>
                        <span v-else-if="product.stock > 0" class="text-orange-600 font-medium">
                            仅剩 {{ product.stock }} 件
                        </span>
                        <span v-else class="text-red-600 font-medium"> 缺货 </span>
                    </div>
                </div>

                <!-- 数量选择 -->
                <div class="mb-8">
                    <h3 class="text-lg font-semibold mb-2">数量</h3>
                    <div class="flex items-center space-x-4">
                        <div class="flex items-center border border-gray-300 rounded-lg">
                            <button
                                @click="decreaseQuantity"
                                :disabled="quantity <= 1"
                                class="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                                -
                            </button>
                            <span class="px-4 py-2 border-x border-gray-300">{{ quantity }}</span>
                            <button
                                @click="increaseQuantity"
                                :disabled="quantity >= product.stock"
                                class="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                                +
                            </button>
                        </div>
                        <span class="text-gray-600">最多可购买 {{ product.stock }} 件</span>
                    </div>
                </div>

                <!-- 操作按钮 -->
                <div class="space-y-4">
                    <div class="flex space-x-4">
                        <button
                            @click="addToCart"
                            :disabled="product.stock === 0"
                            class="flex-1 btn-primary py-3 text-lg disabled:bg-gray-300 disabled:cursor-not-allowed">
                            <span v-if="product.stock > 0">加入购物车</span>
                            <span v-else>缺货</span>
                        </button>

                        <button
                            @click="buyNow"
                            :disabled="product.stock === 0"
                            class="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed text-lg">
                            <span v-if="product.stock > 0">立即购买</span>
                            <span v-else>缺货</span>
                        </button>
                    </div>

                    <button @click="toggleWishlist" class="w-full btn-secondary py-3 text-lg flex items-center justify-center">
                        <svg
                            class="w-5 h-5 mr-2"
                            :class="isInWishlist ? 'text-red-500 fill-current' : 'text-gray-400'"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {{ isInWishlist ? "取消收藏" : "加入收藏" }}
                    </button>
                </div>
            </div>
        </div>

        <!-- 相关商品推荐 -->
        <section class="mt-16">
            <h2 class="text-2xl font-bold mb-8">相关商品推荐</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <ProductCard v-for="relatedProduct in relatedProducts" :key="relatedProduct.id" :product="relatedProduct" />
            </div>
        </section>
    </div>

    <!-- 商品未找到 -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">商品未找到</h1>
        <p class="text-gray-600 mb-8">抱歉，您查找的商品不存在或已下架</p>
        <NuxtLink to="/products" class="btn-primary"> 返回商品列表 </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import { products, categories } from "~/data/products";

// 获取路由参数
const route = useRoute();
const productId = parseInt(route.params.id as string);

// 查找商品
const product = products.find((p) => p.id === productId);

// 页面头部设置
useHead({
    title: product ? `${product.name} - 商城学习项目` : "商品未找到 - 商城学习项目",
    meta: [
        {
            name: "description",
            content: product ? product.description : "商品未找到",
        },
    ],
});

// 响应式数据
const currentImage = ref(product?.image || "");
const quantity = ref(1);
const isInWishlist = ref(false);

// 初始化当前图片
if (product && product.images && product.images.length > 0) {
    currentImage.value = product.images[0];
}

// 计算属性
const relatedProducts = computed(() => {
    if (!product) return [];

    return products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
});

// 方法
const getCategorySlug = (categoryName: string) => {
    const category = categories.find((c) => c.name === categoryName);
    return category ? category.slug : "";
};

const increaseQuantity = () => {
    if (product && quantity.value < product.stock) {
        quantity.value++;
    }
};

const decreaseQuantity = () => {
    if (quantity.value > 1) {
        quantity.value--;
    }
};

const addToCart = () => {
    if (product) {
        console.log(`添加到购物车: ${product.name}, 数量: ${quantity.value}`);
        // TODO: 实际实现添加到购物车逻辑
    }
};

const buyNow = () => {
    if (product) {
        console.log(`立即购买: ${product.name}, 数量: ${quantity.value}`);
        // TODO: 实现立即购买逻辑，跳转到结算页面
    }
};

const toggleWishlist = () => {
    isInWishlist.value = !isInWishlist.value;
    // TODO: 实际实现收藏/取消收藏逻辑
};

// 如果商品不存在，返回404状态
if (!product) {
    throw createError({
        statusCode: 404,
        statusMessage: "商品未找到",
    });
}
</script>
