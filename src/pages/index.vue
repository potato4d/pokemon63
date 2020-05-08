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
    <!-- <div class="text-center pb-30 mb-30 pt-9">
      <AppButton>更に読み込む</AppButton>
    </div> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BattleRecord } from '~/types/struct'

type LocalData = {
  battleRecords: BattleRecord[]
}

export default Vue.extend({
  head() {
    return {
      link: [{ rel: 'canonical', href: 'https://pokedri.com/pokemon63/' }],
      meta: [{ name: 'viewport', hid: 'viewport', content: 'width=1024' }],
    }
  },
  data() {
    return {
      battleRecords: [],
    }
  },
  async asyncData({ app }) {
    const records = await app.$firestore
      .collection('battlerecords')
      .orderBy('season', 'desc')
      .orderBy('createdAt', 'desc')
      .limit(200)
      .get()
    const battleRecords = records.docs.map(
      (doc): BattleRecord => {
        const { createdAt, ...data } = doc.data()
        return {
          id: doc.id,
          ...data,
        } as BattleRecord
      }
    )
    return {
      battleRecords,
    }
  },
})
</script>

<style scoped>
.HomeGrid {
  grid-template-columns: repeat(4, 220px);
}
</style>
