<script setup lang="ts">
import Hero from '../components/sections/Hero.vue'
import Curriculum from '../components/sections/Curriculum.vue'
import Instructors from '../components/sections/Instructors.vue'
import News from '../components/sections/News.vue'
import CallToAction from '../components/sections/CallToAction.vue'
import Header from '../components/layout/Header.vue'
import Footer from '../components/layout/Footer.vue'
</script>

<template>
  <div class="min-h-screen bg-black text-white">
    <Header />
    <main>
      <Hero />
      <Curriculum />
      <Instructors />
      <News />
      <CallToAction />
    </main>
    <Footer />
  </div>
</template>