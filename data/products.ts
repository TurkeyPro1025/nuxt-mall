import type { Product, Category } from '~/types'

// 商品分类数据
export const categories: Category[] = [
  {
    id: 1,
    name: '电子产品',
    slug: 'electronics',
    description: '手机、电脑、数码产品等',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500'
  },
  {
    id: 2,
    name: '服装',
    slug: 'clothing',
    description: '男装、女装、童装等',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500'
  },
  {
    id: 3,
    name: '家居用品',
    slug: 'home',
    description: '家具、装饰、生活用品等',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500'
  },
  {
    id: 4,
    name: '图书',
    slug: 'books',
    description: '各类书籍、杂志等',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500'
  },
  {
    id: 5,
    name: '运动户外',
    slug: 'sports',
    description: '运动器材、户外用品等',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500'
  }
]

// 商品数据
export const products: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    description: '全新一代iPhone，搭载A17 Pro芯片，拍照更出色',
    price: 7999,
    originalPrice: 8999,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'
    ],
    category: '电子产品',
    stock: 50,
    rating: 4.8,
    reviewCount: 1250,
    tags: ['智能手机', '苹果', '5G'],
    discount: 11
  },
  {
    id: 2,
    name: 'MacBook Pro 14"',
    description: 'M3芯片加持，专业级性能，适合开发和创作',
    price: 14999,
    originalPrice: 16999,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500',
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'
    ],
    category: '电子产品',
    stock: 30,
    rating: 4.9,
    reviewCount: 890,
    tags: ['笔记本', '苹果', 'M3芯片'],
    discount: 12
  },
  {
    id: 3,
    name: '休闲衬衫',
    description: '100%纯棉材质，舒适透气，适合日常穿搭',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500'
    ],
    category: '服装',
    stock: 100,
    rating: 4.5,
    reviewCount: 340,
    tags: ['衬衫', '纯棉', '休闲'],
    discount: 25
  },
  {
    id: 4,
    name: '现代简约沙发',
    description: '北欧风格设计，高品质海绵填充，舒适度极佳',
    price: 2899,
    originalPrice: 3299,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500'
    ],
    category: '家居用品',
    stock: 15,
    rating: 4.7,
    reviewCount: 156,
    tags: ['沙发', '北欧风', '简约'],
    discount: 12
  },
  {
    id: 5,
    name: 'JavaScript权威指南',
    description: '经典的JavaScript学习教材，从基础到高级全面覆盖',
    price: 89,
    originalPrice: 108,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500'
    ],
    category: '图书',
    stock: 200,
    rating: 4.6,
    reviewCount: 680,
    tags: ['编程', 'JavaScript', '教材'],
    discount: 18
  },
  {
    id: 6,
    name: '专业瑜伽垫',
    description: '环保TPE材质，防滑耐用，6mm厚度提供完美支撑',
    price: 158,
    originalPrice: 198,
    image: 'https://images.unsplash.com/photo-1506629905607-68dd8d1b9f71?w=500',
    images: [
      'https://images.unsplash.com/photo-1506629905607-68dd8d1b9f71?w=500',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500'
    ],
    category: '运动户外',
    stock: 80,
    rating: 4.4,
    reviewCount: 290,
    tags: ['瑜伽', '运动', '环保'],
    discount: 20
  },
  {
    id: 7,
    name: 'AirPods Pro 2',
    description: '主动降噪，空间音频，长续航无线耳机',
    price: 1899,
    originalPrice: 1999,
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500',
    images: [
      'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500'
    ],
    category: '电子产品',
    stock: 60,
    rating: 4.7,
    reviewCount: 945,
    tags: ['耳机', '苹果', '降噪'],
    discount: 5
  },
  {
    id: 8,
    name: '运动夹克',
    description: '防风防水面料，适合户外运动和日常穿着',
    price: 599,
    originalPrice: 799,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'
    ],
    category: '服装',
    stock: 40,
    rating: 4.3,
    reviewCount: 180,
    tags: ['夹克', '运动', '防水'],
    discount: 25
  }
]

// 获取推荐商品
export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.rating >= 4.5).slice(0, 4)
}

// 根据分类获取商品
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category)
}

// 搜索商品
export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase()
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
  )
} 