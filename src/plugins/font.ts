export default () => {
  setTimeout(() => {
    try {
      let el: HTMLScriptElement | null = document.querySelector('#__wf')
      if (el) {
        return
      }
      el = document.createElement('script')
      el.type = 'text/javascript'
      el.src =
        'https://typesquare.com/3/tsst/script/ja/typesquare.js?5eddd9489b58494399f667ebac1e0217'
      document.body.appendChild(el)
    } catch (e) {}
  }, 1000)
}
