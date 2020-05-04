<template>
  <div class="container">
    <div class="pt-21">
      <AppHeading>
        S{{ record.season }} / {{ record.rank }} 位の試合
      </AppHeading>
    </div>
    <div class="pt-18 pb-18 flex flex-wrap justify-between items-start">
      <div class="w-full flex">
        <div class="w-2/3">
          <div class="w-full pr-9">
            <div
              class="w-full rounded-t overflow-hidden"
              :style="{
                height: `${611 * 0.6}px`,
              }"
            >
              <img
                :src="record.captureUrl"
                class="object-cover"
                :style="{
                  height: `${611 * 0.63}px`,
                }"
                alt=""
              />
            </div>
            <div
              id="PartySummary"
              class="p-9 rounded-b flex text-white"
              :style="{
                background: '#343334',
              }"
            >
              <TheRecordChoiceList :choice="record.myChoice" :party="myParty">
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
              </TheRecordChoiceList>
              <TheRecordChoiceList
                :choice="record.opponentChoice"
                :party="myParty"
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
              </TheRecordChoiceList>
            </div>
            <div class="flex items-center justify-start">
              <h3 class="text-3xl text-gray-900 font-bold py-9">メモ</h3>
              <div class="flex-1 border-b ml-9"></div>
            </div>
            <div
              class="text-2xl text-gray-900 leading-loose"
              v-html="record.note.replace(/\n/g, '<br>')"
            ></div>
          </div>
        </div>
        <div class="w-1/3">
          <div class="w-full pl-9 text-2xl">
            <ul>
              <li class="flex items-center justify-start h-24 mb-9">
                <img
                  src="https://github.com/potato4d.png"
                  class="rounded"
                  :style="{
                    width: '40px',
                    height: '40px',
                  }"
                  alt=""
                />
                <p class="pl-6">potato4d</p>
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
              <li class="flex items-center justify-start h-24">
                <dl class="flex items-center">
                  <dt class="w-48">順位帯</dt>
                  <dd>{{ record.rank }}位台</dd>
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
              <li class="flex items-center justify-end px-9 h-24">
                <button type="button">
                  <img src="~/assets/images/trash.svg" width="18" alt="" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BattleRecord } from '~/types/struct'
import { Pokemon } from '../../analyzer/config/dex'
import { AnalyzerPokemonList } from '../../components/partials/AnalyzerPokemonList'
import { TheRecordChoiceList } from '../../components/partials/TheRecordChoiceList'

type LocalData = {
  record: BattleRecord
  myParty: Pokemon[]
  opponentParty: Pokemon[]
}

export default Vue.extend({
  components: {
    AnalyzerPokemonList,
    TheRecordChoiceList,
  },
  data() {
    return {
      record: null,
    }
  },
  async asyncData({ app, params }) {
    const doc = await app.$firestore
      .collection('battlerecords')
      .doc(params.id)
      .get()
    const record = {
      ...doc.data(),
    } as BattleRecord
    const [myPartySnapshot, opponentPartySnapshot] = await Promise.all([
      doc.ref.collection('myParty').get(),
      doc.ref.collection('opponentParty').get(),
    ])
    const myParty = myPartySnapshot.docs.map((d) => {
      return {
        ...d.data(),
      } as Pokemon
    })
    const opponentParty = opponentPartySnapshot.docs.map((d) => {
      return {
        ...d.data(),
      } as Pokemon
    })
    return {
      record,
      myParty,
      opponentParty,
    }
  },
})
</script>

<style scoped>
#PartySummary {
  position: relative;
  overflow: hidden;
}

#PartySummary::before {
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
  content: '';
  display: block;
  position: absolute;
  right: 0;
  bottom: 0;
  border-left: 30px solid transparent;
  border-right: solid 22px #202020;
  border-top: solid calc(22px * 1.4) transparent;
}

.HomeListItem {
  transform: scale(1);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
}

.HomeListItem:hover {
  z-index: 5;
  opacity: 0.9;
  /* transform: scale(1.2); */
}
</style>
