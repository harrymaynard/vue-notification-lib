import { type Component } from 'vue'
import { type IMessage } from '../interfaces/IMessage'
import { type ITextMessage } from '../interfaces/ITextMessage'
import { type IComponentMessage } from '../interfaces/IComponentMessage'
import { LevelType } from '../enums/LevelType'
import { MessageType } from '../enums/MessageType'

export const createTextMessage = (
  text: string,
  level: LevelType = LevelType.Info,
  isClosable: boolean = true
): ITextMessage => {
  return {
    messageType: MessageType.Text,
    text,
    level,
    isClosable,
  }
}

export const createComponentMessage = (
  component: Component,
  config: {
    props?: { [key: string]: any },
    emits?: { [key: string]: (...args: any[]) => void },
  } = {},
  level: LevelType = LevelType.Info,
  isClosable: boolean = true
): IComponentMessage => {
  return {
    messageType: MessageType.Component,
    component,
    props: config.props || {},
    emits: config.emits || {},
    level,
    isClosable,
  }
}