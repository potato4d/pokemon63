import * as tsx from 'vue-tsx-support'
import SearchIcon from '~/assets/images/search.svg'
import { Pokemon } from '~/types/struct'
import { dex } from '~/analyzer/config/dex'
import { toKatakana } from '~/utils/filters/toKatakana'

export const TheSearchForm = tsx.component({
  data() {
    return {
      search: '',
      isOpenAnalyzeModal: false,
    }
  },
  computed: {
    inputElement() {
      return (this.$refs.input as any) as HTMLInputElement | null
    },
    suggestions(): Pokemon[] {
      if (!this.search) {
        return []
      }
      const matches = dex
        .filter(
          (poke) =>
            poke.slug.includes(this.search) ||
            poke.name_eng.includes(this.search) ||
            poke.name_jpn.includes(this.search) ||
            poke.name_jpn.includes(toKatakana(this.search))
        )
        .reduce((b, a) => {
          const found = b.find((p) => p.name_jpn === a.name_jpn)
          return found ? b : [...b, a]
        }, [] as Pokemon[])
      if (matches.length > 10) {
        return []
      }
      return matches
    },
  },
  render() {
    return (
      <div class={`container mx-auto relative z-30`}>
        <form
          onSubmit={(event: Event) => {
            event.preventDefault()
            this.$router.push(`/search?q=${this.search}`)
          }}
          style="border-radius: 30px"
          class={`overflow-hidden mt-15 lg:mt-30 TheHeader__searchBoxContainer absolute left-0 w-full ${
            this.search
              ? 'TheHeader__searchBoxContainer-hasSuggestion bg-white'
              : ''
          }`}
        >
          <div
            class={`bg-white relative h-24 lg:h-36 text-xl lg:text-3xl ${
              this.search ? 'border-b' : 'border rounded-full'
            }`}
            style={{
              borderColor: '#E5E5E5',
            }}
          >
            <input
              placeholder="ポケモン名で検索"
              type="text"
              ref="input"
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellCheck="false"
              value={this.search}
              onKeydown={(event: KeyboardEvent) => {
                if (event.keyCode === 40) {
                  event.preventDefault()
                  const a: HTMLAnchorElement = this.$el.querySelector(
                    '.suggestions a'
                  )
                  if (a) {
                    ;(event.target as HTMLInputElement).blur()
                    console.log(a)
                    a.focus()
                  }
                }
              }}
              onInput={(event: any) => {
                this.search = event.target.value
              }}
              class="w-full h-full rounded-full bg-white outline-none appearance-none block px-12 py-9 TheHeader__searchBox"
            />
            <img
              alt=""
              src={SearchIcon}
              width="18"
              class="pointer-events-none absolute top-0 right-0 m-4 mr-9 lg:mr-12 lg:m-12"
            />
          </div>
          {this.search ? (
            <ul
              ref="suggestions"
              class="suggestions bg-white outline-none appearance-none block list-reset list-none text-xl lg:text-2xl"
            >
              {this.suggestions.map((pokemon) => (
                <li>
                  <nuxt-link
                    to={`/search?q=${pokemon.name_jpn}`}
                    nativeOnKeydown={(event: KeyboardEvent) => {
                      const target = (event.target as HTMLAnchorElement)
                        .parentElement as HTMLElement
                      const anchorNize = (
                        el: Element
                      ): HTMLAnchorElement | null =>
                        (el as any) as HTMLAnchorElement | null

                      if (event.keyCode === 38) {
                        event.preventDefault()
                        const sibling: HTMLAnchorElement = anchorNize(
                          target.previousElementSibling
                        )
                        if (sibling) {
                          const anchor = anchorNize(sibling.querySelector('a'))
                          if (anchor) {
                            anchor.focus()
                          }
                        } else {
                          if (this.inputElement) {
                            this.inputElement.focus()
                          }
                        }
                      }
                      if (event.keyCode === 40) {
                        event.preventDefault()
                        const sibling: HTMLAnchorElement = anchorNize(
                          target.nextElementSibling
                        )
                        if (sibling) {
                          const anchor = anchorNize(sibling.querySelector('a'))
                          if (anchor) {
                            anchor.focus()
                          }
                        }
                      }
                    }}
                    nativeOnClick={() => {
                      this.search = ''
                    }}
                    class="px-12 flex items-center py-9 block bg-white text-black hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white"
                  >
                    <img
                      src={`/pokemon63/static/images/icons/${pokemon.slug}.png`}
                      style={{
                        width: '36px',
                        height: '30px',
                        imageRendering: 'pixelated',
                      }}
                      class="cursor-pointer object-cover object-center-bottom"
                    />
                    <span class="block mt-2">{pokemon.name_jpn}</span>
                  </nuxt-link>
                </li>
              ))}
            </ul>
          ) : null}
        </form>
        <div class="w-full" style="height: 110px;"></div>
      </div>
    )
  },
})

export default TheSearchForm
