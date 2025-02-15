import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface CurriculumWeek {
  week: number
  title: string
  description: string
}

export const useCurriculumStore = defineStore('curriculum', () => {
  const weeks = ref<CurriculumWeek[]>([
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
    { week: 13, title: 'Final Project', description: 'Putting it all together in a real-world scenario' }
  ])

  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const showAll = ref(false)

  const createWeek = async (week: CurriculumWeek) => {
    isLoading.value = true
    error.value = null
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      weeks.value.push(week)
      weeks.value.sort((a, b) => a.week - b.week)
    } catch (e) {
      error.value = 'Failed to create week'
    } finally {
      isLoading.value = false
    }
  }

  const updateWeek = async (updatedWeek: CurriculumWeek) => {
    isLoading.value = true
    error.value = null
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      const index = weeks.value.findIndex(w => w.week === updatedWeek.week)
      if (index !== -1) {
        weeks.value[index] = updatedWeek
      }
    } catch (e) {
      error.value = 'Failed to update week'
    } finally {
      isLoading.value = false
    }
  }

  const visibleWeeks = computed(() => {
    return showAll.value ? weeks.value : weeks.value.slice(0, 3)
  })

  const fetchCurriculum = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      // Simulate 3-second API call
      await new Promise(resolve => setTimeout(resolve, 3000))
      // In the future, replace with actual API call:
      // const response = await fetch('/api/curriculum')
      // weeks.value = await response.json()
    } catch (e) {
      error.value = 'Failed to fetch curriculum'
    } finally {
      isLoading.value = false
    }
  }

  const toggleShowAll = () => {
    showAll.value = !showAll.value
  }

  return {
    weeks,
    visibleWeeks,
    isLoading,
    error,
    showAll,
    fetchCurriculum,
    toggleShowAll,
    createWeek,
    updateWeek
  }
})