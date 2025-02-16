import { type IMessage } from './IMessage'
import { type INativeMessageOptions } from './INativeMessageOptions'

export interface INativeMessage extends IMessage {
  title: string
  options?: INativeMessageOptions
}
