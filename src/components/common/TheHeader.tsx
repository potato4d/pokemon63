import Vue, { CreateElement, VNode } from 'vue'
import * as tsx from 'vue-tsx-support'
import Logo from '~/assets/images/logo.svg'
import AnalyzerModal from '~/components/partials/modal/AnalyzerModal.vue'
import UserSettingsModal from '~/components/partials/modal/UserSettingsModal.vue'
import MinimalLogo from '~/assets/images/minimal-logo.png'

export const TheHeader = tsx.component({
  props: {
    minimal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpenAnalyzeModal: false,
      isOpenUserSettingsModal: false,
    }
  },
  render() {
    return (
      <header class="container mx-auto">
        <div
          class="flex justify-between items-center pt-6"
          style="height: 40px"
        >
          {this.minimal ? (
            <div>
              <nuxt-link to="/" class="inline-flex items-center">
                <img
                  src={MinimalLogo}
                  alt="みんなの63 ソード・シールド"
                  width="131"
                  height="40"
                />
              </nuxt-link>
            </div>
          ) : (
            <div></div>
          )}
          <div class="flex  justify-end items-center">
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
              <div class="flex items-center justify-between">
                <nuxt-link
                  to={`/u/${this.$auth.currentUser.uid}`}
                  style={{
                    width: '40px',
                    height: '40px',
                  }}
                  class="inline-block"
                >
                  <img
                    src={this.$auth.currentUser.photoURL!}
                    width="40"
                    height="40"
                    class="rounded-full overflow-hidden"
                    alt=""
                  />
                </nuxt-link>
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault()
                    this.isOpenUserSettingsModal = true
                  }}
                  class="ml-9 mt-1 "
                >
                  <img
                    src={require('~/assets/images/settings.svg')}
                    width={20}
                    alt=""
                  />
                </a>
              </div>
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
        </div>
        {!this.minimal && (
          <h1>
            <nuxt-link to="/">
              <img
                src={Logo}
                class="mx-auto my-18 lg:my-auto w-2/3 lg:w-auto h-auto"
                alt="みんなの63 ソード・シールド"
                width="384"
                height="257.33"
              />
            </nuxt-link>
          </h1>
        )}
        {!this.minimal && (
          <p
            class="text-center pt-6 text-2xl lg:text-2xl leading-loose lg:leading-normal"
            style={{
              color: '#333',
            }}
          >
            スクリーンショットから自動解析できるポケモンの選出投稿サイト
          </p>
        )}
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
        <client-only>
          {this.isOpenUserSettingsModal && (
            <portal to="modal">
              <UserSettingsModal
                onClose={() => {
                  this.isOpenUserSettingsModal = false
                }}
              />
            </portal>
          )}
        </client-only>
      </header>
    )
  },
})

export default TheHeader
