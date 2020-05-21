<template>
  <section class="container">
    <header class="pt-21">
      <AppHeading>
        S{{ record.season }}
        <template v-if="record.rank">/ {{ record.rank }} 位</template>
        シングルバトルの試合
      </AppHeading>
    </header>
    <div class="pt-18 pb-18 flex flex-wrap justify-between items-start">
      <div class="w-full flex flex-wrap">
        <div class="w-full lg:w-2/3">
          <div class="w-full pr-0 lg:pr-9">
            <div
              class="w-full rounded-t overflow-hidden"
              :style="{
                maxHeight: `${611 * 0.6}px`,
                height: `calc(calc(100vw - 20px) * 0.6)`,
              }"
            >
              <img
                :src="record.captureUrl"
                class="object-cover"
                :style="{
                  maxHeight: `${611 * 0.63}px`,
                  height: `calc(calc(100vw - 20px) * 0.63)`,
                }"
                alt=""
              />
            </div>

            <!-- TODO: 実装する -->
            <template v-if="mode === 'question'">
              <div
                id="PartySummary"
                class="p-9 rounded-b text-white"
                :style="{
                  background: '#343334',
                }"
              >
                <h2 class="pb-12 text-2xl font-bold">Q. 相手の選出は？</h2>
                <div class="w-full flex">
                  <TheRecordQuestion :choice="record.myChoice" :party="myParty">
                    <div>
                      <h4 class="text-2xl font-bold pb-3 text-white">
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
                  </TheRecordQuestion>
                  <TheRecordQuestion
                    :choice="record.opponentChoice"
                    :party="opponentParty"
                  >
                    <div>
                      <h4 class="text-2xl font-bold pb-3 text-white">
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
                  </TheRecordQuestion>
                </div>
                <div class="pt-18 flex justify-end">
                  <button
                    type="button"
                    class="ml-9 text-lg py-3 px-4 rounded border transition-all border-gray-700 hover:bg-gray-600 bg-gray-700"
                  >
                    結果だけ見る
                  </button>
                  <button
                    type="button"
                    class="ml-9 text-lg py-3 px-4 rounded border transition-all border-blue-700 hover:bg-blue-600 bg-blue-700"
                  >
                    これで決定！
                  </button>
                </div>
              </div>
            </template>
            <template v-else>
              <div
                id="PartySummary"
                class="p-9 rounded-b flex text-white flex-wrap"
                :style="{
                  background: '#343334',
                }"
              >
                <TheRecordChoiceList :choice="record.myChoice" :party="myParty">
                  <div>
                    <h4 class="text-2xl font-bold pb-3 text-white">
                      自分の選出
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
                </TheRecordChoiceList>
                <TheRecordChoiceList
                  :choice="record.opponentChoice"
                  :party="myParty"
                >
                  <div class="pt-12 lg:pt-0">
                    <h4 class="text-2xl font-bold pb-3 text-white">
                      相手の選出
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
                </TheRecordChoiceList>
              </div>
            </template>
            <div class="flex items-center justify-start">
              <h3 class="text-3xl text-gray-900 font-bold py-9">結果</h3>
              <div class="flex-1 border-b ml-9"></div>
            </div>
            <div
              class="text-2xl text-gray-900 leading-loose"
              v-html="note || 'この対戦には結果のメモがありません'"
            ></div>
          </div>
        </div>
        <div class="w-full lg:w-1/3 pt-18 lg:pt-0">
          <div class="w-full pl-9 text-2xl">
            <ul>
              <li class="flex items-center justify-start h-24 mb-9">
                <component
                  :is="record.userId === 'anonymous' ? 'span' : 'nuxt-link'"
                  class="w-full flex items-center justify-start"
                  :to="`/u/${record.userId}`"
                >
                  <AppUserIcon
                    class="rounded overflow-hidden"
                    :userId="record.userId"
                    :style="{
                      width: '40px',
                      height: '40px',
                    }"
                  />
                  <p class="pl-6">{{ user ? user.displayName : '' }}</p>
                </component>
              </li>
              <li class="flex items-center justify-start h-24">
                <dl class="flex items-center">
                  <dt class="w-48">シーズン</dt>
                  <dd>S{{ record.season }}</dd>
                </dl>
              </li>
              <li class="flex items-center justify-start h-24">
                <dl class="flex items-center">
                  <dt class="w-48">フォーマット</dt>
                  <dd>シングルバトル</dd>
                </dl>
              </li>
              <li
                class="flex items-center justify-start h-24"
                v-if="record.rank"
              >
                <dl class="flex items-center">
                  <dt class="w-48">自分の順位</dt>
                  <dd>{{ record.rank }}位台</dd>
                </dl>
              </li>
              <li
                class="flex items-center justify-start h-24"
                v-if="record.opponentRank"
              >
                <dl class="flex items-center">
                  <dt class="w-48">相手の順位</dt>
                  <dd>{{ record.opponentRank }}位台</dd>
                </dl>
              </li>
              <li
                class="flex items-center justify-start h-24"
                v-if="createdDate"
              >
                <dl class="flex items-center">
                  <dt class="w-48">投稿日</dt>
                  <dd>{{ createdDate }}</dd>
                </dl>
              </li>
              <li class="flex items-center justify-start h-24">
                <dl class="flex items-center">
                  <dt class="w-48">勝敗</dt>
                  <dd>
                    <div
                      class="w-30 h-15 text-xl font-bold rounded inline-flex items-center justify-center text-white bg-red-600"
                      v-if="record.result === 'win'"
                    >
                      勝ち
                    </div>
                    <div
                      class="w-30 h-15 text-xl font-bold rounded inline-flex items-center justify-center text-white bg-blue-600"
                      v-if="record.result === 'lose'"
                    >
                      負け
                    </div>
                  </dd>
                </dl>
              </li>
              <li
                class="flex items-center justify-start h-24"
                v-if="record.videoUrl"
              >
                <dl class="flex items-center w-full">
                  <dt class="w-48">この対戦の動画</dt>
                  <dd
                    class="flex-1 overflow-hidden"
                    :style="{
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }"
                  >
                    <a
                      class="flex-1 p-1 px-2 rounded-sm mr-2 bg-white border-none text-blue-600"
                      :href="record.videoUrl"
                      target="_blank"
                      >{{ record.videoUrl }}</a
                    >
                  </dd>
                </dl>
              </li>
              <client-only>
                <li class="flex items-center justify-start pr-9 h-24">
                  <div
                    class="flex justify-start overflow-hidden"
                    style="width: 61px; overflow: hidden;"
                  >
                    <iframe
                      title="Twitter Share"
                      :src="`https://platform.twitter.com/widgets/tweet_button.html?url=${currentUrl}&text=${encodedTitle}&hashtags=pokedri,ポケモン剣盾`"
                      width="81"
                      height="21"
                      style="overflow: hidden;"
                    />
                  </div>
                </li>
              </client-only>
              <li class="flex items-center justify-end px-9 h-24" v-if="false">
                <button type="button">
                  <img src="~/assets/images/trash.svg" width="18" alt="" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { BattleRecord, User } from '~/types/struct'
