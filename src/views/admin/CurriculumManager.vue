<script setup lang="ts">
import { ref } from 'vue'
import { useCurriculumStore } from '../../stores/curriculum'
import type { CurriculumWeek } from '../../stores/curriculum'
import LoadingSpinner from '../../components/LoadingSpinner.vue'
import { computed } from 'vue'

const curriculumStore = useCurriculumStore()
const isEditing = ref(false)
const editingItem = ref<CurriculumWeek | null>(null)

const newItem = ref<Partial<CurriculumWeek>>({
  week: curriculumStore.weeks.length + 1,
  title: '',
  description: ''
})

const week = computed({
  get: () => editingItem.value ? editingItem.value.week : newItem.value.week,
  set: (value: number) => {
    if (editingItem.value) {
      editingItem.value.week = value
    } else {
      newItem.value.week = value
    }
  }
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

const handleEdit = (item: CurriculumWeek) => {
  editingItem.value = { ...item }
  isEditing.value = true
}

const handleSave = async () => {
  if (editingItem.value) {
    await curriculumStore.updateWeek(editingItem.value)
  }
  isEditing.value = false
  editingItem.value = null
}

const handleCreate = async () => {
  if (newItem.value.title && newItem.value.description) {
    await curriculumStore.createWeek(newItem.value as CurriculumWeek)
    newItem.value = {
      week: curriculumStore.weeks.length + 1,
      title: '',
      description: ''
    }
  }
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold">Curriculum Manager</h1>
      <button 
        @click="isEditing = !isEditing"
        class="px-4 py-2 bg-primary hover:bg-primary-dark rounded-lg transition-colors">
        {{ isEditing ? 'Cancel' : 'Add Week' }}
      </button>
    </div>

    <!-- Edit/Create Form -->
    <div v-if="isEditing" class="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800 mb-8">
      <h2 class="text-lg font-medium mb-4">{{ editingItem ? 'Edit Week' : 'Create Week' }}</h2>
      <form @submit.prevent="editingItem ? handleSave() : handleCreate()" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1">Week Number</label>
          <input
            v-model.number="week"
            type="number"
            required
            min="1"
            class="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg
                   focus:outline-none focus:border-primary transition-colors"
          />
        </div>

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
          <textarea
            v-model="description"
            rows="3"
            required
            class="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg
                   focus:outline-none focus:border-primary transition-colors"
          ></textarea>
        </div>

        <button
          type="submit"
          :disabled="curriculumStore.isLoading"
          class="w-full bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg
                 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="!curriculumStore.isLoading">{{ editingItem ? 'Save Changes' : 'Create Week' }}</span>
          <LoadingSpinner v-else size="sm" />
        </button>
      </form>
    </div>

    <!-- Curriculum List -->
    <div v-if="curriculumStore.isLoading && !curriculumStore.weeks.length" class="text-center py-16">
      <LoadingSpinner size="lg" />
      <p class="mt-4 text-gray-400">Loading curriculum...</p>
    </div>
    
    <div v-else class="space-y-4">
      <div v-for="item in curriculumStore.weeks" 
           :key="item.week"
           class="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800
                  flex items-center justify-between">
        <div>
          <div class="flex items-center gap-4 mb-2">
            <span class="text-primary font-mono">Week {{ item.week }}</span>
            <h3 class="font-medium">{{ item.title }}</h3>
          </div>
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