import { type Component } from 'vue'
import { MessageType } from '../enums/MessageType'

export interface INotificationConfig {
  messageType: MessageType
  content: {
    component?: Component | undefined
    text?: string | undefined
  } | undefined
}