import { Pokemon } from '~/types/struct'
import { AnalyzerPokemonList } from '../../components/partials/AnalyzerPokemonList'
import { TheRecordChoiceList } from '../../components/partials/record/TheRecordChoiceList'
import { TheRecordQuestion } from '../../components/partials/record/TheRecordQuestion'
import {
  toUserDocument,
  toBattleRecordDocument,
  toPokemonDocument,
} from '~/utils/transformer/toObject'
import xss from 'xss'
import dayjs from 'dayjs'

type LocalData = {
  user: User | null
  mode: string
  record: BattleRecord | null
  myParty: Pokemon[]
  opponentParty: Pokemon[]
}

const getOpenGraphUrl = (path: string) =>
  `https://storage.googleapis.com/pokedri-minnnano63.appspot.com/${path}`

export default Vue.extend({
  head() {
    const record = this.record as BattleRecord
    const title = `S${record.season} ${
      record.rank ? `/ ${record.rank} 位` : ''
    } シングルバトルの試合 | みんなの63 - スクリーンショットから自動解析できるポケモンの選出投稿サイト`
    const imageUrl = getOpenGraphUrl('opengraph%2F' + this.$route.params.id)
    return {
      title,
      meta: [
        {
          name: 'description',
          hid: 'description',
          content:
            'みんなの63は、スクリーンショットから自動解析できるポケモンの選出投稿サイトです。プレイログに、型の調査に、クイズによる選出の訓練に、幅広くご利用いただけます。',
        },
        { name: 'viewport', hid: 'viewport', content: 'width=device-width' },
        { property: 'og:locale', hid: 'og:locale', content: 'ja_JP' },
        { property: 'og:type', hid: 'og:type', content: 'website' },
        { property: 'og:title', hid: 'og:title', content: title },
        {
          property: 'og:description',
          hid: 'og:description',
          content:
            'みんなの63は、スクリーンショットから自動解析できるポケモンの選出投稿サイトです。プレイログに、型の調査に、クイズによる選出の訓練に、幅広くご利用いただけます。',
        },
        { property: 'og:site_name', hid: 'og:site_name', content: title },
        {
          name: 'twitter:card',
          hid: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          property: 'og:url',
          hid: 'og:url',
          content:
            'https://pokedri.com/pokemon63/record/' + this.$route.params.id,
        },
        { property: 'og:image', hid: 'og:image', content: imageUrl },
        {
          property: 'og:image:secure_url',
          hid: 'og:image:secure_url',
          content: imageUrl,
        },
        {
          name: 'twitter:description',
          hid: 'twitter:description',
          content:
            'みんなの63は、スクリーンショットから自動解析できるポケモンの選出投稿サイトです。プレイログに、型の調査に、クイズによる選出の訓練に、幅広くご利用いただけます。',
        },
        { name: 'twitter:title', hid: 'twitter:title', content: title },
        { name: 'twitter:image', hid: 'twitter:image', content: imageUrl },
      ],
      link: [
        {
          rel: 'canonical',
          href:
            'https://pokedri.com/pokemon63/records/' + this.$route.params.id,
        },
      ],
    }
  },
  components: {
    AnalyzerPokemonList,
    TheRecordChoiceList,
    TheRecordQuestion,
  },
  data(): Partial<LocalData> {
    return {
      user: null,
      mode: 'result',
      record: null,
    }
  },
  async asyncData({ app, params, error }) {
    const recordRef = app.$firestore.collection('battlerecords').doc(params.id)
    const [doc, myPartySnapshot, opponentPartySnapshot] = await Promise.all([
      recordRef.get(),
      recordRef.collection('myParty').orderBy('order', 'asc').get(),
      recordRef.collection('opponentParty').orderBy('order', 'asc').get(),
    ])
    if (!doc.exists) {
      return error({
        message: 'Record is not found.',
        statusCode: 404,
      })
    }
    const record = {
      createdAt: doc.data()!.createdAt.toDate(),
      ...toBattleRecordDocument(doc, ['createdAt']),
    }
    const myParty = myPartySnapshot.docs.map((d) => toPokemonDocument(d))
    const opponentParty = opponentPartySnapshot.docs.map((d) =>
      toPokemonDocument(d)
    )
    return {
      record,
      myParty,
      opponentParty,
    }
  },
  async mounted() {
    this.user = await this.$userRecord.get({ id: this.record!.userId })
  },
  computed: {
    createdDate(): string | null {
      if (!this.record) {
        return null
      }
      if (!(this.record.createdAt instanceof Date)) {
        return null
      }
      return dayjs(this.record.createdAt).format('YYYY/MM/DD')
    },
    note(): string {
      return xss.filterXSS(this.record!.note).replace(/\n/g, '<br>')
    },
    encodedTitle(): string {
      return encodeURIComponent(
        `S${this.record!.season} ${
          this.record!.rank ? `/ ${this.record!.rank} 位` : ''
        } シングルバトルの試合 | みんなの63 - スクリーンショットから自動解析できるポケモンの選出投稿サイト`
      )
    },
    currentUrl(): string {
      return process.browser ? `${location.origin}${location.pathname}` : ''
    },
    encodedUrl(): string {
      return encodeURIComponent(`${this.currentUrl || ''}`)
    },
  },
})
</script>

<style>
#PartySummary {
  position: relative;
  overflow: hidden;
}

#PartySummary::before {
  pointer-events: none;
  content: '';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  border-right: 30px solid transparent;
  border-left: solid 22px #202020;
  border-bottom: solid calc(22px * 1.4) transparent;
}

#PartySummary::after {
  pointer-events: none;
  content: '';
  display: block;
  position: absolute;
  right: 0;
  bottom: 0;
  border-left: 30px solid transparent;
  border-right: solid 22px #202020;
  border-top: solid calc(22px * 1.4) transparent;
}
</style>
