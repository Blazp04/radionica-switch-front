<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-black text-white flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900/50 backdrop-blur-sm border-r border-gray-800">
      <div class="p-4 border-b border-gray-800">
        <h1 class="text-xl font-bold">Admin Panel</h1>
      </div>
      
      <nav class="p-4">
        <router-link 
          to="/admin" 
          class="block py-2 px-4 rounded-lg mb-2 hover:bg-gray-800 transition-colors"
          :class="{ 'bg-gray-800': $route.path === '/admin' }">
          Dashboard
        </router-link>
        <router-link 
          to="/admin/news" 
          class="block py-2 px-4 rounded-lg mb-2 hover:bg-gray-800 transition-colors"
          :class="{ 'bg-gray-800': $route.path === '/admin/news' }">
          News
        </router-link>
        <router-link 
          to="/admin/curriculum" 
          class="block py-2 px-4 rounded-lg mb-2 hover:bg-gray-800 transition-colors"
          :class="{ 'bg-gray-800': $route.path === '/admin/curriculum' }">
          Curriculum
        </router-link>
      </nav>

      <div class="p-4 mt-auto border-t border-gray-800">
        <button 
          @click="handleLogout"
          class="w-full py-2 px-4 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors">
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8">
      <router-view />
    </main>
  </div>
</template>