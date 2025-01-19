import { type Component } from 'vue'
import { MessageType } from '../enums/MessageType'

export interface IMessage {
  messageType: MessageType
  content: {
    component: Component
    props?: Record<string, any>
    emits?: Record<string, (...args: any[]) => void>
  }
  id: string | undefined
  type: string | undefined
  level: string | undefined
  isClosable: boolean | undefined
}
