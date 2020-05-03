<template>
  <button type="button">
    <div>
      <slot />
    </div>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style scoped>
button {
  font-weight: bold;
  font-size: 14px;
  color: #000000ff;
  width: 200px;
  height: 50px;
  background-image: linear-gradient(
    180deg,
    #00a0e9 0%,
    #ffffff 45%,
    #ffffff 52%,
    #e5005a 100%
  );
  border-radius: 25px;
  border-radius: 25px;
  overflow: hidden;
  transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

button:active,
button:hover {
  color: #000000cc;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

button > div {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 194px;
  height: 44px;
  margin: 3px;
  background: #fff;
  border-radius: 25px;
  overflow: hidden;
}
</style>
