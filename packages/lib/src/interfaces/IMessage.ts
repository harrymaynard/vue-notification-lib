import { type Component } from 'vue'
import { MessageType } from '../enums/MessageType'

export interface IMessage {
  messageType: MessageType | undefined
  content: {
    component: Component
    props?: {
      [key: string]: any
    }
    emits?: {
      [key: string]: (...args: any[]) => void
    }
  }
  id: string | undefined
  level: string | undefined
  isClosable: boolean | undefined
}
