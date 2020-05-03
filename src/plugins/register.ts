import Vue from 'vue'
import AppHeading from '~/components/common/AppHeading.vue'
import AppButton from '~/components/common/AppButton.vue'
import { TheHeader } from '~/components/common/TheHeader'
import { TheFooter } from '~/components/common/TheFooter'

export default () => {
  Vue.component('AppButton', AppButton)
  Vue.component('AppHeading', AppHeading)
  Vue.component('TheHeader', TheHeader)
  Vue.component('TheFooter', TheFooter)
}
