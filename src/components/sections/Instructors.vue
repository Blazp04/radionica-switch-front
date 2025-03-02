<script setup lang="ts">
const instructors = [
  {
    name: 'Blaž Perić',
    role: 'Predavač',
    bio: 'Student 2. godina Informatike. Voditelj projekta SkyGuard i član udruge studenata Switch. ',
    image: 'https://b2ppervj0t.ufs.sh/f/NCCbIxLrCa8cbYxrLWF5QenBDOFPWKHacVdTwi89Et1R7frX',
    gender: 'male'
  },
  {
    name: 'Antonija Kožul',
    role: 'Predavač',
    bio: 'Studentica 3. godine računarstva. Sudjelovala na na više projekata, Članica udruge studenata Switch',
    image: 'https://b2ppervj0t.ufs.sh/f/NCCbIxLrCa8cT9MaXSgd6MmVGAJ17aWDCoUEzfPpKiHebBOR',
    gender: 'female'
  }
]
</script>

<style scoped>
.instructor-card {
  position: relative;
  transition: transform 0.3s ease;
  height: fit-content;
}

.instructor-card-background {
  background: var(--instructor-pink);
}

.instructor-card.female::before {
  background: var(--instructor-pink);
}

.instructor-card.male::before {
  background: var(--instructor-blue);
}

.instructor-card::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 0.5rem;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.instructor-card:hover {
  transform: translateY(-4px);
}

.instructor-card.female:hover::before {
  opacity: 0.5;
  box-shadow:
    0 0 15px var(--instructor-pink);
  animation: neonPulse 1.5s ease-in-out infinite;
}

.instructor-card.male:hover::before {
  opacity: 0.5;
  box-shadow:
    0 0 15px var(--instructor-blue);
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
        Upoznajte predavače
        <div class="w-24 h-1 bg-instructor-blue/50 mx-auto mt-4 rounded-full"></div>
      </h2>
      <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div v-for="instructor in instructors" :key="instructor.name" class="instructor-card"
          :class="{ male: instructor.gender === 'male', female: instructor.gender === 'female' }">
          <div class="bg-gray-900 rounded-lg p-6 sm:p-8">
            <img :src="instructor.image" :alt="instructor.name" class="w-24 h-24 rounded-full object-cover mb-6" />
            <h3 class="text-lg sm:text-xl font-medium mb-2">{{ instructor.name }}</h3>
            <p class="text-gray-400 text-sm mb-4">{{ instructor.role }}</p>
            <p class="text-gray-500 text-sm">{{ instructor.bio }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>