import EventEmitter from 'events'

const SET_TIMEOUT_DELAY = 3000

const eventEmitter = new EventEmitter()

const GlobalEmitter = {
  on: (event, fn) => eventEmitter.on(event, fn),
  once: (event, fn) => eventEmitter.once(event, fn),
  off: (event, fn) => eventEmitter.off(event, fn),
  emit: (event, payload) => {
    if (eventEmitter.listenerCount(event)) {
      eventEmitter.emit(event, payload)
    } else {
      // to prevent cases when emit component mounted before main component
      setTimeout(() => eventEmitter.emit(event, payload), SET_TIMEOUT_DELAY)
    }
  },
}

export const useEvents = () => GlobalEmitter
