export interface IMessage {
  text: string
  id: string | undefined
  type: string | undefined
  level: string | undefined
  isClosable: boolean | undefined
}
