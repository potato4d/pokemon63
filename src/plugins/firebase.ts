import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import * as Firebase from '../utils/externals/firebase'

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
}

export default FirebasePlugin
