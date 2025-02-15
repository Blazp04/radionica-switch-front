<script setup lang="ts">
import { ref } from 'vue'
import { useNewsStore } from '../../stores/news'
import type { NewsItem } from '../../stores/news'
import LoadingSpinner from '../../components/LoadingSpinner.vue'
import { computed } from 'vue'

const tagOptions = [
  { value: 'announcement', label: 'Announcement', color: 'text-blue-400 bg-blue-500/10' },
  { value: 'tips', label: 'Tips', color: 'text-emerald-400 bg-emerald-500/10' },
  { value: 'schedule', label: 'Schedule', color: 'text-purple-400 bg-purple-500/10' }
]

const newsStore = useNewsStore()
const isEditing = ref(false)
const editingItem = ref<NewsItem | null>(null)

const newItem = ref<Partial<NewsItem>>({
  title: '',
  description: '',
  tag: 'announcement',
  image: '',
  fullContent: ''
})

const title = computed({
  get: () => editingItem.value ? editingItem.value.title : newItem.value.title,
  set: (value: string) => {
    if (editingItem.value) {
      editingItem.value.title = value
    } else {
      newItem.value.title = value
    }
  }
})

const description = computed({
  get: () => editingItem.value ? editingItem.value.description : newItem.value.description,
  set: (value: string) => {
    if (editingItem.value) {
      editingItem.value.description = value
    } else {
      newItem.value.description = value
    }
  }
})

const tag = computed({
  get: () => editingItem.value ? editingItem.value.tag : newItem.value.tag,
  set: (value: 'announcement' | 'tips' | 'schedule') => {
    if (editingItem.value) {
      editingItem.value.tag = value
    } else {
      newItem.value.tag = value
    }
  }
})

const image = computed({
  get: () => editingItem.value ? editingItem.value.image : newItem.value.image,
  set: (value: string) => {
    if (editingItem.value) {
      editingItem.value.image = value
    } else {
      newItem.value.image = value
    }
  }
})

const fullContent = computed({
  get: () => editingItem.value ? editingItem.value.fullContent : newItem.value.fullContent,
  set: (value: string) => {
    if (editingItem.value) {
      editingItem.value.fullContent = value
    } else {
      newItem.value.fullContent = value
    }
  }
})

const handleEdit = (item: NewsItem) => {
  editingItem.value = { ...item }
  isEditing.value = true
}

const handleSave = async () => {
  if (editingItem.value) {
    await newsStore.updateNews(editingItem.value)
  }
  isEditing.value = false
  editingItem.value = null
}

const handleCreate = async () => {
  if (newItem.value.title && newItem.value.description) {
    await newsStore.createNews({
      ...newItem.value,
      date: new Date().toISOString(),
    } as NewsItem)
    
    newItem.value = {
      title: '',
      description: '',
      tag: 'announcement',
      image: '',
      fullContent: ''
    }
  }
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold">News Manager</h1>
      <button 
        @click="isEditing = !isEditing"
        class="px-4 py-2 bg-primary hover:bg-primary-dark rounded-lg transition-colors">
        {{ isEditing ? 'Cancel' : 'Add News' }}
      </button>
    </div>

    <!-- Edit/Create Form -->
    <div v-if="isEditing" class="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800 mb-8">
      <h2 class="text-lg font-medium mb-4">{{ editingItem ? 'Edit News' : 'Create News' }}</h2>
      <form @submit.prevent="editingItem ? handleSave() : handleCreate()" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1">Title</label>
          <input
            v-model="title"
            type="text"
            required
            class="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg
                   focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1">Description</label>
          <input
            v-model="description"
            type="text"
            required
            class="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg
                   focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1">Tag</label>
          <div class="grid grid-cols-3 gap-3">
            <button
              v-for="option in tagOptions"
              :key="option.value"
              type="button"
              @click="tag = option.value as 'announcement' | 'tips' | 'schedule'"
              :class="[
                'px-4 py-2 rounded-lg transition-all duration-200 border backdrop-blur-sm',
                tag === option.value
                  ? `${option.color} border-current`
                  : 'border-gray-800 text-gray-400 hover:border-gray-700'
              ]"
            >
              {{ option.label }}
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1">Image URL</label>
          <input
            v-model="image"
            type="url"
            required
            class="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg
                   focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1">Full Content</label>
          <textarea
            v-model="fullContent"
            rows="5"
            required
            class="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg
                   focus:outline-none focus:border-primary transition-colors"
          ></textarea>
        </div>

        <button
          type="submit"
          :disabled="newsStore.isLoading"
          class="w-full bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg
                 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="!newsStore.isLoading">{{ editingItem ? 'Save Changes' : 'Create News' }}</span>
          <LoadingSpinner v-else size="sm" />
        </button>
      </form>
    </div>

    <!-- News List -->
    <div v-if="newsStore.isLoading && !newsStore.news.length" class="text-center py-16">
      <LoadingSpinner size="lg" />
      <p class="mt-4 text-gray-400">Loading news...</p>
    </div>
    
    <div v-else class="space-y-4">
      <div v-for="item in newsStore.news" 
           :key="item.title"
           class="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800
                  flex items-center justify-between">
        <div>
          <h3 class="font-medium mb-2">{{ item.title }}</h3>
          <p class="text-gray-400 text-sm">{{ item.description }}</p>
        </div>
        <button 
          @click="handleEdit(item)"
          class="px-4 py-2 text-primary hover:text-white transition-colors">
          Edit
        </button>
      </div>
    </div>
  </div>
</template>