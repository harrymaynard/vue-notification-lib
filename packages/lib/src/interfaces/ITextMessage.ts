import { type Component } from 'vue'
import { type IMessage } from './IMessage'
import { MessageType } from '../enums/MessageType'

export interface ITextMessage extends IMessage {
  text: string
}
