import Vue, { CreateElement, VNode } from 'vue'
import * as tsx from 'vue-tsx-support'

export const TheFooter = tsx.component({
  render() {
    return (
      <footer class="w-full p-18 pt-30 bg-black">
        <div
          class="container"
          style={{
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#fff',
          }}
        >
          <ul class="list-reset pt-30">
            <li class="mt-9">
              本サービスは非公式サービスです。任天堂株式会社とは一切関係ありません。
            </li>
            <li class="mt-9">
              このサイトのソースコードは MIT License で公開されています。
            </li>
          </ul>
          <p
            class="mt-18 mx-auto text-center"
            style={{
              fontSize: '14px',
            }}
          >
            &copy; 2020 poketen.com by @potato4d
          </p>
        </div>
      </footer>
    )
  },
})
