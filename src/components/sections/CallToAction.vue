<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const target = ref(null)
const isVisible = ref(false)

useIntersectionObserver(target, ([{ isIntersecting }]) => {
  isVisible.value = isIntersecting
})
</script>

<template>
  <section id="cta" class="relative py-32 overflow-hidden" ref="target">
    <!-- Background Grid -->
    <div class="absolute inset-0 grid grid-cols-6 gap-px opacity-[0.02] pointer-events-none">
      <div v-for="n in 24" :key="n" class="h-full bg-white"></div>
    </div>
    
    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/0 via-primary/5 to-black/0"></div>

    <div class="container relative mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center"
           :class="[isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
           style="transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1)">
        <span class="text-primary font-mono text-sm tracking-wider mb-4 block">
          LIMITED SPOTS AVAILABLE
        </span>
        
        <h2 class="text-4xl sm:text-5xl font-bold mb-6">
          Ready to Transform Your Career?
        </h2>
        
        <p class="text-gray-400 text-base sm:text-lg mb-10 max-w-2xl mx-auto px-4 sm:px-0">
          Join our intensive workshop and master modern software development. 
          Next cohort starts soon.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 sm:px-0">
          <button class="group relative px-8 py-4 bg-white text-black rounded-lg overflow-hidden w-full sm:w-auto">
            <div class="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 
                        group-hover:opacity-10 transition-opacity duration-300"></div>
            <span class="relative font-medium text-lg">Apply Now</span>
          </button>
          
          <a href="#curriculum" 
             class="text-gray-400 px-6 py-4 hover:text-white transition-colors flex items-center gap-2 justify-center w-full sm:w-auto">
            View Curriculum
            <svg xmlns="http://www.w3.org/2000/svg" 
                 class="w-4 h-4 transition-transform group-hover:translate-x-1" 
                 viewBox="0 0 24 24" 
                 fill="none" 
                 stroke="currentColor" 
                 stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 mt-16 max-w-2xl mx-auto px-4 sm:px-0">
          <div class="text-center">
            <div class="text-3xl font-bold text-white mb-2">13</div>
            <div class="text-gray-400 text-sm">Weeks Intensive</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-white mb-2">20</div>
            <div class="text-gray-400 text-sm">Students per Cohort</div>
          </div>
          <div class="text-center sm:col-span-1 col-span-2">
            <div class="text-3xl font-bold text-white mb-2">100%</div>
            <div class="text-gray-400 text-sm">Hands-on Projects</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>