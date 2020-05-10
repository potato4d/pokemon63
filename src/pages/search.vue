<template>
  <div class="container">
    <div class="pt-21">
      <AppHeading> {{ $route.query.q }}入り構築の対戦ログ </AppHeading>
    </div>
    <div class="HomeGrid pt-18 grid justify-between items-start">
      <AppRecordCard
        :record="record"
        :key="record.id"
        v-for="record in battleRecords"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BattleRecord } from '~/types/struct'
import { Pokemon } from '~/types/struct'

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
</style>
