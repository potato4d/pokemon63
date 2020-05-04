<template>
  <aside class="w-full h-full fixed left-0 top-0">
    <div
      class="absolute left-0 top-0 z-20 w-full h-full flex items-center justify-center"
    >
      <div
        class="ModalContent w-full max-w-screen-md p-9 bg-white rounded overflow-hidden"
      >
        <!-- <header class="flex justify-between items-center">
          <h2
            :style="{
              fontSize: '24px',
              fontWeight: 'bold',
            }"
          >
            ANALYZE
          </h2>
          <button type="button" class="text-3xl text-gray-500 appearance-none bg-transparent">
            &times;
          </button>
        </header> -->
        <div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/poketen-pokemon63.appspot.com/o/001.jpeg?alt=media&token=344373a0-9441-4867-84c8-1e5a15617087"
            height="415"
            alt=""
            class="rounded"
          />
        </div>
        <div class="pt-9 flex">
          <div class="flex-1 p-9 pr-0 border rounded-sm flex">
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
                <li class="flex items-end" v-for="number in 6">
                  <div class="w-3/5 flex items-end justify-start">
                    <img
                      :style="{
                        width: '60px',
                        height: '45px',
                        imageRendering: 'pixelated',
                      }"
                      class="mr-3 object-cover object-center-bottom"
                      :src="`/static/images/icons/${208 + number}.png`"
                      alt=""
                    />
                    <p class="pb-3 font-bold text-lg">ポケモン名</p>
                  </div>
                  <div class="w-2/5">
                    <div class="flex">
                      <button
                        type="button"
                        class="inline-block outline-none rounded-l hover:bg-gray-200 border"
                        style="width: 2.5rem; height: 2.5rem;"
                      >
                        1
                      </button>
                      <button
                        type="button"
                        class="inline-block outline-none hover:bg-gray-200 border border-l-0 border-r-0"
                        style="width: 2.5rem; height: 2.5rem;"
                      >
                        2
                      </button>
                      <button
                        type="button"
                        class="inline-block outline-none rounded-r hover:bg-gray-200 border"
                        style="width: 2.5rem; height: 2.5rem;"
                      >
                        3
                      </button>
                    </div>
                  </div>
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
                <li class="flex items-end" v-for="number in 6">
                  <div class="w-3/5 flex items-end justify-start">
                    <img
                      :style="{
                        width: '60px',
                        height: '45px',
                        imageRendering: 'pixelated',
                      }"
                      class="mr-3 object-cover object-center-bottom"
                      :src="`/static/images/icons/${308 + number}.png`"
                      alt=""
                    />
                    <p class="pb-3 font-bold text-lg">ポケモン名</p>
                  </div>
                  <div class="w-2/5">
                    <div class="flex font-bold">
                      <button
                        type="button"
                        class="inline-block outline-none rounded-l hover:bg-gray-200 border"
                        style="width: 2.5rem; height: 2.5rem;"
                      >
                        1
                      </button>
                      <button
                        type="button"
                        class="inline-block outline-none hover:bg-gray-200 border border-l-0 border-r-0"
                        style="width: 2.5rem; height: 2.5rem;"
                      >
                        2
                      </button>
                      <button
                        type="button"
                        class="inline-block outline-none rounded-r hover:bg-gray-200 border"
                        style="width: 2.5rem; height: 2.5rem;"
                      >
                        3
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="pl-9 h-1"></div>
          <div
            class="border flex flex-col p-9 rounded text-xl text-gray-800 font-bold"
            :style="{ width: '230px' }"
          >
            <p class="flex flex-col">
              <label class="pb-3">対戦シーズン</label>
              <select name="">
                <option value="">S4</option>
              </select>
            </p>
            <p class="flex flex-col pt-15">
              <label class="pb-3">順位帯</label>
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
            <div class="flex flex-1 pt-15 items-center justify-center">
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

        <footer class="pt-9">
          <div class="flex items-center justify-start">
            <h2 class="text-2xl font-bold text-gray-900">結果</h2>
            <i class="block flex-1 border-b ml-9"></i>
          </div>
          <textarea
            class="mt-9 resize-none overflow-hidden leading-relaxed border text-xl p-9 rounded w-full"
            cols="30"
            rows="8"
            placeholder="先発はこちらのパーティに出し負けることが殆どないミトムから来ると予想。
てんねん読みでトリックが飛んできてくれると嬉しいほか、読みを外しても負けないピクシーを先発にした。

ピクシー一匹ではミトムキッスの並びを見るのは難しいこと、ミトム以外におにび持ちがいなさそうなので裏にカビゴンを、最後に詰めとエースで運用できるアーマーガアを選出した。

相手のラスはなにがきてもおかしくなかったが、ミトムキッスで受けポケは大体見れるという前提てテンプレミミッキュが出てきた。"
          ></textarea>
        </footer>
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

<style scoped>
select {
  display: block;
  width: 100%;
  height: 30px;
  margin-top: 5px;
  padding: 4px 10px;
  border-radius: 2px;
  border: solid 1px #e5e5e5;
  background: #fafafa;
}

button:focus {
  @apply bg-gray-100;
}

.ModalContent {
  animation: slideIn 0.3s ease-out forwards;
}

@keyframes slideIn {
  0% {
    transform: translateY(10px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>
