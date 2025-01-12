<script lang="ts" setup>
import { NotificationProvider, useNotificationStore, type IMessage }  from 'lib'
import AlertBox from './AlertBox.vue'

const notificationStore = useNotificationStore()

const notificationQueueId: string = 'my-notification-queue'

const handleClickAddMessage = () => {
  notificationStore.addMessage(notificationQueueId, {
    text: 'This is a message',
  } as IMessage)
}
</script>

<template>
  <div>
    <NotificationProvider
      :id="notificationQueueId"
      v-slot="{ messages }"
    >
      <AlertBox
        v-for="message in messages"
        :key="message.id"
      >
        {{ message.text }}
      </AlertBox>
    </NotificationProvider>
    <button
      type="button"
      @click="handleClickAddMessage"
    >
      Add Message
    </button>
  </div>
</template>
