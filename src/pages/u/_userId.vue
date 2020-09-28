<template>
  <div class="container">
    <div class="pt-21 text-center font-bold text-3xl">
      <img
        :src="user.photoUrl"
        width="128"
        height="128"
        class="rounded-full mb-12 mx-auto overflow-hidden"
        alt=""
      />
      <span>{{ user.displayName }}</span>
      <span>&nbsp;さんの選出ログ</span>
      <div class="flex my-12 justify-center items-center text-center mx-auto">
        <a
          :href="`https://twitter.com/intent/user?user_id=${user.twitterId}`"
          target="_blank"
          rel="noopener noreferrer"
          v-if="user.twitterId"
          class="ml-3 mt-1"
        >
          <img src="~/assets/images/twitter.svg" width="30" alt="" />
        </a>
      </div>
    </div>
    <div class="flex items-center justify-start">
      <ul
        class="flex items-center text-2xl font-bold justify-start border-l border-black"
      >
        <li
          class="border-r border-black"
          :class="{ 'text-red-700': viewType === 'revision' }"
        >
          <a
            href="#"
            @click.prevent="viewType = 'revision'"
            class="inline-block px-9 py-3"
          >
            リビジョンで表示
          </a>
        </li>
        <li
          class="border-r border-black"
          :class="{ 'text-red-700': viewType === 'list' }"
        >
          <a
            href="#"
            @click.prevent="viewType = 'list'"
            class="inline-block px-9 py-3"
          >
            リストで表示
          </a>
        </li>
        <li
          class="border-r border-black"
          :class="{ 'text-red-700': viewType === 'usage' }"
        >
          <a
            href="#"
            @click.prevent="viewType = 'usage'"
            class="inline-block px-9 py-3"
          >
            使用率を表示
          </a>
        </li>
        <li
          class="border-r border-black"
          v-if="canVisible"
          :class="{ 'text-red-700': viewType === 'weak' }"
        >
          <a
            href="#"
            @click.prevent="viewType = 'weak'"
            class="inline-block px-9 py-3"
          >
            苦手なポケモン
          </a>
        </li>
      </ul>
    </div>
    <template v-if="viewType === 'usage'">
      <div v-for="(recordSets, i) in groupedBattleRecord" class="mb-15">
        <div>
          <AppSubHeading class="flex text-2xl justify-start items-center">
            <ul class="flex items-end justify-start">
              <span v-for="pokemon in recordSets.party" class="inline-block">
                <img
                  :src="`/pokemon63/static/images/icons/${pokemon.slug}.png`"
                  :style="{
                    imageRendering: 'pixelated',
                    width: '60px',
                    height: '50px',
                    objectFit: 'cover',
                  }"
                  alt=""
                />
              </span>
              <span
                class="mb-2 flex items-center justify-center h-full text-2xl font-bold"
              >
                での戦績
              </span>
            </ul>
          </AppSubHeading>
          <!-- <div class=" pt-18 grid justify-between items-start"> -->
          <template v-if="i < 2 || recordSets.items.length >= 6">
            <AppUsage :recordSets="recordSets" />
          </template>
          <template v-else>
            <strong class="text-xl block font-bold p-6">
              試合数が極端に少ないため非表示にしています(件数:
              {{ recordSets.items.length }})
            </strong>
            <details>
              <summary
                class="mx-6 mb-4 w-32 h-16 bg-gray-600 text-white cursor-pointer rounded-sm flex items-center justify-center"
                >表示する</summary
              >
              <AppUsage :recordSets="recordSets" />
            </details>
          </template>
          <!-- </div> -->
        </div>
      </div>
    </template>

    <template v-if="viewType === 'revision'">
      <div v-for="recordSets in groupedBattleRecord" class="mb-15">
        <div>
          <AppSubHeading class="flex text-2xl justify-start items-center">
            <ul class="flex items-end justify-start">
              <span v-for="pokemon in recordSets.party" class="inline-block">
                <img
                  :src="`/pokemon63/static/images/icons/${pokemon.slug}.png`"
                  :style="{
                    imageRendering: 'pixelated',
                    width: '60px',
                    height: '50px',
                    objectFit: 'cover',
                  }"
                  alt=""
                />
              </span>
              <span
                class="mb-2 flex items-center justify-center h-full text-2xl font-bold"
              >
                での戦績
              </span>
            </ul>
          </AppSubHeading>
        </div>
        <div class="HomeGrid pt-18 grid justify-between items-start">
          <AppRecordCard
            :record="record"
            :key="record.id"
            v-for="record in recordSets.items"
          />
        </div>
      </div>
    </template>

    <template v-if="viewType === 'list'">
      <div class="HomeGrid pt-18 grid justify-between items-start">
        <AppRecordCard
          :record="record"
          :key="record.id"
          v-for="record in battleRecords"
        />
      </div>
    </template>
    <template v-if="viewType === 'weak' && canVisible">
      <AppWeakPoint :groupedBattleRecord="groupedBattleRecord" />
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BattleRecord, User } from '~/types/struct'
import {
  toUserDocument,
  toBattleRecordDocument,
  toPokemonDocument,
} from '~/utils/transformer/toObject'

