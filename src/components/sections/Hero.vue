<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { useTerminalStore } from '../../stores/terminal'

const terminalStore = useTerminalStore()

onMounted(() => {
  gsap.from('.hero-fade', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2
  })
  
  terminalStore.startAnimation()
})
</script>

<style scoped>
.cursor::after {
  content: '|';
  animation: blink 1s step-start infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.terminal-line {
  opacity: 0;
  transform: translateY(10px);
  animation: slideIn 0.3s ease forwards;
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<template>
  <section id="home" class="min-h-[90vh] py-32 relative flex items-center">
    <!-- Background Grid -->
    <div class="absolute inset-0 grid grid-cols-6 gap-px opacity-[0.02] pointer-events-none">
      <div v-for="n in 24" :key="n" class="h-full bg-white"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-16">
      <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div class="text-left hero-fade">
          <span class="text-primary font-mono text-xs sm:text-sm tracking-wider mb-4 block">13-WEEK INTENSIVE WORKSHOP</span>
          <h1 class="text-4xl sm:text-5xl font-bold mb-6">
            From Idea to Production
          </h1>
          <p class="text-gray-400 mb-8 text-base sm:text-lg">
            Master modern software development with industry experts. Learn everything from Git to production deployment.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <button class="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-lg transition-colors w-full sm:w-auto text-center">
              Join Workshop
            </button>
            <button class="text-gray-400 px-6 py-3 hover:text-white transition-colors w-full sm:w-auto text-center">
              Learn More →
            </button>
          </div>
        </div>

        <div class="gradient-border p-4 bg-gray-900/50 backdrop-blur-sm hero-fade">
          <div class="font-mono text-sm">
            <div v-for="(line, index) in terminalStore.displayedLines" 
                 :key="index"
                 :class="['py-2', 
                         index === terminalStore.terminalLines.length - 1 ? 'text-accent' : 'text-gray-400',
                         index === terminalStore.displayedLines.length - 1 && terminalStore.isTyping ? 'cursor' : '',
                         'terminal-line']">
              {{ line }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>