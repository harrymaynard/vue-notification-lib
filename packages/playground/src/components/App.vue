<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import { NotificationProvider, useNotificationStore }  from 'lib'
import AlertBox from './AlertBox.vue'

const notificationQueueKey: string = 'my-notification-queue'
let notificationStore

onBeforeMount(() => {
  notificationStore = useNotificationStore()
})


const handleClickAddMessage = () => {
  notificationStore.addMessage(notificationQueueKey, {
    id: Date.now(),
    text: 'This is a message',
  })
}
</script>

<template>
  <div>
    <NotificationProvider
      :queueKey="notificationQueueKey"
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
    >Add Message</button>
  </div>
</template>
