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
            class="relative rounded overflow-hidden ImageArea"
            :class="{
              ImageArea__masked: anonymous,
            }"
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
              v-if="formData.captureUrl"
              :src="formData.captureUrl"
              alt=""
              class="rounded absolute z-30 left-0 top-0 w-full h-full object-contain pointer-events-none"
            />
            <div
              v-if="!formData.captureUrl"
              class="rounded absolute z-30 left-0 top-0 w-full h-full leading-loose bg-gray-200 text-gray-700 text-lg flex items-center justify-center flex-col object-contain cursor-pointer"
              @click="$refs.file.click()"
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
              クリックでスクリーンショットをアップロード<br />
              <span class="text-base"
                >(SD カードのファイル、またはTwitter / Facebook
                からダウンロードしたものをご利用いただけます)</span
              >
              <div class="pt-6 px-4 w-3/4 mx-auto">
                <span>または</span>
                <div class="w-full flex mt-2">
                  <input
                    type="text"
                    class="flex-1 p-1 px-2 rounded-sm mr-2"
                    v-model="twimgUrl"
                    placeholder="https://pbs.twimg.com/media/xxxxxx.jpg"
                    @click.stop.prevent="() => {}"
                  />
                  <button
                    type="button"
                    class="px-3 py-1 rounded-b bg-blue-500 text-white"
                    @click.stop.prevent="importFromTwitter"
                  >
                    Twitter から取り込み
                  </button>
                </div>
              </div>
            </div>
            <input
              ref="file"
              type="file"
              @change="handleUploadFile"
              class="rounded absolute opacity-0 left-0 top-0 w-full h-full bg-gray-300 appearance-none rounded absolute left-0 top-0 w-full h-full cursor-pointer"
            />
          </div>
        </div>
        <div class="pt-9 flex z-50 relative">
          <div class="flex-1 p-9 pr-0 border rounded-sm flex">
            <AnalyzerPokemonList
              :choice="formData.myChoice"
              :party="formData.myParty"
              @fix="fixPokemon('my', $event.index, $event.pokemon)"
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
              @fix="fixPokemon('opponent', $event.index, $event.pokemon)"
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
                <option
                  :value="season"
                  v-for="season in constants.season"
                  :key="season"
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
                <option
                  v-for="result in constants.result"
                  :value="result"
                  :key="result"
                >
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
              <label class="pb-3">この対戦が含まれる動画のURL</label>
              <input
                type="text"
                class="input-rank"
                placeholder="https://youtu.be/xxxxxx"
                v-model="formData.videoUrl"
              />
            </p>
            <p class="flex flex-col pt-15">
              <label class="pb-3">
                <input
                  type="checkbox"
                  :value="true"
                  v-model="anonymous"
                  :readonly="!this.$auth.currentUser"
                />
                <span>匿名で投稿する</span>
              </label>
            </p>
            <div class="flex flex-1 pt-5 items-center justify-center">
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
import {
  compare,
  readImage,
  createImage,
  MIME_PNG,
  AUTO,
  readFromBuffer,
} from '~/analyzer/compare'
import { Season, Format, Result, Pokemon, BattleRecord } from '~/types/struct'
import { AnalyzerPokemonList } from '../AnalyzerPokemonList'
import { v4 as uuid } from 'uuid'
import axios from 'axios'
import { delay } from '~/utils/effects/delay'

type Status = 'wait' | 'processing' | 'done'
type Side = 'my' | 'opponent'

type Constants = {
  season: Season[]
  format: Format[]
  result: Result[]
}

type LocalData = {
  isProcessing: boolean
  anonymous: boolean
  indicator: number
  status: Status
  twimgUrl: string
  ogpBuffer: Buffer | null
  ss: Jimp | null
  formData: Omit<BattleRecord, 'userId'>
}

const getInitialFormData = (): Omit<BattleRecord, 'userId'> => ({
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
  videoUrl: '',
})

