import Vue, { CreateElement, VNode } from 'vue'
import * as tsx from 'vue-tsx-support'
import { Pokemon, dex } from '~/analyzer/config/dex'
import EditIcon from '~/assets/images/edit.svg'
import { SKIP_INDEX } from '~/analyzer/config/constants'

const PokemonFixPopUp = tsx.component({
  data() {
    return {
      search: '',
      dex: dex.filter((poke) => {
        return !(SKIP_INDEX as any)[poke.img]
      }),
    }
  },
  mounted() {
    const { input }: { input: HTMLInputElement } = this.$refs as any
    input.focus()
  },
  render() {
    return (
      <div
        class="bg-white absolute border"
        style={{
          width: '260px',
          height: '350px',
          padding: '10px',
          left: '-20px',
          right: '0px',
          margin: '0px auto',
          top: '-350px',
        }}
      >
        <input
          type="text"
          ref="input"
          onInput={(event) => {
            this.search = `${event.target.value}`
          }}
          placeholder="正しいポケモン名で検索"
          class="text-lg active:border-blue-500 outline-none w-full h-24 border bg-white flex items-center justify-start px-3 block appearance-none"
        />
        <div
          class="flex flex-wrap"
          style={{
            width: '240px',
            height: '300px',
            overflowX: 'hidden',
            overflowY: 'scroll',
          }}
        >
          {this.dex
            .filter((poke) => poke.name.includes(this.search))
            .map((poke) => (
              <img
                src={`/pokemon63/static/images/icons/${poke.img}.png`}
                onClick={() => {
                  this.$emit('fix', poke)
                }}
                style={{
                  width: '60px',
                  height: '50px',
                  imageRendering: 'pixelated',
                }}
                class="hover:bg-gray-100 cursor-pointer object-cover object-center-bottom"
              />
            ))}
          <div class="w-full h-6"></div>
        </div>
        <div class="w-full h-6"></div>
      </div>
    )
  },
})

export const AnalyzerPokemonList = tsx.component({
  name: 'AnalyzerPokemonList',
  props: {
    choice: Array as () => number[],
    party: Array as () => Pokemon[],
  },
  components: {
    PokemonFixPopUp,
  },
  data() {
    return {
      fixPopup: -1,
    }
  },
  methods: {
    choosePokemon(index: number, pokemon: Pokemon) {
      this.$emit('choose', {
        index,
        pokemon,
      })
    },
    buttonClass(index: number, pokemon: Pokemon) {
      const base = 'inline-block outline-none rounded-l border'
      if (this.choice[index] === pokemon.img) {
        return `${base} text-white bg-blue-600`
      } else {
        return `${base} focus:bg-gray-200 hover:bg-gray-200`
      }
    },
  },
  render() {
    return (
      <div class="w-1/2">
        {(this.$slots as any).default}
        <ul>
          {this.party.map((pokemon, i) => (
            <li class="flex mb-3 items-end">
              <div class="w-3/5 flex items-end justify-start relative">
                {this.fixPopup === i && (
                  <PokemonFixPopUp
                    onFix={(poke: Pokemon) => {
                      this.$emit('fix', {
                        index: i,
                        pokemon: poke,
                      })
                      this.fixPopup = -1
                    }}
                  />
                )}
                <div
                  onClick={() => {
                    if (this.fixPopup !== i) {
                      this.fixPopup = i
                    } else {
                      this.fixPopup = -1
                    }
                  }}
                  class="relative cursor-pointer"
                  style={{
                    width: '60px',
                    height: '50px',
                  }}
                >
                  <img
                    style={{
                      width: '60px',
                      height: '50px',
                      imageRendering: 'pixelated',
                    }}
                    class="mr-3 object-cover object-center-bottom"
                    src={`/pokemon63/static/images/icons/${pokemon.img}.png`}
                    alt=""
                  />
                  <div
                    class="absolute bg-gray-500 flex items-center justify-center rounded overflow-hidden"
                    style={{
                      width: '16px',
                      height: '16px',
                      bottom: '-4px',
                      right: '8px',
                    }}
                  >
                    <img src={EditIcon} class="w-3 h-3" alt="" />
                  </div>
                </div>
                <p class="pb-3 font-bold text-lg">
                  {pokemon.name.split('(')[0]}
                </p>
              </div>
              <div class="w-2/5">
                <div class="flex">
                  {new Array(3).fill(0).map((_, i) => (
                    <button
                      type="button"
                      style="width: 2.5rem; height: 2.5rem;"
                      class={this.buttonClass(i, pokemon)}
                      onClick={() => {
                        this.choosePokemon(i, pokemon)
                      }}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  },
})
