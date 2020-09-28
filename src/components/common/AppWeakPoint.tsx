import Vue, { CreateElement, VNode, PropType } from 'vue'
import * as tsx from 'vue-tsx-support'
import { dex, Pokemon } from '~/analyzer/config/dex'
import { BattleRecord } from '~/types/struct'
import AppSubHeading from './AppSubHeading.vue'

type RecordSet = {
  party: BattleRecord['myParty']
  items: BattleRecord[]
}

export const AppUsage = tsx.component({
  props: {
    groupedBattleRecord: Object as () => RecordSet[],
  },
  data() {
    return {
      offset: 0,
    }
  },
  computed: {
    recordSets(): RecordSet {
      return this.groupedBattleRecord[this.offset]
    },
    loseCount(): {
      [k: string]: { slug: string; encounter: number; lose: number }
    } {
      const result: {
        [k: string]: { slug: string; encounter: number; lose: number }
      } = {}
      this.recordSets.items.forEach((item) => {
        item.opponentChoice.forEach((choice) => {
          const data = result[choice] || {
            slug: choice,
            encounter: 0,
            lose: 0,
          }
          result[choice] = {
            ...data,
            encounter: data.encounter + 1,
            lose: item.result === 'win' ? data.lose : data.lose + 1,
          }
        })
      })
      return result
    },
    weaks(): string[] {
      const results = Object.values(this.loseCount).filter((target) => {
        return target.lose > target.encounter * 0.5
      })
      return results.map((target) => target.slug)
    },
  },
  render() {
    return (
      <div>
        <AppSubHeading class="flex pb-0 mb-0 text-2xl justify-between items-end">
          <ul class="flex items-end justify-start">
            {this.recordSets.party.map((pokemon) => (
              <li class="inline-block">
                <img
                  src={`/pokemon63/static/images/icons/${pokemon.slug}.png`}
                  style={{
                    imageRendering: 'pixelated',
                    width: '60px',
                    height: '50px',
                    objectFit: 'cover',
                  }}
                  alt=""
                />
              </li>
            ))}
            <li class="mb-2 flex items-center justify-center h-full text-2xl font-bold">
              のデータ
            </li>
          </ul>
          <div class="flex">
            <div
              class="rounded-l border-r-0 px-9 text-2xl py-2 flex items-center justify-center cursor-pointer bg-gray-100 border hover:bg-gray-200 text-black pb-3"
              onClick={() => {
                this.offset = Math.max(0, this.offset - 1)
              }}
            >
              ‹
            </div>
            <div
              class="rounded-r px-9 text-2xl py-2 flex items-center justify-center cursor-pointer bg-gray-100 border hover:bg-gray-200 text-black pb-3"
              onClick={() => {
                this.offset = Math.min(
                  this.groupedBattleRecord.length - 1,
                  this.offset + 1
                )
              }}
            >
              ›
            </div>
          </div>
        </AppSubHeading>
        <div
          class="p-6 my-12 mt-0 w-full text-white"
          style={{
            minHeight: '400px',
            background: '#343334',
          }}
        >
          <div class="flex items-center justify-between px-6 py-4">
            <h4 class="text-2xl font-bold text-white">
              被選出時の勝率が50%を下回るポケモン
              <br />
              <span class="inline-block text-sm mt-4 font-normal">
                (このページはあなただけが見ることができます)
              </span>
            </h4>
          </div>
          <ul class="flex items-end">
            {this.weaks.map((weak) => (
              <li class="ml-2">
                <img
                  style={{
                    width: '60px',
                    height: '50px',
                    imageRendering: 'pixelated',
                  }}
                  class="mr-3 object-cover object-center-bottom"
                  src={`/pokemon63/static/images/icons/${weak}.png`}
                  alt=""
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  },
})

export default AppUsage
