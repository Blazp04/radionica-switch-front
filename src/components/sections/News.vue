<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useNewsStore } from '../../stores/news'
import LoadingSpinner from '../LoadingSpinner.vue'
import type { NewsItem, NewsCategory } from '../../stores/news'

const newsStore = useNewsStore()

const categoryColors: Record<NewsCategory, string> = {
  announcement: 'text-blue-400 bg-blue-500/10',
  tips: 'text-emerald-400 bg-emerald-500/10',
  schedule: 'text-purple-400 bg-purple-500/10'
}

const selectedNews = ref<NewsItem | null>(null)
const isDialogOpen = ref(false)

onMounted(() => {
  newsStore.fetchNews()
})

const scrollContainer = ref<HTMLElement | null>(null)

const getTagClasses = computed(() => (tag: string) => {
  return `px-4 py-1.5 text-sm rounded-full backdrop-blur-sm ${categoryColors[tag as NewsCategory] ?? 'text-primary bg-gray-800/50'}`
})

const scroll = (direction: 'left' | 'right') => {
  if (!scrollContainer.value) return
  
  const scrollAmount = direction === 'left' ? -400 : 400
  scrollContainer.value.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
.news-container {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.news-container::-webkit-scrollbar {
  display: none;
}

.scroll-button {
  @apply absolute top-1/2 -translate-y-1/2 bg-black/80 text-white w-10 h-10 
         flex items-center justify-center rounded-full z-10
         hover:bg-black transition-colors duration-200
         backdrop-blur-sm border border-white/10;
}

.news-card {
  min-width: calc(100vw - 2rem);
  max-width: 400px;
  transition: transform 0.3s ease;
}

@media (min-width: 640px) {
  .news-card {
    min-width: 400px;
  }
}

.news-card:hover {
  transform: translateY(-4px);
}

.dialog-overlay {
  @apply fixed inset-0 bg-black/70 backdrop-blur-sm z-50
         flex items-center justify-center p-4 sm:p-8;
  animation: fadeIn 0.2s ease-out;
}

.dialog-content {
  @apply bg-gray-900/95 backdrop-blur-md rounded-2xl w-full max-w-2xl
         transform transition-all max-h-[85vh] flex flex-col
         border border-white/10 shadow-2xl;
  animation: slideIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.card-content {
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  height: 100%;
}
</style>

<template>
  <section id="news" class="py-32">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-center mb-16">
        Latest News
        <div class="w-24 h-1 bg-blue-500/50 mx-auto mt-4 rounded-full"></div>
      </h2>
      <div class="relative max-w-7xl mx-auto">
        <!-- Navigation Buttons -->
        <button @click="scroll('left')" 
                v-if="newsStore.news.length > 0"
                class="scroll-button left-2 hidden sm:flex">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button @click="scroll('right')" 
                v-if="newsStore.news.length > 0"
                class="scroll-button right-2 hidden sm:flex">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- News Cards Container -->
        <div ref="scrollContainer" 
             class="news-container flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory py-4 px-4 -mx-4 sm:px-0 sm:mx-0">
          <div v-if="newsStore.isLoading" class="text-center w-full py-16">
            <LoadingSpinner size="lg" />
            <p class="mt-4 text-gray-400">Loading news...</p>
          </div>
          <div v-else-if="!newsStore.news.length" 
               class="w-full flex flex-col items-center justify-center py-16 px-4">
            <div class="w-16 h-16 mb-6 rounded-full bg-gray-800 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" 
                   class="w-8 h-8 text-gray-400" 
                   fill="none" 
                   viewBox="0 0 24 24" 
                   stroke="currentColor">
                <path stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" />
              </svg>
            </div>
            <h3 class="text-xl font-medium mb-2 text-center">No News Yet</h3>
            <p class="text-gray-400 text-center max-w-md mb-8">
              Stay tuned! We'll be sharing exciting updates, student success stories, 
              and workshop announcements here soon.
            </p>
            <div class="flex gap-2 items-center text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" 
                   class="w-5 h-5" 
                   fill="none" 
                   viewBox="0 0 24 24" 
                   stroke="currentColor">
                <path stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span>Subscribe to Updates</span>
            </div>
          </div>
          <div v-else-if="newsStore.error" class="text-center w-full py-8 text-red-500">
            {{ newsStore.error }}
          </div>
          <div v-else v-for="item in newsStore.news" 
               :key="item.title"
               class="news-card snap-center h-full cursor-pointer"
               @click="selectedNews = item; isDialogOpen = true">
            <div class="bg-gray-900 rounded-lg overflow-hidden border border-white/10 h-full
                        hover:border-white/20 transition-colors">
              <img :src="item.image" 
                   :alt="item.title"
                   class="w-full h-48 object-cover" />
              <div class="p-6 card-content">
                <div class="flex items-center justify-between mb-4">
                  <span class="text-base text-gray-400">{{ new Date(item.date).toLocaleDateString() }}</span>
                  <span :class="getTagClasses(item.tag)">{{ item.tag }}</span>
                </div>
                <h3 class="text-xl font-medium mb-3">{{ item.title }}</h3>
                <p class="text-gray-400 text-base mb-4">{{ item.description }}</p>
                <div class="text-primary group-hover:text-white transition-colors flex items-center gap-2 text-sm mt-auto">
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- News Dialog -->
    <Teleport to="body">
      <div v-if="isDialogOpen" 
           class="dialog-overlay"
           @click="isDialogOpen = false">
        <div class="dialog-content" 
             @click.stop>
          <div class="relative">
            <img :src="selectedNews?.image" 
                 :alt="selectedNews?.title"
                 class="w-full h-52 object-cover rounded-t-2xl" />
            <button @click="isDialogOpen = false"
                    class="absolute top-4 right-4 bg-black/50 hover:bg-black/80 w-8 h-8 
                           rounded-full flex items-center justify-center backdrop-blur-sm
                           border border-white/10 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="p-6 overflow-y-auto">
            <div class="flex items-center justify-between mb-4">
              <span class="text-base text-gray-400">
                {{ new Date(selectedNews?.date || '').toLocaleDateString() }}
              </span>
              <span :class="getTagClasses(selectedNews?.tag || '')">
                {{ selectedNews?.tag }}
              </span>
            </div>
            <h2 class="text-2xl font-bold mb-4">{{ selectedNews?.title }}</h2>
            <div class="text-gray-400 whitespace-pre-line leading-relaxed">
              {{ selectedNews?.fullContent }}
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>