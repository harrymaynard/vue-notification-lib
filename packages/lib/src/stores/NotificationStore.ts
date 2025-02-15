import { defineStore } from 'pinia'
import { ref, markRaw, type Component } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { type IMessage } from '../interfaces/IMessage'
import { type ITextMessage } from '../interfaces/ITextMessage'
import { type IComponentMessage } from '../interfaces/IComponentMessage'
import { type INativeMessage } from '../interfaces/INativeMessage'
import { type INotificationConfig } from '../interfaces/INotificationConfig'
import { MessageType } from '../enums/MessageType'
import { QueueType } from '../enums/QueueType'

/**
 * Store for managing notifications.
 */
export const useNotificationStore = defineStore('notification-store', () => {
  const queues = ref<Map<string, Array<IMessage>>>(new Map())
  const defaultConfig = ref<INotificationConfig>({
    messageType: MessageType.Text,
    component: undefined,
  })

  /**
   * Add a message to the queue.
   * @param queueId 
   * @param message 
   */
  const addMessage = (
    queueId: string | null,
    message: IComponentMessage | ITextMessage | INativeMessage
  ) => {
    if (!message.id) {
      message.id = uuidv4()
    }

    switch (message.queueType) {
      case QueueType.Web:
        addWebMessage(queueId as string, message as IComponentMessage | ITextMessage)
        break

      case QueueType.Native:
        addNativeMessage(message as INativeMessage)
        break

      default:
        throw new Error('Invalid queue type')
    }
  }

  const addWebMessage = (
    queueId: string,
    message: IComponentMessage | ITextMessage
  ) => {
    if (!queueId) throw new Error('Queue ID is required')

    if (
      message.messageType === MessageType.Component ||
      !message.messageType && defaultConfig.value.messageType === MessageType.Component
    ) {
      message.messageType = MessageType.Component
      // @ts-expect-error
      message.component = !!message.component
        // @ts-expect-error
        ? markRaw(message.component as Component)
        : defaultConfig.value?.component as Component
    }
    const queue = queues.value.get(queueId) || []
    queue.push(message)
    queues.value.set(queueId, queue)
  }

  const addNativeMessage = (
    message: ITextMessage
  ) => {
    if (!("Notification" in window)) {
      // Check if the browser supports notifications
      alert("This browser does not support desktop notification")
    } else if (Notification.permission === "granted") {
      // Check whether notification permissions have already been granted;
      // if so, create a notification
      const notification = new Notification(message.text)
      // …
    } else if (Notification.permission !== "denied") {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          const notification = new Notification(message.text)
          // …
        }
      })
    }
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
    if (config?.component) {
      config.component = markRaw(config.component as Component)
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
