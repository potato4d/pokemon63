<template>
  <aside class="w-full h-full fixed left-0 top-0">
    <div
      class="absolute left-0 top-0 z-20 w-full h-full flex items-center justify-center"
    >
      <div class="w-full max-w-screen-md p-9 bg-white rounded overflow-hidden">
        <section>
          <h2
            :style="{
              fontSize: '24px',
              fontWeight: 'bold',
            }"
          >
            ANALYZE
          </h2>
        </section>
        <div class="pt-9">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/poketen-pokemon63.appspot.com/o/001.jpeg?alt=media&token=344373a0-9441-4867-84c8-1e5a15617087"
            alt=""
            class="rounded"
          />
        </div>
        <div class="pt-9 flex">
          <div class="flex-1 p-9 border rounded-sm flex">
            <div class="w-1/2">
              <h4 class="text-2xl font-bold pb-3 text-gray-800">自分の構築</h4>
              <div class="pr-9">
                <div
                  class="w-full h-1"
                  :style="{
                    background: '#00a0e9',
                  }"
                ></div>
              </div>
              <ul>
                <li class="flex items-end justify-start" v-for="number in 6">
                  <img
                    :style="{
                      width: '60px',
                      height: '50px',
                      imageRendering: 'pixelated',
                    }"
                    class="mr-3 object-center-bottom"
                    :src="`/static/images/icons/${208 + number}.png`"
                    alt=""
                  />
                  <p class="pb-3 font-bold text-lg">ポケモン名</p>
                </li>
              </ul>
            </div>
            <div class="w-1/2">
              <h4 class="text-2xl font-bold pb-3 text-gray-800">相手の構築</h4>
              <div class="pr-9">
                <div
                  class="w-full h-1"
                  :style="{
                    background: '#e5005a',
                  }"
                ></div>
              </div>
              <ul>
                <li class="flex items-end justify-start" v-for="number in 6">
                  <img
                    :style="{
                      width: '60px',
                      height: '50px',
                      imageRendering: 'pixelated',
                    }"
                    class="mr-3 object-center-bottom"
                    :src="`/static/images/icons/${308 + number}.png`"
                    alt=""
                  />
                  <p class="pb-3 font-bold text-lg">ポケモン名</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="pl-9 h-1"></div>
          <div
            class="border p-9 rounded text-2xl text-gray-800 font-bold"
            :style="{ width: '230px' }"
          >
            <p class="flex flex-col">
              <label class="pb-3">対戦シーズン</label>
              <select name="">
                <option value="">S4</option>
              </select>
            </p>
            <p class="flex flex-col pt-15">
              <label class="pb-3">順位(おおよそ)</label>
              <select name="">
                <option value="">10000位〜</option>
              </select>
            </p>
            <p class="flex flex-col pt-15">
              <label class="pb-3">勝敗</label>
              <select name="">
                <option value="">勝ち</option>
              </select>
            </p>
            <div class="flex pt-15 items-center justify-center">
              <button
                type="button"
                :style="{
                  width: '104px',
                  height: '36px',
                  fontSize: '13px',
                }"
                class="btn-primary hover:opacity-75"
              >
                取り込む
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="absolute left-0 top-0 z-10 w-full h-full bg-black opacity-50"
    ></div>
  </aside>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
