import { type Component } from 'vue'
import { type IMessage } from '../interfaces/IMessage'
import { type ITextMessage } from '../interfaces/ITextMessage'
import { type IComponentMessage } from '../interfaces/IComponentMessage'
import { LevelType } from '../enums/LevelType'
import { MessageType } from '../enums/MessageType'
import { QueueType } from '../enums/QueueType'

export const createTextMessage = (
  text: string,
  options?: {
    level?: LevelType,
    isClosable?: boolean
  }
): ITextMessage => {
  const {
    level = LevelType.Info,
    isClosable = false
  } = options || {}

  return {
    queueType: QueueType.Web,
    messageType: MessageType.Text,
    text,
    level,
    isClosable,
  }
}

export const createComponentMessage = (
  component: Component,
  options?: {
    props?: { [key: string]: any },
    emits?: { [key: string]: (...args: any[]) => void },
    level?: LevelType,
    isClosable?: boolean
  }
): IComponentMessage => {
  const {
    props = {},
    emits = {},
    level = LevelType.Info,
    isClosable = false
  } = options || {}

  return {
    queueType: QueueType.Web,
    messageType: MessageType.Component,
    component,
    props,
    emits,
    level,
    isClosable,
  }
}

export const createNativeMessage = (
  text: string,
): ITextMessage => {
  return {
    queueType: QueueType.Native,
    messageType: MessageType.Text,
    text,
  }
}