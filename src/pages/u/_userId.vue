<template>
  <div class="container">
    <div class="pt-21">
      <div class="flex text-2xl justify-start items-center">
        <img
          :src="user.photoUrl"
          width="40"
          height="40"
          class="rounded-full mr-6 overflow-hidden"
          alt=""
        />
        <span>{{ user.displayName }}</span>
        <span>&nbsp;さんの選出ログ</span>
      </div>
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
import { BattleRecord, User } from '~/types/struct'
import {
  toUserDocument,
  toBattleRecordDocument,
} from '~/utils/transformer/toObject'

type LocalData = {
  user: User | null
  battleRecords: BattleRecord[]
}

export default Vue.extend({
  head() {
    const user = this.user! as User
    const title = `${user.displayName} さんの選出ログ | みんなの63 - スクリーンショットから自動解析できるポケモンの選出投稿サイト`
    return {
      title,
      meta: [
        { name: 'viewport', hid: 'viewport', content: 'width=1024' },
        { property: 'og:title', hid: 'og:title', content: title },
        {
          property: 'og:url',
          hid: 'og:url',
          content: 'https://pokedri.com/pokemon63/u/' + this.$route.params.id,
        },
        { name: 'twitter:title', hid: 'twitter:title', content: title },
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://pokedri.com/pokemon63/u/' + this.$route.params.id,
        },
      ],
    }
  },
  data() {
    return {
      user: null,
      battleRecords: [],
    }
  },
  async asyncData({ app, params: { userId }, redirect }) {
    if (userId === 'anonymous') {
      return redirect('/')
    }
    const [user, records] = await Promise.all([
      app.$firestore.collection('users').doc(userId).get(),
      app.$firestore
        .collection('battlerecords')
        .orderBy('season', 'desc')
        .orderBy('createdAt', 'desc')
        .where('userId', '==', userId)
        .limit(200)
        .get(),
    ])
    const battleRecords = records.docs.map((doc) =>
      toBattleRecordDocument(doc, ['createdAt'])
    )
    return {
      user: toUserDocument(user),
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
