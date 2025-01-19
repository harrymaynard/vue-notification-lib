export interface IMessage {
  content: string
  id: string | undefined
  type: string | undefined
  level: string | undefined
  isClosable: boolean | undefined
}
