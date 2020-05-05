import Vue, { CreateElement, VNode } from 'vue'
import * as tsx from 'vue-tsx-support'
import Logo from '~/assets/images/logo.svg'
import SearchIcon from '~/assets/images/search.svg'
import AnalyzerModal from '~/components/partials/modal/AnalyzerModal.vue'

export const TheHeader = tsx.component({
  data() {
    return {
      search: '',
      isOpenAnalyzeModal: false,
    }
  },
  render() {
    return (
      <header class="container mx-auto">
        <div
          class="flex flex-end justify-end items-center pt-6"
          style="height: 40px"
        >
          <button
            type="button"
            onClick={() => {
              this.isOpenAnalyzeModal = true
            }}
            style={{
              width: '104px',
              height: '36px',
              fontSize: '13px',
            }}
            class="hover:opacity-75 btn-primary"
          >
            選出を解析
          </button>
          {this.$auth.currentUser ? (
            <img
              src={this.$auth.currentUser.photoURL!}
              width="40"
              height="40"
              class="rounded-full overflow-hidden"
              alt=""
            />
          ) : (
            <button
              type="button"
              onClick={async () => {
                const result = await this.$auth.signInWithPopup(
                  new this.$firebase.auth.TwitterAuthProvider()
                )
                if (result.user) {
                  await this.$firestore
                    .collection('users')
                    .doc(result.user.uid)
                    .set({
                      displayName: result.user.displayName,
                      photoUrl: result.user.photoURL,
                    })
                  location.reload()
                }
              }}
              style={{
                width: '104px',
                height: '36px',
                fontSize: '13px',
                background: '#fff',
                fontWeight: 'normal',
                color: '#666',
                border: 'solid 1px #e5e5e5',
                marginRight: 0,
              }}
              class="hover:opacity-75 btn-primary"
            >
              ログイン
            </button>
          )}
        </div>
        <h1>
          <nuxt-link to="/">
            <img
              src={Logo}
              class="mx-auto"
              alt="みんなの63 ソード・シールド"
              width="384"
              height="257.33"
            />
          </nuxt-link>
        </h1>
        <p
          class="text-center pt-6"
          style={{
            color: '#333',
            fontSize: '16px',
          }}
        >
          スクリーンショットから自動解析できるポケモンの選出投稿サイト
        </p>
        <form
          onSubmit={(event: Event) => {
            event.preventDefault()
            this.$router.push(`/search?q=${this.search}`)
          }}
        >
          <div
            class="mt-30 rounded-full bg-white relative border"
            style={{
              borderColor: '#E5E5E5',
              height: '60px',
              fontSize: '18px',
            }}
          >
            <input
              placeholder="ポケモン名で検索"
              type="text"
              value={this.search}
              onInput={(event: any) => {
                this.search = event.target.value
              }}
              class="w-full h-full rounded-full bg-white outline-none appearance-none block px-12 py-9 TheHeader__searchBox"
            />
            <img
              alt=""
              src={SearchIcon}
              width="18"
              class="pointer-events-none absolute top-0 right-0 m-12"
            />
          </div>
        </form>
        <client-only>
          {this.isOpenAnalyzeModal && (
            <portal to="modal">
              <AnalyzerModal
                onClose={() => {
                  this.isOpenAnalyzeModal = false
                }}
              />
            </portal>
          )}
        </client-only>
      </header>
    )
  },
})
