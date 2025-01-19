<script lang="ts" setup>
import { type PropType } from 'vue'
import { type IMessage } from '../interfaces/IMessage'
import { MessageType } from '../enums/MessageType'

const props = defineProps({
  message: {
    type: Object as PropType<IMessage>,
    required: true,
  }
})
</script>

<template>
  <Component
    v-if="message.type === MessageType.Component"
    :is="message.content"
    :message="message"
  />
  <div
    v-else
    :class="[
      'alert',
      'alert-' + message.level,
    ]"
  >
    {{ message.content }}
  </div>
</template>
