<script setup lang="ts">
const instructors = [
  {
    name: 'Blaž Perić',
    role: 'Senior Software Engineer',
    bio: '10+ years of experience in cloud infrastructure and DevOps. Expert in containerization and microservices architecture.',
    image: 'https://i.pravatar.cc/300?img=11'
  },
  {
    name: 'Antonija Kožul',
    role: 'Lead DevOps Engineer',
    bio: 'Specialized in CI/CD pipelines and cloud infrastructure. Passionate about teaching and mentoring new developers.',
    image: 'https://i.pravatar.cc/300?img=9'
  }
]
</script>

<style scoped>
.instructor-card {
  position: relative;
  transition: transform 0.3s ease;
}

.instructor-card::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: #3b82f6;
  border-radius: 0.5rem;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.instructor-card:hover {
  transform: translateY(-4px);
}

.instructor-card:hover::before {
  opacity: 0.5;
  box-shadow: 
    10 10 1px #3b82f6,
    10 10 2px #3b82f6,
    10 10 1px #3b82f6;
  animation: neonPulse 1.5s ease-in-out infinite;
}

@keyframes neonPulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}
</style>

<template>
  <section id="instructors" class="py-32">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-center mb-16">
        Meet Your Instructors
        <div class="w-24 h-1 bg-instructor-blue/50 mx-auto mt-4 rounded-full"></div>
      </h2>
      <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div v-for="instructor in instructors" 
             :key="instructor.name" 
             class="instructor-card">
          <div class="bg-gray-900 rounded-lg p-8">
            <img :src="instructor.image" 
                 :alt="instructor.name" 
                 class="w-24 h-24 rounded-full object-cover mb-6" />
            <h3 class="text-xl font-medium mb-2">{{ instructor.name }}</h3>
            <p class="text-gray-400 text-sm mb-4">{{ instructor.role }}</p>
            <p class="text-gray-500 text-sm">{{ instructor.bio }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>