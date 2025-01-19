import { defineStore } from 'pinia'
import { ref, markRaw, type Component } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { type IMessage } from '../interfaces/IMessage'
import { MessageType } from '../enums/MessageType'

/**
 * Store for managing notifications.
 */
export const useNotificationStore = defineStore('notification-store', () => {
  const queues = ref<Map<string, Array<IMessage>>>(new Map())

  /**
   * Add a message to the queue.
   * @param queueId 
   * @param message 
   */
  const addMessage = (queueId: string, message: IMessage) => {
    if (!message.id) {
      message.id = uuidv4()
    }
    if (message.messageType === MessageType.Component && message.content.component) {
      message.content.component = markRaw(message.content.component as Component)
    }
    const queue = queues.value.get(queueId) || []
    queue.push(message)
    queues.value.set(queueId, queue)
  }

  /**
   * Remove a message from the queue.
   * @param queueId 
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
   * @param queueId 
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
