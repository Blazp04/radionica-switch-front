<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useNavigationStore } from '../../stores/navigation'

const navigationStore = useNavigationStore()
const mobileMenuOpen = ref(false)

onMounted(() => {
  navigationStore.setupObserver()
})

onUnmounted(() => {
  navigationStore.cleanup()
})
</script>

<style scoped>
.nav-link {
  position: relative;
  padding: 0.5rem 0;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: theme('colors.primary');
  transform: scaleX(0);
  transition: transform 0.3s ease;
  transform-origin: center;
}

.nav-link.active {
  color: white;
}

.nav-link.active::after {
  transform: scaleX(1);
}
</style>

<template>
  <header class="fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-sm z-50 border-b border-gray-800">
    <nav class="container mx-auto px-4 h-16 flex items-center justify-between relative">
      <a href="/" class="text-xl font-bold">Switch-radionica</a>

      <!-- Mobile Menu Button -->
      <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-2 text-gray-400 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path v-if="mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M6 18L18 6M6 6l12 12" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex gap-8 items-center">
        <a v-for="item in navigationStore.navigation" :key="item.name" :href="item.href"
          @click.prevent="navigationStore.scrollToSection(item.href)" :class="[
            'nav-link text-gray-400 hover:text-white transition-colors',
            { 'active': navigationStore.activeSection === item.href }
          ]">
          {{ item.name }}
        </a>
      </div>
      <button class="hidden md:block bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        @click="navigationStore.scrollToSection('#cta')">
        Prijavi se
      </button>

      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen"
        class="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-gray-800 py-4 md:hidden">
        <div class="flex flex-col gap-4">
          <a v-for="item in navigationStore.navigation" :key="item.name" :href="item.href"
            @click.prevent="navigationStore.scrollToSection(item.href); mobileMenuOpen = false" :class="[
              'nav-link text-gray-400 hover:text-white transition-colors px-4 py-2',
              { 'active': navigationStore.activeSection === item.href }
            ]">
            {{ item.name }}
          </a>
          <button class="bg-gray-800 mx-4 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            @click="navigationStore.scrollToSection('#cta'); mobileMenuOpen = false">
            Prijavi se
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>