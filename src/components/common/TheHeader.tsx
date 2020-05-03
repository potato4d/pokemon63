import Vue, { CreateElement, VNode } from 'vue'
import * as tsx from 'vue-tsx-support'
import Logo from '~/assets/images/logo.svg'

export const TheHeader = tsx.component({
  render() {
    return (
      <div class="container mx-auto pt-6">
        <img
          src={Logo}
          class="mx-auto"
          alt="みんなの63 ソード・シールド"
          width="384"
        />
      </div>
    )
  },
})
