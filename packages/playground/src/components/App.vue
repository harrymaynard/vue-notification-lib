<script lang="ts" setup>
import { type Component, onMounted } from 'vue'
import { ComponentNotification, NotificationProvider, useNotificationStore, type IMessage, MessageType, createComponentMessage, createTextMessage }  from 'lib'
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
  const message = createTextMessage(
    'Text Hello World!'
  )
  notificationStore.addMessage(notificationQueueId, message)
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
          v-if="message.messageType === MessageType.Text"
          :text="message.text"
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
  </div>
</template>
