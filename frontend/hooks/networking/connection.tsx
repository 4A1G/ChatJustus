import { createContext, useMemo, useEffect } from 'react'
import { toast } from 'sonner'

export const ConnectionContext = createContext<Connection | null>(null)

export const ConnectionProvider = ({ url, children }: { url: string, children: React.ReactNode }) => {
  const defaultConnection = useMemo(() => new Connection(url), [url])

  // cleanup on unmount
  useEffect(() => {
    return () => {
      defaultConnection.disconnect()
    }
  }, [url, defaultConnection])

  return (
    <ConnectionContext.Provider value={defaultConnection}>
      {children}
    </ConnectionContext.Provider>
  )
}


export class Connection {
  url: string;
  ws: WebSocket | null = null;

  isConnected: boolean = false;
  onConnectionChange?: ((arg0: boolean) => void) = undefined;
  minRetryInterval: number;
  maxRetryInterval: number;
  retryInterval: number;

  private eventHandlers: { [event: string]: (data: any) => void } = {};
  private initHandlers: { [key: string]: (() => void) } = {};
  private retryTimeout: NodeJS.Timeout | null = null; // scheduled retry
  private autoReconnect: boolean = true;



  constructor(url: string, minRetryInterval: number = 250, maxRetryInterval: number = 10000) {
    this.url = url;
    this.minRetryInterval = minRetryInterval;
    this.maxRetryInterval = maxRetryInterval;
    this.retryInterval = minRetryInterval;
  }

  registerEvent(event: string, callback: (data: any) => void) {
    if (event in this.eventHandlers)
      throw new Error(`already subscribed to ${event}`)
    this.eventHandlers[event] = callback
  }

  deregisterEvent(event: string) {
    if (!(event in this.eventHandlers))
      throw new Error(`not subscribed to ${event}`)
    delete this.eventHandlers[event]
  }

  registerInit(key: string, callback: () => void) {
    if (key in this.initHandlers)
      throw new Error(`already registered`)
    this.initHandlers[key] = callback
  }

  deregisterInit(key: string) {
    if (!(key in this.initHandlers))
      throw new Error(`not registered`)
    delete this.initHandlers[key]
  }

  send(event: string, data: any) {
    if (!this.isConnected)
      return

    this.ws!.send(JSON.stringify({
      type: event,
      data: data,
    }))
  }

  connect() {
    console.log('connecting to ', this.url)
    toast.info('Connecting to server...')
    this.ws = new WebSocket(this.url)
    this.autoReconnect = true

    this.ws.onopen = () => {
      console.log('connected')
      toast.success('Connected to server!')
      this.isConnected = true
      if (this.onConnectionChange)
        this.onConnectionChange(this.isConnected)
      this.retryInterval = this.minRetryInterval
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      this.isConnected = false
      if (this.onConnectionChange)
        this.onConnectionChange(this.isConnected)
      if (this.autoReconnect) {
          toast.warning(`Disconnected from server: Retrying in ${this.retryInterval / 1000} seconds...`)
          this.retryTimeout = setTimeout(() => {
          // skip if we've already reconnected or deleted
          if (this !== null && this.url && !this.isConnected) {
            console.log('reconnecting')
            this.connect()
          }
        }, this.retryInterval)
        this.retryInterval = Math.min(this.retryInterval * 2, this.maxRetryInterval)
      } else {
        toast.warning('Disconnected from server!')
      }
    }

    this.ws.onerror = (err) => {
      console.error(
        "Socket encountered error: ",
        err,
        "Closing socket"
      )
      toast.error(`Socket Error: ${err}`)
      this.ws!.close()
    }

    this.ws.onmessage = (e) => { this.handleReceiveEvent(e) }

    return () => {
      this.disconnect()
    }
  }

  disconnect() {
    this.autoReconnect = false
    this.ws?.close()
    if (this.onConnectionChange)
      this.onConnectionChange(false)
    if (this.ws !== null) {
      this.ws.onopen = null
      this.ws.onclose = null
      this.ws.onmessage = null
      this.ws.onerror = null
      this.ws = null
    }
    if (this.retryTimeout !== null) {
      clearTimeout(this.retryTimeout)
      this.retryTimeout = null
    }
  }

  handleReceiveEvent(e: MessageEvent) {
    const event = JSON.parse(e.data)
    // console.log(event)
    // console.log(this.eventHandlers)
    if (event.type in this.eventHandlers) {
      this.eventHandlers[event.type](event.data)
    }
    else {
      console.log(`unhandled event: ${event.type}`)
    }
  }
}