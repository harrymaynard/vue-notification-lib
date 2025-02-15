<script lang="ts" setup>
import { onMounted } from 'vue'
import {
  ComponentNotification,
  NotificationProvider,
  useNotificationStore,
  type ITextMessage,
  MessageType,
  createComponentMessage,
  createTextMessage,
  createNativeMessage
}  from 'lib'
import CustomNotification from './CustomNotification.vue'

const notificationStore = useNotificationStore()

const notificationQueueId: string = 'my-notification-queue'

onMounted(() => {
  notificationStore.configure({
    messageType: MessageType.Component,
    content: {
      component: CustomNotification,
    }
  })
})

const handleClickAddComponentMessage = () => {
  const message = createComponentMessage(
    CustomNotification,
    {
      props: {
        text: 'Component Hello World!'
      }
    }
  )
  notificationStore.addMessage(notificationQueueId, message)
}

const handleClickAddTextMessage = () => {
  const message = createTextMessage('Text Hello World!')
  notificationStore.addMessage(notificationQueueId, message)
}

const handleClickAddNativeMessage = () => {
  const message = createNativeMessage('Native Hello World!')
  notificationStore.addMessage(null, message)
}
</script>

<template>
  <div>
    <NotificationProvider
      :id="notificationQueueId"
      v-slot="{ messages }"
    >
      <template
        v-for="message in messages"
        :key="message.id"
      >
        <ComponentNotification
          v-if="message.messageType === MessageType.Component"
          :message="message"
        />
        <CustomNotification
          v-else-if="message.messageType === MessageType.Text"
          :text="(message as ITextMessage).text"
        />
      </template>
    </NotificationProvider>
    <button
      type="button"
      @click="handleClickAddComponentMessage"
    >
      Add Component Message
    </button>
    &nbsp;
    <button
      type="button"
      @click="handleClickAddTextMessage"
    >
      Add Text Message
    </button>
    &nbsp;
    <button
      type="button"
      @click="handleClickAddNativeMessage"
    >
      Add Native Message
    </button>
  </div>
</template>
