<template>
  <div class="container">
    <div class="pt-21">
      <AppHeading>
        みんなの選出
      </AppHeading>
    </div>
    <div class="HomeGrid pt-18 grid justify-between items-start">
      <nuxt-link
        :to="`/pokemon63/record/${record.id}`"
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
            background: 'linear-gradient(120deg, #60F5DB, #089EFF)',
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
        <AppUserIcon
          class="absolute rounded-full overflow-hidden"
          :userId="record.userId"
          :style="{
            width: '32px',
            height: '32px',
            right: '17px',
            bottom: '14px',
          }"
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
