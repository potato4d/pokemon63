import * as tsx from 'vue-tsx-support'
import SearchIcon from '~/assets/images/search.svg'

export const TheSearchForm = tsx.component({
  data() {
    return {
      search: '',
      isOpenAnalyzeModal: false,
    }
  },
  render() {
    return (
      <div class="container mx-auto">
        <form
          onSubmit={(event: Event) => {
            event.preventDefault()
            this.$router.push(`/search?q=${this.search}`)
          }}
        >
          <div
            class="mt-15 lg:mt-30 rounded-full bg-white relative border h-24 lg:h-36 text-xl lg:text-3xl"
            style={{
              borderColor: '#E5E5E5',
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
              class="pointer-events-none absolute top-0 right-0 m-4 mr-9 lg:mr-12 lg:m-12"
            />
          </div>
        </form>
      </div>
    )
  },
})
