import Vue from 'vue'
import AppHeading from '~/components/common/AppHeading.vue'
import AppSubHeading from '~/components/common/AppSubHeading.vue'
import AppButton from '~/components/common/AppButton.vue'
import AppUserIcon from '~/components/common/AppUserIcon.vue'
import AppRecordCard from '~/components/common/AppRecordCard.vue'
import { TheHeader } from '~/components/common/TheHeader'
import { TheFooter } from '~/components/common/TheFooter'

export default () => {
  Vue.component('AppButton', AppButton)
  Vue.component('AppUserIcon', AppUserIcon)
  Vue.component('AppHeading', AppHeading)
  Vue.component('AppSubHeading', AppSubHeading)
  Vue.component('AppRecordCard', AppRecordCard)
  Vue.component('TheHeader', TheHeader)
  Vue.component('TheFooter', TheFooter)
}
