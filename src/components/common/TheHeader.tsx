import Vue, { CreateElement, VNode } from 'vue'
import * as tsx from 'vue-tsx-support'
import Logo from '~/assets/images/logo.svg'
import SearchIcon from '~/assets/images/search.svg'

export const TheHeader = tsx.component({
  render() {
    return (
      <header class="container mx-auto">
        <div class="flex flex-end justify-end items-center pt-6">
          <a
            href=""
            style={{
              width: '104px',
              height: '36px',
              fontSize: '13px',
            }}
            class="hover:opacity-75 inline-flex mr-6 items-center justify-center btn-primary text-white font-bold rounded-full"
          >
            選出を解析
          </a>
          <img
            src="https://github.com/potato4d.png"
            width="40"
            height="40"
            class="rounded-full overflow-hidden"
            alt=""
          />
        </div>
        <h1>
          <img
            src={Logo}
            class="mx-auto"
            alt="みんなの63 ソード・シールド"
            width="384"
          />
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
        <form>
          <div
            class="mt-30 rounded-full bg-white relative border"
            style={{
              borderColor: '#E5E5E5',
              height: '60px',
              fontSize: '18px',
            }}
          >
            <input
              placeholder="ポケモン名などで検索"
              type="text"
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
      </header>
    )
  },
})
