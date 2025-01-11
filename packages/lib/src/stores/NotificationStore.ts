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
  const addMessage = (queueId: string, message: any) => {
    const queue = queues.value.get(queueId) || []
    queue.push(message)
    queues.value.set(queueId, queue)
  }

  /**
   * Remove a message from the queue.
   * @param queueKey 
   * @param messageId 
   */
  const removeMessage = (queueId: string, messageId: any) => {
    const queue = queues.value.get(queueId) || []
    const index = queue.findIndex((m) => m.id === messageId)
    if (index > -1) {
      queue.splice(index, 1)
      queues.value.set(queueId, queue)
    }
  }

  /**
   * Clear all messages from the queue.
   * @param queueKey 
   */
  const removeAllMessages = (queueId: string) => {
    queues.value.delete(queueId)
  }

  return {
    queues,
    addMessage,
    removeMessage,
    removeAllMessages,
  }
})
