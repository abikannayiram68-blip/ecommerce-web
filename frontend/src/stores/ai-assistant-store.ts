import { create } from 'zustand'
import api from '../api/client'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface AIAssistantState {
  messages: Message[]
  loading: boolean
  error: string | null
  sendMessage: (query: string) => Promise<void>
  addMessage: (role: 'user' | 'assistant', content: string) => void
  clearMessages: () => void
}

export const useAIAssistantStore = create<AIAssistantState>((set) => ({
  messages: [],
  loading: false,
  error: null,
  sendMessage: async (query: string) => {
    set({ loading: true, error: null })
    const userMsg: Message = { role: 'user', content: query }
    set((s) => ({ messages: [...s.messages, userMsg] }))
    try {
      const { data } = await api.post('/ai-assistant/ask', { query })
      const assistantMsg: Message = { role: 'assistant', content: data.response }
      set((s) => ({ messages: [...s.messages, assistantMsg], loading: false }))
    } catch {
      const errorMsg: Message = { role: 'assistant', content: 'Sorry, I could not process your request.' }
      set((s) => ({ messages: [...s.messages, errorMsg], loading: false, error: 'Request failed' }))
    }
  },
  addMessage: (role, content) => set((s) => ({ messages: [...s.messages, { role, content }] })),
  clearMessages: () => set({ messages: [] }),
}))
