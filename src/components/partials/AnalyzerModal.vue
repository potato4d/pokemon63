<template>
  <aside class="w-full h-full fixed left-0 top-0 overflow-scroll">
    <div class="relative z-20 mx-auto w-full max-w-screen-md">
      <div
        class="ModalContent mx-auto mt-18 w-full p-9 bg-white rounded overflow-hidden"
      >
        <!-- <header class="flex justify-between items-center">
          <h2
            :style="{
              fontSize: '24px',
              fontWeight: 'bold',
            }"
          >
            ANALYZE
          </h2>
          <button type="button" class="text-3xl text-gray-500 appearance-none bg-transparent">
            &times;
          </button>
        </header> -->
        <div>
          <div
            class="relative rounded overflow-hidden"
            :style="{
              width: '738px',
              height: '415.13px',
            }"
          >
            <div
              v-if="status === 'processing'"
              class="absolute left-0 top-0 h-1 bg-blue-600 block z-40"
              :style="{
                width: `${100 * (indicator / 12)}%`,
                transition: 'width 0.4s ease-out',
              }"
            ></div>
            <img
              v-if="imageUrl"
              :src="imageUrl"
              alt=""
              class="rounded absolute z-30 left-0 top-0 w-full h-full object-contain pointer-events-none"
            />
            <div
              v-if="!imageUrl"
              class="rounded absolute z-30 left-0 top-0 w-full h-full leading-loose bg-gray-200 text-gray-700 text-lg flex items-center justify-center flex-col object-contain pointer-events-none"
            >
              <img
                src="~/assets/images/picture.svg"
                :style="{
                  width: '40px',
                  height: '40px',
                }"
                alt=""
                class="mb-6"
              />
              スクリーンショットをアップロード<br />
              <span class="text-base"
                >(Twitter / Facebook
                からダウンロードしたものをご利用いただけます)</span
              >
            </div>
            <input
              type="file"
              @change="handleUploadFile"
              class="rounded absolute opacity-0 left-0 top-0 w-full h-full bg-gray-300 appearance-none rounded absolute left-0 top-0 w-full h-full cursor-pointer"
            />
          </div>
        </div>
        <div class="pt-9 flex">
          <div class="flex-1 p-9 pr-0 border rounded-sm flex">
            <div class="w-1/2">
              <h4 class="text-2xl font-bold pb-3 text-gray-800">自分の構築</h4>
              <div class="pr-9">
                <div
                  class="w-full h-1"
                  :style="{
                    background: '#00a0e9',
                  }"
                ></div>
              </div>
              <ul>
                <li class="flex items-end" v-for="pokemon in formData.myParty">
                  <div class="w-3/5 flex items-end justify-start">
                    <img
                      :style="{
                        width: '60px',
                        height: '45px',
                        imageRendering: 'pixelated',
                      }"
                      class="mr-3 object-cover object-center-bottom"
                      :src="`/static/images/icons/${pokemon.img}.png`"
                      alt=""
                    />
                    <p class="pb-3 font-bold text-lg">{{ pokemon.name }}</p>
                  </div>
                  <div class="w-2/5">
                    <div class="flex">
                      <button
                        type="button"
                        class="inline-block outline-none rounded-l hover:bg-gray-200 border"
                        style="width: 2.5rem; height: 2.5rem;"
                      >
                        1
                      </button>
                      <button
                        type="button"
                        class="inline-block outline-none hover:bg-gray-200 border border-l-0 border-r-0"
                        style="width: 2.5rem; height: 2.5rem;"
                      >
                        2
                      </button>
                      <button
                        type="button"
                        class="inline-block outline-none rounded-r hover:bg-gray-200 border"
                        style="width: 2.5rem; height: 2.5rem;"
                      >
                        3
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="w-1/2">
              <h4 class="text-2xl font-bold pb-3 text-gray-800">相手の構築</h4>
              <div class="pr-9">
                <div
                  class="w-full h-1"
                  :style="{
                    background: '#e5005a',
                  }"
                ></div>
              </div>
              <ul>
                <li
                  class="flex items-end"
                  v-for="pokemon in formData.opponentParty"
                >
                  <div class="w-3/5 flex items-end justify-start">
                    <img
                      :style="{
                        width: '60px',
                        height: '45px',
                        imageRendering: 'pixelated',
                      }"
                      class="mr-3 object-cover object-center-bottom"
                      :src="`/static/images/icons/${pokemon.img}.png`"
                      alt=""
                    />
                    <p class="pb-3 font-bold text-lg">{{ pokemon.name }}</p>
                  </div>
                  <div class="w-2/5">
                    <div class="flex font-bold">
                      <button
                        type="button"
                        class="inline-block outline-none rounded-l hover:bg-gray-200 border"
                        style="width: 2.5rem; height: 2.5rem;"
                      >
                        1
                      </button>
                      <button
                        type="button"
                        class="inline-block outline-none hover:bg-gray-200 border border-l-0 border-r-0"
                        style="width: 2.5rem; height: 2.5rem;"
                      >
                        2
                      </button>
                      <button
                        type="button"
                        class="inline-block outline-none rounded-r hover:bg-gray-200 border"
                        style="width: 2.5rem; height: 2.5rem;"
                      >
                        3
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="pl-9 h-1"></div>
          <div
            class="border flex flex-col p-9 rounded text-xl text-gray-800 font-bold"
            :style="{ width: '230px' }"
          >
            <p class="flex flex-col">
              <label class="pb-3">対戦シーズン</label>
              <select name="">
                <option :value="season" v-for="season in constants.season"
                  >S{{ season }}</option
                >
              </select>
            </p>
            <p class="flex flex-col pt-15">
              <label class="pb-3">順位帯</label>
              <select name="">
                <option value="">10000位〜</option>
              </select>
            </p>
            <p class="flex flex-col pt-15">
              <label class="pb-3">勝敗</label>
              <select name="">
                <option v-for="result in constants.result" :value="result">
                  {{
                    {
                      win: '勝ち',
                      lose: '負け',
                    }[result]
                  }}
                </option>
              </select>
            </p>
            <div class="flex flex-1 pt-15 items-center justify-center">
              <button
                type="button"
                :style="{
                  width: '104px',
                  height: '36px',
                  fontSize: '13px',
                }"
                class="btn-primary hover:opacity-75"
              >
                取り込む
              </button>
            </div>
          </div>
        </div>

        <footer class="pt-9">
          <div class="flex items-center justify-start">
            <h2 class="text-2xl font-bold text-gray-900">結果</h2>
            <i class="block flex-1 border-b ml-9"></i>
          </div>
          <textarea
            class="mt-9 resize-none overflow-hidden leading-relaxed border text-xl p-9 rounded w-full"
            cols="30"
            rows="8"
            placeholder="先発はこちらのパーティに出し負けることが殆どないミトムから来ると予想。
