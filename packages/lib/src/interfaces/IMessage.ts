import { MessageType } from '../enums/MessageType'
import { LevelType } from '../enums/LevelType'

export interface IMessage {
  messageType?: MessageType
  id?: string
  level?: LevelType
  isClosable?: boolean
}
