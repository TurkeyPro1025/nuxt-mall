<template>
  <div
    v-if="visible"
    class="fixed top-20 right-4 z-50 transform transition-all duration-300 ease-in-out"
    :class="visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'"
  >
    <div
      :class="[
        'px-6 py-3 rounded-lg shadow-lg text-white flex items-center min-w-80',
        typeClasses
      ]"
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
        @click="close" 
        class="ml-4 p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  visible?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const typeClasses = computed(() => {
  switch (props.type || 'success') {
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
})

let timer: ReturnType<typeof setTimeout> | null = null

const close = () => {
  emit('close')
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

watch(() => props.visible, (newVisible: boolean) => {
  if (newVisible && (props.duration || 3000) > 0) {
    timer = setTimeout(() => {
      close()
    }, props.duration || 3000)
  } else if (!newVisible && timer) {
    clearTimeout(timer)
    timer = null
  }
})

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer)
  }
})
</script> 