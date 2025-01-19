<script lang="ts" setup>
import { type Component } from 'vue'
import { Notification, NotificationProvider, useNotificationStore, type IMessage, MessageType }  from 'lib'
import AlertBox from './AlertBox.vue'
import CustomNotification from './CustomNotification.vue'

const notificationStore = useNotificationStore()

const notificationQueueId: string = 'my-notification-queue'

const handleClickAddMessage = () => {
  notificationStore.addMessage(notificationQueueId, {
    content: {
      component: CustomNotification as Component,
    },
    messageType: MessageType.Component,
  } as IMessage)
}
</script>

<template>
  <div>
    <NotificationProvider
      :id="notificationQueueId"
      v-slot="{ messages }"
    >
      <Notification
        v-for="message in messages"
        :key="message.id"
        :message="message"
      />
    </NotificationProvider>
    <button
      type="button"
      @click="handleClickAddMessage"
    >
      Add Message
    </button>
  </div>
</template>
