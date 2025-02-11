<script lang="ts" setup>
import { type PropType } from 'vue'
import { MessageType } from '../enums/MessageType'
import { IComponentMessage } from '../interfaces/IComponentMessage'

const props = defineProps({
  message: {
    type: Object as PropType<IComponentMessage>,
    required: true,
  }
})
</script>

<template>
  <Component
    v-if="props.message.messageType === MessageType.Component"
    :is="props.message.component"
    :="props.message.props || {}"
    @="props.message.emits || {}"
  />
</template>
