import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import * as Firebase from '../utils/externals/firebase'
import * as _firebase from 'firebase'

declare module '@nuxt/types' {
  interface Context {
    $firebase: typeof _firebase
    $firestore: firebase.firestore.Firestore
    $storage: firebase.storage.Storage
    $functions: firebase.functions.Functions
    $messaging: firebase.messaging.Messaging
    $analytics: firebase.analytics.Analytics
  }
  interface NuxtAppOptions {
    $firebase: typeof _firebase
    $firestore: firebase.firestore.Firestore
    $storage: firebase.storage.Storage
    $functions: firebase.functions.Functions
    $messaging: firebase.messaging.Messaging
    $analytics: firebase.analytics.Analytics
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $auth: firebase.auth.Auth & {
      user: firebase.User
      currentUser: firebase.User
    }
    $firebase: typeof _firebase
    $firestore: firebase.firestore.Firestore
    $storage: firebase.storage.Storage
    $functions: firebase.functions.Functions
    $messaging: firebase.messaging.Messaging
    $analytics: firebase.analytics.Analytics
  }
}

const _auth = (Firebase.auth as any) as firebase.auth.Auth & {
  __defineGetter__: any
  _vm: any
}
if (!_auth._vm) {
  _auth._vm = new Vue({
    data() {
      return {
        currentUser: _auth.currentUser !== null ? _auth.currentUser : undefined,
      }
    },
    created() {
      _auth.onAuthStateChanged((user: any) => {
        this.currentUser = user
      })
    },
  })
  _auth.__defineGetter__('currentUser', () => {
    return _auth._vm.$data.currentUser
  })
  _auth.__defineGetter__('user', () => {
    return _auth._vm.$data.currentUser
  })
}

const FirebasePlugin: Plugin = (context, inject) => {
  inject('firebase', Firebase.firebase)
  inject('app', Firebase.app)
  inject('firestore', Firebase.firestore)
  inject('storage', Firebase.storage)
  inject('functions', Firebase.functions)
  inject('auth', _auth as firebase.auth.Auth)
  inject('analytics', Firebase.analytics)
}

export default FirebasePlugin
