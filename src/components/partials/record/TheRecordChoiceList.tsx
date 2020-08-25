import Vue, { CreateElement, VNode } from 'vue'
import * as tsx from 'vue-tsx-support'
import { dex, Pokemon } from '~/analyzer/config/dex'

const foo = "test"
foo = 1

export const TheRecordChoiceList = tsx.component({
  name: 'TheRecordChoiceList',
  props: {
    choice: Array as () => string[],
    party: Array as () => Pokemon[],
  },
  render() {
    return (
      <div class="w-full lg:w-1/2">
        {(this.$slots as any).default}
        <ul>
          {this.choice.map((item) => (
            <li class="flex items-end">
              <div class="w-3/5 flex items-end justify-start">
                <img
                  style={{
                    width: '60px',
                    height: '50px',
                    imageRendering: 'pixelated',
                  }}
                  class="mr-3 object-cover object-center-bottom"
                  src={`/pokemon63/static/images/icons/${
                    dex.find((p) => p.slug === item)!.slug
                  }.png`}
                  alt=""
                />
                <p class="pb-3 font-bold text-lg">
                  {dex.find((p) => p.slug === item)!.name_jpn}
                </p>
              </div>
              <div class="w-2/5">
                <div class="flex"></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  },
})
