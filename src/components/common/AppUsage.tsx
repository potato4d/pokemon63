import Vue, { CreateElement, VNode, PropType } from 'vue'
import * as tsx from 'vue-tsx-support'
import { dex, Pokemon } from '~/analyzer/config/dex'
import { BattleRecord } from '~/types/struct'
import './AppUsage.css'
// import data from './example'

// const example: RecordSet = data as any

type RecordSet = {
  party: BattleRecord['myParty']
  items: BattleRecord[]
}

type RateResult = {
  selectCount: number
  battleCount: number
  winCount: number
}

type WinRateItem = { slug: string; name: string } & RateResult

type WinRates = {
  items: WinRateItem[]
  bestWin: number
  bestSelect: number
  battleCount: number
}

export const AppUsage = tsx.component({
  props: {
    recordSets: Object as PropType<RecordSet>,
  },
  data() {
    return {
      isMounted: false,
    }
  },
  mounted() {
    setTimeout(() => {
      this.isMounted = true
    }, 100)
  },
  computed: {
    winRates(): WinRates {
      const items: WinRates['items'] = this.recordSets.party.reduce(
        (b: any, pokemon: Pokemon) => {
          return {
            ...b,
            [pokemon.slug]: this.recordSets.items.reduce(
              (counts: any, record: BattleRecord) => {
                if (record.myChoice.includes(pokemon.slug)) {
                  counts.selectCount++
                  if (record.result === 'win') {
                    counts.winCount++
                  }
                }
                return counts
              },
              {
                selectCount: 0,
                battleCount: this.recordSets.items.length,
                winCount: 0,
              }
            ),
          }
        },
        {} as WinRates['items']
      )
      return {
        items: Object.entries(items).map(([slug, item]) => ({
          slug,
          name: dex.find((p) => p.slug === slug)!.name_jpn,
          ...item,
        })),
        bestWin: Object.values(items).reduce((b: number, a) => {
          if (a.winCount === 0) {
            return 0
          }
          if (a.selectCount === 0) {
            return 0
          }
          return b < a.winCount / a.selectCount ? a.winCount / a.selectCount : b
        }, 0),
        bestSelect: Object.values(items).reduce((b: number, a) => {
          return b < a.selectCount ? a.selectCount : b
        }, 0),
        battleCount: this.recordSets.items.length,
      }
    },
  },
  render() {
    return (
      <div
        class="p-4 w-full text-white"
        style={{
          background: '#343334',
        }}
      >
        <div class="flex items-center justify-between px-6 py-4">
          <h4 class="text-2xl font-bold text-white">
            この構築の利用統計 (全{this.winRates.battleCount}試合)
          </h4>
          <div class="flex items-center">
            <span class="inline-block w-4 h-4 rounded-full bg-blue-600"></span>
            <span class="inline-block ml-2 mr-12">選出率</span>
            <span class="inline-block w-4 h-4 rounded-full bg-pink-600"></span>
            <span class="inline-block ml-2">勝率</span>
          </div>
        </div>
        <ul>
          {this.winRates.items.map((item) => (
            <li class="flex justify-start items-center">
              <div
                class="flex flex-col items-center justify-center"
                style={{
                  width: '80px',
                  height: '70px',
                }}
              >
                <img
                  style={{
                    width: '60px',
                    height: '50px',
                    imageRendering: 'pixelated',
                  }}
                  class="mr-3 object-cover object-center-bottom"
                  src={`/pokemon63/static/images/icons/${item.slug}.png`}
                  alt=""
                />
                <small class="block mt-1">{item.name}</small>
              </div>
              <div class="flex-1 text-xl pt-4 pr-4">
                <div class="flex w-full items-center">
                  <div class="flex-1">
                    <div class="bg-black w-full rounded">
                      <div
                        class="usage-chart h-2 rounded bg-blue-600"
                        style={{
                          width: this.isMounted
                            ? `${~~(
                                (item.selectCount / item.battleCount) *
                                100
                              )}%`
                            : 0,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div class="w-48 pl-4 font-bold">
                    選出率{~~((item.selectCount / item.battleCount) * 100)}%
                  </div>
                </div>

                <div class="w-1 h-3"></div>

                <div class="flex w-full items-center">
                  <div class="flex-1">
                    <div class="bg-black w-full rounded">
                      <div
                        class="usage-chart h-2 rounded bg-pink-600"
                        style={{
                          width: this.isMounted
                            ? `${
                                item.selectCount && item.winCount
                                  ? ~~((item.winCount / item.selectCount) * 100)
                                  : 0
                              }%`
                            : 0,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div class="w-48 pl-4 font-bold">
                    勝率{~~((item.winCount / item.selectCount) * 100)}%
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  },
})

export default AppUsage
