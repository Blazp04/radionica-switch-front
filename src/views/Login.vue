<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  await authStore.login(email.value, password.value)
  
  if (authStore.isAuthenticated) {
    router.push('/admin')
  }
}
</script>

<template>
  <div class="min-h-screen bg-black flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
        <h1 class="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        
        <form @submit="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">
              Email
            </label>
            <input
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg
                     focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">
              Password
            </label>
            <input
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg
                     focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div v-if="authStore.error" class="text-red-500 text-sm mt-2">
            {{ authStore.error }}
          </div>
          
          <button
            type="submit"
            :disabled="authStore.isLoading"
            class="w-full bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg
                   transition-colors relative overflow-hidden disabled:opacity-50
                   disabled:cursor-not-allowed"
          >
            <span v-if="!authStore.isLoading">Login</span>
            <LoadingSpinner v-else size="sm" />
          </button>
        </form>
      </div>
    </div>
  </div>
</template>