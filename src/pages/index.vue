<template>
  <div class="container">
    <div class="pt-21">
      <AppHeading>
        みんなの選出
      </AppHeading>
    </div>
    <div class="pt-18 flex flex-wrap justify-between items-start">
      <div
        v-for="number in 20"
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
            src="https://firebasestorage.googleapis.com/v0/b/poketen-pokemon63.appspot.com/o/001.jpeg?alt=media&token=344373a0-9441-4867-84c8-1e5a15617087"
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
          S5 / 1{{ number * 50 }} 位
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
      </div>
    </div>
    <div class="text-center pb-30 mb-30 pt-9">
      <AppButton>更に読み込む</AppButton>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
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
