/**
 * Extends interfaces in Vue.js
 */

import 'vue-tsx-support/enable-check'
import 'vue-tsx-support/options/allow-unknown-props'
import 'vue-tsx-support/options/allow-element-unknown-attrs'
import 'vue-tsx-support/options/enable-nativeon'
import 'vue-tsx-support/options/enable-vue-router'

import Vue, { ComponentOptions } from 'vue'
import { Route } from 'vue-router'
import { MetaInfo } from 'vue-meta'
import {
  Context,
  Middleware,
  Transition,
  NuxtApp,
} from '@nuxt/types/app/index.d'
import * as Vuex from 'vuex'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import * as _firebase from 'firebase'

interface CustomContext extends Context {
  $axios: NuxtAxiosInstance
}

declare module 'vue/types/vue' {
  interface Vue {
    $nuxt: NuxtApp
    $axios: NuxtAxiosInstance
    $auth: firebase.auth.Auth & {
      user: firebase.User
      currentUser: firebase.User
    }
    $firebase: typeof _firebase
    $firestore: firebase.firestore.Firestore
    $storage: firebase.storage.Storage
    $functions: firebase.functions.Functions
    $messaging: firebase.messaging.Messaging
  }
}
