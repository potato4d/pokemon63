<template>
  <h2 class="relative">
    <span class="block pb-9">
      <slot />
    </span>
  </h2>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style scoped>
h2 {
  font-weight: bold;
  font-size: 30px;
  color: #000000;
  padding-bottom: 3px;
}

h2::before {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50%;
  height: 3px;
  background-image: linear-gradient(
    90deg,
    #00a0e9 0%,
    #00a0e9 91%,
    #ffffff 100%
  );
  border-radius: 100px 0 0 100px;
}

h2::after {
  content: '';
  display: block;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 50%;
  height: 3px;
  transform: rotate(-180deg);
  background-image: linear-gradient(
    90deg,
    #e5005a 0%,
    #e5005a 91%,
    #ffffff 100%
  );
  border-radius: 100px 0 0 100px;
}

@media (max-width: 1023px) {
  h2 {
    font-size: 18px;
  }
}
</style>
