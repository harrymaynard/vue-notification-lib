import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type IMessage } from '../interfaces/IMessage'

/**
 * Store for managing notifications.
 */
export const useNotificationStore = defineStore('notification-store', () => {
  const queues = ref<Map<string, Array<IMessage>>>(new Map())

  /**
   * Add a message to the queue.
   * @param queueKey 
   * @param message 
   */
  const addMessage = (queueKey: string, message: any) => {
    const queue = queues.value.get(queueKey) || []
    queue.push(message)
    queues.value.set(queueKey, queue)
  }

  /**
   * Remove a message from the queue.
   * @param queueKey 
   * @param messageId 
   */
  const removeMessage = (queueKey: string, messageId: any) => {
    const queue = queues.value.get(queueKey) || []
    const index = queue.findIndex((m) => m.id === messageId)
    if (index > -1) {
      queue.splice(index, 1)
      queues.value.set(queueKey, queue)
    }
  }

  /**
   * Clear all messages from the queue.
   * @param queueKey 
   */
  const removeAllMessages = (queueKey: string) => {
    queues.value.delete(queueKey)
  }

  return {
    queues,
    addMessage,
    removeMessage,
    removeAllMessages,
  }
})
