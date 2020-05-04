<template>
  <div class="container">
    <div class="pt-21">
      <AppHeading> {{ $route.query.q }}入り構築の対戦ログ </AppHeading>
    </div>
    <div class="HomeGrid pt-18 grid justify-between items-start">
      <nuxt-link
        :to="`/record/${record.id}`"
        :key="record.id"
        v-for="record in battleRecords"
        class="HomeListItem relative mb-12 rounded-sm overflow-hidden"
        :style="{
          width: '220px',
          height: '163px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        }"
      >
        <div
          :style="{
            width: '220px',
            height: '133px',
          }"
          class="overflow-hidden"
        >
          <img
            :src="record.captureUrl"
            :style="{
              width: '220px',
              height: '140px',
            }"
            class="object-cover"
            alt=""
          />
        </div>
        <div
          :style="{
            width: '220px',
            height: '30px',
            background: '#343334',
            fontWeight: 'bold',
            fontSize: '14px',
            color: '#FFFFFF',
          }"
          class="GridItemLabel px-4 flex items-center justify-start"
        >
          <span class="relative z-10"
            >S{{ record.season }} / {{ record.rank }} 位</span
          >
        </div>
        <img
          src="https://github.com/potato4d.png"
          class="absolute rounded-full overflow-hidden"
          :style="{
            width: '32px',
            height: '32px',
            right: '17px',
            bottom: '14px',
          }"
          alt=""
        />
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BattleRecord } from '~/types/struct'
import { Pokemon } from '../analyzer/config/dex'

type LocalData = {
  battleRecords: BattleRecord[]
}

export default Vue.extend({
  head() {
    return {
      title: `${this.$route.query.q}入り構築の対戦ログ | みんなの63 - スクリーンショットから自動解析できるポケモンの選出投稿サイト`,
    }
  },
  data(): LocalData {
    return {
      battleRecords: [],
    }
  },
  async asyncData({ app, query }) {
    const [myPokemonList, oppoentPokemonList] = await Promise.all([
      app.$firestore
        .collectionGroup('myParty')
        .where('name', '==', `${query.q || ''}`)
        .get(),
      app.$firestore
        .collectionGroup('opponentParty')
        .where('name', '==', `${query.q || ''}`)
        .get(),
    ])
    const pokemonList = [...myPokemonList.docs, ...oppoentPokemonList.docs]
    const battleRecords: BattleRecord[] = []
    const addedIdList: string[] = []
    const rawList: BattleRecord[] = await Promise.all(
      pokemonList.map(async (doc) => {
        const snapshot = await doc.ref.parent!.parent!.get()
        return {
          id: snapshot.id,
          ...snapshot.data(),
        } as BattleRecord
      })
    )
    rawList.forEach((listItem) => {
      if (addedIdList.includes(listItem.id!)) {
        return
      }
      addedIdList.push(listItem.id!)
      battleRecords.push(listItem)
    })
    return {
      battleRecords,
    }
  },
  methods: {
    async search() {
      this.battleRecords = []
      const [myPokemonList, oppoentPokemonList] = await Promise.all([
        this.$firestore
          .collectionGroup('myParty')
          .where('name', '==', `${this.$route.query.q || ''}`)
          .get(),
        this.$firestore
          .collectionGroup('opponentParty')
          .where('name', '==', `${this.$route.query.q || ''}`)
          .get(),
      ])
      const pokemonList = [...myPokemonList.docs, ...oppoentPokemonList.docs]
      const battleRecords: BattleRecord[] = []
      const addedIdList: string[] = []
      const rawList: BattleRecord[] = await Promise.all(
        pokemonList.map(async (doc) => {
          const snapshot = await doc.ref.parent!.parent!.get()
          return {
            id: snapshot.id,
            ...snapshot.data(),
          } as BattleRecord
        })
      )
      rawList.forEach((listItem) => {
        if (addedIdList.includes(listItem.id!)) {
          return
        }
        addedIdList.push(listItem.id!)
        battleRecords.push(listItem)
      })
      this.battleRecords = battleRecords
    },
  },
  watch: {
    $route() {
      this.search()
    },
  },
})
</script>

<style scoped>
.HomeGrid {
  grid-template-columns: repeat(4, 220px);
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

.GridItemLabel {
  position: relative;
  overflow: hidden;
}

.GridItemLabel::before {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  border-right: 30px solid transparent;
  border-left: solid 14px #202020;
  border-bottom: solid calc(14px * 1.4) transparent;
}

.GridItemLabel::after {
  content: '';
  display: block;
  position: absolute;
  right: 0;
  bottom: 0;
  border-left: 30px solid transparent;
  border-right: solid 14px #202020;
  border-top: solid calc(14px * 1.4) transparent;
}
</style>
