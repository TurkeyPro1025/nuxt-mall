<template>
  <div
    v-if="show"
    class="fixed top-20 right-4 z-50 transform transition-all duration-300 ease-in-out"
    :class="show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'"
  >
    <div
      class="px-6 py-3 rounded-lg shadow-lg text-white flex items-center min-w-80"
      :class="bgColor"
    >
      <svg 
        v-if="type === 'success'" 
        class="w-5 h-5 mr-2 flex-shrink-0" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      
      <svg 
        v-else-if="type === 'error'" 
        class="w-5 h-5 mr-2 flex-shrink-0" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
      
      <svg 
        v-else-if="type === 'warning'" 
        class="w-5 h-5 mr-2 flex-shrink-0" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      
      <span class="flex-1">{{ message }}</span>
      
      <button 
        @click="closeToast" 
        class="ml-4 p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'success',
      validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
    },
    show: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  
  emits: ['close'],
  
  computed: {
    bgColor() {
      switch (this.type) {
        case 'success':
          return 'bg-green-500'
        case 'error':
          return 'bg-red-500'
        case 'warning':
          return 'bg-orange-500'
        case 'info':
          return 'bg-blue-500'
        default:
          return 'bg-green-500'
      }
    }
  },
  
  watch: {
    show(newValue) {
      if (newValue && this.duration > 0) {
        this.timer = setTimeout(() => {
          this.closeToast()
        }, this.duration)
      } else if (!newValue && this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
    }
  },
  
  data() {
    return {
      timer: null
    }
  },
  
  methods: {
    closeToast() {
      this.$emit('close')
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
    }
  },
  
  beforeUnmount() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }
}
</script> 