import { defineStore } from 'pinia'
import { ref, markRaw, type Component } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { type IMessage } from '../interfaces/IMessage'
import { type INotificationConfig } from '../interfaces/INotificationConfig'
import { MessageType } from '../enums/MessageType'

/**
 * Store for managing notifications.
 */
export const useNotificationStore = defineStore('notification-store', () => {
  const queues = ref<Map<string, Array<IMessage>>>(new Map())
  const defaultConfig = ref<INotificationConfig>({
    messageType: MessageType.Text,
    content: {
      component: undefined,
    },
  })

  /**
   * Add a message to the queue.
   * @param queueId 
   * @param message 
   */
  const addMessage = (queueId: string, message: IMessage) => {
    if (!message.id) {
      message.id = uuidv4()
    }

    if (
      message.messageType === MessageType.Component ||
      !message.messageType && defaultConfig.value.messageType === MessageType.Component
    ) {
      message.messageType = MessageType.Component
      message.content.component = message.content.component
        ? markRaw(message.content.component as Component)
        : defaultConfig.value.content?.component as Component
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

  /**
   * Configure the default notification config.
   * @param config 
   */
  const configure = (config: INotificationConfig) => {
    if (config.content?.component) {
      config.content.component = markRaw(config.content.component as Component)
    }
    defaultConfig.value = config
  }

  return {
    queues,
    addMessage,
    removeMessage,
    removeAllMessages,
    configure,
  }
})
