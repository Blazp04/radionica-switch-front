import { defineStore } from 'pinia'
import { ref } from 'vue'

export type NewsCategory = 'announcement' | 'tips' | 'schedule'

export interface NewsItem {
  date: string
  title: string
  description: string
  tag: NewsCategory
  image: string
  fullContent: string
}

export const useNewsStore = defineStore('news', () => {
  const news = ref<NewsItem[]>([
    {
      date: '2024-03-15',
      title: 'New Workshop Dates Announced',
      description: 'Join our next cohort starting April 1st. Limited spots available.',
      tag: 'schedule',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
      fullContent: `We're excited to announce our next workshop cohort starting April 1st! This intensive 13-week program will cover everything from basic DevOps principles to advanced cloud infrastructure management.

Key highlights of this cohort:
• Limited to 20 participants for personalized attention
• Live coding sessions with industry experts
• Real-world project implementation
• Career guidance and networking opportunities

Don't miss this opportunity to accelerate your DevOps career. Early bird registration is now open!`
    },
    {
      date: '2024-03-10',
      title: 'Student Success Story',
      description: 'Former student lands senior DevOps position at major tech company.',
      tag: 'announcement',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop',
      fullContent: `We're proud to announce that one of our recent graduates, Sarah Chen, has secured a Senior DevOps position at a leading tech company. Sarah's journey from a traditional system administrator to a DevOps leader is truly inspiring.

"The workshop provided me with not just technical skills, but also the confidence to tackle complex infrastructure challenges," says Sarah. Her success story is a testament to the effectiveness of our practical, hands-on curriculum.

Sarah particularly credits the CI/CD and Kubernetes modules for helping her stand out in the interview process.`
    },
    {
      date: '2024-03-05',
      title: 'Curriculum Update',
      description: 'Added new module on Kubernetes and advanced orchestration.',
      tag: 'tips',
      image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=800&auto=format&fit=crop',
      fullContent: `We're constantly evolving our curriculum to keep pace with industry demands. Our latest update includes a comprehensive module on Kubernetes and advanced container orchestration.

New topics covered:
• Kubernetes architecture and components
• Deployment strategies and scaling
• Service mesh implementation
• Advanced monitoring and troubleshooting

These additions ensure our students are well-prepared for the growing demands of modern cloud-native environments.`
    }
  ])

  // Simulating API loading state
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const createNews = async (newsItem: NewsItem) => {
    isLoading.value = true
    error.value = null
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      news.value.unshift(newsItem)
    } catch (e) {
      error.value = 'Failed to create news'
    } finally {
      isLoading.value = false
    }
  }

  const updateNews = async (updatedItem: NewsItem) => {
    isLoading.value = true
    error.value = null
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      const index = news.value.findIndex(item => item.date === updatedItem.date)
      if (index !== -1) {
        news.value[index] = updatedItem
      }
    } catch (e) {
      error.value = 'Failed to update news'
    } finally {
      isLoading.value = false
    }
  }

  const fetchNews = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      // Simulate 3-second API call
      await new Promise(resolve => setTimeout(resolve, 3000))
      // In the future, replace with actual API call:
      // const response = await fetch('/api/news')
      // news.value = await response.json()
    } catch (e) {
      error.value = 'Failed to fetch news'
    } finally {
      isLoading.value = false
    }
  }

  return {
    news,
    isLoading,
    error,
    fetchNews,
    createNews,
    updateNews
  }
})