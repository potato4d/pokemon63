import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import { firestore } from '../utils/externals/firebase'
import { User } from '../types/struct'
import { toUserDocument } from '~/utils/transformer/toObject'

declare module '@nuxt/types' {
  interface Context {
    $userRecord: {
      get(options: { id: string }): Promise<User>
    }
  }
  interface NuxtAppOptions {
    $userRecord: {
      get(options: { id: string }): Promise<User>
    }
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $userRecord: {
      get(options: { id: string }): Promise<User>
    }
  }
}

type State = {
  users: {
    [key: string]: User
  }
}

const UsersPlugin: Plugin = (_, inject) => {
  const state = Vue.observable({
    users: {},
  } as State)
  const users = {
    async get({ id }: { id: string }) {
      if (state.users[id]) {
        return state.users[id]
      }
      const snapshot = await firestore.collection('users').doc(id).get()
      if (!snapshot.exists) {
        throw new Error('User not found')
      }
      return toUserDocument(snapshot)
    },
  }
  inject('userRecord', users)
}

export default UsersPlugin
