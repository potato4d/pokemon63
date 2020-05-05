<template>
  <aside class="w-full h-full fixed left-0 top-0 overflow-scroll">
    <form
      @submit.prevent="submitBattleRecord"
      class="relative z-20 mx-auto w-full max-w-screen-md"
    >
      <div
        class="ModalContent mx-auto my-18 w-full p-9 bg-white rounded overflow-hidden"
      >
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
              class="absolute left-0 top-0 w-full h-1 bg-gray-800 block z-40"
            >
              <div
                class="absolute left-0 top-0 h-1 bg-gray-800 block z-40"
                :style="{
                  width: '100%',
                  background: 'linear-gradient(90deg, #00a0e9 0, #e5005a 100%)',
                }"
              ></div>
              <div
                class="absolute left-0 top-0 h-1 bg-gray-200 block z-40"
                :style="{
                  width: '100%',
                  transform: `translateX(${100 * (indicator / 12)}%)`,
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }"
              ></div>
            </div>
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
            <AnalyzerPokemonList
              :choice="formData.myChoice"
              :party="formData.myParty"
              @choose="choosePokemon('my', $event.index, $event.pokemon)"
            >
              <div>
                <h4 class="text-2xl font-bold pb-3 text-gray-800">
                  自分の構築
                </h4>
                <div class="pr-9">
                  <div
                    class="w-full h-1"
                    :style="{
                      background: '#00a0e9',
                    }"
                  ></div>
                </div>
              </div>
            </AnalyzerPokemonList>
            <AnalyzerPokemonList
              :choice="formData.opponentChoice"
              :party="formData.opponentParty"
              @choose="choosePokemon('opponent', $event.index, $event.pokemon)"
            >
              <div>
                <h4 class="text-2xl font-bold pb-3 text-gray-800">
                  相手の構築
                </h4>
                <div class="pr-9">
                  <div
                    class="w-full h-1"
                    :style="{
                      background: '#e5005a',
                    }"
                  ></div>
                </div>
              </div>
            </AnalyzerPokemonList>
          </div>
          <div class="pl-9 h-1"></div>
          <div
            class="border flex flex-col p-9 rounded text-xl text-gray-800 font-bold"
            :style="{ width: '230px' }"
          >
            <p class="flex flex-col">
              <label class="pb-3">対戦シーズン</label>
              <select v-model="formData.season">
                <option :value="season" v-for="season in constants.season"
                  >S{{ season }}</option
                >
              </select>
            </p>
            <p class="flex flex-col pt-15">
              <label class="pb-3">順位帯</label>
              <input
                type="text"
                class="input-rank"
                placeholder="10000(省略可)"
                v-model="formData.rank"
              />
            </p>
            <p class="flex flex-col pt-15">
              <label class="pb-3">勝敗</label>
              <select v-model="formData.result">
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
            <p class="flex flex-col pt-15">
              <label class="pb-3">
                <input type="checkbox" :value="true" v-model="anonymous" />
                <span>匿名で投稿する</span>
              </label>
            </p>
            <div class="flex flex-1 pt-15 items-center justify-center">
              <button
                :style="{
                  width: '104px',
                  height: '36px',
                  fontSize: '13px',
                }"
                :disabled="disabled"
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
            v-model="formData.note"
            placeholder="先発はこちらのパーティに出し負けることが殆どないミトムから来ると予想。
てんねん読みでトリックが飛んできてくれると嬉しいほか、読みを外しても負けないピクシーを先発にした。

ピクシー一匹ではミトムキッスの並びを見るのは難しいこと、ミトム以外におにび持ちがいなさそうなので裏にカビゴンを、最後に詰めとエースで運用できるアーマーガアを選出した。

相手のラスはなにがきてもおかしくなかったが、ミトムキッスで受けポケは大体見れるという前提でテンプレミミッキュが出てきた。"
          ></textarea>
        </footer>
      </div>
    </form>
    <div
      @click="handleClickClose"
      class="fixed cursor-pointer left-0 top-0 z-10 w-full h-full bg-black opacity-50"
    ></div>
  </aside>
</template>

<script lang="ts">
import Vue from 'vue'
import Jimp from 'jimp/es'
import { compare, readImage, createImage, MIME_PNG } from '~/analyzer/compare'
import { Season, Format, Result, Pokemon, BattleRecord } from '~/types/struct'
import { AnalyzerPokemonList } from '../AnalyzerPokemonList'
import { v4 as uuid } from 'uuid'

type Status = 'wait' | 'processing' | 'done'

type Constants = {
  season: Season[]
  format: Format[]
  result: Result[]
}

