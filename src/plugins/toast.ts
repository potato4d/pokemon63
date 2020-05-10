import Vue from 'vue'
import { Plugin } from '@nuxt/types'

declare module '@nuxt/types' {
  interface Context {
    $toast: {
      show(text: string): Promise<void>
      hide(): Promise<void>
    }
  }
  interface NuxtAppOptions {
    $toast: {
      show(text: string): Promise<void>
      hide(): Promise<void>
    }
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $toast: {
      show(text: string): Promise<void>
      hide(): Promise<void>
    }
  }
}

type State = {
  text: string
  display: boolean
}

const ToastPlugin: Plugin = (_, inject) => {
  const state = Vue.observable({
    text: '',
    display: false,
  } as State)
  const toast = {
    get display() {
      return state.display
    },
    get text() {
      return state.text
    },
    async show(text: string) {
      state.display = false
      await Vue.nextTick()
      state.text = text
      state.display = true
    },
    async hide() {
      state.display = false
    },
  }
  inject('toast', toast)
}

export default ToastPlugin
