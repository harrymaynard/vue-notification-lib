import { type Component } from 'vue'

export interface IMessage {
  content: string | Component
  id: string | undefined
  type: string | undefined
  level: string | undefined
  isClosable: boolean | undefined
}
