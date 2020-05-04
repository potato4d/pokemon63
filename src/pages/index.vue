<template>
  <div class="container">
    <div class="pt-21">
      <AppHeading>
        みんなの選出
      </AppHeading>
    </div>
    <div class="pt-18 grid grid-cols-4 justify-between items-start">
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
          class="px-4 flex items-center justify-start"
        >
          S{{ record.season }} / {{ record.rank }} 位
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
    <div class="text-center pb-30 mb-30 pt-9">
      <AppButton>更に読み込む</AppButton>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BattleRecord } from '~/types/struct'

type LocalData = {
  battleRecords: BattleRecord[]
}

export default Vue.extend({
  data() {
    return {
      battleRecords: [],
    }
  },
  async asyncData({ app }) {
    const records = await app.$firestore
      .collection('battlerecords')
      .orderBy('createdAt', 'desc')
      .limit(20)
      .get()
    const battleRecords = records.docs.map(
      (doc): BattleRecord => {
        const data = doc.data()
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

<style>
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