type LocalData = {
  user: User | null
  viewType: 'revision' | 'list' | 'usage' | 'weak'
  battleRecords: BattleRecord[]
  groupedBattleRecord: RecordSet[]
}

type RecordSet = {
  party: BattleRecord['myParty']
  items: BattleRecord[]
}

const VIEW_TYPE = ['revision', 'list', 'usage', 'weak']

export default Vue.extend({
  layout: 'minimal',
  head() {
    const user = this.user! as User
    const title = `${user.displayName} さんの選出ログ | みんなの63 - 振り返って強くなる自動解析できるポケモン選出投稿サイト`
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
  data(): LocalData {
    return {
      user: null,
      viewType: 'revision',
      battleRecords: [],
      groupedBattleRecord: [],
    }
  },
  watch: {
    viewType() {
      this.$router.push({ query: { view: this.viewType } })
    },
  },
  computed: {
    canVisible(): boolean {
      if (!this.$auth.currentUser) {
        return false
      }
      return this.$route.params.userId === this.$auth.currentUser.uid
    },
  },
  async asyncData({ app, params: { userId }, query, redirect, error }) {
    if (userId === 'anonymous') {
      return redirect('/')
    }
    const [user, _records] = await Promise.all([
      app.$firestore.collection('users').doc(userId).get(),
      app.$firestore
        .collection('battlerecords')
        .orderBy('season', 'desc')
        .orderBy('createdAt', 'desc')
        .where('userId', '==', userId)
        .limit(300)
        .get(),
    ])
    if (!user.exists) {
      return error({
        message: 'User is not found.',
        statusCode: 404,
      })
    }
    const records = await Promise.all(
      _records.docs.map(async (record) => {
        const [myParty] = await Promise.all([
          record.ref.collection('myParty').orderBy('order', 'asc').get(),
        ])
        return {
          ...toBattleRecordDocument(record),
          myParty: myParty.docs
            .map((poke) => toPokemonDocument(poke))
            .sort((a, b) => (a.order > b.order ? 1 : -1)),
        }
      })
    )
    const [first, ...rawgroupedBattleRecord] = records

    const groupedBattleRecord: RecordSet[] = rawgroupedBattleRecord.reduce(
      (before, record) => {
        const lastRecordSet = before[before.length - 1]
        if (
          lastRecordSet.party.every(
            (pokemon, i) => pokemon.slug === record.myParty[i].slug
          )
        ) {
          return [
            ...before.filter((_, i) => i !== before.length - 1),
            {
              party: lastRecordSet.party,
              items: [...lastRecordSet.items, record],
            },
          ]
        } else {
          return [
            ...before,
            {
              party: record.myParty,
              items: [record],
            },
          ]
        }
      },
      [
        {
          party: first.myParty,
          items: [first],
        },
      ]
    )
    return {
      user: toUserDocument(user),
      groupedBattleRecord,
      battleRecords: records,
      viewType: VIEW_TYPE.includes(query.view ? `${query.view}` : '')
        ? query.view
        : 'revision',
    }
  },
})
</script>

<style scoped>
.HomeGrid {
  grid-template-columns: repeat(4, 220px);
}
</style>
