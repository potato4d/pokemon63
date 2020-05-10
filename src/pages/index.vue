<template>
  <div class="container">
    <div class="pt-21">
      <AppHeading>
        みんなの選出
      </AppHeading>
    </div>
    <div class="HomeGrid pt-18 grid justify-between items-start">
      <AppRecordCard
        :record="record"
        :key="record.id"
        v-for="record in battleRecords"
      />
    </div>

    <!-- TODO: Implement pagination -->
    <div class="text-center pb-30 mb-30 pt-9" v-if="hasNext">
      <AppButton
        @click.native="readMoreBattleRecord"
        :class="{ 'opacity-50': isProcessing }"
        :disabled="isProcessing"
        >更に読み込む</AppButton
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BattleRecord } from '~/types/struct'
import {
  toUserDocument,
  toBattleRecordDocument,
  toPokemonDocument,
} from '~/utils/transformer/toObject'
import { firestore } from 'firebase'

type LocalData = {
  hasNext: boolean
  isProcessing: boolean
  battleRecords: BattleRecord[]
}

const LIMIT = 8

export default Vue.extend({
  head() {
    return {
      link: [{ rel: 'canonical', href: 'https://pokedri.com/pokemon63/' }],
      meta: [{ name: 'viewport', hid: 'viewport', content: 'width=1024' }],
    }
  },
  data(): LocalData {
    return {
      hasNext: true,
      isProcessing: false,
      battleRecords: [],
    }
  },
  async asyncData({ app }) {
    const records = await app.$firestore
      .collection('battlerecords')
      .orderBy('season', 'desc')
      .orderBy('createdAt', 'desc')
      .limit(LIMIT)
      .get()
    const battleRecords = records.docs.map(
      (doc): BattleRecord => ({
        ...toBattleRecordDocument(doc, ['createdAt']),
        createdAt: doc.data().createdAt.toDate(),
      })
    )
    return {
      battleRecords,
    }
  },
  methods: {
    async readMoreBattleRecord(): Promise<void> {
      this.isProcessing = true
      try {
        const lastRecord = await this.$firestore
          .collection('battlerecords')
          .doc(this.battleRecords[this.battleRecords.length - 1].id)
          .get()
        const records = await this.$firestore
          .collection('battlerecords')
          .orderBy('createdAt', 'desc')
          .startAfter(lastRecord.data().createdAt)
          .limit(LIMIT)
          .get()
        const battleRecords: BattleRecord[] = records.docs.map(
          (doc: any): BattleRecord => ({
            ...toBattleRecordDocument(doc, ['createdAt']),
            createdAt: doc.data().createdAt.toDate(),
          })
        )
        this.battleRecords = [...this.battleRecords, ...battleRecords]
        this.hasNext = battleRecords.length === LIMIT
      } catch (e) {
      } finally {
        this.isProcessing = false
      }
    },
  },
})
</script>

<style scoped>
.HomeGrid {
  grid-template-columns: repeat(4, 220px);
}
</style>