export default Vue.extend({
  components: {
    AnalyzerPokemonList,
  },
  data(): LocalData {
    return {
      isProcessing: false,
      indicator: 0,
      status: 'wait',
      anonymous: !this.$auth.currentUser,
      ogpBuffer: null,
      ss: null,
      twimgUrl: '',
      formData: {
        ...getInitialFormData(),
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
      if (this.isProcessing) {
        return
      }
      this.isProcessing = true
      try {
        if (this.anonymous) {
          const ss = this.ss!.clone()
          const maskMyName = createImage(200, 24, '#126FF4')
          ss.blit(maskMyName, 255, 90)
          const imagePath = `captureImages/${uuid()}`
          await this.$storage
            .ref(imagePath)
            .put(await ss.getBufferAsync(MIME_PNG))
          this.formData.captureUrl = `https://storage.googleapis.com/${process.env.FIREBASE_STORAGE_BUCKET}/${imagePath}`
        }

        const data = {
          userId: this.userId,
          season: this.formData.season,
          format: this.formData.format,
          result: this.formData.result,
          rank: ~~this.formData.rank!,
          myChoice: this.formData.myChoice,
          opponentChoice: this.formData.opponentChoice.filter((id) => !!id),
          captureUrl: this.formData.captureUrl,
          note: this.formData.note,
          videoUrl: this.formData.videoUrl,
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

        if (this.anonymous) {
          const ogp = await readFromBuffer(this.ogpBuffer!)
          const maskMyName = createImage(180, 24, '#126FF4')
          ogp.blit(maskMyName, 250, 85)
          await this.$storage
            .ref(`opengraph/${doc.id}`)
            .put(await ogp.getBufferAsync(MIME_PNG), {
              contentType: 'image/png',
            })
        } else {
          await this.$storage.ref(`opengraph/${doc.id}`).put(this.ogpBuffer!, {
            contentType: 'image/png',
          })
        }

        this.$router.push(`/record/${doc.id}`)
        await delay(150)
        this.$emit('close')
        await delay(150)
        this.$toast.show('選出の投稿が完了しました')
      } catch (e) {
        alert('エラーが発生しました')
      } finally {
        this.isProcessing = false
      }
    },
    fixPokemon(side: Side, index: number, fixPokemon: Pokemon) {
      const replacePokemonList = (list: Pokemon[]): Pokemon[] => {
        return list.map((pokemon, i) => {
          return i === index ? fixPokemon : pokemon
        })
      }
      switch (side) {
        case 'my': {
          this.formData.myParty = replacePokemonList(this.formData.myParty)
          break
        }
        case 'opponent': {
          this.formData.opponentParty = replacePokemonList(
            this.formData.opponentParty
          )
          break
        }
      }
    },
    async choosePokemon(side: Side, count: number, pokemon: Pokemon) {
      const choose = (list: number[]) => {
        list = [...list]
        if (list.includes(pokemon.img)) {
          if (list[count] === pokemon.img) {
            list[count] = 0
          } else {
            list[list.indexOf(pokemon.img)] = 0
            list[count] = pokemon.img
          }
        } else {
          list[count] = pokemon.img
        }
        return list
      }

      switch (side) {
        case 'my': {
          this.formData.myChoice = choose(this.formData.myChoice)
          break
        }
        case 'opponent': {
          this.formData.opponentChoice = choose(this.formData.opponentChoice)
          break
        }
      }
      this.formData.myChoice = this.formData.myChoice.map((c) => c)
      this.formData.opponentChoice = this.formData.opponentChoice.map((c) => c)
    },
    async importFromTwitter() {
      const twimgUrl = this.twimgUrl.split('?')[0].split('.jp')[0]
      if (!twimgUrl.startsWith('https://pbs.twimg.com/media')) {
        alert('不正なデータです。')
        return
      }
      let blob: Blob
      try {
        const response = await axios.get(`${twimgUrl}?format=jpg&name=large`, {
          responseType: 'blob',
        })
        blob = new Blob([response.data])
      } catch (e) {
        alert('Twitter からのデータ取得に失敗しました')
        return
      }
      await this.upload(blob)
    },
    async handleUploadFile(event: any) {
      const [file]: File[] = ((event.target as HTMLInputElement)
        .files as any) as File[]
      if (!file) {
        return
      }
      await this.upload(file)
    },
    async upload(file: File | Blob) {
      try {
        this.formData = {
          ...this.formData,
          ...getInitialFormData(),
          note: this.formData.note
        }
        this.indicator = 0
        this.status = 'processing'
        const imageUrl = URL.createObjectURL(file)
        const ss = (await readImage(imageUrl)).resize(1280, AUTO)
        const maskOpponentName = createImage(200, 24, '#E72D53')
        ss.blit(maskOpponentName, 855, 90)
        const imagePath = `captureImages/${uuid()}`

        const [
          { myPokemon, opponentPokemon, time },
          screenShotSnapshot,
        ] = await Promise.all([
          compare(ss, () => {
            this.indicator++
          }),
          this.$storage.ref(imagePath).put(await ss.getBufferAsync(MIME_PNG)),
        ])
        await delay(1300)
        const downloadURL = `https://storage.googleapis.com/${process.env.FIREBASE_STORAGE_BUCKET}/${imagePath}`
        this.formData.captureUrl = downloadURL
        this.formData.myParty = myPokemon
        this.formData.opponentParty = opponentPokemon
        this.status = 'done'
        URL.revokeObjectURL(imageUrl)

        const logo = await readImage('/pokemon63/static/images/logo.png')
        const frame = await readImage(
          '/pokemon63/static/images/right-bottom-frame.png'
        )
        const ogp = createImage(1200, 630)
        ogp.blit(ss.clone().resize(1200, 675), 0, 0)
        ogp.blit(logo.resize(300, 300), 1200 - 310, 630 - 270)

        this.ss = ss
        this.ogpBuffer = await ogp.getBufferAsync(MIME_PNG)
      } catch (e) {
        alert(e)
      }
    },
  },
  computed: {
    userId(): string | 'anonymous' {
      return this.$auth.currentUser
        ? this.anonymous
          ? 'anonymous'
          : this.$auth.user.uid
        : 'anonymous'
    },
    disabled(): boolean {
      if (
        this.formData.myChoice.includes(0) ||
        this.formData.opponentChoice[0] === 0 // 相手はポケモンが全部見えないことがあるため先発だけわかれば登録可能とする
      ) {
        return true
      }
      if (!this.formData.captureUrl) {
        return true
      }
      return false
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

.ImageArea.ImageArea__masked::before {
  content: '';
  display: block;
  width: 80px;
  height: 20px;
  position: absolute;
  left: 155px;
  top: 48px;
  background: #126ff4;
  z-index: 200;
}
</style>