てんねん読みでトリックが飛んできてくれると嬉しいほか、読みを外しても負けないピクシーを先発にした。

ピクシー一匹ではミトムキッスの並びを見るのは難しいこと、ミトム以外におにび持ちがいなさそうなので裏にカビゴンを、最後に詰めとエースで運用できるアーマーガアを選出した。

相手のラスはなにがきてもおかしくなかったが、ミトムキッスで受けポケは大体見れるという前提でテンプレミミッキュが出てきた。"
          ></textarea>
        </footer>
      </div>
    </div>
    <div
      @click="handleClickClose"
      class="fixed left-0 top-0 z-10 w-full h-full bg-black opacity-50"
    ></div>
  </aside>
</template>

<script lang="ts">
import Vue from 'vue'
import Jimp from 'jimp/es'
import { compare, readImage } from '~/analyzer/compare'
import { Season, Format, Result, Pokemon } from '../../types/struct'

type Status = 'wait' | 'processing' | 'done'

type Constants = {
  season: Season[]
  format: Format[]
  result: Result[]
}

type LocalData = {
  indicator: number
  status: Status
  imageUrl: string | null
  formData: {
    season: Season
    format: Format
    result: Result
    rank: number
    myParty: Pokemon[]
    opponentParty: Pokemon[]
  }
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default Vue.extend({
  data(): LocalData {
    return {
      indicator: 0,
      status: 'wait',
      imageUrl: null,
      formData: {
        season: 6,
        format: 'single',
        result: 'win',
        rank: 10000,
        myParty: [],
        opponentParty: [],
      },
    }
  },
  methods: {
    handleClickClose() {
      if (window.confirm('取り込みを中止しますか？')) {
        this.$emit('close')
      }
    },
    async handleUploadFile(event: any) {
      const [file]: File[] = ((event.target as HTMLInputElement)
        .files as any) as File[]
      if (!file) {
        return
      }
      try {
        this.indicator = 0
        this.status = 'processing'
        const imageUrl = URL.createObjectURL(file)
        const ss = await readImage(imageUrl)
        const { myPokemon, opponentPokemon, time } = await compare(ss, () => {
          this.indicator++
        })
        await delay(1300)
        this.formData.myParty = myPokemon
        this.formData.opponentParty = opponentPokemon
        this.status = 'done'
        this.imageUrl = imageUrl
      } catch (e) {
        alert(e)
      }
    },
  },
  watch: {
    indicator(v) {
      console.log(v)
    },
  },
  computed: {
    constants(): Constants {
      return {
        season: [6, 5, 4, 3, 2, 1],
        format: ['single'],
        result: ['win', 'lose'],
      }
    },
  },
})
</script>

<style scoped>
select {
  display: block;
  width: 100%;
  height: 30px;
  margin-top: 5px;
  padding: 4px 10px;
  border-radius: 2px;
  border: solid 1px #e5e5e5;
  background: #fafafa;
}

button:focus {
  @apply bg-gray-100;
}

.ModalContent {
  animation: slideIn 0.3s ease-out forwards;
}

@keyframes slideIn {
  0% {
    transform: translateY(10px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>
