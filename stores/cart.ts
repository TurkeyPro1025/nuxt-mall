import { defineStore } from 'pinia'
import type { CartItem, Product } from '~/types'

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    isOpen: false
  }),

  getters: {
    // 购物车商品总数
    totalItems: (state: CartState): number => {
      return state.items.reduce((total: number, item: CartItem) => total + item.quantity, 0)
    },
 
    // 购物车总价
    totalPrice: (state: CartState): number => {
      return state.items.reduce((total: number, item: CartItem) => {
        return total + (item.product.price * item.quantity)
      }, 0)
    },

    // 获取指定商品在购物车中的数量
    getItemQuantity: (state: CartState) => (productId: number): number => {
      const item = state.items.find((item: CartItem) => item.product.id === productId)
      return item ? item.quantity : 0
    },

    // 检查购物车是否为空
    isEmpty: (state: CartState): boolean => {
      return state.items.length === 0
    }
  },

  actions: {
    // 添加商品到购物车
    addToCart(product: Product, quantity: number = 1): void {
      // 检查商品库存
      if (product.stock <= 0) {
        throw new Error('商品已售罄')
      }

      const existingItem = this.items.find((item: CartItem) => item.product.id === product.id)
      
      if (existingItem) {
        // 检查库存是否足够
        const newQuantity = existingItem.quantity + quantity
        if (newQuantity > product.stock) {
          throw new Error(`库存不足，仅剩 ${product.stock} 件`)
        }
        existingItem.quantity = newQuantity
      } else {
        // 新商品添加到购物车
        if (quantity > product.stock) {
          throw new Error(`库存不足，仅剩 ${product.stock} 件`)
        }
        this.items.push({
          product,
          quantity
        })
      }
      
      // 持久化到localStorage
      this.saveToStorage()
    },

    // 从购物车移除商品
    removeFromCart(productId: number): void {
      const index = this.items.findIndex((item: CartItem) => item.product.id === productId)
      if (index > -1) {
        this.items.splice(index, 1)
        this.saveToStorage()
      }
    },

    // 更新商品数量
    updateQuantity(productId: number, quantity: number): void {
      if (quantity <= 0) {
        this.removeFromCart(productId)
        return
      }

      const item = this.items.find((item: CartItem) => item.product.id === productId)
      if (item) {
        // 检查库存
        if (quantity > item.product.stock) {
          throw new Error(`库存不足，仅剩 ${item.product.stock} 件`)
        }
        item.quantity = quantity
        this.saveToStorage()
      }
    },

    // 清空购物车
    clearCart(): void {
      this.items = []
      this.saveToStorage()
    },

    // 切换购物车侧边栏
    toggleCart(): void {
      this.isOpen = !this.isOpen
    },

    // 关闭购物车侧边栏
    closeCart(): void {
      this.isOpen = false
    },

    // 保存到localStorage
    saveToStorage(): void {
      if (process.client) {
        try {
          localStorage.setItem('cart', JSON.stringify(this.items))
        } catch (error) {
          console.error('保存购物车数据失败:', error)
        }
      }
    },

    // 从localStorage加载
    loadFromStorage(): void {
      if (process.client) {
        try {
          const saved = localStorage.getItem('cart')
          if (saved) {
            const items = JSON.parse(saved)
            // 验证数据格式
            if (Array.isArray(items)) {
              this.items = items
            }
          }
        } catch (error) {
          console.error('加载购物车数据失败:', error)
          this.items = []
        }
      }
    },

    // 检查商品是否在购物车中
    isInCart(productId: number): boolean {
      return this.items.some((item: CartItem) => item.product.id === productId)
    }
  }
}) 