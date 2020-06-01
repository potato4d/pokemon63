<template>
  <aside class="w-full h-full fixed left-0 top-0 overflow-scroll">
    <form
      @submit.prevent="handleSubmitForm"
      v-if="user"
      class="relative z-20 mx-auto"
      :style="{
        width: '480px',
        maxWidth: 'calc(100% - 20px)',
      }"
    >
      <div
        class="ModalContent mx-auto my-18 w-full p-9 bg-white rounded overflow-hidden"
      >
        <div class="flex">
          <div class="py-9">
            <img
              :src="formMeta.photoUrl"
              :style="{
                width: '64px',
                height: '64px',
              }"
              alt=""
              class="rounded-full overflow-hidden"
            />
          </div>
          <div class="flex-1 pl-9">
            <input
              class="input"
              type="text"
              placeholder=""
              v-model="formMeta.displayName"
            />
            <input
              type="file"
              ref="fileInput"
              accept="image/*"
              @change="handleUpdatePhoto"
              class="mt-6"
            />
            <div class="flex justify-end mt-9">
              <button
                :style="{
                  width: '90px',
                  height: '32px',
                  fontSize: '12px',
                  margin: '0',
                }"
                class="btn-primary hover:opacity-75"
              >
                変更を保存
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div
      @click="handleClickClose"
      class="fixed cursor-pointer left-0 top-0 z-10 w-full h-full bg-black opacity-50"
    ></div>
  </aside>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { delay } from '~/utils/effects/delay'
import { User } from '../../../types/struct'
import { toUserDocument } from '../../../utils/transformer/toObject'
import { v4 as uuid } from 'uuid'

type LocalData = {
  formMeta: Pick<User, 'displayName' | 'photoUrl'>
  user: User | null
}

export default Vue.extend({
  data(): LocalData {
    return {
      formMeta: {
        displayName: '',
        photoUrl: '',
      },
      user: null,
    }
  },
  async mounted() {
    try {
      this.user = toUserDocument(
        await this.$firestore
          .collection('users')
          .doc(this.$auth.currentUser!.uid)
          .get()
      )
      this.formMeta = {
        displayName: this.user!.displayName,
        photoUrl: this.user!.photoUrl,
      }
    } catch (e) {
      alert('エラーが発生しました')
      this.$emit('close')
    }
  },
  methods: {
    async handleSubmitForm() {
      await this.updateUser()
      location.reload()
    },
    async updateUser() {
      if (!this.user || !this.$auth.currentUser) {
        return false
      }
      await this.updatePhotoUrl()
      await Promise.all([
        this.$firestore
          .collection('users')
          .doc(this.$auth.currentUser.uid)
          .set({
            ...this.formMeta,
          }),
        this.$auth.currentUser.updateProfile({
          photoURL: this.formMeta.photoUrl,
          ...this.formMeta,
        }),
      ])
    },
    async updatePhotoUrl() {
      if (!this.user) {
        return false
      }
      if (this.formMeta.photoUrl === this.user.photoUrl) {
        return this.user.photoUrl
      }
      const path = `icons/${this.$auth.currentUser.uid}/me`
      const [file] = (this.$refs.fileInput as any).files as [File]
      const blob = await this.fileToBlob(file)
      await this.$storage.ref(path).put(blob)
      this.formMeta.photoUrl = `https://storage.googleapis.com/${process.env.FIREBASE_STORAGE_BUCKET}/${path}`
    },
    async handleUpdatePhoto(event: any) {
      const [file] = event.target.files as [File]
      this.formMeta.photoUrl = URL.createObjectURL(await this.fileToBlob(file))
      console.log(this.formMeta.photoUrl)
    },
    async fileToBlob(file: File): Promise<Blob> {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          resolve(
            new Blob([new Uint8Array((event as any).target!.result!)], {
              type: file.type,
            })
          )
        }
        reader.readAsArrayBuffer(file)
      })
    },
    handleClickClose() {
      if (window.confirm('編集を中止しますか？')) {
        this.$emit('close')
      }
    },
  },
})
</script>

<style scoped>
select,
.input {
  display: block;
  width: 100%;
  height: 34px;
  margin-top: 5px;
  padding: 4px 10px;
  border-radius: 2px;
  border: solid 1px #e5e5e5;
  background: #fff;
  font-size: 14px;
}

.input-rank {
  background: #fff;
  border-radius: 4px;
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

.ImageArea.ImageArea__masked::before {
  content: '';
  display: block;
  width: 80px;
  height: 20px;
  position: absolute;
  left: 155px;
  top: 48px;
  background: #126ff4;
  z-index: 200;
}
</style>
