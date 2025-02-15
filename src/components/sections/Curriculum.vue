<script setup lang="ts">
import { ref, computed } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const weeks = [
  { week: 1, title: 'Git & GitHub Fundamentals', description: 'Version control essentials and collaborative development' },
  { week: 2, title: 'Project Architecture', description: 'Building scalable and maintainable applications' },
  { week: 3, title: 'Cloud Deployment', description: 'Understanding cloud platforms and deployment strategies' },
  { week: 4, title: 'Linode Deep Dive', description: 'Mastering Linode infrastructure and services' },
  { week: 5, title: 'Docker Essentials', description: 'Containerization basics and best practices' },
  { week: 6, title: 'Docker Compose', description: 'Multi-container applications and orchestration' },
  { week: 7, title: 'Nginx & Load Balancing', description: 'Web server configuration and traffic management' },
  { week: 8, title: 'Feature Flagging', description: 'Implementation and management of feature flags' },
  { week: 9, title: 'Application Monitoring', description: 'Monitoring tools and performance optimization' },
  { week: 10, title: 'Telemetry', description: 'Data collection and analysis for better insights' },
  { week: 11, title: 'CI/CD Pipeline', description: 'Automated testing and deployment workflows' },
  { week: 12, title: 'Security Best Practices', description: 'Securing applications and infrastructure' },
  { week: 13, title: 'Final Project', description: 'Putting it all together in a real-world scenario' },
]

const target = ref(null)
const isVisible = ref(false)
const showAll = ref(false)

const visibleWeeks = computed(() => {
  return showAll.value ? weeks : weeks.slice(0, 3)
})

useIntersectionObserver(target, ([{ isIntersecting }]) => {
  isVisible.value = isIntersecting
})
</script>

<style scoped>
.timeline-card {
  position: relative;
  width: calc(50% - 2rem);
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.timeline-card:hover {
  transform: translateY(-4px);
}

.timeline-card::before {
  content: '';
  position: absolute;
  width: 1rem;
  height: 1rem;
  background: var(--primary);
  border-radius: 50%;
  top: 1.5rem;
  transition: all 0.3s ease;
}

.timeline-card.left::before {
  right: -2rem;
  transform: translateY(0);
}

.timeline-card.right::before {
  left: -2rem;
  transform: translateY(0);
}

.timeline-card.right {
  margin-left: auto;
}

.timeline-card:hover::before {
  box-shadow: 0 0 15px var(--primary);
  transform: scale(1.2);
}

.timeline-card-content {
  position: relative;
  background: rgba(17, 24, 39, 0.5);
  border-radius: 0.5rem;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.timeline-card-content::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(var(--gradient-angle), var(--primary), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.timeline-card:hover .timeline-card-content::before {
  opacity: 0.1;
  animation: rotate 4s linear infinite;
}

.timeline-line {
  position: absolute;
  left: 50%;
  height: 100%;
  width: 2px;
  transform: translateX(-50%);
  background: var(--primary);
}

.timeline-line.fade {
  background: linear-gradient(
    to bottom,
    var(--primary) 70%,
    transparent
  );
}

.timeline-container {
  position: relative;
  transition: height 0.5s ease;
  min-height: 360px;
}
</style>

<template>
  <section id="curriculum" class="py-32 bg-black/30">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-center mb-16">
        13-Week Curriculum
        <div class="w-24 h-1 bg-primary/50 mx-auto mt-4 rounded-full"></div>
      </h2>
      <div class="relative max-w-4xl mx-auto" ref="target">
        <div :class="['timeline-line', { 'fade': !showAll }]"></div>
        <div class="timeline-container" :style="{ height: `${visibleWeeks.length * 120}px` }">
          <div v-for="(week, index) in visibleWeeks"
               :key="week.week"
               :class="[
                 'timeline-card',
                 index % 2 === 0 ? 'left-0 left' : 'right-0 right',
                 isVisible ? 'opacity-100' : 'opacity-0',
                 'absolute'
               ]"
               :style="{
                 top: `${index * 120}px`,
                 transitionDelay: `${index * 100}ms`,
                 transform: `translateY(${isVisible ? '0' : (index % 2 === 0 ? '-20px' : '20px')})`
               }">
            <div class="timeline-card-content p-5 h-full">
              <div class="flex flex-col gap-2">
                <span class="text-xl font-mono text-primary/60">
                  {{ week.week.toString().padStart(2, '0') }}
                </span>
                <h3 class="font-medium text-lg">{{ week.title }}</h3>
                <p class="text-sm text-gray-400">{{ week.description }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!showAll" class="text-center mt-32">
          <button @click="showAll = true" 
                  class="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-all
                         hover:transform hover:translate-y-[-2px]">
            Load More
          </button>
        </div>
      </div>
    </div>
  </section>
</template>