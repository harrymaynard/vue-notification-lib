import { type Component } from 'vue'
import { type IMessage } from './IMessage'
import { type LevelType } from '../enums/LevelType'

export interface IComponentMessage extends IMessage {
  component: Component | undefined
  props?: {
    [key: string]: any
  }
  emits?: {
    [key: string]: (...args: any[]) => void
  }
  level?: LevelType
  isClosable?: boolean
}
