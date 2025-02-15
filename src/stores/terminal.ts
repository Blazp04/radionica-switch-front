import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTerminalStore = defineStore('terminal', () => {
  const terminalLines = [
    '> Starting deployment process...',
    '> Initializing Docker containers...',
    '> Setting up Nginx configuration...',
    '> Configuring load balancer...',
    '> Deployment successful! ✨'
  ]

  const isTyping = ref(false)
  const displayedLines = ref<string[]>([])

  const typeLines = async () => {
    isTyping.value = true
    displayedLines.value = []
    
    for (let i = 0; i < terminalLines.length; i++) {
      const text = terminalLines[i]
      let currentText = ''
      displayedLines.value.push('')
      
      for (let j = 0; j < text.length; j++) {
        currentText += text[j]
        displayedLines.value[i] = currentText
        await new Promise(resolve => setTimeout(resolve, 30))
      }
      
      if (i < terminalLines.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 300))
      } else {
        isTyping.value = false
      }
    }
  }

  const startAnimation = async () => {
    isTyping.value = true
    displayedLines.value = []
    await typeLines()
    
    setTimeout(() => {
      if (!isTyping.value) {
        startAnimation()
      }
    }, 8000)
  }

  return {
    terminalLines,
    isTyping,
    displayedLines,
    startAnimation
  }
})