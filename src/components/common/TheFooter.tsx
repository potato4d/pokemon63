import Vue, { CreateElement, VNode } from 'vue'
import * as tsx from 'vue-tsx-support'

export const TheFooter = tsx.component({
  render() {
    return (
      <footer class="w-full p-18 pt-18 bg-black">
        <div
          class="container"
          style={{
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#fff',
          }}
        >
          <ul class="list-reset pt-12">
            <li class="text-4xl pb-30">
              <p>Pokemon Driven</p>
              <p class="text-xl mt-6 text-gray-400">ポケモン支援ツールまとめ</p>
            </li>
            <li class="mt-9">
              本サービスは非公式サービスです。株式会社ポケモンおよび任天堂株式会社とは一切関係ありません。
            </li>
            <li class="mt-9">
              このサイトのソースコードは{' '}
              <a
                href="https://github.com/potato4d/pokemon63"
                class="underline"
                target="_blank"
              >
                MIT License で公開
              </a>{' '}
              されています。
            </li>
            <li class="mt-9">
              不具合報告やお問い合わせは、
              <a
                href="https://twitter.com/potato4d"
                class="underline"
                target="_blank"
              >
                作者 Twitter アカウント
              </a>
              へとお願いいたします。
            </li>
          </ul>
          <p
            class="mt-18 mx-auto text-center"
            style={{
              fontSize: '14px',
            }}
          >
            &copy; 2020 pokedri.com by{' '}
            <a
              href="https://twitter.com/potato4d"
              target="_blank"
              class="underline"
            >
              @potato4d
            </a>
          </p>
        </div>
      </footer>
    )
  },
})

export default TheFooter
