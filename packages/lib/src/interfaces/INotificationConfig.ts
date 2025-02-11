import { type Component } from 'vue'
import { MessageType } from '../enums/MessageType'

export interface INotificationConfig {
  messageType: MessageType
  component?: Component | undefined
}
