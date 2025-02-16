import { type MessageType } from '../enums/MessageType'
import { type QueueType } from '../enums/QueueType'

export interface IMessage {
  queueType?: QueueType
  messageType?: MessageType
  id?: string
}
