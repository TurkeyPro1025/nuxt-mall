// 商品类型定义
export interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  category: string
  stock: number
  rating: number
  reviewCount: number
  tags?: string[]
  discount?: number
}

// 购物车项目类型
export interface CartItem {
  product: Product
  quantity: number
}

// 用户类型
export interface User {
  id: number
  username: string
  email: string
  avatar?: string
  firstName?: string
  lastName?: string
  phone?: string
  address?: Address
}

// 地址类型
export interface Address {
  id?: number
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault?: boolean
}

// 订单类型
export interface Order {
  id: number
  userId: number
  items: CartItem[]
  totalAmount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: Address
  orderDate: string
  deliveryDate?: string
}

// 分类类型
export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: number
  children?: Category[]
}

// API响应类型
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

// 分页类型
export interface Pagination {
  current: number
  total: number
  pageSize: number
  totalPages: number
}

// 搜索过滤器类型
export interface ProductFilter {
  category?: string
  minPrice?: number
  maxPrice?: number
  rating?: number
  inStock?: boolean
  search?: string
  sortBy?: 'price' | 'rating' | 'name' | 'newest'
  sortOrder?: 'asc' | 'desc'
} 