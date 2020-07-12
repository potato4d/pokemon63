<template>
  <div id="__content">
    <TheHeader />
    <nuxt class="flex-1" />
    <TheFooter />
    <portal-target name="modal" />
    <AppToast :text="$toast.text" v-if="$toast.display" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({})
</script>

<style>
html {
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

#__nuxt {
  overflow: hidden;
}

#__content {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

html {
  line-height: 1;
  font-family: 'Noto Sans JP', sans-serif;
}

button {
  outline: none !important;
  font-family: 'Noto Sans JP', sans-serif;
}

#__nuxt::before {
  content: '';
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  border-left: solid calc(50vw + 77px) #f2f2f2;
  border-right: solid 100px transparent;
  border-bottom: solid calc(calc(50vw + 77px) * 1.4) transparent;
}

#__nuxt::after {
  content: '';
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  border-left: solid calc(50vw + 356px) #fafafa;
  border-right: solid 100px transparent;
  border-bottom: solid calc(calc(50vw + 356px) * 1.4) transparent;
}

#__layout {
  min-width: 100vw;
  min-height: 100vh;
  position: relative;
  z-index: 5;
}

.TheHeader__searchBox {
  transition: box-shadow 0.15s ease-out;
}

.TheHeader__searchBox:focus {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
</style>
