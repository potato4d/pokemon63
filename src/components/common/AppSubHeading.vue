<template>
  <h3 class="relative pb-9">
    <slot />
  </h3>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style scoped>
h3 {
  font-weight: bold;
  color: #000000;
}

h3::before {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50%;
  height: 2px;
  background-image: linear-gradient(
    90deg,
    #00a0e9 0%,
    #00a0e9 91%,
    #ffffff 100%
  );
  border-radius: 100px 0 0 100px;
}

h3::after {
  content: '';
  display: block;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 50%;
  height: 2px;
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
  h3 {
    font-size: 18px;
  }
}
</style>
