/**
 * A lightweight typed event emitter
 */

type EventHandler<T = unknown> = (data: T) => void

export class EventEmitter<Events extends Record<string, unknown> = Record<string, unknown>> {
  private handlers = new Map<keyof Events, Set<EventHandler>>()

  on<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>): () => void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set())
    }
    this.handlers.get(event)!.add(handler as EventHandler)
    return () => this.off(event, handler)
  }

  once<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>): () => void {
    const wrapper: EventHandler<Events[K]> = (data) => {
      handler(data)
      this.off(event, wrapper)
    }
    return this.on(event, wrapper)
  }

  off<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>): void {
    this.handlers.get(event)?.delete(handler as EventHandler)
  }

  emit<K extends keyof Events>(event: K, data: Events[K]): void {
    this.handlers.get(event)?.forEach((handler) => {
      try {
        handler(data)
      } catch (err) {
        console.error(`Error in event handler for "${String(event)}":`, err)
      }
    })
  }

  removeAllListeners(event?: keyof Events): void {
    if (event) {
      this.handlers.delete(event)
    } else {
      this.handlers.clear()
    }
  }

  listenerCount(event: keyof Events): number {
    return this.handlers.get(event)?.size ?? 0
  }
}
