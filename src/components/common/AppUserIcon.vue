<template>
  <img v-if="photoUrl" :src="photoUrl" alt="" />
  <div v-else></div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    userId: String,
  },
  data() {
    return {
      photoUrl: '',
    }
  },
  async mounted() {
    this.photoUrl = (await this.$userRecord.get({ id: this.userId })).photoUrl
  },
})
</script>

<style scoped>
img,
div {
  background: #fff;
}
</style>
