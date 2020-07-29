<template>
  <aside class="w-full h-full fixed left-0 top-0 overflow-scroll">
    <form
      @submit.prevent="handleSubmitForm"
      v-if="user"
      class="relative z-20 mx-auto"
      :style="{
        width: '320px',
        maxWidth: 'calc(100% - 20px)',
      }"
    >
      <div
        class="ModalContent mx-auto my-18 mt-24 w-full p-9 bg-white rounded overflow-hidden"
      >
        <div class="py-9 pb-18 text-center flex items-center justify-center">
          <img
            :src="photoUrl"
            :style="{
              width: '128px',
              height: '128px',
            }"
            alt=""
            class="rounded-full overflow-hidden"
          />
        </div>
        <div class="flex">
          <div class="flex-1">
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
            <div class="mt-6">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  :value="true"
                  v-model="showTwitterAccount"
                />
                <span class="inline-block ml-3"
                  >Twitter アカウントを表示する</span
                >
              </label>
            </div>
            <div class="flex justify-center mt-9">
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
  showTwitterAccount: boolean
  hasFile: boolean
  photoUrl: string
  user: User | null
}

export default Vue.extend({
  data(): LocalData {
    return {
      formMeta: {
        displayName: '',
        photoUrl: '',
      },
      photoUrl: '',
      hasFile: false,
      showTwitterAccount: false,
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
      this.showTwitterAccount = !!this.user.twitterId
      this.formMeta = {
        displayName: this.user!.displayName,
        photoUrl: this.user!.photoUrl,
      }
      this.photoUrl = this.formMeta.photoUrl
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
      const payload: Pick<User, 'displayName' | 'photoUrl' | 'twitterId'> = {
        ...this.formMeta,
      }
      if (this.showTwitterAccount) {
        payload.twitterId = this.$auth.currentUser!.providerData[0]!.uid
      } else {
        payload.twitterId = ''
      }
      if (!this.user || !this.$auth.currentUser) {
        return false
      }
      await this.updatePhotoUrl()
      payload.photoUrl = this.formMeta.photoUrl
      await Promise.all([
        this.$firestore
          .collection('users')
          .doc(this.$auth.currentUser.uid)
          .set({
            ...payload,
          }),
        this.$auth.currentUser.updateProfile({
          ...payload,
          photoURL: payload.photoUrl,
        }),
      ])
    },
    async updatePhotoUrl() {
      if (!this.user) {
        return false
      }
      if (!this.hasFile) {
        return this.user.photoUrl
      }
      const path = `icons/${this.$auth.currentUser.uid}/me`
      const [file] = (this.$refs.fileInput as any).files as [File]
      const blob = await this.fileToBlob(file)
      await this.$storage.ref(path).put(blob)
      this.formMeta.photoUrl = `https://storage.googleapis.com/${
        process.env.FIREBASE_STORAGE_BUCKET
      }/${path}?_=${~~(Math.random() * 10000)}`
    },
    async handleUpdatePhoto(event: any) {
      this.hasFile = true
      const [file] = event.target.files as [File]
      this.photoUrl = URL.createObjectURL(await this.fileToBlob(file))
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
  filter: blur(2px);
  animation: slideIn 0.2s ease-out forwards, blurIn 0.2s ease-out forwards;
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

@keyframes blurIn {
  0% {
    filter: blur(2px);
  }
  100% {
    filter: blur(0px);
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
