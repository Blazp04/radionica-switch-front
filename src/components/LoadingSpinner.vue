<script setup lang="ts">
defineProps<{
  size?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <div class="flex justify-center">
    <div :class="[
      'animate-spin rounded-full border-t-2 border-primary',
      {
        'w-6 h-6 border-2': size === 'sm',
        'w-8 h-8 border-2': size === 'md' || !size,
        'w-12 h-12 border-3': size === 'lg'
      }
    ]"></div>
  </div>
</template>