type LocalData = {
  anonymous: boolean
  indicator: number
  status: Status
  imageUrl: string | null
  ogpBuffer: Buffer | null
  formData: Omit<BattleRecord, 'userId'>
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default Vue.extend({
  components: {
    AnalyzerPokemonList,
  },
  data(): LocalData {
    return {
      indicator: 0,
      status: 'wait',
      imageUrl: null,
      anonymous: false,
      ogpBuffer: null,
      formData: {
        captureUrl: null,
        season: 6,
        format: 'single',
        result: 'win',
        rank: null,
        myParty: [],
        opponentParty: [],
        myChoice: [0, 0, 0],
        opponentChoice: [0, 0, 0],
        note: '',
      },
    }
  },
  methods: {
    handleClickClose() {
      if (window.confirm('取り込みを中止しますか？')) {
        this.$emit('close')
      }
    },
    async submitBattleRecord() {
      const data = {
        userId: this.anonymous ? 'anonymous' : this.$auth.user.uid,
        season: this.formData.season,
        format: this.formData.format,
        result: this.formData.result,
        rank: this.formData.rank,
        myChoice: this.formData.myChoice,
        opponentChoice: this.formData.opponentChoice,
        captureUrl: this.formData.captureUrl,
        note: this.formData.note,
        createdAt: this.$firebase.firestore.FieldValue.serverTimestamp(),
      }
      const doc = await this.$firestore.collection('battlerecords').add(data)
      await Promise.all([
        ...this.formData.myParty.map(async (pokemon, i) => {
          await doc.collection('myParty').add({
            ...pokemon,
            order: i,
          })
        }),
        ...this.formData.opponentParty.map(async (pokemon, i) => {
          await doc.collection('opponentParty').add({
            ...pokemon,
            order: i,
          })
        }),
      ])
      await this.$storage.ref(`opengraph/${doc.id}`).put(this.ogpBuffer!, {
        contentType: 'image/png',
      })
      this.$router.push(`/record/${doc.id}`)
      this.$emit('close')
    },
    async choosePokemon(
      side: 'my' | 'opponent',
      count: number,
      pokemon: Pokemon
    ) {
      switch (side) {
        case 'my': {
          if (this.formData.myChoice.includes(pokemon.img)) {
            if (this.formData.myChoice[count] === pokemon.img) {
              this.formData.myChoice[count] = 0
            } else {
              this.formData.myChoice[
                this.formData.myChoice.indexOf(pokemon.img)
              ] = 0
              this.formData.myChoice[count] = pokemon.img
            }
          } else {
            this.formData.myChoice[count] = pokemon.img
          }
          break
        }
        case 'opponent': {
          if (this.formData.opponentChoice.includes(pokemon.img)) {
            if (this.formData.opponentChoice[count] === pokemon.img) {
              this.formData.opponentChoice[count] = 0
            } else {
              this.formData.opponentChoice[
                this.formData.opponentChoice.indexOf(pokemon.img)
              ] = 0
              this.formData.opponentChoice[count] = pokemon.img
            }
          } else {
            this.formData.opponentChoice[count] = pokemon.img
          }
          break
        }
      }
      this.formData.myChoice = this.formData.myChoice.map((c) => c)
      this.formData.opponentChoice = this.formData.opponentChoice.map((c) => c)
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
        const [
          { myPokemon, opponentPokemon, time },
          screenShotSnapshot,
        ] = await Promise.all([
          compare(ss, () => {
            this.indicator++
          }),
          this.$storage.ref(`captureImages/${uuid()}`).put(file),
        ])
        await delay(1300)
        const downloadURL = await screenShotSnapshot.ref.getDownloadURL()
        this.formData.captureUrl = downloadURL
        this.formData.myParty = myPokemon
        this.formData.opponentParty = opponentPokemon
        this.status = 'done'
        this.imageUrl = imageUrl

        const logo = await readImage('/pokemon63/static/images/logo.png')
        const frame = await readImage(
          '/pokemon63/static/images/right-bottom-frame.png'
        )
        const ogp = createImage(1200, 630)
        ogp.blit(ss.clone().resize(1200, 675), 0, 0)
        ogp.blit(logo.resize(300, 300), 1200 - 310, 630 - 270)

        this.ogpBuffer = await ogp.getBufferAsync(MIME_PNG)
      } catch (e) {
        alert(e)
      }
    },
  },
  computed: {
    disabled(): boolean {
      if (
        this.formData.myChoice.includes(0) ||
        this.formData.opponentChoice.includes(0)
      ) {
        return false
      }
      if (!this.formData.captureUrl) {
        return false
      }
      return true
    },
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
select,
.input-rank {
  display: block;
  width: 100%;
  height: 30px;
  margin-top: 5px;
  padding: 4px 10px;
  border-radius: 2px;
  border: solid 1px #e5e5e5;
  background: #fafafa;
}

.input-rank {
  background: #fff;
  border-radius: 4px;
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
