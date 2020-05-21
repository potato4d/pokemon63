import 'vue-tsx-support/enable-check'
import 'vue-tsx-support/options/allow-unknown-props'
import 'vue-tsx-support/options/allow-element-unknown-attrs'
import 'vue-tsx-support/options/enable-nativeon'
import 'vue-tsx-support/options/enable-vue-router'

declare module 'vue/types/vue' {
  interface Vue {}
}
