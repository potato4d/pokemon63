<template>
  <div class="AppPopUp">
    {{ text }}
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'
import { delay } from '../../utils/effects/delay'

export default defineComponent({
  props: {
    text: String,
  },
  setup(_, { root }) {
    onMounted(async () => {
      await delay(3500)
      root.$toast.hide()
    })
  }
})
</script>

<style scoped>
.AppPopUp {
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  position: fixed;
  left: 0;
  bottom: 3rem;
  width: 100%;
  height: 100px;
  background: #343334;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 5rem;
  animation: slideIn 0.2s ease-out, slideOut 0.2s 3.2s ease-out forwards;
}

.AppPopUp::before {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  border-right: 30px solid transparent;
  border-left: solid 50px #202020;
  border-bottom: solid calc(50px * 1.4) transparent;
}

.AppPopUp::after {
  content: '';
  display: block;
  position: absolute;
  right: 0;
  bottom: 0;
  border-left: 30px solid transparent;
  border-right: solid 50px #202020;
  border-top: solid calc(50px * 1.4) transparent;
}

@keyframes slideIn {
  0% {
    transform: translateX(100%);
    color: rgba(255, 255, 255, 0);
  }
  99% {
    transform: translateX(0px);
    color: rgba(255, 255, 255, 0);
  }
  100% {
    transform: translateX(0px);
    color: #fff;
  }
}

@keyframes slideOut {
  0% {
    transform: translateX(0px);
    color: rgba(255, 255, 255, 0);
  }
  10% {
    transform: translateX(0px);
    color: rgba(255, 255, 255, 0);
  }
  100% {
    transform: translateX(-100%);
    color: rgba(255, 255, 255, 0);
  }
}
</style>
