export interface INativeMessageOptions {
  actions?: any
  badge?: string
  body?: string
  data?: any
  dir?: 'auto' | 'ltr' | 'rtl'
  icon?: string
  image?: string
  lang?: string
  renotify?: boolean
  requireInteraction?: boolean
  silent?: boolean
  tag?: string
  timestamp?: number
  vibrate?: Array<number>
}
