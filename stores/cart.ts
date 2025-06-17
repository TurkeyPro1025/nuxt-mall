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
    }
  },

  actions: {
    // 添加商品到购物车
    addToCart(product: Product, quantity: number = 1): void {
      const existingItem = this.items.find((item: CartItem) => item.product.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
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
      const item = this.items.find((item: CartItem) => item.product.id === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(productId)
        } else {
          item.quantity = quantity
          this.saveToStorage()
        }
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

    // 保存到localStorage
    saveToStorage(): void {
      if (process.client) {
        localStorage.setItem('cart', JSON.stringify(this.items))
      }
    },

    // 从localStorage加载
    loadFromStorage(): void {
      if (process.client) {
        const saved = localStorage.getItem('cart')
        if (saved) {
          this.items = JSON.parse(saved)
        }
      }
    }
  }
}) 