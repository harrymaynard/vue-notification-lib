import { type LevelType } from '../enums/LevelType'
import { type IMessage } from './IMessage'

export interface ITextMessage extends IMessage {
  text: string
  level?: LevelType
  isClosable?: boolean
}
