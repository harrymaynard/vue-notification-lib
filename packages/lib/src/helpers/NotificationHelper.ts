import { type Component } from 'vue'
import { type IMessage } from '../interfaces/IMessage'
import { LevelType } from '../enums/LevelType'

export const createTextMessage = (
  text: string,
  level: LevelType = LevelType.Info,
  isClosable: boolean = true
): IMessage => {
  return {
    content: {
      component: undefined,
      props: {
        text,
      },
    },
    level,
    isClosable,
  }
}

export const createComponentMessage = (
  component: Component,
  details: {
    props?: { [key: string]: any },
    emits?: { [key: string]: (...args: any[]) => void },
  } = {},
  level: LevelType = LevelType.Info,
  isClosable: boolean = true
): IMessage => {
  return {
    content: {
      component,
      props: details.props || {},
      emits: details.emits || {},
    },
    level,
    isClosable,
  }
}