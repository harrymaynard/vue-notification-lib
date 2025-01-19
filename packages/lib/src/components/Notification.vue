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
    v-if="props.message.messageType === MessageType.Component"
    :is="props.message.content.component"
    :message="props.message"
  />
  <div
    v-else
    :class="[
      'alert',
      'alert-' + props.message.level,
    ]"
  >
    {{ props.message.content }}
  </div>
</template>
