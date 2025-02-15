<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'Curriculum', href: '#curriculum' },
  { name: 'Instructors', href: '#instructors' },
  { name: 'News', href: '#news' },
]

const activeSection = ref('')
const observer = ref<IntersectionObserver | null>(null)

const scrollToSection = (href: string) => {
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  // Set up intersection observer for each section
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = `#${entry.target.id}`
        }
      })
    },
    {
      rootMargin: '-20% 0px -80% 0px',
      threshold: [0.2, 0.8]
    }
  )

  // Observe all sections
  navigation.forEach(item => {
    const section = document.querySelector(item.href)
    if (section) {
      observer.value?.observe(section)
    }
  })
})

onUnmounted(() => {
  observer.value?.disconnect()
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
    <nav class="container mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/" class="text-xl font-bold">Workshop</a>
      <div class="flex gap-8 items-center">
        <a v-for="item in navigation" 
           :key="item.name" 
           :href="item.href"
           @click.prevent="scrollToSection(item.href)"
           :class="[
             'nav-link text-gray-400 hover:text-white transition-colors',
             { 'active': activeSection === item.href }
           ]">
          {{ item.name }}
        </a>
      </div>
      <button class="bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              @click="scrollToSection('#cta')">
        Join Now
      </button>
    </nav>
  </header>
</template>