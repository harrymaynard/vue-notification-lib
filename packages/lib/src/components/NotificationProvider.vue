<script lang="ts" setup>
import { useNotificationStore } from '../stores/NotificationStore'

const props = defineProps({
  queueKey: {
    type: String,
    required: true,
  }
})

const notificationStore = useNotificationStore()
</script>

<template>
  <slot :messages="notificationStore.queues.get(props.queueKey)"></slot>
</template>
